import { useState } from "react";

type Intensity = "beginner" | "standard" | "intense";

const INTENSITIES: Record<Intensity, { label: string; workSec: number; restSec: number; desc: string }> = {
  beginner: { label: "Beginner", workSec: 40, restSec: 20, desc: "40s on · 20s off" },
  standard: { label: "Standard", workSec: 60, restSec: 15, desc: "60s on · 15s off" },
  intense:  { label: "Intense",  workSec: 60, restSec: 8,  desc: "60s on · 8s off"  },
};

interface Props {
  mode: "strength" | "cardio" | "beach-muscles" | "legs-day" | "pull-day";
  onStart: (minutes: number, workSec?: number, restSec?: number) => void;
  onBack: () => void;
}

const PRESETS = [10, 15, 20, 30, 45];

const CONFIG = {
  strength: {
    title: "🏋️ Strength Circuit",
    subtitle: "Dumbbell circuits with Spartacus-style intervals.",
    tip: "Spartacus-style circuits are great for fat loss. Aim for 3–4 sessions/week. Each workout adapts to your time.",
  },
  "beach-muscles": {
    title: "🏖️ Beach Muscles",
    subtitle: "Chest, arms & abs — focused dumbbell circuits.",
    tip: "Targets chest, biceps, triceps, and core. Pairs well with leg days on alternating sessions.",
  },
  "legs-day": {
    title: "🦵 Legs Day",
    subtitle: "Quads, hamstrings & glutes — lower body dumbbell circuits.",
    tip: "Targets legs and glutes with squats, lunges, hinges, and bridges. Alternate with upper-body days for a complete program.",
  },
  "pull-day": {
    title: "💪 Pull Day",
    subtitle: "Back & biceps — rows, curls & rear-chain dumbbell circuits.",
    tip: "Pair with Beach Muscles (push) for a complete push/pull split. Back rows and bicep curls dominate the circuit.",
  },
  cardio: {
    title: "🏃 Cardio",
    subtitle: "Pick a time and get 3 cardio options — no running required.",
    tip: "You'll see 3 random alternatives to running, each with a structured warmup, main effort, and cooldown.",
  },
};

const isStrengthMode = (mode: string) => mode !== "cardio";

export function TimeInput({ mode, onStart, onBack }: Props) {
  const cfg = CONFIG[mode];
  const [custom, setCustom] = useState("");
  const [intensity, setIntensity] = useState<Intensity>("standard");

  function go(minutes: number) {
    if (isStrengthMode(mode)) {
      const { workSec, restSec } = INTENSITIES[intensity];
      onStart(minutes, workSec, restSec);
    } else {
      onStart(minutes);
    }
  }

  function handleCustomSubmit() {
    const val = parseInt(custom, 10);
    if (!Number.isNaN(val) && val >= 5 && val <= 120) go(val);
  }

  return (
    <div className="time-input-screen">
      <div className="workout-header" style={{ paddingTop: "0.5rem" }}>
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
      </div>

      <div className="hero">
        <h1>{cfg.title}</h1>
        <p className="subtitle">{cfg.subtitle}</p>
      </div>

      {isStrengthMode(mode) && (
        <div className="intensity-section">
          <h2>Intensity</h2>
          <div className="intensity-grid">
            {(Object.keys(INTENSITIES) as Intensity[]).map((key) => (
              <button
                key={key}
                className={`intensity-btn${intensity === key ? " active" : ""}`}
                onClick={() => setIntensity(key)}
              >
                <span className="intensity-label">{INTENSITIES[key].label}</span>
                <span className="intensity-desc">{INTENSITIES[key].desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="preset-section">
        <h2>How much time do you have?</h2>
        <div className="preset-grid">
          {PRESETS.map((min) => (
            <button
              key={min}
              className="preset-btn"
              onClick={() => go(min)}
            >
              <span className="preset-min">{min}</span>
              <span className="preset-label">min</span>
            </button>
          ))}
        </div>

        <div className="custom-time-row">
          <input
            className="custom-time-input"
            type="number"
            min={5}
            max={120}
            placeholder="Custom"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
          />
          <span className="custom-time-unit">min</span>
          <button
            className="custom-time-btn"
            onClick={handleCustomSubmit}
            disabled={
              Number.isNaN(parseInt(custom, 10)) ||
              parseInt(custom, 10) < 5 ||
              parseInt(custom, 10) > 120
            }
          >
            Go
          </button>
        </div>
      </div>

      <div className="tip-box">
        <strong>Tip:</strong> {cfg.tip}
      </div>
    </div>
  );
}
