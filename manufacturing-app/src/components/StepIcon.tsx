import type { StepType } from "../lib/claude";

interface Props {
  stepType: StepType;
  accentColor?: string;
}

export function StepIcon({ stepType, accentColor = "#e07b39" }: Props) {
  return (
    <div className="step-icon-wrap">
      {renderIcon(stepType, accentColor)}
    </div>
  );
}

function renderIcon(type: StepType, accent: string) {
  switch (type) {
    case "heat":    return <HeatIcon accent={accent} />;
    case "press":   return <PressIcon accent={accent} />;
    case "cut":     return <CutIcon accent={accent} />;
    case "inject":  return <InjectIcon accent={accent} />;
    case "cool":    return <CoolIcon />;
    case "eject":   return <EjectIcon accent={accent} />;
    case "finish":  return <FinishIcon accent={accent} />;
    case "inspect": return <InspectIcon />;
    case "coat":    return <CoatIcon accent={accent} />;
    case "weld":    return <WeldIcon />;
    case "assemble":return <AssembleIcon accent={accent} />;
    case "drill":   return <DrillIcon accent={accent} />;
    case "form":    return <FormIcon accent={accent} />;
    case "clean":   return <CleanIcon />;
    default:        return <GenericIcon />;
  }
}

/* ── Heat ── */
function HeatIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes ht-wave1 { 0%,100%{d:path('M18,36 Q20,28 18,22')} 50%{d:path('M18,36 Q16,28 18,22')} }
        @keyframes ht-wave2 { 0%,100%{d:path('M24,36 Q26,26 24,18')} 50%{d:path('M24,36 Q22,26 24,18')} }
        @keyframes ht-wave3 { 0%,100%{d:path('M30,36 Q32,28 30,22')} 50%{d:path('M30,36 Q28,28 30,22')} }
        @keyframes ht-glow { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .ht-w1 { animation: ht-wave1 1.2s ease-in-out infinite; }
        .ht-w2 { animation: ht-wave2 1.4s ease-in-out infinite; }
        .ht-w3 { animation: ht-wave3 1.0s ease-in-out infinite; }
        .ht-g  { animation: ht-glow 1.5s ease-in-out infinite; }
      `}</style>
      <ellipse cx="24" cy="38" rx="12" ry="4" fill={accent} opacity="0.25" className="ht-g" />
      <path className="ht-w1" d="M18,36 Q20,28 18,22" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path className="ht-w2" d="M24,36 Q26,26 24,18" stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path className="ht-w3" d="M30,36 Q32,28 30,22" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ── Press ── */
function PressIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes pr-ram { 0%,30%{transform:translateY(0)} 55%,65%{transform:translateY(10px)} 90%,100%{transform:translateY(0)} }
        .pr-ram { animation: pr-ram 1.6s ease-in-out infinite; }
      `}</style>
      {/* Base plate */}
      <rect x="10" y="36" width="28" height="5" rx="2" fill="#374151" />
      {/* Work piece */}
      <rect x="16" y="29" width="16" height="7" rx="2" fill="#4b5563" />
      {/* Ram */}
      <g className="pr-ram">
        <rect x="14" y="10" width="20" height="8" rx="2" fill={accent} opacity="0.9" />
        <rect x="20" y="18" width="8" height="10" rx="1" fill={accent} opacity="0.7" />
        {/* Guide post lines */}
        <line x1="12" y1="6" x2="12" y2="28" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="36" y1="6" x2="36" y2="28" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="2 2" />
      </g>
    </svg>
  );
}

