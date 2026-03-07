import { useState } from "react";
import { ModeSelect } from "./components/ModeSelect";
import { TimeInput } from "./components/TimeInput";
import { WorkoutDisplay } from "./components/WorkoutDisplay";
import { CardioDisplay } from "./components/CardioDisplay";
import { CardioTimer } from "./components/CardioTimer";
import { generateWorkout } from "./lib/generator";
import { generateCardioSessions } from "./lib/cardioGenerator";
import type { Workout } from "./lib/generator";
import type { CardioSession } from "./lib/cardioGenerator";
import "./App.css";

type Mode = "strength" | "cardio";

export default function App() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [cardioSessions, setCardioSessions] = useState<CardioSession[] | null>(null);
  const [activeCardioSession, setActiveCardioSession] = useState<CardioSession | null>(null);

  function handleModeSelect(selected: Mode) {
    setMode(selected);
  }

  function handleStart(minutes: number) {
    if (mode === "strength") {
      setWorkout(generateWorkout(minutes));
    } else {
      setCardioSessions(generateCardioSessions(minutes));
    }
  }

  function handleBackToMode() {
    setMode(null);
    setWorkout(null);
    setCardioSessions(null);
    setActiveCardioSession(null);
  }

  function handleBackToTime() {
    setWorkout(null);
    setCardioSessions(null);
    setActiveCardioSession(null);
  }

  return (
    <div className="app">
      {mode === null && (
        <ModeSelect onSelect={handleModeSelect} />
      )}
      {mode !== null && workout === null && cardioSessions === null && (
        <TimeInput mode={mode} onStart={handleStart} onBack={handleBackToMode} />
      )}
      {workout !== null && (
        <WorkoutDisplay workout={workout} onReset={handleBackToTime} />
      )}
      {cardioSessions !== null && activeCardioSession === null && (
        <CardioDisplay
          sessions={cardioSessions}
          onReset={handleBackToTime}
          onStartTimer={setActiveCardioSession}
        />
      )}
      {activeCardioSession !== null && (
        <CardioTimer
          session={activeCardioSession}
          onEnd={() => setActiveCardioSession(null)}
        />
      )}
    </div>
  );
}
