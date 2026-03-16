import { Request, Response } from "express";

import WalletAuthService from "../services/walletAuth";
import { User } from "../models/user";
import { Nonce } from "../models/nonce";
import { WalletAuth } from "../models/walletAuth";

/**
 * POST /wallets/nonce
 * Body: { address: string }
 *
 * Generates a nonce for the given EVM wallet address.
 * Nonce expires in 5 minutes — stored in MongoDB with TTL.
 * Frontend uses this nonce to build and sign the message.
 */
export const getNonce = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.body;

    if (!address) {
      res.status(400).json({ success: false, message: "Wallet address is required" });
      return;
    }

    // Validate it's actually a valid EVM address
    if (!WalletAuthService.isValidAddress(address)) {
      res.status(400).json({ success: false, message: "Invalid EVM wallet address" });
      return;
    }

    // Generate a nonce using the service
    const nonce = WalletAuthService.generateNonce();

    // Nonce expires in 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Upsert — if a nonce already exists for this address, replace it
    await Nonce.findOneAndUpdate(
      { address },
      { nonce, expiresAt },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      nonce,
      message: WalletAuthService.buildMessage(nonce),
      expiresAt,
    });
  } catch (error) {
    console.error("Nonce generation error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * POST /wallets/add
 * Body: { address: string, signature: `0x${string}`, nonce: string }
 * Headers: Authorization: Bearer <token>
 *
 * Verifies the signed message using viem, then links the wallet to the authenticated user.
 */
export const addWallet = async (req: Request, res: Response): Promise<void> => {
  try {
    // Note: Assuming there is an auth middleware that sets req.user
    const userId = (req as any).user?.id || (req as any).user?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized. Please log in first." });
      return;
    }

    const { address, signature, nonce } = req.body;

    // 1. Basic validation
    if (!address || !signature || !nonce) {
      res.status(400).json({ success: false, message: "address, signature and nonce are required" });
      return;
    }

    if (typeof signature !== "string" || !signature.startsWith("0x")) {
      res.status(400).json({ success: false, message: "Signature must be a 0x-prefixed hex string" });
      return;
    }

    // 2. Validate address format
    if (!WalletAuthService.isValidAddress(address)) {
      res.status(400).json({ success: false, message: "Invalid EVM wallet address" });
      return;
    }

    // 3. Check nonce exists and hasn't expired
    const nonceRecord = await Nonce.findOne({ address });

    if (!nonceRecord) {
      res.status(401).json({ success: false, message: "Nonce not found — request a new one" });
      return;
    }

    if (nonceRecord.nonce !== nonce) {
      res.status(401).json({ success: false, message: "Nonce mismatch" });
      return;
    }

    if (new Date() > nonceRecord.expiresAt) {
      await Nonce.deleteOne({ address });
      res.status(401).json({ success: false, message: "Nonce expired — request a new one" });
      return;
    }

    // 4. Verify the EVM signature asynchronously via viem
    const verification = await WalletAuthService.verifySignature({
      address,
      signature: signature as `0x${string}`,
      nonce,
    });

    if (!verification.success) {
      res.status(401).json({ success: false, message: verification.error });
      return;
    }

    // 5. Delete the nonce — one-time use only (prevents replay attacks)
    await Nonce.deleteOne({ address });

    // 6. Check if this wallet is already linked to any user globally
    const existingWallet = await WalletAuth.findOne({ address });

    if (existingWallet) {
      res.status(400).json({ success: false, message: "This wallet is already linked to an account." });
      return;
    }

    // 7. Validations passed, link the wallet to the current user
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    const isPrimary = user.wallets.length === 0;

    // Create wallet auth record
    await WalletAuth.create({
      userId: user._id,
      address: verification.address, // use checksummed address from viem
      isPrimary,
    });

    // Add to user's local wallets array
    user.wallets.push({
      address: verification.address!,
      isPrimary,
      linkedAt: new Date(),
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Wallet linked successfully",
      wallet: {
        address: verification.address,
        isPrimary,
      },
    });

  } catch (error) {
    console.error("Wallet add error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
