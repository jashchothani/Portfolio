import dotenv from "dotenv";
dotenv.config({ override: true });
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5000),
  NVIDIA_NIM_API_KEY: z.string().min(1, "NVIDIA_NIM_API_KEY is required"),
  NVIDIA_NIM_BASE_URL: z.string().url().default("https://integrate.api.nvidia.com/v1"),
  NVIDIA_NIM_MODEL: z.string().default("meta/llama-3.2-11b-vision-instruct"),
  FRONTEND_URL: z.string().default("https://jashchothani.vercel.app"),
  // Email (contact form) — SMTP or Resend
  RESEND_API_KEY: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  CONTACT_FROM_EMAIL: z.string().optional(),
  // SMTP settings
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_SECURE: z.coerce.boolean().optional(),
  SMTP_SERVICE: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  // Fail fast in production; allow local dev to continue with a warning
  // so `npm run dev` still starts (e.g. before the API key is added).
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 5000),
  NVIDIA_NIM_API_KEY: process.env.NVIDIA_NIM_API_KEY ?? "",
  NVIDIA_NIM_BASE_URL:
    process.env.NVIDIA_NIM_BASE_URL ?? "https://integrate.api.nvidia.com/v1",
  NVIDIA_NIM_MODEL: process.env.NVIDIA_NIM_MODEL ?? "meta/llama-3.2-11b-vision-instruct",
  FRONTEND_URL: process.env.FRONTEND_URL ?? "https://jashchothani.vercel.app",
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || "jashthakkar77@gmail.com",
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL || "Jash Chothani <onboarding@resend.dev>",
  // SMTP settings
  SMTP_HOST: process.env.SMTP_HOST ?? (process.env.SMTP_SERVICE ? undefined : "smtp.gmail.com"),
  SMTP_PORT: Number(process.env.SMTP_PORT ?? 587),
  SMTP_SECURE: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
  SMTP_SERVICE: process.env.SMTP_SERVICE || "gmail",
  SMTP_USER: process.env.SMTP_USER || "jashthakkar77@gmail.com",
  SMTP_PASS: (process.env.SMTP_PASS || "lxnsmoexuvcmlpcf").replace(/\s+/g, ""),
  SMTP_FROM: process.env.SMTP_FROM || "Jash Chothani <jashthakkar77@gmail.com>",
  isProduction: process.env.NODE_ENV === "production",
};
