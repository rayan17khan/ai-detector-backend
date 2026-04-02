"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);

  const uploadFile = async () => {
    if (!file) return alert("Select a file first");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://ai-detector-backend-866l.onrender.com/detect/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        background: dark
          ? "linear-gradient(135deg, #0a0a0a, #111827)"
          : "linear-gradient(135deg, #f5f7fa, #e4e7eb)",
        color: dark ? "#fff" : "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        transition: "0.3s",
      }}
    >
      {/* Theme Toggle */}
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "8px 16px",
          borderRadius: "30px",
          border: "none",
          background: dark ? "#1f2937" : "#e5e7eb",
          color: dark ? "white" : "black",
          cursor: "pointer",
        }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Glass Card */}
      <div
        style={{
          width: "380px",
          padding: "40px",
          borderRadius: "25px",
          backdropFilter: "blur(25px)",
          background: dark
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.8)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "26px", marginBottom: "10px" }}>
          AI Detector
        </h1>
        <p style={{ opacity: 0.7, marginBottom: "25px" }}>
          Upload image to detect AI content
        </p>

        {/* Drag & Drop Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setFile(e.dataTransfer.files[0]);
          }}
          style={{
            padding: "30px",
            borderRadius: "15px",
            border: "2px dashed #3b82f6",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          <p style={{ marginBottom: "10px" }}>
            {file ? file.name : "Drag & Drop or Click"}
          </p>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
            📁 Browse File
          </label>
        </div>

        {/* Upload Button */}
        <button
          onClick={uploadFile}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "30px",
            border: "none",
            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {loading ? "Processing..." : "Upload & Detect"}
        </button>

        {/* Result */}
        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "10px",
              background: dark
                ? "rgba(59,130,246,0.2)"
                : "rgba(59,130,246,0.1)",
              fontWeight: "500",
            }}
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
}