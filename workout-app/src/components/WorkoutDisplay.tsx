import type { Workout } from "../lib/generator";
import { ExerciseCard } from "./ExerciseCard";

interface Props {
  workout: Workout;
  onReset: () => void;
}

export function WorkoutDisplay({ workout, onReset }: Props) {
  const { stations, rounds, workSeconds, restSeconds, transitionSeconds, roundRestSeconds, estimatedCalories } = workout;

  return (
    <div className="workout-display">
      <div className="workout-header">
        <button className="back-btn" onClick={onReset}>← New Workout</button>
        <h2>Your Workout</h2>
      </div>

      <div className="workout-summary">
        <div className="summary-stat">
          <span className="stat-value">{workout.totalMinutes}</span>
          <span className="stat-label">minutes</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">{stations.length}</span>
          <span className="stat-label">stations</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">{rounds}</span>
          <span className="stat-label">{rounds === 1 ? "round" : "rounds"}</span>
        </div>
        <div className="summary-stat">
          <span className="stat-value">~{estimatedCalories}</span>
          <span className="stat-label">cal</span>
        </div>
      </div>

      <div className="how-it-works">
        <strong>How it works:</strong> Do each exercise for{" "}
        <span className="highlight">{workSeconds} seconds</span>, rest{" "}
        <span className="highlight">{restSeconds} seconds</span>, then move to the
        next station ({transitionSeconds}s to transition). Complete the circuit{" "}
        <span className="highlight">{rounds} {rounds === 1 ? "time" : "times"}</span>
        {rounds > 1 && `, resting ${roundRestSeconds / 60} min between rounds`}.
      </div>

      <div className="stations-list">
        {stations.map((station) => (
          <ExerciseCard
            key={station.exercise.id}
            station={station}
            workSeconds={workSeconds}
            restSeconds={restSeconds}
            isActive={false}
          />
        ))}
      </div>

      <div className="circuit-note">
        <strong>💪 Circuit-style:</strong> Go through all {stations.length} stations
        back-to-back. That's 1 round. Rest {roundRestSeconds / 60} min, then repeat
        {rounds > 1 ? ` ${rounds - 1} more time${rounds > 2 ? "s" : ""}` : ""}.
      </div>

      <button className="generate-btn" onClick={onReset}>
        Generate Another Workout
      </button>
    </div>
  );
}