/* ── Cut ── */
function CutIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes ct-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ct-move { 0%{transform:translateX(0)} 50%{transform:translateX(12px)} 100%{transform:translateX(0)} }
        @keyframes ct-chip { 0%,45%{opacity:0;transform:translate(0,0)} 50%{opacity:1} 70%,100%{opacity:0;transform:translate(6px,-5px)} }
        .ct-disc { animation: ct-spin 0.6s linear infinite; transform-origin: 24px 20px; }
        .ct-tool { animation: ct-move 2s ease-in-out infinite; }
        .ct-chip { animation: ct-chip 2s ease-in-out infinite; }
      `}</style>
      {/* Stock */}
      <rect x="8" y="30" width="32" height="8" rx="2" fill="#374151" />
      {/* Tool group */}
      <g className="ct-tool">
        <rect x="20" y="6" width="8" height="14" rx="2" fill="#6b7280" />
        {/* Spinning disc */}
        <g className="ct-disc">
          <circle cx="24" cy="20" r="8" fill={accent} opacity="0.85" />
          <line x1="24" y1="12" x2="24" y2="28" stroke="#1f2937" strokeWidth="1.5" />
          <line x1="16" y1="20" x2="32" y2="20" stroke="#1f2937" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="2.5" fill="#1f2937" />
        </g>
        {/* Chip */}
        <circle cx="31" cy="29" r="2" fill="#fbbf24" className="ct-chip" />
      </g>
    </svg>
  );
}

/* ── Inject ── */
function InjectIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes inj-push { 0%,20%{transform:translateX(0)} 55%,70%{transform:translateX(8px)} 90%,100%{transform:translateX(0)} }
        @keyframes inj-fill { 0%,25%{width:0;opacity:0} 60%,80%{width:14px;opacity:1} 90%,100%{opacity:0.4} }
        .inj-plunger { animation: inj-push 2s ease-in-out infinite; }
      `}</style>
      {/* Mold cavity */}
      <rect x="28" y="14" width="12" height="20" rx="3" fill="#374151" />
      <rect x="30" y="16" width="8" height="16" rx="2" fill="#1f2937" />
      {/* Fill indicator */}
      <rect x="30" y="24" width="8" height="8" rx="1" fill={accent} opacity="0.8" />
      {/* Barrel */}
      <rect x="8" y="20" width="22" height="8" rx="3" fill="#4b5563" />
      {/* Plunger */}
      <g className="inj-plunger">
        <rect x="4" y="22" width="10" height="4" rx="2" fill={accent} />
      </g>
      {/* Nozzle */}
      <polygon points="30,22 28,24 30,26" fill="#6b7280" />
    </svg>
  );
}

/* ── Cool ── */
function CoolIcon() {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes cl-pulse { 0%,100%{opacity:0.3;r:6} 50%{opacity:0.8;r:10} }
        @keyframes cl-pulse2 { 0%,100%{opacity:0.15;r:12} 50%{opacity:0.5;r:16} }
        @keyframes cl-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .cl-r1 { animation: cl-pulse 2s ease-in-out infinite; }
        .cl-r2 { animation: cl-pulse2 2s ease-in-out infinite; }
        .cl-flake { animation: cl-spin 4s linear infinite; transform-origin: 24px 24px; }
      `}</style>
      <circle cx="24" cy="24" className="cl-r2" r="12" fill="#3b82f6" opacity="0.15" />
      <circle cx="24" cy="24" className="cl-r1" r="6" fill="#60a5fa" opacity="0.3" />
      {/* Snowflake */}
      <g className="cl-flake">
        <line x1="24" y1="14" x2="24" y2="34" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="24" x2="34" y2="24" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="17" x2="31" y2="31" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="31" y1="17" x2="17" y2="31" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ── Eject ── */
function EjectIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes ej-up { 0%,30%{transform:translateY(0);opacity:1} 70%{transform:translateY(-10px);opacity:1} 80%,100%{transform:translateY(-10px);opacity:0} }
        @keyframes ej-pin { 0%,30%{transform:translateY(0)} 70%,100%{transform:translateY(-6px)} }
        .ej-part { animation: ej-up 1.8s ease-in-out infinite; }
        .ej-pin { animation: ej-pin 1.8s ease-in-out infinite; }
      `}</style>
      {/* Mold base */}
      <rect x="8" y="34" width="32" height="6" rx="2" fill="#374151" />
      {/* Ejector pins */}
      <g className="ej-pin">
        <rect x="19" y="28" width="3" height="8" rx="1" fill="#6b7280" />
        <rect x="26" y="28" width="3" height="8" rx="1" fill="#6b7280" />
      </g>
      {/* Part */}
      <g className="ej-part">
        <rect x="12" y="20" width="24" height="12" rx="3" fill={accent} opacity="0.85" />
        {/* Arrow up */}
        <polygon points="24,8 30,16 18,16" fill={accent} opacity="0.6" />
      </g>
    </svg>
  );
}

