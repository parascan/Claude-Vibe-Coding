import { describe, it, expect } from "vitest";
import { generateCardioSessions } from "./cardioGenerator";

describe("generateCardioSessions", () => {
  it("returns exactly 3 sessions", () => {
    const sessions = generateCardioSessions(30);
    expect(sessions).toHaveLength(3);
  });

  it("each session has the correct totalMinutes", () => {
    const sessions = generateCardioSessions(25);
    sessions.forEach((s) => {
      expect(s.totalMinutes).toBe(25);
    });
  });

  it("each session has at least 3 intervals (warmup, main, cooldown)", () => {
    const sessions = generateCardioSessions(20);
    sessions.forEach((s) => {
      expect(s.intervals.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("first interval is always a warmup", () => {
    const sessions = generateCardioSessions(30);
    sessions.forEach((s) => {
      expect(s.intervals[0].type).toBe("warmup");
    });
  });

  it("last interval is always a cooldown", () => {
    const sessions = generateCardioSessions(30);
    sessions.forEach((s) => {
      const last = s.intervals[s.intervals.length - 1];
      expect(last.type).toBe("cooldown");
    });
  });

  it("interval minutes sum to totalMinutes", () => {
    const sessions = generateCardioSessions(20);
    sessions.forEach((s) => {
      const total = s.intervals.reduce((acc, i) => acc + i.minutes, 0);
      expect(total).toBe(s.totalMinutes);
    });
  });

  it("estimates calories > 0", () => {
    const sessions = generateCardioSessions(20);
    sessions.forEach((s) => {
      expect(s.estimatedCalories).toBeGreaterThan(0);
    });
  });

  it("includes at least one road and one Peloton activity across 3 sessions", () => {
    // Run several times since it's random — at least one combo includes both
    let hasRoad = false;
    let hasPeloton = false;
    for (let i = 0; i < 20; i++) {
      const sessions = generateCardioSessions(30);
      if (sessions.some((s) => s.activity.equipment === "road")) hasRoad = true;
      if (sessions.some((s) => s.activity.equipment === "peloton"))
        hasPeloton = true;
      if (hasRoad && hasPeloton) break;
    }
    expect(hasRoad).toBe(true);
    expect(hasPeloton).toBe(true);
  });
});
