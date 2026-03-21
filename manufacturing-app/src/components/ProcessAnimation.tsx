import type { ProcessId } from "../lib/claude";

interface Props {
  processId: ProcessId;
}

export function ProcessAnimation({ processId }: Props) {
  return (
    <div className="anim-wrap">
      <div className="anim-label">Process Animation</div>
      <div className="anim-stage">{renderAnimation(processId)}</div>
    </div>
  );
}

function renderAnimation(id: ProcessId) {
  switch (id) {
    case "injection-molding":
      return <InjectionMoldingAnim />;
    case "cnc-milling":
      return <CNCMillingAnim />;
    case "cnc-turning":
      return <CNCTurningAnim />;
    case "3d-printing":
      return <PrintingAnim />;
    case "casting":
      return <CastingAnim />;
    case "stamping":
      return <StampingAnim />;
    case "forging":
      return <ForgingAnim />;
    case "extrusion":
      return <ExtrusionAnim />;
    default:
      return <GenericAnim />;
  }
}

/* ── Injection Molding ── */
function InjectionMoldingAnim() {
  return (
    <svg viewBox="0 0 280 160" className="process-svg">
      <style>{`
        @keyframes imClose { 0%,15%{transform:translateY(0)} 30%,70%{transform:translateY(28px)} 85%,100%{transform:translateY(0)} }
        @keyframes imCloseB { 0%,15%{transform:translateY(0)} 30%,70%{transform:translateY(-28px)} 85%,100%{transform:translateY(0)} }
        @keyframes imFill { 0%,25%{opacity:0;transform:scaleY(0)} 45%,65%{opacity:1;transform:scaleY(1)} 80%,100%{opacity:0} }
        @keyframes imPart { 0%,70%{opacity:0} 80%,90%{opacity:1;transform:translateY(0)} 100%{opacity:0.6;transform:translateY(12px)} }
        .im-top { animation: imClose 3s ease-in-out infinite; transform-origin: 140px 40px; }
        .im-bot { animation: imCloseB 3s ease-in-out infinite; transform-origin: 140px 120px; }
        .im-fill { animation: imFill 3s ease-in-out infinite; transform-origin: 140px 80px; }
        .im-part { animation: imPart 3s ease-in-out infinite; }
      `}</style>
      {/* Mold top half */}
      <rect className="im-top" x="70" y="20" width="140" height="40" rx="4" fill="#4b5563" />
      <rect className="im-top" x="110" y="55" width="60" height="8" rx="2" fill="#374151" />
      {/* Mold bottom half */}
      <rect className="im-bot" x="70" y="100" width="140" height="40" rx="4" fill="#4b5563" />
      <rect className="im-bot" x="110" y="97" width="60" height="8" rx="2" fill="#374151" />
      {/* Molten fill */}
      <rect className="im-fill" x="112" y="62" width="56" height="36" rx="2" fill="#e07b39" opacity="0" />
      {/* Ejected part */}
      <rect className="im-part" x="112" y="108" width="56" height="18" rx="3" fill="#d97706" opacity="0" />
      {/* Sprue */}
      <rect x="132" y="4" width="16" height="18" rx="2" fill="#6b7280" />
      {/* Labels */}
      <text x="140" y="155" textAnchor="middle" fill="#6b7280" fontSize="10">Injection Molding</text>
    </svg>
  );
}

