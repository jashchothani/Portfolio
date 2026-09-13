import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { healthRouter } from "./routes/health.js";
import { chatRouter } from "./routes/chat.js";
import { contactRouter } from "./routes/contact.js";
import { globalRateLimiter } from "./middleware/rateLimiter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  // Render and other reverse-proxy hosts sit in front of the app; trust the
  // first proxy hop so req.ip / rate limiting see the real client IP.
  app.set("trust proxy", 1);

  // Normalize duplicate slashes in URL path (e.g. //api/contact -> /api/contact)
  app.use((req, _res, next) => {
    if (req.url.startsWith("//")) {
      req.url = req.url.replace(/^\/+/, "/");
    }
    next();
  });

  app.use(
    helmet({
      contentSecurityPolicy: false, // this API serves JSON/SSE only, no HTML to protect
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // Normalize configured frontend URLs (support comma-separated origins, strip trailing slashes)
  const configuredOrigins = (env.FRONTEND_URL || "")
    .split(",")
    .map((o) => o.trim().replace(/\/+$/, ""))
    .filter(Boolean);

  app.use(
    cors({
      origin(origin, callback) {
        // Allow non-browser tools (curl, health checks, uptime monitors) with no Origin header
        if (!origin) {
          return callback(null, true);
        }

        const normalized = origin.replace(/\/+$/, "");

        // 1. Direct match in configured origins
        if (configuredOrigins.includes(normalized)) {
          return callback(null, true);
        }

        // 2. Allow any *.vercel.app deployment preview or production domain
        if (/^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*\.vercel\.app$/.test(normalized)) {
          return callback(null, true);
        }

        // 3. Localhost in non-production
        if (!env.isProduction && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalized)) {
          return callback(null, true);
        }

        callback(new Error(`Not allowed by CORS: ${origin}`));
      },
      methods: ["GET", "POST", "OPTIONS"],
      credentials: true,
    })
  );

  app.use(express.json({ limit: "32kb" }));
  app.use(globalRateLimiter);

  app.get("/", (_req, res) => {
    res.status(200).json({ name: "Jash Chothani Portfolio API", status: "running" });
  });

  app.use("/api/health", healthRouter);
  app.use("/api/chat", chatRouter);
  app.use("/api/contact", contactRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
