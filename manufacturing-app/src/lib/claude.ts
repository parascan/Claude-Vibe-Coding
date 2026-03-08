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

export async function analyzeManufacturing(input: {
  text?: string;
  imageBase64?: string;
  imageMimeType?: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
}): Promise<ManufacturingAnalysis> {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }

  return response.json() as Promise<ManufacturingAnalysis>;
}
