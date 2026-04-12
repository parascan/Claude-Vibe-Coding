import { describe, it, expect } from "vitest";
import { generateWorkout } from "./generator";

describe("generateWorkout", () => {
  it("returns the correct totalMinutes", () => {
    const workout = generateWorkout(20);
    expect(workout.totalMinutes).toBe(20);
  });

  it("uses 1 round for short sessions (≤15 min)", () => {
    const workout = generateWorkout(15);
    expect(workout.rounds).toBe(1);
  });

  it("uses 2 rounds for medium sessions (16–40 min)", () => {
    const workout = generateWorkout(30);
    expect(workout.rounds).toBe(2);
  });

  it("uses 3 rounds for long sessions (>40 min)", () => {
    const workout = generateWorkout(45);
    expect(workout.rounds).toBe(3);
  });

  it("generates at least 3 stations", () => {
    const workout = generateWorkout(10);
    expect(workout.stations.length).toBeGreaterThanOrEqual(3);
  });

  it("generates no more than 15 stations", () => {
    const workout = generateWorkout(60);
    expect(workout.stations.length).toBeLessThanOrEqual(15);
  });

  it("numbers stations starting from 1", () => {
    const workout = generateWorkout(20);
    workout.stations.forEach((s, i) => {
      expect(s.stationNumber).toBe(i + 1);
    });
  });

  it("produces no duplicate exercises in a single workout", () => {
    const workout = generateWorkout(45);
    const ids = workout.stations.map((s) => s.exercise.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("estimates calories > 0", () => {
    const workout = generateWorkout(20);
    expect(workout.estimatedCalories).toBeGreaterThan(0);
  });

  it("has standard work/rest timing", () => {
    const workout = generateWorkout(20);
    expect(workout.workSeconds).toBe(60);
    expect(workout.restSeconds).toBe(15);
    expect(workout.transitionSeconds).toBe(15);
  });
});

describe("generateWorkout — Beach Muscles focus", () => {
  it("sets the correct label", () => {
    const workout = generateWorkout(20, ["chest", "arms", "core"]);
    expect(workout.label).toBe("Beach Muscles Circuit");
  });

  it("generates mostly chest, arms, or core exercises", () => {
    const workout = generateWorkout(30, ["chest", "arms", "core"]);
    const beachMuscles = ["chest", "arms", "core"];
    const beachCount = workout.stations.filter((s) =>
      s.exercise.muscles.some((m) => beachMuscles.includes(m))
    ).length;
    // At least 70% of stations should target beach muscles
    expect(beachCount / workout.stations.length).toBeGreaterThanOrEqual(0.7);
  });

  it("does not include pure leg exercises", () => {
    const workout = generateWorkout(30, ["chest", "arms", "core"]);
    const legOnlyExercises = workout.stations.filter(
      (s) => s.exercise.muscles[0] === "legs" || s.exercise.muscles[0] === "glutes"
    );
    expect(legOnlyExercises.length).toBe(0);
  });
});

describe("generateWorkout — Legs Day focus", () => {
  it("sets the correct label", () => {
    const workout = generateWorkout(20, ["legs", "glutes"]);
    expect(workout.label).toBe("Legs Day Circuit");
  });

  it("generates mostly leg or glute exercises", () => {
    const workout = generateWorkout(30, ["legs", "glutes"]);
    const legMuscles = ["legs", "glutes"];
    const legCount = workout.stations.filter((s) =>
      s.exercise.muscles.some((m) => legMuscles.includes(m))
    ).length;
    // At least 70% should target legs/glutes
    expect(legCount / workout.stations.length).toBeGreaterThanOrEqual(0.7);
  });

  it("does not include pure chest or arm isolation exercises", () => {
    const workout = generateWorkout(30, ["legs", "glutes"]);
    const upperIsolation = workout.stations.filter(
      (s) =>
        s.exercise.muscles[0] === "chest" || s.exercise.muscles[0] === "arms"
    );
    expect(upperIsolation.length).toBe(0);
  });
});

describe("generateWorkout — Pull Day focus", () => {
  it("sets the correct label", () => {
    const workout = generateWorkout(20, ["back", "arms"]);
    expect(workout.label).toBe("Pull Day Circuit");
  });

  it("stores focusGroups on the workout object", () => {
    const workout = generateWorkout(20, ["back", "arms"]);
    expect(workout.focusGroups).toEqual(["back", "arms"]);
  });

  it("generates mostly back or arm exercises", () => {
    const workout = generateWorkout(30, ["back", "arms"]);
    const pullMuscles = ["back", "arms"];
    const pullCount = workout.stations.filter((s) =>
      s.exercise.muscles.some((m) => pullMuscles.includes(m))
    ).length;
    expect(pullCount / workout.stations.length).toBeGreaterThanOrEqual(0.7);
  });

  it("does not include leg or glute primary exercises", () => {
    const workout = generateWorkout(30, ["back", "arms"]);
    const lowerBody = workout.stations.filter(
      (s) =>
        s.exercise.muscles[0] === "legs" || s.exercise.muscles[0] === "glutes"
    );
    expect(lowerBody.length).toBe(0);
  });

  it("does not include chest primary exercises", () => {
    const workout = generateWorkout(30, ["back", "arms"]);
    const chestOnly = workout.stations.filter(
      (s) => s.exercise.muscles[0] === "chest"
    );
    expect(chestOnly.length).toBe(0);
  });
});
