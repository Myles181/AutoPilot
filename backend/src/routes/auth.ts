// src/routes/auth.ts
import { Router } from "express";
import { googleAuth } from "../controllers/auth";

const router = Router();

/**
 * @swagger
 * /autopilot/auth/google:
 *   post:
 *     summary: Sign in or sign up with Google
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoogleAuthRequest'
 *     responses:
 *       200:
 *         description: Existing Google user logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       201:
 *         description: New account created (or existing email linked) via Google
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Missing Google ID token
 *       401:
 *         description: Invalid or expired Google token
 *       500:
 *         description: Internal server error
 */
router.post("/google", googleAuth);

export default router;