/* ── CNC Milling ── */
function CNCMillingAnim() {
  return (
    <svg viewBox="0 0 280 160" className="process-svg">
      <style>{`
        @keyframes cncTool { 0%{transform:translateX(0)} 50%{transform:translateX(120px)} 100%{transform:translateX(0)} }
        @keyframes cncSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes chip1 { 0%,40%{opacity:0;transform:translate(0,0)} 45%{opacity:1} 60%,100%{opacity:0;transform:translate(-12px,-10px)} }
        @keyframes chip2 { 0%,45%{opacity:0;transform:translate(0,0)} 50%{opacity:1} 65%,100%{opacity:0;transform:translate(10px,-12px)} }
        @keyframes stockCut { 0%{clip-path:inset(0 60% 0 0)} 50%{clip-path:inset(0 0% 0 0)} 100%{clip-path:inset(0 0% 0 0)} }
        .cnc-tool-g { animation: cncTool 4s ease-in-out infinite; }
        .cnc-bit { animation: cncSpin 0.3s linear infinite; transform-origin: 80px 65px; }
        .cnc-chip1 { animation: chip1 4s ease-in-out infinite; }
        .cnc-chip2 { animation: chip2 4s ease-in-out infinite; }
      `}</style>
      {/* Stock */}
      <rect x="60" y="90" width="160" height="40" rx="4" fill="#374151" />
      {/* Cut surface (lighter as tool passes) */}
      <rect x="60" y="90" width="160" height="12" rx="0" fill="#4b5563" />
      {/* Machine arm */}
      <g className="cnc-tool-g">
        <rect x="72" y="20" width="16" height="48" rx="3" fill="#6b7280" />
        {/* Spindle */}
        <circle cx="80" cy="65" r="10" fill="#9ca3af" className="cnc-bit" />
        <line x1="80" y1="55" x2="80" y2="75" stroke="#374151" strokeWidth="2" />
        <line x1="70" y1="65" x2="90" y2="65" stroke="#374151" strokeWidth="2" />
        {/* End mill flutes */}
        <rect x="76" y="68" width="8" height="16" rx="2" fill="#6b7280" />
        {/* Chips */}
        <circle cx="80" cy="84" r="3" fill="#fbbf24" className="cnc-chip1" />
        <circle cx="84" cy="82" r="2" fill="#f59e0b" className="cnc-chip2" />
      </g>
      {/* Guide rails */}
      <rect x="50" y="18" width="180" height="6" rx="3" fill="#1f2937" />
      <text x="140" y="155" textAnchor="middle" fill="#6b7280" fontSize="10">CNC Milling</text>
    </svg>
  );
}

/* ── CNC Turning / Lathe ── */
function CNCTurningAnim() {
  return (
    <svg viewBox="0 0 280 160" className="process-svg">
      <style>{`
        @keyframes latheRot { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes latheTool { 0%{transform:translateX(0)} 60%{transform:translateX(-50px)} 100%{transform:translateX(0)} }
        @keyframes latheChip { 0%,50%{opacity:0} 55%{opacity:1;transform:translate(0,0)} 75%,100%{opacity:0;transform:translate(8px,-8px)} }
        .lathe-part { animation: latheRot 0.8s linear infinite; transform-origin: 130px 80px; }
        .lathe-tool-g { animation: latheTool 3s ease-in-out infinite; }
        .lathe-chip { animation: latheChip 3s ease-in-out infinite; }
      `}</style>
      {/* Chuck */}
      <rect x="30" y="55" width="30" height="50" rx="4" fill="#374151" />
      <rect x="34" y="60" width="22" height="40" rx="2" fill="#4b5563" />
      {/* Rotating workpiece */}
      <g className="lathe-part">
        <ellipse cx="130" cy="80" rx="65" ry="25" fill="#6b7280" />
        <ellipse cx="130" cy="80" rx="55" ry="20" fill="#9ca3af" />
        <line x1="65" y1="80" x2="195" y2="80" stroke="#4b5563" strokeWidth="2" />
      </g>
      {/* Tailstock */}
      <rect x="200" y="60" width="25" height="40" rx="4" fill="#374151" />
      {/* Cutting tool */}
      <g className="lathe-tool-g">
        <rect x="168" y="74" width="30" height="10" rx="2" fill="#fbbf24" />
        <polygon points="198,74 210,69 210,84 198,84" fill="#f59e0b" />
        <rect x="210" y="66" width="8" height="28" rx="2" fill="#6b7280" />
        <circle cx="172" cy="84" r="3" fill="#fbbf24" className="lathe-chip" />
      </g>
      <text x="140" y="155" textAnchor="middle" fill="#6b7280" fontSize="10">CNC Turning / Lathe</text>
    </svg>
  );
}

