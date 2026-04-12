interface Props {
  onSelect: (mode: "strength" | "cardio" | "beach-muscles" | "legs-day" | "pull-day") => void;
  onPlan: () => void;
}

export function ModeSelect({ onSelect, onPlan }: Props) {
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

        <button className="mode-btn" onClick={() => onSelect("legs-day")}>
          <span className="mode-emoji">🦵</span>
          <span className="mode-title">Legs Day</span>
          <span className="mode-desc">
            Quads, hamstrings & glutes — lower body focused
          </span>
        </button>

        <button className="mode-btn" onClick={() => onSelect("pull-day")}>
          <span className="mode-emoji">💪</span>
          <span className="mode-title">Pull Day</span>
          <span className="mode-desc">
            Back & biceps — rows, curls & rear-chain work
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

      <button className="plan-week-btn" onClick={onPlan}>
        📅 Plan Your Week
      </button>
    </div>
  );
}
