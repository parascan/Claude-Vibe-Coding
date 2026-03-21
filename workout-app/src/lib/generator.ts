import { EXERCISES } from "../data/exercises";
import type { Exercise, MuscleGroup } from "../data/exercises";

export interface WorkoutStation {
  exercise: Exercise;
  stationNumber: number;
}

export interface Workout {
  stations: WorkoutStation[];
  totalMinutes: number;
  rounds: number;
  workSeconds: number;
  restSeconds: number;
  transitionSeconds: number;
  roundRestSeconds: number;
  estimatedCalories: number;
}

// How many stations fit in a given time budget
function calcStationCount(
  availableMinutes: number,
  workSec: number,
  restSec: number,
  transitionSec: number,
  rounds: number,
  roundRestSec: number
): number {
  // Binary search: find max stations S such that total time <= availableMinutes
  for (let s = 15; s >= 3; s--) {
    const perStation = workSec + restSec + transitionSec;
    const circuitTime = s * perStation;
    const total = rounds * circuitTime + (rounds - 1) * roundRestSec;
    if (total / 60 <= availableMinutes) return s;
  }
  return 3;
}

// Pick a balanced set of exercises covering different muscle groups
function selectExercises(count: number, includeCardio: boolean): Exercise[] {
  const pool = includeCardio
    ? EXERCISES
    : EXERCISES.filter((e) => !e.isCardio);

  // Ensure muscle group variety using a priority rotation
  const priorityGroups: MuscleGroup[] = [
    "legs",
    "back",
    "chest",
    "core",
    "shoulders",
    "glutes",
    "full-body",
    "arms",
  ];

  const selected: Exercise[] = [];
  const usedIds = new Set<string>();

  // First pass: one exercise per priority group
  for (const group of priorityGroups) {
    if (selected.length >= count) break;
    const candidates = pool.filter(
      (e) => e.muscles.includes(group) && !usedIds.has(e.id)
    );
    if (candidates.length === 0) continue;
    // Prefer cardio exercises in the mix (every ~3 stations)
    const pick =
      candidates.find(
        (e) => e.isCardio && selected.length % 3 === 2
      ) ?? candidates[Math.floor(Math.random() * candidates.length)];
    selected.push(pick);
    usedIds.add(pick.id);
  }

  // Second pass: fill remaining slots randomly
  const remaining = pool.filter((e) => !usedIds.has(e.id));
  let idx = 0;
  while (selected.length < count && idx < remaining.length) {
    selected.push(remaining[idx]);
    idx++;
  }

  // Reorder so no two adjacent exercises share a primary muscle group
  return spreadExercises(selected);
}

// Greedy reorder: minimise muscle-group overlap between consecutive exercises
function spreadExercises(exercises: Exercise[]): Exercise[] {
  const result: Exercise[] = [];
  const remaining = [...exercises];

  while (remaining.length > 0) {
    const lastMuscles = result.length > 0 ? result[result.length - 1].muscles : [];
    let bestIdx = 0;
    let bestOverlap = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const overlap = remaining[i].muscles.filter((m) =>
        lastMuscles.includes(m)
      ).length;
      if (overlap < bestOverlap) {
        bestOverlap = overlap;
        bestIdx = i;
      }
    }
    result.push(remaining[bestIdx]);
    remaining.splice(bestIdx, 1);
  }

  return result;
}

export function generateWorkout(availableMinutes: number): Workout {
  // Adjust intensity settings based on time
  let rounds: number;
  let workSec: number;
  let restSec: number;
  const transitionSec = 15;
  const roundRestSec = 120; // 2 min between rounds

  if (availableMinutes <= 15) {
    rounds = 1;
    workSec = 60;
    restSec = 15;
  } else if (availableMinutes <= 25) {
    rounds = 2;
    workSec = 60;
    restSec = 15;
  } else if (availableMinutes <= 40) {
    rounds = 2;
    workSec = 60;
    restSec = 15;
  } else {
    rounds = 3;
    workSec = 60;
    restSec = 15;
  }

  const stationCount = calcStationCount(
    availableMinutes,
    workSec,
    restSec,
    transitionSec,
    rounds,
    roundRestSec
  );

  const includeCardio = availableMinutes >= 10;
  const exercises = selectExercises(stationCount, includeCardio);

  const stations: WorkoutStation[] = exercises.map((exercise, i) => ({
    exercise,
    stationNumber: i + 1,
  }));

  // Rough calorie estimate: ~8 cal/min for circuit training at moderate intensity
  const estimatedCalories = Math.round(availableMinutes * 8);

  return {
    stations,
    totalMinutes: availableMinutes,
    rounds,
    workSeconds: workSec,
    restSeconds: restSec,
    transitionSeconds: transitionSec,
    roundRestSeconds: roundRestSec,
    estimatedCalories,
  };
}
