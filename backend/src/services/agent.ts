// import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

// const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const PROTOCOL_CONTEXT = `
You are the AutoPilot financial agent running on the Celo blockchain.
You help everyday users grow their cUSD savings toward specific goals 
without needing any DeFi knowledge.

## AAVE V3 (Celo Mainnet)
- Type: Lending protocol
- APY range: 3% – 8% (variable)
- Risk: LOW — no price exposure, withdraw anytime
- Best for: Short timelines, low risk tolerance

## Uniswap V4 — Stable LP Pools (Celo Mainnet)
- Type: Liquidity provision — cUSD/USDC pool
- APY range: 10% – 25% (variable, based on trading volume)
- Risk: MEDIUM — minimal IL on stable pairs
- Best for: Medium timelines (3m+), moderate risk

## Tether Gold / XAUT (via Mento swap)
- Type: Inflation hedge
- APY: No yield — tracks gold price (+8–12%/year historically)
- Risk: LOW-MEDIUM — stable long term
- Best for: Long timelines (6m+), high-inflation economies

## Allocation by Risk Level
- SAFE:     100% Aave V3
- BALANCED: 65% Aave V3 + 35% Uniswap V4 LP
- GROWTH:   50% Aave V3 + 35% Uniswap V4 LP + 15% XAUT
`;

export interface OnboardingInput {
  walletAddress:    string;
  goalCategory:     string;
  goalDescription?: string;
  targetAmount:     number;
  targetDate:       string;
  weeklyContrib:    number;
  safetyFloor:      number;
  riskLevel:        "safe" | "balanced" | "growth";
}

export interface Alternative {
  label:           string;   // "Reduce your goal"
  description:     string;   // plain language explanation
  adjustedAmount?: number;   // new target if reducing goal
  adjustedWeekly?: number;   // new weekly if increasing contributions
  adjustedDate?:   string;   // new date if extending timeline
  projectedTotal:  number;   // what they'd actually reach
}

export interface FeasibilityResult {
  achievable:      boolean;
  summary:         string;
  projectedDate:   string;
  weeklyRequired?: number;
  strategy:        string;
  alternatives?:   Alternative[];  // only present when achievable = false
}

export async function runFeasibilityCheck(
  input: OnboardingInput
): Promise<FeasibilityResult> {

  const deadline     = new Date(input.targetDate);
  const now          = new Date();
  const weeksLeft    = Math.max(1, Math.floor(
    (deadline.getTime() - now.getTime()) / (7 * 24 * 60 * 60 * 1000)
  ));

  const apyByRisk    = { safe: 0.055, balanced: 0.14, growth: 0.19 };
  const apy          = apyByRisk[input.riskLevel];
  const savingsTotal = input.weeklyContrib * weeksLeft;
  const yieldTotal   = savingsTotal * apy * (weeksLeft / 52);
  const totalProj    = savingsTotal + yieldTotal;
  const onTrack      = totalProj >= input.targetAmount;

  // What they CAN reach with their current budget
  const reachableAmount = Math.floor(totalProj);

  // What weekly amount they'd NEED to hit the goal
  const weeklyNeeded = Math.ceil(
    input.targetAmount / (weeksLeft + weeksLeft * apy / 52)
  );

  // How long it would take at current weekly contrib
  const weeksNeededAtCurrent = Math.ceil(
    input.targetAmount / (input.weeklyContrib + input.weeklyContrib * apy / 52)
  );
  const achievableDate = new Date(
    now.getTime() + weeksNeededAtCurrent * 7 * 24 * 60 * 60 * 1000
  );

  const prompt = `
${PROTOCOL_CONTEXT}

---

Analyse this user's savings goal and respond with a JSON object ONLY.
No markdown code blocks. No text outside the JSON.

User data:
- Goal: ${input.goalCategory} ${input.goalDescription ? `(${input.goalDescription})` : ""}
- Target: $${input.targetAmount} cUSD
- Deadline: ${input.targetDate}
- Weekly contribution: $${input.weeklyContrib} cUSD
- Safety floor: $${input.safetyFloor} cUSD (locked, never invested)
- Risk level: ${input.riskLevel.toUpperCase()}
- Weeks until deadline: ${weeksLeft}
- Projected total by deadline: $${totalProj.toFixed(2)}
- On track: ${onTrack ? "YES" : "NO"}
- What they CAN reach by deadline: $${reachableAmount}
- Weekly needed to hit goal on time: $${weeklyNeeded}
- Date they'd hit goal at current weekly: ${achievableDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}

${onTrack ? `
Respond with this JSON:
{
  "achievable": true,
  "summary": "2 sentences. Plain language. Start with '✓ Your goal is achievable'. Mention projected completion date.",
  "projectedDate": "Month Year e.g. August 2026",
  "weeklyRequired": null,
  "strategy": "1 sentence on how their money splits across protocols.",
  "alternatives": null
}
` : `
The goal is NOT achievable with current inputs. 
Generate 3 concrete alternatives the user can actually choose from.

Respond with this JSON:
{
  "achievable": false,
  "summary": "2 sentences. Plain language. Start with '⚠ You may need to adjust'. Be specific about the gap.",
  "projectedDate": null,
  "weeklyRequired": ${weeklyNeeded},
  "strategy": "1 sentence on how their money splits across protocols.",
  "alternatives": [
    {
      "label": "Save what's possible",
      "description": "Plain language — what they'll have by their deadline with no changes",
      "adjustedAmount": ${reachableAmount},
      "projectedTotal": ${reachableAmount}
    },
    {
      "label": "Increase weekly savings",
      "description": "Plain language — what they'd need to save per week to hit the goal on time",
      "adjustedWeekly": ${weeklyNeeded},
      "projectedTotal": ${input.targetAmount}
    },
    {
      "label": "Extend your timeline",
      "description": "Plain language — when they'd hit the goal at their current weekly amount",
      "adjustedDate": "${achievableDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}",
      "projectedTotal": ${input.targetAmount}
    }
  ]
}
`}
`;

  /*
  const message = await client.messages.create({
    model:      "claude-sonnet-4-20250514",
    max_tokens: 500,
    messages:   [{ role: "user", content: prompt }]
  });

  const raw  = (message.content[0] as any).text.trim();
  */

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const raw = response.text().trim();
  
  // Strip potential markdown code blocks if the model included them despite instructions
  const jsonStr = raw.startsWith("```") ? raw.replace(/^```json?\n?/, "").replace(/\n?```$/, "") : raw;
  const json = JSON.parse(jsonStr);

  return json as FeasibilityResult;
}


 