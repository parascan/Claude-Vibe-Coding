import { useState, useEffect } from "react";
import type { Workout } from "../lib/generator";

type Phase = "work" | "rest" | "transition" | "round-rest" | "complete";

const PHASE_LABEL: Record<Phase, string> = {
  work: "WORK",
  rest: "REST",
  transition: "NEXT UP",
  "round-rest": "ROUND REST",
  complete: "DONE!",
};

const PHASE_COLOR: Record<Phase, string> = {
  work: "#10b981",
  rest: "#6b7280",
  transition: "#3b82f6",
  "round-rest": "#8b5cf6",
  complete: "#e07b39",
};

interface Props {
  workout: Workout;
  onEnd: () => void;
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function WorkoutTimer({ workout, onEnd }: Props) {
  const {
    stations,
    rounds,
    workSeconds,
    restSeconds,
    transitionSeconds,
    roundRestSeconds,
  } = workout;

  const [phase, setPhase] = useState<Phase>("work");
  const [secondsLeft, setSecondsLeft] = useState(workSeconds);
  const [stationIdx, setStationIdx] = useState(0);
  const [round, setRound] = useState(1);
  const [paused, setPaused] = useState(false);
  const [slideKey, setSlideKey] = useState(0);

  const totalPhaseSeconds =
    phase === "work"
      ? workSeconds
      : phase === "rest"
        ? restSeconds
        : phase === "transition"
          ? transitionSeconds
          : phase === "round-rest"
            ? roundRestSeconds
            : 0;

  const progress = totalPhaseSeconds > 0 ? secondsLeft / totalPhaseSeconds : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const color = PHASE_COLOR[phase];

  // Derive which station card to show
  const displayIdx =
    phase === "transition"
      ? stationIdx + 1
      : phase === "round-rest"
        ? 0
        : stationIdx;
  const displayStation = stations[displayIdx];

  // Next exercise preview (shown during work/rest)
  const nextStation =
    phase === "work" || phase === "rest"
      ? stationIdx < stations.length - 1
        ? stations[stationIdx + 1]
        : null
      : null;

  function advance() {
    const isLastStation = stationIdx === stations.length - 1;
    const isLastRound = round === rounds;

    if (phase === "work") {
      setPhase("rest");
      setSecondsLeft(restSeconds);
    } else if (phase === "rest") {
      if (isLastStation && isLastRound) {
        setPhase("complete");
        setSecondsLeft(0);
      } else if (isLastStation && !isLastRound) {
        setPhase("round-rest");
        setSecondsLeft(roundRestSeconds);
      } else {
        setPhase("transition");
        setSecondsLeft(transitionSeconds);
      }
    } else if (phase === "transition") {
      setStationIdx((i) => i + 1);
      setSlideKey((k) => k + 1);
      setPhase("work");
      setSecondsLeft(workSeconds);
    } else if (phase === "round-rest") {
      setRound((r) => r + 1);
      setStationIdx(0);
      setSlideKey((k) => k + 1);
      setPhase("work");
      setSecondsLeft(workSeconds);
    }
  }

  // Countdown interval — recreated when phase or station changes
  useEffect(() => {
    if (paused || phase === "complete") return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, phase, stationIdx, round]);

  // Advance when the countdown hits zero
  useEffect(() => {
    if (secondsLeft === 0 && phase !== "complete") {
      advance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  if (phase === "complete") {
    return (
      <div className="timer-screen timer-complete-screen">
        <div className="timer-complete-card">
          <div className="complete-emoji">🎉</div>
          <h2 className="complete-title">Workout Done!</h2>
          <p className="complete-stats">
            {stations.length} stations · {rounds} round{rounds > 1 ? "s" : ""}
          </p>
          <p className="complete-cals">~{workout.estimatedCalories} cal burned</p>
          <button
            className="generate-btn"
            onClick={onEnd}
            style={{ marginTop: "2rem" }}
          >
            Back to Workout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="timer-screen">
      {/* Header */}
      <div className="timer-header">
        <button className="back-btn" onClick={onEnd}>
          ✕ End
        </button>
        <span className="timer-progress-text">
          Round {round}/{rounds}
        </span>
      </div>

      {/* Station progress dots */}
      <div className="station-dots">
        {stations.map((_, i) => (
          <div
            key={i}
            className={`station-dot ${
              i < stationIdx ? "done" : i === stationIdx ? "active" : ""
            }`}
          />
        ))}
      </div>

      {/* Exercise card — slides in when exercise changes */}
      <div key={slideKey} className="timer-exercise-card slide-in">
        <div className="timer-phase-label" style={{ color }}>
          {phase === "transition" || phase === "round-rest" ? (
            <span className="timer-coming-up-label">COMING UP</span>
          ) : (
            PHASE_LABEL[phase]
          )}
        </div>

        <h2 className="timer-exercise-name">{displayStation.exercise.name}</h2>

        {/* Circular countdown */}
        <div className="timer-circle-wrap">
          <svg width="140" height="140" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              stroke="#2a2a2a"
              strokeWidth="9"
            />
            <circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 64 64)"
              style={{
                transition: "stroke-dashoffset 0.85s linear, stroke 0.3s",
              }}
            />
          </svg>
          <div className="timer-number" style={{ color }}>
            {secondsLeft}
          </div>
        </div>

        {/* Instructions */}
        <p className="timer-instructions">
          {phase === "round-rest"
            ? `Great round! Rest up. Round ${round + 1} starts with ${stations[0].exercise.name}.`
            : displayStation.exercise.instructions}
        </p>

        {/* Weight */}
        <div className="timer-weight-badge">
          🏋️ {displayStation.exercise.startWeight}
        </div>
      </div>

      {/* Next up strip */}
      {nextStation && (
        <div className="timer-next-up">
          <span className="timer-next-label">Next</span>
          <span className="timer-next-name">{nextStation.exercise.name}</span>
        </div>
      )}

      {/* Controls */}
      <div className="timer-controls">
        <button
          className="timer-ctrl-btn"
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "▶ Resume" : "⏸ Pause"}
        </button>
        <button className="timer-ctrl-btn timer-skip-btn" onClick={advance}>
          Skip →
        </button>
      </div>
    </div>
  );
}
