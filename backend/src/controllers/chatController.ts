import type { Request, Response, NextFunction } from "express";
import { buildSystemPrompt } from "../services/systemPrompt.js";
import { streamNimChatCompletion, ChatMessage } from "../services/nvidiaNim.js";

const MAX_HISTORY_MESSAGES = 10;

export async function postChat(req: Request, res: Response, next: NextFunction) {
  try {
    const { messages } = req.body as { messages: { role: "user" | "assistant"; content: string }[] };

    const trimmedHistory = messages.slice(-MAX_HISTORY_MESSAGES);

    const fullMessages: ChatMessage[] = [
      { role: "system", content: buildSystemPrompt() },
      ...trimmedHistory,
    ];

    const upstream = await streamNimChatCompletion(fullMessages);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    const reader = upstream.body!.getReader();

    req.on("close", () => {
      reader.cancel().catch(() => {});
    });

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }

    res.end();
  } catch (err) {
    if (!res.headersSent) {
      next(err);
      return;
    }
    // Stream had already started — close it out gracefully.
    console.error("[chat stream error]", err);
    res.end();
  }
}
