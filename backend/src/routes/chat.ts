import { Router } from "express";
import { postChat } from "../controllers/chatController.js";
import { validateBody, chatBodySchema } from "../middleware/validate.js";
import { chatRateLimiter } from "../middleware/rateLimiter.js";

export const chatRouter = Router();

chatRouter.post("/", chatRateLimiter, validateBody(chatBodySchema), postChat);