/* ── 3D Printing ── */
function PrintingAnim() {
  return (
    <svg viewBox="0 0 280 160" className="process-svg">
      <style>{`
        @keyframes layer1 { 0%,10%{opacity:0} 20%,100%{opacity:1} }
        @keyframes layer2 { 0%,25%{opacity:0} 35%,100%{opacity:1} }
        @keyframes layer3 { 0%,40%{opacity:0} 50%,100%{opacity:1} }
        @keyframes layer4 { 0%,55%{opacity:0} 65%,100%{opacity:1} }
        @keyframes layer5 { 0%,70%{opacity:0} 80%,100%{opacity:1} }
        @keyframes nozzle {
          0%{transform:translate(0,0)} 15%{transform:translate(60px,0)}
          20%{transform:translate(60px,-12px)} 35%{transform:translate(0,-12px)}
          40%{transform:translate(0,-24px)} 55%{transform:translate(60px,-24px)}
          60%{transform:translate(60px,-36px)} 75%{transform:translate(0,-36px)}
          80%{transform:translate(0,-48px)} 95%{transform:translate(60px,-48px)}
          100%{transform:translate(60px,-48px)}
        }
        @keyframes filament { 0%,100%{opacity:0.8} 50%{opacity:0.4} }
        .p-l1{animation:layer1 4s ease-out infinite}
        .p-l2{animation:layer2 4s ease-out infinite}
        .p-l3{animation:layer3 4s ease-out infinite}
        .p-l4{animation:layer4 4s ease-out infinite}
        .p-l5{animation:layer5 4s ease-out infinite}
        .p-nozzle{animation:nozzle 4s linear infinite}
        .p-fil{animation:filament 0.5s linear infinite}
      `}</style>
      {/* Build plate */}
      <rect x="80" y="128" width="120" height="8" rx="2" fill="#374151" />
      {/* Layers */}
      <rect className="p-l1" x="90" y="116" width="100" height="12" rx="2" fill="#1d4ed8" opacity="0" />
      <rect className="p-l2" x="90" y="104" width="100" height="12" rx="2" fill="#2563eb" opacity="0" />
      <rect className="p-l3" x="90" y="92" width="100" height="12" rx="2" fill="#3b82f6" opacity="0" />
      <rect className="p-l4" x="90" y="80" width="100" height="12" rx="2" fill="#60a5fa" opacity="0" />
      <rect className="p-l5" x="90" y="68" width="100" height="12" rx="2" fill="#93c5fd" opacity="0" />
      {/* Print head + nozzle */}
      <g className="p-nozzle" style={{ transformOrigin: "90px 116px" }}>
        <rect x="82" y="32" width="16" height="22" rx="3" fill="#6b7280" />
        <polygon points="86,54 94,54 92,62 88,62" fill="#9ca3af" />
        {/* Filament dot */}
        <circle cx="90" cy="63" r="2.5" fill="#e07b39" className="p-fil" />
      </g>
      {/* Gantry rail */}
      <rect x="70" y="28" width="140" height="6" rx="3" fill="#1f2937" />
      <rect x="70" y="28" width="6" height="90" rx="3" fill="#1f2937" />
      <rect x="204" y="28" width="6" height="90" rx="3" fill="#1f2937" />
      <text x="140" y="155" textAnchor="middle" fill="#6b7280" fontSize="10">FDM 3D Printing</text>
    </svg>
  );
}

/* ── Casting ── */
function CastingAnim() {
  return (
    <svg viewBox="0 0 280 160" className="process-svg">
      <style>{`
        @keyframes pour { 0%,20%{transform:rotate(0deg)} 35%,75%{transform:rotate(-35deg)} 85%,100%{transform:rotate(0deg)} }
        @keyframes liquid { 0%,30%{height:0;opacity:0} 35%{opacity:1} 70%{height:50px;opacity:1} 80%,100%{opacity:0.6} }
        @keyframes stream { 0%,20%{opacity:0;transform:scaleY(0)} 35%,70%{opacity:1;transform:scaleY(1)} 75%,100%{opacity:0;transform:scaleY(0)} }
        @keyframes solidify { 0%,65%{fill:#e07b39} 85%,100%{fill:#6b7280} }
        .cast-ladle{animation:pour 4s ease-in-out infinite;transform-origin:100px 45px}
        .cast-stream{animation:stream 4s ease-in-out infinite;transform-origin:140px 70px}
        .cast-liquid{animation:liquid 4s ease-in-out infinite}
        .cast-metal{animation:solidify 4s ease-in-out infinite}
      `}</style>
      {/* Mold */}
      <path d="M80,80 L80,140 L200,140 L200,80 L185,80 L185,130 L95,130 L95,80 Z" fill="#374151" />
      <rect x="80" y="75" width="120" height="8" rx="2" fill="#4b5563" />
      {/* Cavity fill */}
      <rect className="cast-liquid cast-metal" x="95" y="80" width="90" height="0" rx="0" fill="#e07b39" opacity="0" />
      {/* Ladle */}
      <g className="cast-ladle">
        <ellipse cx="88" cy="45" rx="24" ry="14" fill="#374151" />
        <ellipse cx="88" cy="42" rx="20" ry="10" fill="#e07b39" opacity="0.8" />
        <rect x="108" y="38" width="40" height="8" rx="4" fill="#6b7280" />
      </g>
      {/* Pour stream */}
      <rect className="cast-stream" x="138" y="58" width="8" height="28" rx="3" fill="#e07b39" opacity="0" />
      <text x="140" y="155" textAnchor="middle" fill="#6b7280" fontSize="10">Metal Casting</text>
    </svg>
  );
}

