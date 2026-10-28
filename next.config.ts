import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For the lesson only: StrictMode renders every component twice in dev,
  // which doubles the render counter on /demo/forms.
  // Real projects should turn it back ON (the default is true).
  reactStrictMode: false,

  // create-next-app 16.4 turns on `cacheComponents` and `partialPrefetching` by default.
  // Neither is part of this session, and `partialPrefetching` reports
  // "Could not validate `instant`" in dev when MSWProvider loads the worker with
  // next/dynamic (ssr: false). Keep them off so students don't see a noisy "Issues" badge.
  cacheComponents: false,
  partialPrefetching: false,

  // Stop `next dev` from generating an AGENTS.md file in the class repo
  agentRules: false,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
