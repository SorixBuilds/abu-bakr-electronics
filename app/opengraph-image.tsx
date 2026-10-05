import { ImageResponse } from "next/og";

export const alt = "Abu Bakr Electronics — Home technology, beautifully chosen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** A-18 — monogram + wordmark on obsidian with a gold hairline. */
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 50% 40%, #16181c 0%, #0A0B0D 70%)",
        color: "#F4F1EA",
      }}
    >
      <div
        style={{
          width: 132,
          height: 132,
          borderRadius: 999,
          border: "2px solid #C9A96A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 56,
          fontFamily: "serif",
        }}
      >
        AB
      </div>
      <div style={{ marginTop: 48, fontSize: 52, letterSpacing: 18, fontWeight: 600 }}>ABU BAKR</div>
      <div style={{ width: 72, height: 2, background: "#C9A96A", marginTop: 18, marginBottom: 18 }} />
      <div style={{ fontSize: 22, letterSpacing: 14, color: "#9B9B96" }}>ELECTRONICS</div>
      <div style={{ marginTop: 44, fontSize: 30, fontStyle: "italic", fontFamily: "serif", color: "rgba(244,241,234,0.8)" }}>
        Home technology, beautifully chosen.
      </div>
    </div>,
    size,
  );
}
