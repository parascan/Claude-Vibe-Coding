export type MuscleGroup =
  | "legs"
  | "glutes"
  | "chest"
  | "back"
  | "shoulders"
  | "core"
  | "arms"
  | "full-body";

export type Equipment = "selecttech-552" | "bodyweight";

const DB = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

export interface Exercise {
  id: string;
  name: string;
  muscles: MuscleGroup[];
  equipment: Equipment[];
  workSeconds: number;
  restSeconds: number;
  instructions: string;
  tip?: string;
  startWeight: string; // suggested starting weight on SelectTech 552
  isCardio: boolean;
  /** Before/after demo images showing start and end positions */
  demoImages?: [string, string];
}

export const EXERCISES: Exercise[] = [
  // --- LEGS / GLUTES ---
  {
    id: "goblet-squat",
    name: "Goblet Squat",
    muscles: ["legs", "glutes", "core"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold one dumbbell vertically at your chest. Feet shoulder-width apart. Squat until thighs are parallel to the floor, keeping your chest tall. Drive through your heels to stand.",
    tip: "Start at 25 lb, dial up to 35–40 lb once form is solid. Go slow on the way down (3 counts).",
    startWeight: "25 lb",
    isCardio: false,
    demoImages: [`${DB}/Goblet_Squat/0.jpg`, `${DB}/Goblet_Squat/1.jpg`],
  },
  {
    id: "dumbbell-reverse-lunge",
    name: "Dumbbell Reverse Lunge",
    muscles: ["legs", "glutes"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold a dumbbell in each hand at your sides. Step one foot back and lower your back knee toward the floor. Push off the front foot to return. Alternate legs.",
    tip: "Start at 15 lb each hand, progress to 25–30 lb. Keep your front knee over your ankle.",
    startWeight: "15 lb each",
    isCardio: false,
    demoImages: [`${DB}/Dumbbell_Rear_Lunge/0.jpg`, `${DB}/Dumbbell_Rear_Lunge/1.jpg`],
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
    tip: "Bodyweight only. If knees are sore, sub in alternating reverse lunges with 20 lb dumbbells.",
    startWeight: "bodyweight",
    isCardio: true,
    demoImages: [`${DB}/Split_Jump/0.jpg`, `${DB}/Split_Jump/1.jpg`],
  },
  {
    id: "dumbbell-sumo-squat",
    name: "Sumo Squat",
    muscles: ["legs", "glutes"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold one dumbbell with both hands, feet wide and toes turned out 45°. Squat deep, keeping your chest up and knees tracking over toes.",
    tip: "Start at 30 lb, work up to 45–52.5 lb over time. Pause 1 second at the bottom.",
    startWeight: "30 lb",
    isCardio: false,
    demoImages: [`${DB}/Dumbbell_Squat/0.jpg`, `${DB}/Dumbbell_Squat/1.jpg`],
  },
  {
    id: "step-up",
    name: "Dumbbell Step-Up",
    muscles: ["legs", "glutes"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold dumbbells at your sides. Step one foot onto a sturdy chair or step, drive through that heel to stand on top, then step back down. Alternate legs.",
    tip: "Start at 15 lb each, progress to 25 lb. Use a step around knee height.",
    startWeight: "15 lb each",
    isCardio: false,
    demoImages: [`${DB}/Dumbbell_Step_Ups/0.jpg`, `${DB}/Dumbbell_Step_Ups/1.jpg`],
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
    tip: "Bodyweight. Drop to your knees if needed — quality over quantity.",
    startWeight: "bodyweight",
    isCardio: false,
    demoImages: [`${DB}/Pushups/0.jpg`, `${DB}/Pushups/1.jpg`],
  },
  {
    id: "dumbbell-chest-press",
    name: "Dumbbell Floor Press",
    muscles: ["chest", "arms"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Lie on your back, knees bent, dumbbells at chest height with elbows at 45°. Press the weights straight up, then lower slowly.",
    tip: "Start at 20 lb each, dial up to 30–35 lb as you get stronger. 3 count down, explode up.",
    startWeight: "20 lb each",
    isCardio: false,
    demoImages: [`${DB}/Dumbbell_Floor_Press/0.jpg`, `${DB}/Dumbbell_Floor_Press/1.jpg`],
  },
  {
    id: "t-pushup",
    name: "T Push-Up",
    muscles: ["chest", "shoulders", "core"],
    equipment: ["selecttech-552", "bodyweight"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Start in a push-up position gripping the dumbbells. Do a push-up, then rotate your body to one side and raise one arm toward the ceiling forming a T. Alternate sides.",
    tip: "Use 15–20 lb or no weight at all. Balance is the challenge here.",
    startWeight: "15 lb each",
    isCardio: false,
    demoImages: [`${DB}/Push_Up_to_Side_Plank/0.jpg`, `${DB}/Push_Up_to_Side_Plank/1.jpg`],
  },
  // --- BACK / PULL ---
  {
    id: "dumbbell-row",
    name: "Dumbbell Row",
    muscles: ["back", "arms"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hinge at hips, back nearly parallel to the floor, dumbbells hanging. Pull both weights to your sides, squeezing your shoulder blades together at the top.",
    tip: "Start at 25 lb each, progress to 35–40 lb. Pause 1 second at the top.",
    startWeight: "25 lb each",
    isCardio: false,
    demoImages: [`${DB}/Bent_Over_Two-Dumbbell_Row/0.jpg`, `${DB}/Bent_Over_Two-Dumbbell_Row/1.jpg`],
  },
  {
    id: "single-arm-row",
    name: "Single-Arm Row",
    muscles: ["back", "arms"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Place one hand and knee on a chair for support. Row the dumbbell to your hip, elbow close to your body. Switch arms at the halfway point.",
    tip: "Start at 30 lb, progress to 40–45 lb. Pull with your back, not your arm.",
    startWeight: "30 lb",
    isCardio: false,
    demoImages: [`${DB}/One-Arm_Dumbbell_Row/0.jpg`, `${DB}/One-Arm_Dumbbell_Row/1.jpg`],
  },
  // --- SHOULDERS ---
  {
    id: "dumbbell-shoulder-press",
    name: "Dumbbell Shoulder Press",
    muscles: ["shoulders", "arms"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Stand or sit, dumbbells at shoulder height, elbows at 90°. Press overhead until arms are nearly straight, then lower slowly.",
    tip: "Start at 17.5–20 lb each, progress to 25–30 lb. Don't lock your elbows at the top.",
    startWeight: "17.5 lb each",
    isCardio: false,
    demoImages: [`${DB}/Dumbbell_Shoulder_Press/0.jpg`, `${DB}/Dumbbell_Shoulder_Press/1.jpg`],
  },
  {
    id: "lateral-raise",
    name: "Lateral Raise",
    muscles: ["shoulders"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold dumbbells at your sides, slight bend in elbows. Raise arms out to the sides until parallel with the floor. Lower slowly.",
    tip: "Start at 10–12.5 lb each. Shoulders fatigue fast — slow and controlled beats heavy.",
    startWeight: "10 lb each",
    isCardio: false,
    demoImages: [`${DB}/Side_Lateral_Raise/0.jpg`, `${DB}/Side_Lateral_Raise/1.jpg`],
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
    tip: "Bodyweight. Keep it fast for more cardio, or slow it down to make it harder on your core.",
    startWeight: "bodyweight",
    isCardio: true,
    demoImages: [`${DB}/Mountain_Climbers/0.jpg`, `${DB}/Mountain_Climbers/1.jpg`],
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
    tip: "Bodyweight. Don't let your hips sag or pike up. Breathe steadily.",
    startWeight: "bodyweight",
    isCardio: false,
    demoImages: [`${DB}/Plank/0.jpg`, `${DB}/Plank/1.jpg`],
  },
  {
    id: "dumbbell-russian-twist",
    name: "Dumbbell Russian Twist",
    muscles: ["core"],
    equipment: ["selecttech-552", "bodyweight"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Sit with knees bent and feet slightly raised. Hold one dumbbell with both hands. Rotate your torso left then right, tapping the dumbbell toward the floor.",
    tip: "Start at 10–12.5 lb, progress to 17.5–20 lb. Keep your back straight.",
    startWeight: "10 lb",
    isCardio: false,
    demoImages: [`${DB}/Russian_Twist/0.jpg`, `${DB}/Russian_Twist/1.jpg`],
  },
  // --- FULL-BODY / CARDIO ---
  {
    id: "dumbbell-swing",
    name: "Dumbbell Swing",
    muscles: ["glutes", "legs", "back", "core"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold one dumbbell with both hands. Hinge at hips, swing the weight between your legs, then drive your hips forward to swing it to shoulder height.",
    tip: "Start at 25 lb, progress to 35–40 lb. Power comes from your hips, not your arms.",
    startWeight: "25 lb",
    isCardio: true,
    demoImages: [`${DB}/One-Arm_Kettlebell_Swings/0.jpg`, `${DB}/One-Arm_Kettlebell_Swings/1.jpg`],
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
    tip: "Bodyweight. Step feet instead of jumping to protect your joints.",
    startWeight: "bodyweight",
    isCardio: true,
    demoImages: [`${DB}/Bodyweight_Squat/0.jpg`, `${DB}/Bodyweight_Squat/1.jpg`],
  },
  {
    id: "dumbbell-thruster",
    name: "Dumbbell Thruster",
    muscles: ["legs", "shoulders", "full-body"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold dumbbells at shoulders. Squat down, then as you stand, press the weights overhead in one fluid motion. Lower as you squat again.",
    tip: "Start at 17.5–20 lb each, progress to 25–30 lb. One of the best fat-burning moves you can do.",
    startWeight: "17.5 lb each",
    isCardio: true,
    demoImages: [`${DB}/Kettlebell_Thruster/0.jpg`, `${DB}/Kettlebell_Thruster/1.jpg`],
  },
  {
    id: "pushup-position-row",
    name: "Push-Up Position Row",
    muscles: ["back", "core", "arms"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "In push-up position on dumbbells. Row one dumbbell to your hip while balancing on the other. Lower and alternate sides.",
    tip: "Start at 20–25 lb. Keep your hips from rotating — that's where the core work is.",
    startWeight: "20 lb each",
    isCardio: false,
    demoImages: [`${DB}/Alternating_Renegade_Row/0.jpg`, `${DB}/Alternating_Renegade_Row/1.jpg`],
  },
  {
    id: "dumbbell-side-lunge",
    name: "Dumbbell Side Lunge & Touch",
    muscles: ["legs", "glutes"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold dumbbells at your sides. Step wide to the left, bending your left knee and sitting back into a side lunge, lowering the dumbbells toward the floor. Push back to center. Alternate sides.",
    tip: "Start at 15 lb each, progress to 22.5–25 lb. Keep the working knee aligned over your foot.",
    startWeight: "15 lb each",
    isCardio: false,
    demoImages: [`${DB}/Dumbbell_Lunges/0.jpg`, `${DB}/Dumbbell_Lunges/1.jpg`],
  },
  {
    id: "dumbbell-lunge-rotation",
    name: "Lunge with Rotation",
    muscles: ["legs", "glutes", "core"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Hold one dumbbell horizontally at chest height. Step forward into a lunge, then rotate your torso toward the front leg. Return to start and alternate legs.",
    tip: "Start at 12.5–15 lb. The rotation fires your core hard — don't rush it.",
    startWeight: "12.5 lb",
    isCardio: false,
    demoImages: [`${DB}/Dumbbell_Lunges/0.jpg`, `${DB}/Dumbbell_Lunges/1.jpg`],
  },
  {
    id: "dumbbell-push-press",
    name: "Dumbbell Push Press",
    muscles: ["shoulders", "legs", "full-body"],
    equipment: ["selecttech-552"],
    workSeconds: 40,
    restSeconds: 20,
    instructions:
      "Dumbbells at shoulders, feet shoulder-width. Dip slightly at the knees, then explode up and press the weights overhead. Lower under control.",
    tip: "Start at 20 lb each, progress to 27.5–30 lb. Use the leg drive — that's what makes it a fat burner.",
    startWeight: "20 lb each",
    isCardio: true,
    demoImages: [`${DB}/Push_Press/0.jpg`, `${DB}/Push_Press/1.jpg`],
  },
];