/* ── Stamping ── */
function StampingAnim() {
  return (
    <svg viewBox="0 0 280 160" className="process-svg">
      <style>{`
        @keyframes press { 0%,20%{transform:translateY(0)} 50%,60%{transform:translateY(42px)} 80%,100%{transform:translateY(0)} }
        @keyframes sheet { 0%,45%{d:path('M70,100 L210,100 L210,110 L70,110 Z')} 55%,65%{d:path('M70,100 L130,100 L140,118 L150,100 L210,100 L210,110 L150,110 L140,128 L130,110 L70,110 Z')} 80%,100%{d:path('M70,100 L210,100 L210,110 L70,110 Z')} }
        .stamp-press{animation:press 3s ease-in-out infinite}
        @keyframes sheetDeform { 0%,45%{transform:translateY(0)} 55%,65%{transform:translateY(4px)} 80%,100%{transform:translateY(0)} }
        .stamp-sheet{animation:sheetDeform 3s ease-in-out infinite}
      `}</style>
      {/* Die shoe bottom */}
      <rect x="60" y="118" width="160" height="20" rx="4" fill="#374151" />
      <rect x="100" y="108" width="80" height="12" rx="2" fill="#4b5563" />
      {/* Sheet metal */}
      <g className="stamp-sheet">
        <rect x="60" y="100" width="160" height="10" rx="1" fill="#9ca3af" />
      </g>
      {/* Punch */}
      <g className="stamp-press">
        <rect x="100" y="30" width="80" height="16" rx="3" fill="#374151" />
        <rect x="120" y="46" width="40" height="28" rx="3" fill="#4b5563" />
        <polygon points="120,74 160,74 155,84 125,84" fill="#6b7280" />
        {/* Ram */}
        <rect x="128" y="8" width="24" height="24" rx="3" fill="#6b7280" />
      </g>
      {/* Guide posts */}
      <rect x="72" y="28" width="8" height="90" rx="4" fill="#1f2937" />
      <rect x="200" y="28" width="8" height="90" rx="4" fill="#1f2937" />
      <text x="140" y="155" textAnchor="middle" fill="#6b7280" fontSize="10">Sheet Metal Stamping</text>
    </svg>
  );
}

/* ── Forging ── */
function ForgingAnim() {
  return (
    <svg viewBox="0 0 280 160" className="process-svg">
      <style>{`
        @keyframes fDie { 0%,20%{transform:translateY(0)} 45%,60%{transform:translateY(22px)} 80%,100%{transform:translateY(0)} }
        @keyframes fBillet { 0%,40%{rx:8;ry:8;transform:scale(1,1)} 50%,65%{rx:4;ry:4;transform:scaleX(1.35) scaleY(0.65)} 80%,100%{rx:8;ry:8;transform:scale(1,1)} }
        @keyframes fGlow { 0%,100%{fill:#dc2626} 50%{fill:#fbbf24} }
        .f-die{animation:fDie 3s ease-in-out infinite}
        .f-billet{animation:fBillet 3s ease-in-out infinite;transform-origin:140px 108px}
        .f-glow{animation:fGlow 1.5s ease-in-out infinite}
      `}</style>
      {/* Anvil */}
      <rect x="80" y="120" width="120" height="20" rx="4" fill="#374151" />
      <rect x="90" y="112" width="100" height="10" rx="2" fill="#4b5563" />
      {/* Billet */}
      <g className="f-billet">
        <rect x="110" y="92" width="60" height="22" rx="8" fill="#dc2626" className="f-glow" />
      </g>
      {/* Top die */}
      <g className="f-die">
        <rect x="90" y="50" width="100" height="20" rx="4" fill="#374151" />
        <rect x="100" y="68" width="80" height="18" rx="3" fill="#4b5563" />
        {/* Ram */}
        <rect x="128" y="16" width="24" height="36" rx="3" fill="#6b7280" />
      </g>
      {/* Guide posts */}
      <rect x="72" y="28" width="8" height="90" rx="4" fill="#1f2937" />
      <rect x="200" y="28" width="8" height="90" rx="4" fill="#1f2937" />
      <text x="140" y="155" textAnchor="middle" fill="#6b7280" fontSize="10">Forging</text>
    </svg>
  );
}

