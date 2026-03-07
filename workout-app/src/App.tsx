import { useState } from "react";
import { TimeInput } from "./components/TimeInput";
import { WorkoutDisplay } from "./components/WorkoutDisplay";
import { generateWorkout } from "./lib/generator";
import type { Workout } from "./lib/generator";
import "./App.css";

export default function App() {
  const [workout, setWorkout] = useState<Workout | null>(null);

  function handleStart(minutes: number) {
    setWorkout(generateWorkout(minutes));
  }

  function handleReset() {
    setWorkout(null);
  }

  return (
    <div className="app">
      {workout ? (
        <WorkoutDisplay workout={workout} onReset={handleReset} />
      ) : (
        <TimeInput onStart={handleStart} />
      )}
    </div>
  );
}
