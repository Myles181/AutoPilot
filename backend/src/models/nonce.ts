import mongoose, { Document, Schema } from "mongoose";

export interface INonce extends Document {
  address: string;
  nonce: string;
  expiresAt: Date;
  createdAt: Date;
}

const NonceSchema = new Schema<INonce>(
  {
    address: { type: String, required: true, unique: true },
    nonce: { type: String, required: true },
    // Auto-delete from MongoDB after expiry (TTL index)
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// MongoDB will automatically delete the document after expiresAt
NonceSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
NonceSchema.index({ address: 1 });

export const Nonce = mongoose.model<INonce>("Nonce", NonceSchema);