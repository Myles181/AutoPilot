import { Request, Response } from "express";
import { runFeasibilityCheck, OnboardingInput } from "../services/agent";

export async function feasibilityCheck(req: Request, res: Response) {
  try {
    const input: OnboardingInput = req.body;

    // Basic validation
    const required = [
      "walletAddress","goalCategory","targetAmount",
      "targetDate","weeklyContrib","safetyFloor","riskLevel"
    ];

    for (const field of required) {
      if (req.body[field] === undefined || req.body[field] === null) {
        return res.status(400).json({ error: `Missing field: ${field}` });
      }
    }

    if (!["safe","balanced","growth"].includes(input.riskLevel)) {
      return res.status(400).json({ error: "riskLevel must be safe | balanced | growth" });
    }

    if (new Date(input.targetDate) <= new Date()) {
      return res.status(400).json({ error: "targetDate must be in the future" });
    }

    const result = await runFeasibilityCheck(input);

    return res.status(200).json({
      success: true,
      data:    result
    });

  } catch (error: any) {
    console.error("Feasibility check error:", error.message);
    return res.status(500).json({ error: "Failed to run feasibility check" });
  }
}