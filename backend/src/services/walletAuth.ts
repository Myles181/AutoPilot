// src/auth/walletAuthService.ts
import { verifyMessage, getAddress } from "viem";
import { createThirdwebClient } from "thirdweb";

interface WalletVerifyParams {
  address: string;
  signature: `0x${string}`;
  nonce: string;
}

interface WalletVerifyResponse {
  success: boolean;
  address?: string;
  error?: string;
}

class WalletAuthService {
  /**
   * Build the sign-in message
   * Must match exactly what the frontend encodes
   */
  buildMessage(nonce: string): string {
    return `Sign in to AutoPilot Wallet\nNonce: ${nonce}`;
  }

  /**
   * Validate EVM address checksum
   */
  isValidAddress(address: string): boolean {
    try {
      getAddress(address); // viem checksums + validates
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify an EVM wallet signature using secp256k1
   * Works with MiniPay, MetaMask, WalletConnect — any EVM wallet
   *
   * @param address   - 0x EVM wallet address
   * @param signature - 0x signature from personal_sign
   * @param nonce     - raw nonce string used to build the message
   */
  async verifySignature({
    address,
    signature,
    nonce,
  }: WalletVerifyParams): Promise<WalletVerifyResponse> {
    try {
      // 1. Validate address format
      if (!this.isValidAddress(address)) {
        return { success: false, error: "Invalid EVM address" };
      }

      // 2. Reconstruct the message exactly as frontend built it
      const message = this.buildMessage(nonce);

      // 3. Recover signer address from signature
      const isValid = await verifyMessage({
        address: getAddress(address),
        message,
        signature,
      });

      if (!isValid) {
        return { success: false, error: "Signature verification failed" };
      }

      return { success: true, address: getAddress(address) };
    } catch (error) {
      console.error("Wallet signature verification error:", error);
      return { success: false, error: "Failed to verify wallet signature" };
    }
  }

  /**
   * Generate a cryptographically random nonce
   * Store this in your DB per session before sending to frontend
   */
  generateNonce(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }
}

export default new WalletAuthService();