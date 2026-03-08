import Anthropic from "@anthropic-ai/sdk";

export type ProcessId =
  | "injection-molding"
  | "cnc-milling"
  | "cnc-turning"
  | "3d-printing"
  | "casting"
  | "stamping"
  | "forging"
  | "extrusion"
  | "welding"
  | "thermoforming"
  | "unknown";

export interface ManufacturingStep {
  step: number;
  title: string;
  description: string;
  detail: string;
}

export interface ManufacturingAnalysis {
  itemName: string;
  primaryProcess: string;
  processId: ProcessId;
  material: string;
  whyThisProcess: string;
  steps: ManufacturingStep[];
  keyFacts: string[];
  alternatives: string[];
}

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
      "detail": "string — engineering detail, parameter, or pro tip for this step"
    }
  ],
  "keyFacts": ["string — cycle time, tolerance, tooling cost, production volume, etc. (4-6 facts)"],
  "alternatives": ["string — 2-4 alternative processes that could also make this part, with brief reason"]
}

Include 4-7 manufacturing steps. Be specific and technically accurate. Think about the actual tooling, fixtures, machines, and sequence used in real production.`;

export async function analyzeManufacturing(input: {
  text?: string;
  imageBase64?: string;
  imageMimeType?: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
}): Promise<ManufacturingAnalysis> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;
  if (!apiKey) {
    throw new Error(
      "No API key found. Add VITE_ANTHROPIC_API_KEY to your .env file."
    );
  }

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

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

  if (input.imageBase64 && input.imageMimeType) {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: input.imageMimeType,
        data: input.imageBase64,
      },
    });
  }

  const userText =
    input.text ||
    (input.imageBase64
      ? "Analyze this part/product and explain how it is manufactured."
      : "");

  if (!userText && !input.imageBase64) {
    throw new Error("Provide a description or image.");
  }

  if (userText) {
    content.push({ type: "text", text: userText });
  }

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content }],
  });

  const raw = response.content[0];
  if (raw.type !== "text") throw new Error("Unexpected response type.");

  // Strip markdown fences if present
  const jsonText = raw.text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  return JSON.parse(jsonText) as ManufacturingAnalysis;
}
