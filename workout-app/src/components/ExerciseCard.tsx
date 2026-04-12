import { useState } from "react";
import type { WorkoutStation } from "../lib/generator";
import { getLastWeight, saveWeight } from "../lib/weightLog";

interface Props {
  station: WorkoutStation;
  workSeconds: number;
  restSeconds: number;
  isActive: boolean;
  onSwap?: () => void;
}

const MUSCLE_COLORS: Record<string, string> = {
  legs: "#e07b39",
  glutes: "#e07b39",
  chest: "#3b82f6",
  back: "#8b5cf6",
  shoulders: "#06b6d4",
  core: "#10b981",
  arms: "#f59e0b",
  "full-body": "#ef4444",
};

export function ExerciseCard({ station, workSeconds, restSeconds, isActive, onSwap }: Props) {
  const { exercise, stationNumber } = station;
  const primaryMuscle = exercise.muscles[0];
  const color = MUSCLE_COLORS[primaryMuscle] ?? "#6b7280";
  const [showDemo, setShowDemo] = useState(false);
  const [lastWeight] = useState(() => getLastWeight(exercise.id));
  const [logWeight, setLogWeight] = useState(lastWeight ?? "");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const trimmed = logWeight.trim();
    if (!trimmed) return;
    saveWeight(exercise.id, trimmed);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className={`exercise-card ${isActive ? "active" : ""}`}>
      <div className="card-header" style={{ borderLeftColor: color }}>
        <span className="station-num" style={{ background: color }}>
          {stationNumber}
        </span>
        <div className="card-title-group">
          <h3 className="card-name">{exercise.name}</h3>
          <div className="muscle-tags">
            {exercise.muscles.map((m) => (
              <span
                key={m}
                className="muscle-tag"
                style={{ background: MUSCLE_COLORS[m] + "22", color: MUSCLE_COLORS[m] }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="timing-badge">
          <div className="weight-badge">🏋️ {exercise.startWeight}</div>
          <div>
            <span className="work-time">{workSeconds}s</span>
            <span className="timing-sep">/</span>
            <span className="rest-time">{restSeconds}s rest</span>
          </div>
        </div>
        {onSwap && (
          <button className="swap-btn" onClick={onSwap} title="Swap exercise">
            ⇄
          </button>
        )}
      </div>

      <p className="card-instructions">{exercise.instructions}</p>

      {/* Weight logger */}
      <div className="weight-log-row">
        {lastWeight && (
          <span className="weight-log-last">Last: {lastWeight}</span>
        )}
        <input
          className="weight-log-input"
          type="text"
          placeholder={lastWeight ? `Last: ${lastWeight}` : "Log weight used…"}
          value={logWeight}
          onChange={(e) => setLogWeight(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <button
          className="weight-log-btn"
          onClick={handleSave}
          disabled={!logWeight.trim()}
        >
          {saved ? "✓" : "Save"}
        </button>
      </div>

      {exercise.demoImages && (
        <button
          className="demo-toggle-btn"
          onClick={() => setShowDemo((s) => !s)}
        >
          {showDemo ? "▲ Hide Demo" : "▼ Show Demo"}
        </button>
      )}

      {showDemo && exercise.demoImages && (
        <div className="demo-images">
          {exercise.demoImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${exercise.name} position ${i + 1}`}
              className="demo-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ))}
        </div>
      )}

      {exercise.tip && (
        <div className="card-tip">
          <span className="tip-icon">💡</span>
          {exercise.tip}
        </div>
      )}
    </div>
  );
}
