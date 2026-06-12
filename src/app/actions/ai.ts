"use server";

import { z } from "zod";

const messageSchema = z.array(z.object({
  role: z.enum(["user", "model"]),
  content: z.string().max(2000), // sanitize input size
}));

export async function chatWithAI(rawMessages: unknown) {
  const parsed = messageSchema.safeParse(rawMessages);
  if (!parsed.success) {
    throw new Error("Invalid messages data: " + parsed.error.message);
  }
  const messages = parsed.data;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return "AI Advisor is currently in offline mode (Missing API Key). But I can tell you that reducing meat consumption and flying less are great ways to start!";
  }

  try {
    const systemInstruction =
      "You are CarbonIQ Climate Advisor, an expert AI assistant helping users understand and reduce their carbon footprint. You are friendly, concise, and data-driven. You help users analyze their lifestyle habits (transportation, diet, energy use, shopping) and provide actionable recommendations to lower their environmental impact. Keep responses under 150 words and be encouraging.";

    const groqMessages = [
      { role: "system", content: systemInstruction },
      ...messages.map((m) => ({
        role: m.role === "model" ? ("assistant" as const) : ("user" as const),
        content: m.content,
      })),
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData?.error?.message || `HTTP ${response.status}`;
      throw new Error(errMsg);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error("Empty response from Groq API");
    }

    return reply;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Groq Error:", message);

    // Surface a more helpful error for API key / model issues
    if (message.includes("API_KEY_INVALID") || message.includes("401") || message.includes("invalid_api_key")) {
      return "⚠️ The Groq API key is invalid. Please update GROQ_API_KEY in your .env.local file with a valid key from https://console.groq.com/keys";
    }
    if (message.includes("429") || message.includes("Quota exceeded") || message.includes("rate_limit_exceeded")) {
      return "⏳ I'm a bit overloaded right now — the Groq API quota has been reached. Please wait a minute and try again.";
    }
    if (message.includes("404") || message.includes("not found")) {
      return "⚠️ The AI model is unavailable. Please check your API configuration and try again.";
    }
    return `⚠️ AI error: ${message}`;
  }
}
