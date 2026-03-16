import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username?: string;
  email?: string;
  name?: string;
  bio?: string;
  avatar?: string;

  language: "en" | "pt-br" | "es";
  theme: "light" | "dark";
  isPublic: boolean;

  wallets: {
    address: string;
    isPrimary: boolean;
    linkedAt: Date;
  }[];

  lastActive: Date;
  totalXP: number;
  level: number;
  role: string;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, unique: true, sparse: true, trim: true },
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    name: { type: String, trim: true },
    bio: { type: String },
    avatar: { type: String },

    // Preferences
    language: { type: String, enum: ["en", "pt-br", "es"], default: "en" },
    theme: { type: String, enum: ["light", "dark"], default: "dark" },
    isPublic: { type: Boolean, default: true },

    wallets: [{
      address: { type: String, required: true },
      isPrimary: { type: Boolean, default: false },
      linkedAt: { type: Date, default: Date.now },
    }],

    lastActive: { type: Date, default: Date.now },
    totalXP: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

export const User = mongoose.model<IUser>("User", UserSchema);