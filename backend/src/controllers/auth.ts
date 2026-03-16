import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import GoogleAuthService from "../services/googleAuth";

import { User } from "../models/user";
import { GoogleAuth } from "../models/googleAuth";


const signToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any,
  });
};

/**
 * POST /auth/google
 * Body: { idToken: string }
 *
 * Handles both sign-up and sign-in with Google.
 * If user doesn't exist, creates a new account using Google profile data.
 */
export const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({ success: false, message: "Google ID token is required" });
      return;
    }

    // 1. Verify the token with Google
    const googleResult = await GoogleAuthService.verifySignInToken(idToken);

    if (!googleResult.success || !googleResult.data) {
      res.status(401).json({ success: false, message: googleResult.error || "Invalid Google token" });
      return;
    }

    const { googleId, email, name, givenName, picture } = googleResult.data;

    // 2. Check if this Google account is already linked
    let googleAuthRecord = await GoogleAuth.findOne({ googleId });

    // 3a. Existing Google user — just log them in
    if (googleAuthRecord) {
      const user = await User.findById(googleAuthRecord.userId);

      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }

      // Update last active
      user.lastActive = new Date();
      await user.save();

      const token = signToken(user._id.toString());

      res.status(200).json({
        success: true,
        message: "Logged in with Google",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          username: user.username,
          totalXP: user.totalXP,
          level: user.level,
          role: user.role,
        },
      });
      return;
    }

    // 3b. Google account not linked — check if user exists by email
    let user = await User.findOne({ email });

    if (!user) {
      // 4. No user at all — create a brand new one from Google data
      user = await User.create({
        email,
        name,
        // Build a default username from their first name + random suffix
        username: `${givenName.toLowerCase().replace(/\s+/g, "")}_${Math.random().toString(36).slice(2, 7)}`,
        avatar: picture,
        lastActive: new Date(),
      });
    }

    // 5. Link the Google account to this user (new or existing)
    await GoogleAuth.create({
      userId: user._id,
      googleId,
      email,
    });

    const token = signToken(user._id.toString());

    res.status(201).json({
      success: true,
      message: user ? "Google account linked and logged in" : "Account created with Google",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        username: user.username,
        totalXP: user.totalXP,
        level: user.level,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
