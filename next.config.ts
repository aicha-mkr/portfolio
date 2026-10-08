import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Don't generate AGENTS.md / CLAUDE.md in the project root.
  agentRules: false,
  images: {
    // Lets next/image render SVG logos and placeholders from /public safely.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
