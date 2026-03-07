export interface CardioActivity {
  id: string;
  name: string;
  emoji: string;
  equipment: "road" | "peloton";
  tagline: string;
  caloriesPerMin: number;
  tip: string;
  effort: {
    easy: string;
    moderate: string;
    hard: string;
  };
}

export const CARDIO_ACTIVITIES: CardioActivity[] = [
  // ── Road options ──────────────────────────────────────────────────────────
  {
    id: "easy-run",
    name: "Easy Run",
    emoji: "🏃",
    equipment: "road",
    tagline: "Conversational pace — builds your aerobic base",
    caloriesPerMin: 10,
    tip: "You should be able to hold a full conversation. If you're gasping, slow down. Most of your runs should feel this way.",
    effort: {
      easy: "Very comfortable jog, easy breathing",
      moderate: "Steady jog, slightly elevated breathing",
      hard: "Brisk run, breathing hard but controlled",
    },
  },
  {
    id: "tempo-run",
    name: "Tempo Run",
    emoji: "⏱️",
    equipment: "road",
    tagline: "Comfortably hard — raises your lactate threshold",
    caloriesPerMin: 12,
    tip: "Tempo pace is 'comfortably hard' — you can say a few words but not hold a conversation. It should feel like a 7/10 effort.",
    effort: {
      easy: "Easy warm-up jog",
      moderate: "Brisk jog, slightly faster than comfortable",
      hard: "Tempo pace — 7/10 effort, pushing but sustainable",
    },
  },
  {
    id: "run-intervals",
    name: "Run Intervals",
    emoji: "🔥",
    equipment: "road",
    tagline: "Hard efforts with recovery — maximum calorie burn",
    caloriesPerMin: 13,
    tip: "Find a flat stretch or loop. Sprint efforts should be 8-9/10 — you should want the recovery. Walk or slow jog to recover fully.",
    effort: {
      easy: "Walking or very slow jog recovery",
      moderate: "Comfortable jog between efforts",
      hard: "Hard run — 85-90% effort, fast but not a full sprint",
    },
  },
  {
    id: "fartlek",
    name: "Fartlek Run",
    emoji: "🎲",
    equipment: "road",
    tagline: "Play with pace — surges whenever you feel like it",
    caloriesPerMin: 11,
    tip: "Swedish for 'speed play.' Run easy, then surge whenever you pass a landmark — a tree, a mailbox, a corner. No structure required.",
    effort: {
      easy: "Easy base pace, comfortable jog",
      moderate: "Pick it up, controlled effort",
      hard: "Surge — run fast to the next landmark",
    },
  },
  {
    id: "walk-run",
    name: "Walk/Run Mix",
    emoji: "🚶",
    equipment: "road",
    tagline: "Great for recovery days or ramping back up",
    caloriesPerMin: 8,
    tip: "Run the flats, walk the uphills. Or set a timer — 2 min run, 1 min walk. Both are valid. No shame in the walks.",
    effort: {
      easy: "Brisk walk, purposeful pace",
      moderate: "Easy jog, comfortable breathing",
      hard: "Moderate run, breathing elevated",
    },
  },
  // ── Peloton options ───────────────────────────────────────────────────────
  {
    id: "peloton-easy",
    name: "Peloton Easy Ride",
    emoji: "🚴",
    equipment: "peloton",
    tagline: "Zone 2 cardio — your fat-burning zone",
    caloriesPerMin: 9,
    tip: "Zone 2 is 60-70% of max heart rate. It feels almost too easy but it's one of the best things you can do for fat loss and endurance.",
    effort: {
      easy: "Low resistance (25-35), 80-90 RPM, easy spin",
      moderate: "Moderate resistance (35-45), 80-85 RPM",
      hard: "Moderate-high resistance (45-55), 85-90 RPM",
    },
  },
  {
    id: "peloton-tempo",
    name: "Peloton Tempo Ride",
    emoji: "💨",
    equipment: "peloton",
    tagline: "Sustained effort — builds power and burns fat",
    caloriesPerMin: 11,
    tip: "Tempo on the Peloton means you're in the orange zone — output should feel challenging but holdable for several minutes at a time.",
    effort: {
      easy: "Low resistance, easy warm-up spin",
      moderate: "Resistance 45-55, 80-90 RPM, controlled effort",
      hard: "Resistance 55-65, 80-85 RPM, pushing your output",
    },
  },
  {
    id: "peloton-hiit",
    name: "Peloton HIIT Ride",
    emoji: "⚡",
    equipment: "peloton",
    tagline: "Sprint intervals — max output, short bursts",
    caloriesPerMin: 13,
    tip: "For sprints, jack the resistance to 60+ and push your cadence above 100 RPM. Then drop resistance completely to recover. Full effort, full recovery.",
    effort: {
      easy: "Low resistance (20-30), slow spin, active recovery",
      moderate: "Moderate resistance (40-50), steady 80-85 RPM",
      hard: "High resistance (60-70), sprint 95-110 RPM",
    },
  },
  {
    id: "peloton-hills",
    name: "Peloton Hill Climb",
    emoji: "⛰️",
    equipment: "peloton",
    tagline: "Heavy resistance — serious leg and glute work",
    caloriesPerMin: 11,
    tip: "On climbs, slow your cadence to 60-70 RPM and add resistance until it feels like you're grinding uphill. Stand on the hardest sections.",
    effort: {
      easy: "Resistance 35-45, seated, 70-80 RPM",
      moderate: "Resistance 55-65, seated or standing, 65-75 RPM",
      hard: "Resistance 70-80, standing climb, 60-70 RPM",
    },
  },
  {
    id: "peloton-endurance",
    name: "Peloton Endurance Ride",
    emoji: "🎯",
    equipment: "peloton",
    tagline: "Longer steady effort — best for 30-45 min sessions",
    caloriesPerMin: 10,
    tip: "Pick a resistance you can hold the whole time. The goal is consistency — don't start too hard. Aim for a 6/10 effort throughout.",
    effort: {
      easy: "Resistance 30-40, easy warm-up spin",
      moderate: "Resistance 45-55, steady 80-85 RPM, 6/10 effort",
      hard: "Resistance 55-65, push to 7/10 for the final stretch",
    },
  },
];
