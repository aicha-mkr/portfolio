import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";

export const alt = `${portfolio.profile.name} | ${portfolio.profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { profile } = portfolio;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "radial-gradient(ellipse at 50% 0%, #4a0e27 0%, #3b0d20 35%, #0b0e0f 80%)",
          color: "#f4efe8",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#fea800", letterSpacing: 6 }}>
          {profile.location.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 110, lineHeight: 1, textTransform: "uppercase", fontFamily: "sans-serif" }}>{profile.name}</div>
          <div style={{ fontSize: 40, marginTop: 24, color: "#d0c5ab", fontStyle: "italic" }}>{profile.title}</div>
        </div>
        <div style={{ display: "flex", height: 8, width: 160, background: "#fea800", borderRadius: 0 }} />
      </div>
    ),
    size,
  );
}
