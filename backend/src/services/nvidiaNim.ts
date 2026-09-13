import { env } from "../config/env.js";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Calls the NVIDIA NIM chat completions endpoint (OpenAI-compatible) with
 * streaming enabled and returns the raw fetch Response so the caller can
 * pipe the Server-Sent Events stream straight through to the client.
 *
 * The API key is read from the environment and never leaves the server.
 */
export async function streamNimChatCompletion(messages: ChatMessage[]): Promise<Response> {
  const url = `${env.NVIDIA_NIM_BASE_URL.replace(/\/$/, "")}/chat/completions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.NVIDIA_NIM_API_KEY}`,
      Accept: "text/event-stream",
    },
    body: JSON.stringify({
      model: env.NVIDIA_NIM_MODEL,
      messages,
      stream: true,
      temperature: 0.6,
      max_tokens: 512,
    }),
  });

  if (!response.ok || !response.body) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `NVIDIA NIM request failed (${response.status}): ${text || response.statusText}`
    );
  }

  return response;
}
