import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { ProcessResult } from "./components/ProcessResult";
import { analyzeManufacturing } from "./lib/claude";
import type { ManufacturingAnalysis } from "./lib/claude";
import "./App.css";

type Screen = "home" | "loading" | "result" | "error";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [analysis, setAnalysis] = useState<ManufacturingAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze(input: {
    text?: string;
    imageBase64?: string;
    imageMimeType?: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
  }) {
    setScreen("loading");
    setError(null);
    try {
      const result = await analyzeManufacturing(input);
      setAnalysis(result);
      setScreen("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setScreen("error");
    }
  }

  function handleReset() {
    setScreen("home");
    setAnalysis(null);
    setError(null);
  }

  return (
    <div className="app">
      {(screen === "home" || screen === "loading") && (
        <HomeScreen onAnalyze={handleAnalyze} loading={screen === "loading"} />
      )}
      {screen === "error" && (
        <div className="error-screen">
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h2>Analysis Failed</h2>
            <p className="error-msg">{error}</p>
            <button className="analyze-btn" onClick={handleReset}>
              Try Again
            </button>
          </div>
        </div>
      )}
      {screen === "result" && analysis !== null && (
        <ProcessResult analysis={analysis} onReset={handleReset} />
      )}
    </div>
  );
}
