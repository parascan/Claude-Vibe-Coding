import { useState } from "react";

type DayMode = "strength" | "beach-muscles" | "legs-day" | "pull-day" | "cardio" | "rest";

const STORAGE_KEY = "workout-weekly-plan";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DEFAULT_PLAN: DayMode[] = [
  "beach-muscles",
  "rest",
  "pull-day",
  "rest",
  "legs-day",
  "cardio",
  "rest",
];

const OPTIONS: { value: DayMode; label: string; emoji: string; color: string }[] = [
  { value: "strength",      label: "Strength",     emoji: "🏋️", color: "#e07b39" },
  { value: "beach-muscles", label: "Beach",        emoji: "🏖️", color: "#3b82f6" },
  { value: "pull-day",      label: "Pull",         emoji: "💪", color: "#8b5cf6" },
  { value: "legs-day",      label: "Legs",         emoji: "🦵", color: "#f59e0b" },
  { value: "cardio",        label: "Cardio",       emoji: "🏃", color: "#10b981" },
  { value: "rest",          label: "Rest",         emoji: "😴", color: "#4b5563" },
];

function load(): DayMode[] {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (Array.isArray(stored) && stored.length === 7) return stored;
  } catch { /* ignore */ }
  return DEFAULT_PLAN;
}

function save(plan: DayMode[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
}

function getOption(value: DayMode) {
  return OPTIONS.find((o) => o.value === value)!;
}

interface Props {
  onBack: () => void;
}

export function WeeklyPlanner({ onBack }: Props) {
  const [plan, setPlan] = useState<DayMode[]>(load);

  function setDay(idx: number, value: DayMode) {
    const next = plan.map((d, i) => (i === idx ? value : d));
    setPlan(next);
    save(next);
  }

  function reset() {
    setPlan(DEFAULT_PLAN);
    save(DEFAULT_PLAN);
  }

  const workDays = plan.filter((d) => d !== "rest").length;
  const restDays = 7 - workDays;

  return (
    <div className="planner-screen">
      <div className="workout-header" style={{ paddingTop: "0.5rem" }}>
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h2>Weekly Plan</h2>
      </div>

      <p className="planner-subtitle">
        Tap any day to change it. Your plan is saved automatically.
      </p>

      <div className="planner-grid">
        {DAYS.map((day, i) => {
          const opt = getOption(plan[i]);
          return (
            <div key={day} className="planner-day">
              <span className="planner-day-label">{day}</span>
              <div className="planner-day-options">
                {OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    className={`planner-option-btn${plan[i] === o.value ? " active" : ""}`}
                    style={plan[i] === o.value
                      ? { borderColor: o.color, background: o.color + "22", color: o.color }
                      : {}}
                    onClick={() => setDay(i, o.value)}
                    title={o.label}
                  >
                    {o.emoji}
                  </button>
                ))}
              </div>
              <span className="planner-day-name" style={{ color: opt.color }}>
                {opt.emoji} {opt.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="planner-summary">
        <span><strong>{workDays}</strong> training days</span>
        <span className="planner-sep">·</span>
        <span><strong>{restDays}</strong> rest days</span>
      </div>

      <button className="planner-reset-btn" onClick={reset}>
        Reset to push/pull/legs template
      </button>

      <div className="tip-box">
        <strong>Template:</strong> Beach (push) → Rest → Pull → Rest → Legs → Cardio → Rest.
        Classic push/pull/legs split with a cardio day built in.
      </div>
    </div>
  );
}
