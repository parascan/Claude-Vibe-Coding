import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SYSTEM_PROMPT = `You are an expert manufacturing engineer with decades of experience across injection molding, CNC machining, casting, forging, stamping, 3D printing, extrusion, welding, and thermoforming.

When given a description or image of a part or product, analyze and explain exactly how it is manufactured.

Respond with ONLY valid JSON matching this exact structure:
{
  "itemName": "string — name of the part/product",
  "primaryProcess": "string — human-readable process name (e.g. 'Injection Molding', 'CNC Milling')",
  "processId": "string — one of: injection-molding | cnc-milling | cnc-turning | 3d-printing | casting | stamping | forging | extrusion | welding | thermoforming | unknown",
  "material": "string — most likely material (e.g. 'ABS Plastic', 'Aluminum 6061', '304 Stainless Steel')",
  "whyThisProcess": "string — 1-2 sentences explaining why this process is chosen over alternatives",
  "steps": [
    {
      "step": 1,
      "title": "string — step name",
      "description": "string — what happens in this step (1-2 sentences)",
      "detail": "string — engineering detail, parameter, or pro tip for this step",
      "stepType": "string — one of: heat | press | cut | inject | cool | eject | finish | inspect | coat | weld | assemble | drill | form | clean | generic"
    }
  ],
  "keyFacts": ["string — cycle time, tolerance, tooling cost, production volume, etc. (4-6 facts)"],
  "alternatives": ["string — 2-4 alternative processes that could also make this part, with brief reason"]
}

Include 4-7 manufacturing steps. Be specific and technically accurate. Think about the actual tooling, fixtures, machines, and sequence used in real production.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, imageBase64, imageMimeType } = req.body as {
    text?: string;
    imageBase64?: string;
    imageMimeType?: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
  };

  if (!text && !imageBase64) {
    return res.status(400).json({ error: "Provide a description or image." });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY is not set on the server." });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  type ContentBlock =
    | { type: "text"; text: string }
    | {
        type: "image";
        source: {
          type: "base64";
          media_type: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
          data: string;
        };
      };

  const content: ContentBlock[] = [];

  if (imageBase64 && imageMimeType) {
    content.push({
      type: "image",
      source: { type: "base64", media_type: imageMimeType, data: imageBase64 },
    });
  }

  const userText =
    text || (imageBase64 ? "Analyze this part/product and explain how it is manufactured." : "");

  if (userText) {
    content.push({ type: "text", text: userText });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    });

    if (!response.content.length) {
      return res.status(500).json({ error: "Empty response from Claude API." });
    }
    const raw = response.content[0];
    if (raw.type !== "text") {
      return res.status(500).json({ error: "Unexpected response type." });
    }

    const jsonText = raw.text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    return res.status(200).json(JSON.parse(jsonText));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("analyze error:", err);
    return res.status(500).json({ error: message });
  }
}
