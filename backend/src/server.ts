import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
import swaggerSpecs from "./swagger";
import authRoutes from "./routes/auth";
import walletRoutes from "./routes/wallet";
import agentRoutes from "./routes/agent";

dotenv.config();

// Utils
const errorResponse = (
  res: Response,
  message: string,
  statusCode: number
): Response => {
  return res.status(statusCode).json({ success: false, message });
};

const app = express();

const environment: string = process.env.NODE_ENV || "production";
const isDevelopment: boolean = environment === "development";

// Set default port if not provided
const PORT: number = parseInt(process.env.PORT || "5050", 10);

// Tell Express we are behind a proxy (Cloudflare)
app.set("trust proxy", true);

// Middleware
app.use(express.json());

// NoSQL Injection protection — sanitize req.body only (req.query is read-only in this router version)
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  next();
});

// CORS
app.use(cors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err && err.message === "Not allowed by CORS") {
    return errorResponse(res, "Origin not allowed by CORS", 403);
  }
  return next(err);
});

// Configure CSP with Helmet
// In production: strict CSP without unsafe-inline
// In development: allow unsafe-inline for Swagger UI compatibility
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": [
          "'self'",
          ...(isDevelopment ? ["'unsafe-inline'"] : []),
        ],
        "style-src": [
          "'self'",
          ...(isDevelopment ? ["'unsafe-inline'"] : []),
        ],
        "img-src": ["'self'", "data:", "https:"],
        "connect-src": ["'self'", "https:", "wss:"],
        "font-src": ["'self'", "https:", "data:"],
        "object-src": ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

if (!isDevelopment) {
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    })
  );
}

app.use(morgan("dev"));

// Serve static files from public directory
app.use(express.static("public"));

// Routes

// Swagger UI (available in all environments)
if (isDevelopment) {
  app.use(
    "/api/v1/autopilot/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "AutoPilot API Documentation",
    })
  );
}

// Routes
const API_BASE = "/api/v1/autopilot";

app.use(`${API_BASE}/auth`, authRoutes);
app.use(`${API_BASE}/wallets`, walletRoutes);
app.use(`${API_BASE}/agent`, agentRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "AutoPilot API - Decentralized AI Agent working for you",
    documentation: isDevelopment
      ? `Visit /api/v1/autopilot/api-docs for API documentation`
      : "API documentation available in development mode",
  });
});

// MongoDB connection with retry logic
const connectDB = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
    });

    console.log("✅ MongoDB connected successfully");

    // Seed achievement types (upsert — safe to run every startup)
    // await seedAchievementTypes();

    // Only register these AFTER successful connection
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected.");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB reconnected");
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

// Bootstrap
const bootstrap = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Auto pilot API running on port ${PORT}`);
    console.log(`🌐 Environment: ${environment}`);
    if (isDevelopment) {
      console.log(
        `📚 API Docs: http://localhost:${PORT}/api/v1/autopilot/api-docs`
      );
    }
  });
};

bootstrap();

export default app;