export type MuscleGroup =
  | "legs"
  | "glutes"
  | "chest"
  | "back"
  | "shoulders"
  | "core"
  | "arms"
  | "full-body";

export type Equipment = "dumbbells" | "bodyweight" | "bowflex";

export interface Exercise {
  id: string;
  name: string;
  muscles: MuscleGroup[];
  equipment: Equipment[];
  workSeconds: number;
  restSeconds: number;
  instructions: string;
  tip?: string;
  isCardio: boolean;
}

export const EXERCISES: Exercise[] = [
  // --- LEGS / GLUTES ---
  {
    id: "goblet-squat",
    name: "Goblet Squat",
    muscles: ["legs", "glutes", "core"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold one dumbbell vertically at your chest. Feet shoulder-width apart. Squat until thighs are parallel to the floor, keeping your chest tall. Drive through your heels to stand.",
    tip: "Use 20 lb — go slow on the way down (3 counts).",
    isCardio: false,
  },
  {
    id: "dumbbell-reverse-lunge",
    name: "Dumbbell Reverse Lunge",
    muscles: ["legs", "glutes"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold a dumbbell in each hand. Step one foot back and lower your back knee toward the floor. Push off the front foot to return. Alternate legs.",
    tip: "10–20 lb each hand. Keep your front knee over your ankle.",
    isCardio: false,
  },
  {
    id: "split-jump",
    name: "Split Jump (Lunge Jump)",
    muscles: ["legs", "glutes"],
    equipment: ["bodyweight"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Start in a lunge. Jump and switch legs mid-air, landing softly with the opposite leg forward. Keep your torso upright.",
    tip: "If knees are sore, do alternating reverse lunges instead.",
    isCardio: true,
  },
  {
    id: "dumbbell-sumo-squat",
    name: "Sumo Squat",
    muscles: ["legs", "glutes"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold one dumbbell with both hands, feet wide and toes turned out 45°. Squat deep, keeping your chest up and knees tracking over toes.",
    tip: "Use 20 lb. Pause 1 second at the bottom.",
    isCardio: false,
  },
  {
    id: "step-up",
    name: "Dumbbell Step-Up",
    muscles: ["legs", "glutes"],
    equipment: ["dumbbells"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold dumbbells at your sides. Step one foot onto a sturdy chair or step, drive through that heel to stand on top, then step back down. Alternate legs.",
    tip: "10 lb each hand. Use a step about knee height.",
    isCardio: false,
  },
  // --- CHEST / PUSH ---
  {
    id: "pushup",
    name: "Push-Up",
    muscles: ["chest", "shoulders", "arms"],
    equipment: ["bodyweight"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hands slightly wider than shoulders, body in a straight line from head to heels. Lower your chest to the floor, then press back up.",
    tip: "Drop to your knees if needed — quality over quantity.",
    isCardio: false,
  },
  {
    id: "dumbbell-chest-press",
    name: "Dumbbell Floor Press",
    muscles: ["chest", "arms"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Lie on your back, knees bent, dumbbells at chest height with elbows at 45°. Press the weights straight up, then lower slowly.",
    tip: "10–20 lb each hand. 3 count down, explode up.",
    isCardio: false,
  },
  {
    id: "t-pushup",
    name: "T Push-Up",
    muscles: ["chest", "shoulders", "core"],
    equipment: ["dumbbells", "bodyweight"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Start in a push-up position with dumbbells. Do a push-up, then rotate your body to one side and raise one arm toward the ceiling forming a T. Alternate sides.",
    tip: "Use light dumbbells (10 lb) or no weight at all.",
    isCardio: false,
  },
  // --- BACK / PULL ---
  {
    id: "dumbbell-row",
    name: "Dumbbell Row",
    muscles: ["back", "arms"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hinge at hips, back nearly parallel to the floor, dumbbells hanging. Pull both weights to your sides, squeezing your shoulder blades together at the top.",
    tip: "20 lb each. Pause 1 second at the top.",
    isCardio: false,
  },
  {
    id: "single-arm-row",
    name: "Single-Arm Row",
    muscles: ["back", "arms"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Place one hand and knee on a chair for support. Row the dumbbell to your hip, elbow close to your body. Switch arms at the halfway point.",
    tip: "Use 20 lb. Focus on pulling with your back, not your arm.",
    isCardio: false,
  },
  // --- SHOULDERS ---
  {
    id: "dumbbell-shoulder-press",
    name: "Dumbbell Shoulder Press",
    muscles: ["shoulders", "arms"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Stand or sit, dumbbells at shoulder height, elbows at 90°. Press overhead until arms are nearly straight, then lower slowly.",
    tip: "10–20 lb. Don't lock your elbows at the top.",
    isCardio: false,
  },
  {
    id: "lateral-raise",
    name: "Lateral Raise",
    muscles: ["shoulders"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold dumbbells at your sides, slight bend in elbows. Raise arms out to the sides until parallel with the floor. Lower slowly.",
    tip: "Use 10 lb. Slow and controlled beats heavy and sloppy.",
    isCardio: false,
  },
  // --- CORE ---
  {
    id: "mountain-climber",
    name: "Mountain Climber",
    muscles: ["core", "full-body"],
    equipment: ["bodyweight"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Start in a push-up position, body straight. Drive one knee toward your chest, then quickly switch legs. Keep your hips level.",
    tip: "Keep it fast for cardio or slow for more core work.",
    isCardio: true,
  },
  {
    id: "plank",
    name: "Plank Hold",
    muscles: ["core"],
    equipment: ["bodyweight"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Forearms on the floor, elbows under shoulders. Body in a straight line from head to heels. Squeeze your core and glutes. Hold.",
    tip: "Don't let your hips sag or pike up.",
    isCardio: false,
  },
  {
    id: "dumbbell-russian-twist",
    name: "Dumbbell Russian Twist",
    muscles: ["core"],
    equipment: ["dumbbells", "bodyweight"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Sit with knees bent and feet slightly raised. Hold one dumbbell with both hands. Rotate your torso left then right, tapping the dumbbell toward the floor.",
    tip: "Use 10 lb or no weight. Keep your back straight.",
    isCardio: false,
  },
  // --- FULL-BODY / CARDIO ---
  {
    id: "dumbbell-swing",
    name: "Dumbbell Swing",
    muscles: ["glutes", "legs", "back", "core"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold one dumbbell with both hands. Hinge at hips, swing the weight between your legs, then drive your hips forward to swing it to shoulder height.",
    tip: "Use 20 lb. Power comes from your hips, not your arms.",
    isCardio: true,
  },
  {
    id: "burpee",
    name: "Burpee (No Jump)",
    muscles: ["full-body"],
    equipment: ["bodyweight"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "From standing, place hands on floor, step or jump feet back to a push-up position, do one push-up, step or jump feet forward, then stand back up.",
    tip: "Step feet instead of jumping to protect your joints.",
    isCardio: true,
  },
  {
    id: "dumbbell-thruster",
    name: "Dumbbell Thruster",
    muscles: ["legs", "shoulders", "full-body"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold dumbbells at shoulders. Squat down, then as you stand, press the weights overhead in one fluid motion. Lower as you squat again.",
    tip: "10–20 lb. One of the best fat-burning moves you can do.",
    isCardio: true,
  },
  {
    id: "pushup-position-row",
    name: "Push-Up Position Row",
    muscles: ["back", "core", "arms"],
    equipment: ["dumbbells"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "In push-up position on dumbbells. Row one dumbbell to your hip while balancing on the other. Lower and alternate sides.",
    tip: "Use 20 lb. Keep your hips from rotating.",
    isCardio: false,
  },
  {
    id: "dumbbell-side-lunge",
    name: "Dumbbell Side Lunge & Touch",
    muscles: ["legs", "glutes"],
    equipment: ["dumbbells"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold dumbbells at your sides. Step wide to the left, bending your left knee and sitting back into a side lunge, lowering the dumbbells toward the floor. Push back to center. Alternate sides.",
    tip: "10–20 lb. Keep the working knee aligned over your foot.",
    isCardio: false,
  },
  {
    id: "dumbbell-lunge-rotation",
    name: "Lunge with Rotation",
    muscles: ["legs", "glutes", "core"],
    equipment: ["dumbbells"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold one dumbbell horizontally at chest height. Step forward into a lunge, then rotate your torso toward the front leg. Return to start and alternate legs.",
    tip: "Use 10 lb. The rotation fires your core hard.",
    isCardio: false,
  },
  {
    id: "dumbbell-push-press",
    name: "Dumbbell Push Press",
    muscles: ["shoulders", "legs", "full-body"],
    equipment: ["dumbbells", "bowflex"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Dumbbells at shoulders, feet shoulder-width. Dip slightly at the knees, then explode up and press the weights overhead. Lower under control.",
    tip: "Use the leg drive — that's what makes it a fat burner.",
    isCardio: true,
  },
];
