import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F3F1EB",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "5px solid rgba(184,144,31,0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(-6deg)",
            marginBottom: 40,
          }}
        >
          <div style={{ fontSize: 18, color: "#B8901F", letterSpacing: 4 }}>TARGET</div>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#16213A" }}>9</div>
          <div style={{ fontSize: 14, color: "rgba(22,33,58,0.5)", letterSpacing: 2 }}>
            OVERALL BAND
          </div>
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, color: "#16213A", letterSpacing: 2 }}>
          TRIELTS
        </div>
        <div style={{ fontSize: 28, color: "rgba(22,33,58,0.6)", marginTop: 12 }}>
          If you try you shall succeed
        </div>
      </div>
    ),
    { ...size }
  );
}
