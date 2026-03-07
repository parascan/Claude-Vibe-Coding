interface Props {
  mode: "strength" | "cardio";
  onStart: (minutes: number) => void;
  onBack: () => void;
}

const PRESETS = [10, 15, 20, 30, 45];

const CONFIG = {
  strength: {
    title: "🏋️ Strength Circuit",
    subtitle: "Dumbbell circuits with Spartacus-style intervals.",
    tip: "Spartacus-style circuits are great for fat loss. Aim for 3–4 sessions/week. Each workout adapts to your time.",
  },
  cardio: {
    title: "🏃 Cardio",
    subtitle: "Pick a time and get 3 cardio options — no running required.",
    tip: "You'll see 3 random alternatives to running, each with a structured warmup, main effort, and cooldown.",
  },
};

export function TimeInput({ mode, onStart, onBack }: Props) {
  const cfg = CONFIG[mode];
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

      <div className="preset-section">
        <h2>How much time do you have?</h2>
        <div className="preset-grid">
          {PRESETS.map((min) => (
            <button
              key={min}
              className="preset-btn"
              onClick={() => onStart(min)}
            >
              <span className="preset-min">{min}</span>
              <span className="preset-label">min</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tip-box">
        <strong>Tip:</strong> {cfg.tip}
      </div>
    </div>
  );
}
