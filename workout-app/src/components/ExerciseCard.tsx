import type { WorkoutStation } from "../lib/generator";

interface Props {
  station: WorkoutStation;
  workSeconds: number;
  restSeconds: number;
  isActive: boolean;
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

export function ExerciseCard({ station, workSeconds, restSeconds, isActive }: Props) {
  const { exercise, stationNumber } = station;
  const primaryMuscle = exercise.muscles[0];
  const color = MUSCLE_COLORS[primaryMuscle] ?? "#6b7280";

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
          <span className="work-time">{workSeconds}s</span>
          <span className="timing-sep">/</span>
          <span className="rest-time">{restSeconds}s rest</span>
        </div>
      </div>

      <p className="card-instructions">{exercise.instructions}</p>

      {exercise.tip && (
        <div className="card-tip">
          <span className="tip-icon">💡</span>
          {exercise.tip}
        </div>
      )}
    </div>
  );
}
