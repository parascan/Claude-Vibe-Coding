const STORAGE_KEY = "workout-weight-log";

type WeightLog = Record<string, string>; // exerciseId → last weight used

function load(): WeightLog {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function getLastWeight(exerciseId: string): string | null {
  return load()[exerciseId] ?? null;
}

export function saveWeight(exerciseId: string, weight: string): void {
  const log = load();
  log[exerciseId] = weight;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}
