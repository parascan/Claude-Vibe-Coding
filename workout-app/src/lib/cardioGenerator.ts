import { CARDIO_ACTIVITIES } from "../data/cardio";
import type { CardioActivity } from "../data/cardio";

export interface CardioInterval {
  label: string;
  minutes: number;
  description: string;
  type: "warmup" | "easy" | "moderate" | "hard" | "cooldown";
}

export interface CardioSession {
  activity: CardioActivity;
  totalMinutes: number;
  intervals: CardioInterval[];
  estimatedCalories: number;
}

function buildIntervals(
  activity: CardioActivity,
  minutes: number
): CardioInterval[] {
  const warmup = minutes <= 10 ? 2 : 3;
  const cooldown = minutes <= 10 ? 2 : 3;
  const main = minutes - warmup - cooldown;

  const intervals: CardioInterval[] = [
    {
      label: "Warm-up",
      minutes: warmup,
      description: activity.effort.easy,
      type: "warmup",
    },
  ];

  if (minutes <= 15) {
    // Short: simple HIIT — 30s hard / 30s easy rounds
    const rounds = Math.floor((main * 60) / 60); // each round = 1 min
    intervals.push({
      label: `HIIT × ${rounds} rounds`,
      minutes: main,
      description: `30 sec ${activity.effort.hard} → 30 sec ${activity.effort.easy}. Repeat ${rounds}×.`,
      type: "hard",
    });
  } else if (minutes <= 25) {
    // Medium: 2 interval blocks + steady finish
    const block = Math.floor(main / 3);
    const steady = main - block * 2;
    intervals.push(
      {
        label: "Interval block 1",
        minutes: block,
        description: `1 min ${activity.effort.hard} → 1 min ${activity.effort.easy}. Repeat.`,
        type: "hard",
      },
      {
        label: "Steady state",
        minutes: steady,
        description: activity.effort.moderate,
        type: "moderate",
      },
      {
        label: "Interval block 2",
        minutes: block,
        description: `1 min ${activity.effort.hard} → 1 min ${activity.effort.easy}. Repeat.`,
        type: "hard",
      }
    );
  } else if (minutes <= 35) {
    // Longer: steady with a tempo surge in the middle
    const thirds = Math.floor(main / 3);
    intervals.push(
      {
        label: "Build",
        minutes: thirds,
        description: activity.effort.easy,
        type: "easy",
      },
      {
        label: "Tempo effort",
        minutes: thirds + (main % 3),
        description: `${activity.effort.moderate} — hold this pace the whole block.`,
        type: "moderate",
      },
      {
        label: "Strong finish",
        minutes: thirds,
        description: `${activity.effort.hard} — push to the end.`,
        type: "hard",
      }
    );
  } else {
    // Long: fartlek — steady with surges
    const base = Math.floor(main * 0.4);
    const surges = Math.floor(main * 0.4);
    const finish = main - base - surges;
    intervals.push(
      {
        label: "Base pace",
        minutes: base,
        description: activity.effort.easy,
        type: "easy",
      },
      {
        label: "Fartlek surges",
        minutes: surges,
        description: `Every 2 min: surge for 1 min at ${activity.effort.hard}, recover 1 min at ${activity.effort.easy}.`,
        type: "hard",
      },
      {
        label: "Steady cruise",
        minutes: finish,
        description: activity.effort.moderate,
        type: "moderate",
      }
    );
  }

  intervals.push({
    label: "Cool-down",
    minutes: cooldown,
    description: `${activity.effort.easy} — let your heart rate come down.`,
    type: "cooldown",
  });

  return intervals;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateCardioSessions(minutes: number): CardioSession[] {
  // Always show 1 road run, 1 Peloton ride, and 1 alternative activity
  const road = CARDIO_ACTIVITIES.filter((a) => a.equipment === "road");
  const peloton = CARDIO_ACTIVITIES.filter((a) => a.equipment === "peloton");
  const other = CARDIO_ACTIVITIES.filter((a) => a.equipment === "other");

  const picked = [pickRandom(road), pickRandom(peloton), pickRandom(other)];

  return picked.map((activity) => ({
    activity,
    totalMinutes: minutes,
    intervals: buildIntervals(activity, minutes),
    estimatedCalories: Math.round(activity.caloriesPerMin * minutes),
  }));
}
