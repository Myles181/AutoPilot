// src/routes/wallet.ts
import { Router } from "express";
import { getNonce, addWallet } from "../controllers/wallet";

const router = Router();

/**
 * @swagger
 * /autopilot/wallets/nonce:
 *   post:
 *     summary: Request a sign-in nonce for an EVM wallet address
 *     description: >
 *       Generates a one-time nonce tied to the given EVM wallet address.
 *       The nonce expires after **5 minutes**. Use it to build and sign a message
 *       on the frontend, then pass it to `POST /wallets/add`.
 *     tags: [Wallets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NonceRequest'
 *     responses:
 *       200:
 *         description: Nonce generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NonceResponse'
 *       400:
 *         description: Missing or invalid EVM address
 *       500:
 *         description: Internal server error
 */
router.post("/nonce", getNonce);

/**
 * @swagger
 * /autopilot/wallets/add:
 *   post:
 *     summary: Verify EVM signature and link wallet to authenticated user
 *     description: >
 *       Verifies the `personal_sign` signature using **viem** (`verifyMessage`).
 *       On success the wallet is permanently linked to the authenticated user and
 *       the first linked wallet is automatically marked as primary.
 *       Requires a valid JWT in the `Authorization` header.
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddWalletRequest'
 *     responses:
 *       201:
 *         description: Wallet linked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddWalletResponse'
 *       400:
 *         description: Missing fields, invalid address, invalid signature format, or wallet already linked
 *       401:
 *         description: Unauthorized, nonce not found / expired / mismatched, or signature verification failed
 *       404:
 *         description: Authenticated user not found
 *       500:
 *         description: Internal server error
 */
router.post("/add", addWallet);

export default router;
