import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || "5050";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "AutoPilot API",
            version: "1.0.0",
            description: "AutoPilot — Decentralized AI Agent working for you on the Celo blockchain.",
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api/v1`,
                description: "Local Development Server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                // ── Auth ───────────────────────────────────────────────────────
                GoogleAuthRequest: {
                    type: "object",
                    required: ["idToken"],
                    properties: {
                        idToken: {
                            type: "string",
                            description: "Google ID token from the Google sign-in flow",
                            example: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ii...",
                        },
                    },
                },
                UserProfile: {
                    type: "object",
                    properties: {
                        id:       { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
                        name:     { type: "string", example: "Myles Johnson" },
                        email:    { type: "string", format: "email", example: "myles@example.com" },
                        avatar:   { type: "string", nullable: true, example: "https://lh3.googleusercontent.com/..." },
                        username: { type: "string", nullable: true, example: "myles_j4k2m" },
                        totalXP:  { type: "integer", example: 0 },
                        level:    { type: "integer", example: 1 },
                        role:     { type: "string", enum: ["user", "admin"], example: "user" },
                    },
                },
                AuthResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Logged in with Google" },
                        token:   { type: "string", description: "JWT — pass as Bearer token on protected routes" },
                        user:    { $ref: "#/components/schemas/UserProfile" },
                    },
                },

                // ── Wallets ────────────────────────────────────────────────────
                NonceRequest: {
                    type: "object",
                    required: ["address"],
                    properties: {
                        address: {
                            type: "string",
                            description: "EVM wallet address (checksummed or lowercase)",
                            example: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                        },
                    },
                },
                NonceResponse: {
                    type: "object",
                    properties: {
                        success:   { type: "boolean", example: true },
                        nonce:     { type: "string", example: "1710598412345-x7k2m9pq3" },
                        message:   { type: "string", example: "Sign in to AutoPilot Wallet\nNonce: 1710598412345-x7k2m9pq3" },
                        expiresAt: { type: "string", format: "date-time", example: "2026-03-16T16:30:00.000Z" },
                    },
                },
                AddWalletRequest: {
                    type: "object",
                    required: ["address", "signature", "nonce"],
                    properties: {
                        address:   { type: "string", example: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
                        signature: { type: "string", description: "0x-prefixed hex signature from personal_sign", example: "0x4a5b6c..." },
                        nonce:     { type: "string", example: "1710598412345-x7k2m9pq3" },
                    },
                },
                AddWalletResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Wallet linked successfully" },
                        wallet: {
                            type: "object",
                            properties: {
                                address:   { type: "string", example: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
                                isPrimary: { type: "boolean", example: true },
                            },
                        },
                    },
                },

                // ── Agent ──────────────────────────────────────────────────────
                FeasibilityRequest: {
                    type: "object",
                    required: ["walletAddress", "goalCategory", "targetAmount", "targetDate", "weeklyContrib", "safetyFloor", "riskLevel"],
                    properties: {
                        walletAddress:   { type: "string", example: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
                        goalCategory:    { type: "string", example: "Emergency Fund" },
                        goalDescription: { type: "string", nullable: true, example: "6 months of living expenses" },
                        targetAmount:    { type: "number", example: 3000, description: "Target amount in cUSD" },
                        targetDate:      { type: "string", format: "date", example: "2026-12-31" },
                        weeklyContrib:   { type: "number", example: 50, description: "Weekly contribution in cUSD" },
                        safetyFloor:     { type: "number", example: 200, description: "Kept liquid — never invested" },
                        riskLevel:       { type: "string", enum: ["safe", "balanced", "growth"], example: "balanced" },
                    },
                },
                Alternative: {
                    type: "object",
                    properties: {
                        label:          { type: "string", example: "Extend your timeline" },
                        description:    { type: "string", example: "At $50/week you'd hit your goal by September 2027." },
                        adjustedAmount: { type: "number", nullable: true },
                        adjustedWeekly: { type: "number", nullable: true },
                        adjustedDate:   { type: "string", nullable: true, example: "September 2027" },
                        projectedTotal: { type: "number", example: 3000 },
                    },
                },
                FeasibilityResult: {
                    type: "object",
                    properties: {
                        achievable:     { type: "boolean", example: false },
                        summary:        { type: "string", example: "⚠ You may need to adjust — at $50/week you'll reach $2,340 by December 2026." },
                        projectedDate:  { type: "string", nullable: true, example: "August 2026" },
                        weeklyRequired: { type: "number", nullable: true, example: 65 },
                        strategy:       { type: "string", example: "65% in Aave V3 and 35% in Uniswap V4 stable LP." },
                        alternatives: {
                            type: "array",
                            nullable: true,
                            items: { $ref: "#/components/schemas/Alternative" },
                        },
                    },
                },
                FeasibilityResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        data:    { $ref: "#/components/schemas/FeasibilityResult" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpecs = swaggerJSDoc(options);

export default swaggerSpecs;