/* ── Extrusion ── */
function ExtrusionAnim() {
  return (
    <svg viewBox="0 0 280 160" className="process-svg">
      <style>{`
        @keyframes extProfile { 0%{transform:scaleX(0)} 60%{transform:scaleX(1)} 80%,100%{transform:scaleX(1)} }
        @keyframes extPiston { 0%{transform:translateX(0)} 70%{transform:translateX(30px)} 80%,100%{transform:translateX(30px)} }
        @keyframes extFade { 0%,55%{opacity:0} 65%,100%{opacity:1} }
        .ext-profile{animation:extProfile 3s ease-in-out infinite;transform-origin:160px 80px}
        .ext-piston{animation:extPiston 3s ease-in-out infinite}
        .ext-arrow{animation:extFade 3s ease-in-out infinite}
      `}</style>
      {/* Barrel */}
      <rect x="40" y="60" width="120" height="40" rx="6" fill="#374151" />
      <rect x="44" y="64" width="112" height="32" rx="4" fill="#1f2937" />
      {/* Material in barrel */}
      <rect x="48" y="68" width="80" height="24" rx="3" fill="#e07b39" opacity="0.7" />
      {/* Piston */}
      <g className="ext-piston">
        <rect x="36" y="62" width="20" height="36" rx="4" fill="#6b7280" />
        <rect x="20" y="72" width="18" height="16" rx="3" fill="#9ca3af" />
      </g>
      {/* Die plate */}
      <rect x="158" y="55" width="14" height="50" rx="3" fill="#4b5563" />
      <rect x="163" y="72" width="4" height="16" rx="1" fill="#111" />
      {/* Extruded profile */}
      <g className="ext-profile">
        <rect x="170" y="72" width="80" height="16" rx="2" fill="#3b82f6" />
      </g>
      {/* Arrow */}
      <g className="ext-arrow">
        <polygon points="255,74 265,80 255,86" fill="#60a5fa" />
      </g>
      {/* Hopper */}
      <polygon points="80,60 100,60 95,32 85,32" fill="#4b5563" />
      <rect x="78" y="28" width="24" height="8" rx="3" fill="#374151" />
      <text x="140" y="155" textAnchor="middle" fill="#6b7280" fontSize="10">Extrusion</text>
    </svg>
  );
}

/* ── Generic fallback ── */
function GenericAnim() {
  return (
    <svg viewBox="0 0 280 160" className="process-svg">
      <style>{`
        @keyframes genGear1 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes genGear2 { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        .g-gear1{animation:genGear1 4s linear infinite;transform-origin:100px 80px}
        .g-gear2{animation:genGear2 4s linear infinite;transform-origin:176px 80px}
      `}</style>
      <g className="g-gear1">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <rect
            key={i}
            x="92" y="54" width="16" height="12" rx="2" fill="#4b5563"
            transform={`rotate(${angle} 100 80)`}
          />
        ))}
        <circle cx="100" cy="80" r="22" fill="#374151" />
        <circle cx="100" cy="80" r="10" fill="#1f2937" />
      </g>
      <g className="g-gear2">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <rect
            key={i}
            x="168" y="58" width="16" height="12" rx="2" fill="#4b5563"
            transform={`rotate(${angle} 176 80)`}
          />
        ))}
        <circle cx="176" cy="80" r="18" fill="#374151" />
        <circle cx="176" cy="80" r="8" fill="#1f2937" />
      </g>
      <text x="140" y="155" textAnchor="middle" fill="#6b7280" fontSize="10">Manufacturing Process</text>
    </svg>
  );
}
