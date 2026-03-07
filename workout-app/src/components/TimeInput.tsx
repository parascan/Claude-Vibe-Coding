interface Props {
  onStart: (minutes: number) => void;
}

const PRESETS = [10, 15, 20, 30, 45];

export function TimeInput({ onStart }: Props) {
  return (
    <div className="time-input-screen">
      <div className="hero">
        <h1>💪 Workout Generator</h1>
        <p className="subtitle">
          Circuit training with your dumbbells — designed for fat loss around a
          busy schedule.
        </p>
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
        <strong>Tip:</strong> Spartacus-style circuits are great for fat loss.
        Aim for 3–4 sessions/week. Each workout adapts to your time.
      </div>
    </div>
  );
}
