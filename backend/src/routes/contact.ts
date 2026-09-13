import { Router } from "express";
import { postContact } from "../controllers/contactController.js";
import { validateBody, contactBodySchema } from "../middleware/validate.js";
import { contactRateLimiter } from "../middleware/rateLimiter.js";

export const contactRouter = Router();

contactRouter.post("/", contactRateLimiter, validateBody(contactBodySchema), postContact);
