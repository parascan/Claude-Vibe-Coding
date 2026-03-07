import { useState, useEffect, useRef } from "react";
import type { CardioSession, CardioInterval } from "../lib/cardioGenerator";

interface Props {
  session: CardioSession;
  onEnd: () => void;
}

const INTERVAL_COLOR: Record<CardioInterval["type"], string> = {
  warmup: "#86efac",
  easy: "#6ee7b7",
  moderate: "#93c5fd",
  hard: "#fbbf24",
  cooldown: "#86efac",
};

const INTERVAL_HEADING: Record<CardioInterval["type"], string> = {
  warmup: "Warm Up",
  easy: "Easy Pace",
  moderate: "Moderate",
  hard: "Hard Effort",
  cooldown: "Cool Down",
};

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1.05;
  window.speechSynthesis.speak(u);
}

function getAnnouncement(interval: CardioInterval): string {
  switch (interval.type) {
    case "warmup":
      return `Warm up time. ${interval.description}`;
    case "easy":
      return `${interval.label}. Easy pace. ${interval.description}`;
    case "moderate":
      return `${interval.label}. Moderate effort. ${interval.description}`;
    case "hard":
      return `${interval.label}. Hard effort — push it! ${interval.description}`;
    case "cooldown":
      return `Cool down. Let your heart rate come down. ${interval.description}`;
    default:
      return interval.label;
  }
}

export function CardioTimer({ session, onEnd }: Props) {
  const { intervals, activity, estimatedCalories, totalMinutes } = session;

  const [intervalIdx, setIntervalIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(intervals[0].minutes * 60);
  const [paused, setPaused] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const [complete, setComplete] = useState(false);
  const announced30Ref = useRef(false);
  const announced10Ref = useRef(false);

  const interval = intervals[intervalIdx];
  const totalSeconds = interval.minutes * 60;
  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const color = INTERVAL_COLOR[interval.type];
  const nextInterval =
    intervalIdx < intervals.length - 1 ? intervals[intervalIdx + 1] : null;

  // Announce when interval changes
  useEffect(() => {
    announced30Ref.current = false;
    announced10Ref.current = false;
    speak(getAnnouncement(intervals[intervalIdx]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalIdx]);

  // Countdown warnings
  useEffect(() => {
    if (secondsLeft === 30 && !announced30Ref.current) {
      announced30Ref.current = true;
      speak("30 seconds left.");
    }
    if (secondsLeft === 10 && !announced10Ref.current) {
      announced10Ref.current = true;
      speak("10 seconds.");
    }
  }, [secondsLeft]);

  function advance() {
    if (intervalIdx >= intervals.length - 1) {
      setComplete(true);
      speak("Great work! Session complete. Well done.");
    } else {
      const next = intervalIdx + 1;
      setIntervalIdx(next);
      setSecondsLeft(intervals[next].minutes * 60);
      setSlideKey((k) => k + 1);
    }
  }

  useEffect(() => {
    if (paused || complete) return;
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
  }, [paused, intervalIdx, complete]);

  useEffect(() => {
    if (secondsLeft === 0 && !complete) {
      advance();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeDisplay = `${mins}:${secs.toString().padStart(2, "0")}`;

  if (complete) {
    return (
      <div className="timer-screen timer-complete-screen">
        <div className="timer-complete-card">
          <div className="complete-emoji">🎉</div>
          <h2 className="complete-title">Session Done!</h2>
          <p className="complete-stats">
            {activity.name} · {totalMinutes} min
          </p>
          <p className="complete-cals">~{estimatedCalories} cal burned</p>
          <button
            className="generate-btn"
            onClick={onEnd}
            style={{ marginTop: "2rem" }}
          >
            Back to Cardio
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
          {activity.emoji} {activity.name}
        </span>
      </div>

      {/* Interval progress dots */}
      <div className="station-dots">
        {intervals.map((_, i) => (
          <div
            key={i}
            className={`station-dot ${
              i < intervalIdx ? "done" : i === intervalIdx ? "active" : ""
            }`}
            style={i === intervalIdx ? { background: color } : undefined}
          />
        ))}
      </div>

      {/* Interval card */}
      <div key={slideKey} className="timer-exercise-card slide-in">
        <div className="timer-phase-label" style={{ color }}>
          {interval.label.toUpperCase()}
        </div>

        <h2 className="timer-exercise-name" style={{ color }}>
          {INTERVAL_HEADING[interval.type]}
        </h2>

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
          <div className="timer-number cardio-timer-number" style={{ color }}>
            {timeDisplay}
          </div>
        </div>

        <p className="timer-instructions">{interval.description}</p>
      </div>

      {/* Next up */}
      {nextInterval && (
        <div className="timer-next-up">
          <span className="timer-next-label">Next</span>
          <span className="timer-next-name">
            {nextInterval.label} · {nextInterval.minutes} min
          </span>
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
