import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Every page is available in 4 languages: /  (English), /it, /nl, /fr
  i18n: {
    locales: ["en", "it", "nl", "fr", "de"],
    defaultLocale: "en",
    // Locale detection is on by default: first-time visitors are sent to their browser language
  },
};

export default nextConfig;