/* ── Finish ── */
function FinishIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes fn-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fn-spark1 { 0%,60%{opacity:0;transform:translate(0,0)} 65%{opacity:1} 80%,100%{opacity:0;transform:translate(7px,-6px)} }
        @keyframes fn-spark2 { 0%,65%{opacity:0;transform:translate(0,0)} 70%{opacity:1} 85%,100%{opacity:0;transform:translate(-5px,-8px)} }
        .fn-disc { animation: fn-spin 0.5s linear infinite; transform-origin: 20px 20px; }
        .fn-sp1 { animation: fn-spark1 0.8s ease-out infinite; }
        .fn-sp2 { animation: fn-spark2 0.9s ease-out infinite; }
      `}</style>
      {/* Work surface */}
      <rect x="14" y="32" width="26" height="6" rx="2" fill="#374151" />
      {/* Grinder disc */}
      <g className="fn-disc">
        <circle cx="20" cy="20" r="10" fill={accent} opacity="0.85" />
        <circle cx="20" cy="20" r="4" fill="#1f2937" />
        <line x1="20" y1="10" x2="20" y2="30" stroke="#1f2937" strokeWidth="1" />
        <line x1="10" y1="20" x2="30" y2="20" stroke="#1f2937" strokeWidth="1" />
      </g>
      {/* Sparks */}
      <circle cx="29" cy="30" r="2" fill="#fbbf24" className="fn-sp1" />
      <circle cx="28" cy="28" r="1.5" fill="#f59e0b" className="fn-sp2" />
      {/* Handle */}
      <rect x="28" y="14" width="6" height="16" rx="3" fill="#6b7280" />
    </svg>
  );
}

/* ── Inspect ── */
function InspectIcon() {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes ins-scan { 0%{transform:translate(0,0)} 33%{transform:translate(6px,-4px)} 66%{transform:translate(-4px,4px)} 100%{transform:translate(0,0)} }
        @keyframes ins-beam { 0%,100%{opacity:0.2} 50%{opacity:0.6} }
        .ins-glass { animation: ins-scan 3s ease-in-out infinite; }
        .ins-beam { animation: ins-beam 1.5s ease-in-out infinite; }
      `}</style>
      {/* Part to inspect */}
      <rect x="8" y="28" width="20" height="10" rx="3" fill="#374151" />
      {/* Magnifying glass */}
      <g className="ins-glass">
        <circle cx="26" cy="18" r="9" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
        <circle cx="26" cy="18" r="9" fill="#3b82f6" opacity="0.1" className="ins-beam" />
        <line x1="32" y1="26" x2="40" y2="36" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
        {/* Crosshair */}
        <line x1="22" y1="18" x2="30" y2="18" stroke="#93c5fd" strokeWidth="1" opacity="0.7" />
        <line x1="26" y1="14" x2="26" y2="22" stroke="#93c5fd" strokeWidth="1" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ── Coat ── */
function CoatIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes co-spray { 0%,100%{opacity:0;transform:scale(0)} 40%,60%{opacity:0.8;transform:scale(1)} }
        @keyframes co-d1 { 0%{opacity:0;cx:30;cy:20} 30%{opacity:1} 60%,100%{opacity:0;cx:36;cy:26} }
        @keyframes co-d2 { 0%{opacity:0;cx:32;cy:22} 40%{opacity:1} 70%,100%{opacity:0;cx:40;cy:30} }
        @keyframes co-d3 { 0%{opacity:0;cx:28;cy:24} 20%{opacity:1} 50%,100%{opacity:0;cx:34;cy:32} }
        .co-d1 { animation: co-d1 1.2s ease-out infinite; }
        .co-d2 { animation: co-d2 1.4s ease-out infinite 0.2s; }
        .co-d3 { animation: co-d3 1.1s ease-out infinite 0.1s; }
      `}</style>
      {/* Surface */}
      <rect x="8" y="34" width="24" height="6" rx="2" fill="#374151" />
      {/* Coat layer */}
      <rect x="8" y="30" width="24" height="4" rx="1" fill={accent} opacity="0.5" />
      {/* Spray gun */}
      <rect x="6" y="14" width="14" height="10" rx="3" fill="#4b5563" />
      <rect x="10" y="24" width="6" height="8" rx="2" fill="#4b5563" />
      <polygon points="20,16 26,18 20,20" fill="#6b7280" />
      {/* Droplets */}
      <circle className="co-d1" cx="30" cy="20" r="2.5" fill={accent} opacity="0" />
      <circle className="co-d2" cx="32" cy="22" r="2" fill={accent} opacity="0" />
      <circle className="co-d3" cx="28" cy="24" r="1.5" fill={accent} opacity="0" />
    </svg>
  );
}

/* ── Weld ── */
function WeldIcon() {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes wd-arc { 0%,100%{opacity:0} 20%,80%{opacity:1} 50%{opacity:0.5} }
        @keyframes wd-sp1 { 0%,30%{opacity:0;transform:translate(0,0)} 35%{opacity:1} 60%,100%{opacity:0;transform:translate(6px,-8px) rotate(20deg)} }
        @keyframes wd-sp2 { 0%,35%{opacity:0;transform:translate(0,0)} 40%{opacity:1} 65%,100%{opacity:0;transform:translate(-7px,-6px) rotate(-15deg)} }
        @keyframes wd-glow { 0%,100%{opacity:0.2} 50%{opacity:0.7} }
        .wd-arc { animation: wd-arc 0.4s ease-in-out infinite; }
        .wd-sp1 { animation: wd-sp1 0.8s ease-out infinite; }
        .wd-sp2 { animation: wd-sp2 0.9s ease-out infinite 0.1s; }
        .wd-glow { animation: wd-glow 0.4s ease-in-out infinite; }
      `}</style>
      {/* Base metal */}
      <rect x="8" y="30" width="32" height="6" rx="2" fill="#374151" />
      <rect x="8" y="30" width="15" height="6" rx="2" fill="#4b5563" />
      {/* Weld bead */}
      <ellipse cx="23" cy="30" rx="8" ry="3" fill="#f97316" opacity="0.7" className="wd-glow" />
      {/* Electrode */}
      <rect x="20" y="8" width="4" height="20" rx="2" fill="#6b7280" />
      <rect x="21" y="24" width="2" height="5" rx="1" fill="#9ca3af" />
      {/* Arc */}
      <circle cx="23" cy="29" r="3" fill="#fef08a" className="wd-arc" />
      {/* Sparks */}
      <line x1="23" y1="28" x2="29" y2="20" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className="wd-sp1" />
      <line x1="23" y1="28" x2="16" y2="22" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" className="wd-sp2" />
    </svg>
  );
}

