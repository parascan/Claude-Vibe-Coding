import type { ManufacturingAnalysis, ProcessId } from "../lib/claude";
import { ProcessAnimation } from "./ProcessAnimation";
import { StepIcon } from "./StepIcon";

interface Props {
  analysis: ManufacturingAnalysis;
  onReset: () => void;
}

const PROCESS_COLORS: Record<ProcessId, { bg: string; text: string; border: string }> = {
  "injection-molding": { bg: "#1a2e1a", text: "#86efac", border: "#1e3a1e" },
  "cnc-milling":       { bg: "#1a1a2e", text: "#93c5fd", border: "#1e2040" },
  "cnc-turning":       { bg: "#1a1a2e", text: "#93c5fd", border: "#1e2040" },
  "3d-printing":       { bg: "#1a0e2e", text: "#c4b5fd", border: "#2a1a3e" },
  "casting":           { bg: "#2e1a0e", text: "#fbbf24", border: "#3e2a0e" },
  "stamping":          { bg: "#2e1e1a", text: "#fca5a5", border: "#3e2e1a" },
  "forging":           { bg: "#2e1a0a", text: "#fb923c", border: "#3e2a0a" },
  "extrusion":         { bg: "#0e1a2e", text: "#7dd3fc", border: "#0e2040" },
  "welding":           { bg: "#2e1a1a", text: "#f87171", border: "#3e2a1a" },
  "thermoforming":     { bg: "#1a2e2e", text: "#5eead4", border: "#1a3e3e" },
  "unknown":           { bg: "#1c1c1c", text: "#9ca3af", border: "#2d2d2d" },
};

export function ProcessResult({ analysis, onReset }: Props) {
  const colors = PROCESS_COLORS[analysis.processId] ?? PROCESS_COLORS["unknown"]!;

  return (
    <div className="result-screen">
      {/* Header */}
      <div className="result-header">
        <button className="back-btn" onClick={onReset}>← Back</button>
        <div className="result-header-right">
          <span
            className="process-badge"
            style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
          >
            {analysis.primaryProcess}
          </span>
        </div>
      </div>

      {/* Item name + material */}
      <div className="result-hero">
        <h2 className="result-item-name">{analysis.itemName}</h2>
        <span className="material-badge">{analysis.material}</span>
      </div>

      {/* Why this process */}
      <div className="why-box">
        <span className="why-icon">💡</span>
        <p>{analysis.whyThisProcess}</p>
      </div>

      {/* Animation */}
      <ProcessAnimation processId={analysis.processId} />

      {/* Steps */}
      <div className="steps-section">
        <h3 className="section-title">Manufacturing Steps</h3>
        <div className="steps-list">
          {analysis.steps.map((s) => (
            <div key={s.step} className="step-card">
              <div
                className="step-header"
                style={{ borderLeftColor: colors.text }}
              >
                <span
                  className="step-num"
                  style={{ background: colors.text, color: "#0f0f0f" }}
                >
                  {s.step}
                </span>
                <div className="step-title-group">
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.description}</div>
                </div>
                <StepIcon stepType={s.stepType ?? "generic"} accentColor={colors.text} />
              </div>
              {s.detail && (
                <div className="step-detail">
                  <span className="detail-icon">⚙️</span>
                  {s.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key facts */}
      <div className="facts-section">
        <h3 className="section-title">Key Facts</h3>
        <div className="facts-grid">
          {analysis.keyFacts.map((fact, i) => (
            <div key={i} className="fact-chip">{fact}</div>
          ))}
        </div>
      </div>

      {/* Alternatives */}
      {analysis.alternatives.length > 0 && (
        <div className="alts-section">
          <h3 className="section-title">Alternative Processes</h3>
          <div className="alts-list">
            {analysis.alternatives.map((alt, i) => (
              <div key={i} className="alt-item">
                <span className="alt-dot" />
                {alt}
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="analyze-btn" onClick={onReset}>
        Analyze Another Part
      </button>
    </div>
  );
}
