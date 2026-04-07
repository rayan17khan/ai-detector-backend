"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    try {
      if (!file) return alert("Select a file first");

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        "https://ai-detector-backend-866l.onrender.com/detect/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      <div
        style={{
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.05)",
          textAlign: "center",
          width: "350px",
        }}
      >
        <h1>AI Detector 🚀</h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <br /><br />

        <button onClick={uploadFile}>
          {loading ? "Processing..." : "Upload"}
        </button>

        <p>{result}</p>
      </div>
    </main>
  );
}
{result && (
  <div style={{ marginTop: "25px" }}>
    <h3>
      {result.label} ({result.confidence}%)
    </h3>

    {/* Progress Bar */}
    <div
      style={{
        width: "100%",
        height: "12px",
        background: "#333",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          width: `${result.confidence}%`,
          height: "100%",
          background:
            result.label === "AI Generated"
              ? "linear-gradient(90deg, #ef4444, #f871
        }
      }
    }
  