/* ── Assemble ── */
function AssembleIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes as-left { 0%{transform:translateX(-8px);opacity:0.5} 60%,100%{transform:translateX(0);opacity:1} }
        @keyframes as-right { 0%{transform:translateX(8px);opacity:0.5} 60%,100%{transform:translateX(0);opacity:1} }
        @keyframes as-lock { 0%,50%{opacity:0} 70%,100%{opacity:1} }
        .as-l { animation: as-left 2s ease-in-out infinite; }
        .as-r { animation: as-right 2s ease-in-out infinite; }
        .as-lock { animation: as-lock 2s ease-in-out infinite; }
      `}</style>
      {/* Left piece */}
      <g className="as-l">
        <rect x="6" y="18" width="16" height="12" rx="3" fill="#4b5563" />
        <rect x="20" y="21" width="5" height="6" rx="1" fill={accent} opacity="0.8" />
      </g>
      {/* Right piece */}
      <g className="as-r">
        <rect x="26" y="18" width="16" height="12" rx="3" fill="#4b5563" />
        <rect x="23" y="21" width="5" height="6" rx="1" fill="#374151" />
      </g>
      {/* Lock indicator */}
      <circle cx="24" cy="37" r="4" fill={accent} opacity="0" className="as-lock" />
      <text x="24" y="40" textAnchor="middle" fill="#0f0f0f" fontSize="6" fontWeight="bold" className="as-lock">✓</text>
    </svg>
  );
}

/* ── Drill ── */
function DrillIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes dr-down { 0%,20%{transform:translateY(0)} 60%,70%{transform:translateY(10px)} 90%,100%{transform:translateY(0)} }
        @keyframes dr-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes dr-chip { 0%,55%{opacity:0;transform:translate(0,0)} 60%{opacity:1} 80%,100%{opacity:0;transform:translate(8px,4px)} }
        .dr-tool { animation: dr-down 2s ease-in-out infinite; }
        .dr-bit { animation: dr-spin 0.4s linear infinite; transform-origin: 24px 22px; }
        .dr-chip { animation: dr-chip 2s ease-in-out infinite; }
      `}</style>
      {/* Workpiece */}
      <rect x="10" y="32" width="28" height="8" rx="2" fill="#374151" />
      {/* Hole */}
      <ellipse cx="24" cy="32" rx="4" ry="1.5" fill="#1f2937" />
      {/* Drill assembly */}
      <g className="dr-tool">
        <rect x="20" y="6" width="8" height="10" rx="2" fill="#6b7280" />
        {/* Fluted bit */}
        <g className="dr-bit">
          <rect x="22" y="14" width="4" height="10" rx="1" fill={accent} />
          <line x1="22" y1="16" x2="26" y2="20" stroke="#1f2937" strokeWidth="1" />
          <line x1="22" y1="20" x2="26" y2="24" stroke="#1f2937" strokeWidth="1" />
        </g>
        <polygon points="21,24 27,24 24,30" fill={accent} opacity="0.8" />
        {/* Chip */}
        <circle cx="28" cy="30" r="2" fill="#fbbf24" className="dr-chip" />
      </g>
    </svg>
  );
}

