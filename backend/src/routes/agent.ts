// src/routes/agent.ts
import { Router } from "express";
import { feasibilityCheck } from "../controllers/agent";

const router = Router();

/**
 * @swagger
 * /autopilot/agent/feasibility:
 *   post:
 *     summary: Run a savings goal feasibility check
 *     description: >
 *       Analyses a user's savings goal against their weekly contribution capacity,
 *       risk level, and the available DeFi protocols on Celo (Aave V3, Uniswap V4 LP,
 *       Tether Gold). Powered by **Claude** — returns a plain-language summary,
 *       projected completion date, recommended strategy allocation, and (if the goal
 *       is not achievable) three concrete alternative paths the user can choose.
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeasibilityRequest'
 *     responses:
 *       200:
 *         description: Feasibility analysis completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeasibilityResponse'
 *       400:
 *         description: Missing required field, invalid riskLevel, or targetDate in the past
 *       500:
 *         description: Failed to run feasibility check (AI or server error)
 */
router.post("/feasibility", feasibilityCheck);

export default router;