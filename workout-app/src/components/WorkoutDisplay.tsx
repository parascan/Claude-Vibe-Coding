import { useState } from "react";
import type { Workout, WorkoutStation } from "../lib/generator";
import { EXERCISES } from "../data/exercises";
import type { Exercise } from "../data/exercises";
import { ExerciseCard } from "./ExerciseCard";
import { WorkoutTimer } from "./WorkoutTimer";

interface Props {
  workout: Workout;
  onReset: () => void;
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

function getSimilarExercises(current: Exercise, usedIds: Set<string>): Exercise[] {
  return EXERCISES
    .filter((e) => e.id !== current.id && !usedIds.has(e.id))
    .filter((e) => e.muscles.some((m) => current.muscles.includes(m)))
    .sort((a, b) => {
      const overlapA = a.muscles.filter((m) => current.muscles.includes(m)).length;
      const overlapB = b.muscles.filter((m) => current.muscles.includes(m)).length;
      return overlapB - overlapA;
    });
}

export function WorkoutDisplay({ workout, onReset }: Props) {
  const [timerActive, setTimerActive] = useState(false);
  const [stations, setStations] = useState<WorkoutStation[]>(workout.stations);
  const [swapIdx, setSwapIdx] = useState<number | null>(null);

  const {
    rounds,
    workSeconds,
    restSeconds,
    transitionSeconds,
    roundRestSeconds,
    estimatedCalories,
    totalMinutes,
  } = workout;

  const activeWorkout = { ...workout, stations };

  if (timerActive) {
    return (
      <WorkoutTimer workout={activeWorkout} onEnd={() => setTimerActive(false)} />
    );
  }

  const usedIds = new Set(stations.map((s) => s.exercise.id));
  const swappingStation = swapIdx !== null ? stations[swapIdx] : null;
  const alternatives = swappingStation
    ? getSimilarExercises(swappingStation.exercise, usedIds)
    : [];

  function handleSwap(replacement: Exercise) {
    if (swapIdx === null) return;
    setStations((prev) =>
      prev.map((s, i) =>
        i === swapIdx ? { ...s, exercise: replacement } : s
      )
    );
    setSwapIdx(null);
  }

  return (
    <div className="workout-display">
      <div className="workout-header">
        <button className="back-btn" onClick={onReset}>
          ← New Workout
        </button>
        <h2>{workout.label ?? "Your Workout"}</h2>
      </div>

      <div className="workout-summary">
        <div className="summary-stat">
          <span className="stat-value">{totalMinutes}</span>
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

      <button
        className="start-workout-btn"
        onClick={() => setTimerActive(true)}
      >
        ▶ Start Workout
      </button>

      <div className="how-it-works">
        <strong>How it works:</strong> Do each exercise for{" "}
        <span className="highlight">{workSeconds} seconds</span>, rest{" "}
        <span className="highlight">{restSeconds} seconds</span>, then move to
        the next station ({transitionSeconds}s to transition). Complete the
        circuit{" "}
        <span className="highlight">
          {rounds} {rounds === 1 ? "time" : "times"}
        </span>
        {rounds > 1 && `, resting ${roundRestSeconds / 60} min between rounds`}.
      </div>

      <div className="stations-list">
        {stations.map((station, i) => (
          <ExerciseCard
            key={station.exercise.id}
            station={station}
            workSeconds={workSeconds}
            restSeconds={restSeconds}
            isActive={false}
            onSwap={() => setSwapIdx(i)}
          />
        ))}
      </div>

      <div className="circuit-note">
        <strong>💪 Circuit-style:</strong> Go through all {stations.length}{" "}
        stations back-to-back. That's 1 round. Rest {roundRestSeconds / 60} min,
        then repeat
        {rounds > 1
          ? ` ${rounds - 1} more time${rounds > 2 ? "s" : ""}`
          : ""}.
      </div>

      <button className="generate-btn" onClick={onReset}>
        Generate Another Workout
      </button>

      {/* Swap Modal */}
      {swapIdx !== null && swappingStation && (
        <div className="swap-overlay" onClick={() => setSwapIdx(null)}>
          <div className="swap-modal" onClick={(e) => e.stopPropagation()}>
            <div className="swap-modal-header">
              <h3>Swap: {swappingStation.exercise.name}</h3>
              <button className="swap-close-btn" onClick={() => setSwapIdx(null)}>✕</button>
            </div>
            <p className="swap-modal-hint">
              Similar exercises — tap one to swap in:
            </p>
            <div className="swap-options">
              {alternatives.length === 0 ? (
                <p className="swap-none">No similar exercises available.</p>
              ) : (
                alternatives.map((ex) => {
                  const color = MUSCLE_COLORS[ex.muscles[0]] ?? "#6b7280";
                  return (
                    <button
                      key={ex.id}
                      className="swap-option"
                      onClick={() => handleSwap(ex)}
                      style={{ borderLeftColor: color }}
                    >
                      <span className="swap-option-name">{ex.name}</span>
                      <span className="swap-option-muscles">
                        {ex.muscles.join(", ")}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
