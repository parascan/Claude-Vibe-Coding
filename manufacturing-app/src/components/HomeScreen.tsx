import { useRef, useState } from "react";

interface Props {
  onAnalyze: (input: {
    text?: string;
    imageBase64?: string;
    imageMimeType?: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
  }) => void;
  loading: boolean;
}

const EXAMPLES = [
  { label: "Lego brick", icon: "🧱" },
  { label: "Phone case", icon: "📱" },
  { label: "Aluminum engine block", icon: "🔧" },
  { label: "Metal bolt", icon: "🔩" },
  { label: "PVC pipe", icon: "🪠" },
  { label: "Titanium bracket", icon: "✈️" },
];

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"] as const;
type AllowedMime = (typeof ALLOWED_TYPES)[number];

interface ImageState {
  preview: string;
  base64: string;
  mimeType: AllowedMime;
}

export function HomeScreen({ onAnalyze, loading }: Props) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<ImageState | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleExample(label: string) {
    setText(label);
    setImage(null);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type as AllowedMime)) {
      alert("Please upload a JPEG, PNG, GIF, or WebP image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      setImage({ preview: dataUrl, base64, mimeType: file.type as AllowedMime });
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit() {
    if (!text.trim() && !image) return;
    onAnalyze({
      text: text.trim() || undefined,
      imageBase64: image?.base64,
      imageMimeType: image?.mimeType,
    });
  }

  const canSubmit = (text.trim().length > 0 || !!image) && !loading;

  return (
    <div className="home-screen">
      <div className="hero">
        <div className="hero-icon">⚙️</div>
        <h1>How Is It Made?</h1>
        <p className="subtitle">
          Describe a part or snap a photo — get a step-by-step breakdown of
          exactly how it's manufactured.
        </p>
      </div>

      <div className="examples-section">
        <h2>Quick examples</h2>
        <div className="examples-grid">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              className={`example-btn${text === ex.label ? " active" : ""}`}
              onClick={() => handleExample(ex.label)}
              disabled={loading}
            >
              <span className="example-icon">{ex.icon}</span>
              <span className="example-label">{ex.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="input-section">
        <textarea
          className="part-input"
          placeholder="Describe the part or product... (e.g. 'a clear acrylic lens with a fresnel pattern')"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          disabled={loading}
        />

        <div className="image-row">
          <button
            className="upload-btn"
            onClick={() => fileRef.current?.click()}
            disabled={loading}
          >
            📷 {image ? "Change photo" : "Upload photo"}
          </button>
          {image && (
            <button
              className="remove-photo-btn"
              onClick={() => {
                setImage(null);
                if (fileRef.current) fileRef.current.value = "";
              }}
            >
              ✕ Remove
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            style={{ display: "none" }}
            onChange={handleFile}
          />
        </div>

        {image && (
          <div className="image-preview-wrap">
            <img src={image.preview} alt="Uploaded part" className="image-preview" />
          </div>
        )}
      </div>

      <button
        className="analyze-btn"
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        {loading ? (
          <span className="loading-row">
            <span className="spinner" /> Analyzing…
          </span>
        ) : (
          "Analyze Manufacturing Process"
        )}
      </button>
    </div>
  );
}
