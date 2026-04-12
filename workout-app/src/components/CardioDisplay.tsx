import type { CardioSession, CardioInterval } from "../lib/cardioGenerator";

interface Props {
  sessions: CardioSession[];
  onReset: () => void;
  onStartTimer: (session: CardioSession) => void;
}

const INTERVAL_COLORS: Record<CardioInterval["type"], string> = {
  warmup: "interval-warmup",
  easy: "interval-easy",
  moderate: "interval-moderate",
  hard: "interval-hard",
  cooldown: "interval-cooldown",
};

export function CardioDisplay({ sessions, onReset, onStartTimer }: Props) {
  return (
    <div className="workout-display">
      <div className="workout-header">
        <button className="back-btn" onClick={onReset}>
          ← New Cardio
        </button>
        <h2>Pick Your Cardio</h2>
      </div>

      <p className="cardio-intro">
        3 options for your {sessions[0].totalMinutes}-minute session. Pick
        whichever suits you today.
      </p>

      <div className="cardio-sessions">
        {sessions.map((session) => (
          <div key={session.activity.id} className="cardio-card">
            <div className="cardio-card-header">
              <span className="cardio-emoji">{session.activity.emoji}</span>
              <div className="cardio-title-group">
                <h3 className="cardio-name">{session.activity.name}</h3>
                <p className="cardio-tagline">{session.activity.tagline}</p>
              </div>
              <div className="cardio-meta">
                <span className="cardio-cal">~{session.estimatedCalories} cal</span>
                <span className={`cardio-equip equip-${session.activity.equipment}`}>
                  {session.activity.equipment === "road"
                    ? "🛣️ Road"
                    : session.activity.equipment === "peloton"
                    ? "🚴 Peloton"
                    : "🏠 Alternative"}
                </span>
              </div>
            </div>

            <div className="cardio-intervals">
              {session.intervals.map((interval, i) => (
                <div
                  key={i}
                  className={`cardio-interval ${INTERVAL_COLORS[interval.type]}`}
                >
                  <div className="interval-header">
                    <span className="interval-label">{interval.label}</span>
                    <span className="interval-duration">
                      {interval.minutes} min
                    </span>
                  </div>
                  <p className="interval-desc">{interval.description}</p>
                </div>
              ))}
            </div>

            <div className="cardio-tip">
              <span className="tip-icon">💡</span>
              {session.activity.tip}
            </div>

            <button
              className="start-cardio-timer-btn"
              onClick={() => onStartTimer(session)}
            >
              ▶ Start Timer with Audio Cues
            </button>
          </div>
        ))}
      </div>

      <button className="generate-btn" onClick={onReset}>
        Show 3 More Options
      </button>
    </div>
  );
}
