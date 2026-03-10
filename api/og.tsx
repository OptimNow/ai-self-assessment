import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2C2C2C",
          padding: "60px",
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
            padding: "8px 20px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.05)",
            fontSize: "16px",
            color: "#C1C1C1",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#ACE849",
            }}
          />
          FinOps Maturity for AI Workloads
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            AI Cost Readiness
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 600,
              color: "#C1C1C1",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Assessment
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "22px",
            color: "#C1C1C1",
            marginTop: "28px",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Evaluate your AI cost management maturity across 10 dimensions
        </div>

        {/* Bottom bar with 4 categories */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "48px",
            padding: "20px 40px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {["VISIBILITY", "ALLOCATION", "ECONOMICS", "VALUE"].map(
            (cat, i) => (
              <div
                key={cat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "14px",
                  color: "#C1C1C1",
                  letterSpacing: "2px",
                }}
              >
                <span style={{ color: "#ACE849" }}>0{i + 1}</span>
                <span>{cat}</span>
              </div>
            )
          )}
        </div>

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ fontSize: "20px", color: "#FFFFFF", fontWeight: 300 }}>
            Optim
          </span>
          <span style={{ fontSize: "20px", color: "#FFFFFF", fontWeight: 500 }}>
            Now
          </span>
          <span
            style={{
              fontSize: "10px",
              color: "#2C2C2C",
              backgroundColor: "#ACE849",
              padding: "2px 8px",
              borderRadius: "9999px",
              fontWeight: 700,
              marginLeft: "4px",
            }}
          >
            Cloud
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
