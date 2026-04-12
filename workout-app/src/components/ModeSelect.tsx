interface Props {
  onSelect: (mode: "strength" | "cardio" | "beach-muscles") => void;
}

export function ModeSelect({ onSelect }: Props) {
  return (
    <div className="mode-select-screen">
      <div className="hero">
        <h1>💪 Workout Generator</h1>
        <p className="subtitle">
          Circuit training and cardio — designed for fat loss around a busy
          schedule.
        </p>
      </div>

      <div className="mode-grid">
        <button className="mode-btn" onClick={() => onSelect("strength")}>
          <span className="mode-emoji">🏋️</span>
          <span className="mode-title">Strength Circuit</span>
          <span className="mode-desc">
            Dumbbell circuits with Spartacus-style intervals
          </span>
        </button>

        <button className="mode-btn" onClick={() => onSelect("beach-muscles")}>
          <span className="mode-emoji">🏖️</span>
          <span className="mode-title">Beach Muscles</span>
          <span className="mode-desc">
            Chest, arms & abs focus — the mirror muscles
          </span>
        </button>

        <button className="mode-btn" onClick={() => onSelect("cardio")}>
          <span className="mode-emoji">🏃</span>
          <span className="mode-title">Cardio</span>
          <span className="mode-desc">
            10 alternatives to running — structured plans by time
          </span>
        </button>
      </div>
    </div>
  );
}
