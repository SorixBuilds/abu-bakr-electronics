import { ImageResponse } from "next/og";

export const alt = "Abu Bakr Electronics — Home technology and Jinpeng electric mobility in Lahore.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card — V3 brand: Bordeaux field, AB monogram with champagne ring, wordmark with cherry ELECTRONICS. */
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
        background: "radial-gradient(ellipse at 50% 30%, #7A1830 0%, #5C0F22 45%, #2B0812 100%)",
        color: "#FFFFFF",
      }}
    >
      <div
        style={{
          width: 128,
          height: 128,
          borderRadius: 999,
          background: "#5C0F22",
          border: "2px solid #B89A62",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 54,
          fontFamily: "serif",
        }}
      >
        AB
      </div>
      <div style={{ marginTop: 40, fontSize: 84, fontFamily: "serif", letterSpacing: -1 }}>Abu Bakr</div>
      <div style={{ marginTop: 6, fontSize: 24, letterSpacing: 12, fontWeight: 700, color: "#E8344E" }}>ELECTRONICS</div>
      <div style={{ marginTop: 40, fontSize: 30, fontStyle: "italic", fontFamily: "serif", color: "rgba(255,255,255,0.82)" }}>
        Free delivery across Lahore · Delivering across Pakistan
      </div>
    </div>,
    size,
  );
}