/* ── Form / Bend ── */
function FormIcon({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes fm-bend {
          0%,20%{d:path('M10,28 L38,28')}
          55%,70%{d:path('M10,28 L24,28 Q28,28 32,22 L38,16')}
          90%,100%{d:path('M10,28 L38,28')}
        }
        @keyframes fm-punch { 0%,20%{transform:translateY(0)} 50%,65%{transform:translateY(8px)} 90%,100%{transform:translateY(0)} }
        .fm-sheet { animation: fm-bend 2.5s ease-in-out infinite; }
        .fm-punch { animation: fm-punch 2.5s ease-in-out infinite; }
      `}</style>
      {/* Die */}
      <rect x="8" y="32" width="32" height="6" rx="2" fill="#374151" />
      <rect x="20" y="26" width="8" height="8" rx="1" fill="#4b5563" />
      {/* Sheet */}
      <path className="fm-sheet" d="M10,28 L38,28" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Punch */}
      <g className="fm-punch">
        <rect x="19" y="10" width="10" height="14" rx="2" fill="#4b5563" />
        <polygon points="19,24 29,24 26,28 22,28" fill="#6b7280" />
      </g>
    </svg>
  );
}

/* ── Clean ── */
function CleanIcon() {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes cn-drop1 { 0%{transform:translateY(0);opacity:0} 10%{opacity:1} 70%{transform:translateY(16px);opacity:1} 80%,100%{transform:translateY(16px);opacity:0} }
        @keyframes cn-drop2 { 0%,15%{transform:translateY(0);opacity:0} 25%{opacity:1} 85%{transform:translateY(14px);opacity:1} 95%,100%{transform:translateY(14px);opacity:0} }
        @keyframes cn-drop3 { 0%,8%{transform:translateY(0);opacity:0} 18%{opacity:1} 75%{transform:translateY(18px);opacity:1} 85%,100%{transform:translateY(18px);opacity:0} }
        @keyframes cn-shine { 0%,100%{opacity:0} 50%{opacity:1} }
        .cn-d1 { animation: cn-drop1 1.6s ease-in infinite; }
        .cn-d2 { animation: cn-drop2 1.6s ease-in infinite 0.3s; }
        .cn-d3 { animation: cn-drop3 1.6s ease-in infinite 0.15s; }
        .cn-shine { animation: cn-shine 2s ease-in-out infinite; }
      `}</style>
      {/* Part */}
      <rect x="10" y="30" width="28" height="8" rx="3" fill="#374151" />
      {/* Shine */}
      <line x1="14" y1="32" x2="18" y2="36" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0" className="cn-shine" />
      {/* Water drops */}
      <ellipse className="cn-d1" cx="18" cy="14" rx="2.5" ry="3.5" fill="#60a5fa" opacity="0" />
      <ellipse className="cn-d2" cx="24" cy="12" rx="2" ry="3" fill="#93c5fd" opacity="0" />
      <ellipse className="cn-d3" cx="30" cy="14" rx="2.5" ry="3.5" fill="#60a5fa" opacity="0" />
      {/* Spray line */}
      <path d="M10,8 Q24,4 38,8" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/* ── Generic ── */
function GenericIcon() {
  return (
    <svg viewBox="0 0 48 48" className="step-icon-svg">
      <style>{`
        @keyframes gn-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .gn-gear { animation: gn-spin 3s linear infinite; transform-origin: 24px 24px; }
      `}</style>
      <g className="gn-gear">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <rect
            key={i}
            x="20" y="8" width="8" height="6" rx="1" fill="#4b5563"
            transform={`rotate(${angle} 24 24)`}
          />
        ))}
        <circle cx="24" cy="24" r="12" fill="#374151" />
        <circle cx="24" cy="24" r="5" fill="#1f2937" />
      </g>
    </svg>
  );
}
