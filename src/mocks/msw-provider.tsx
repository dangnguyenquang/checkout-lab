"use client";

import dynamic from "next/dynamic";
import { useCallback, useState, type ReactNode } from "react";

const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

// ssr: false -> MSW is only loaded in the browser, never in the server bundle
const MSWBoot = dynamic(() => import("./msw-boot"), { ssr: false });

/**
 * Wait for the MSW Service Worker to be ready before rendering children,
 * otherwise the first request can slip past the mock.
 */
export function MSWProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(!isMockingEnabled);
  const handleReady = useCallback(() => setReady(true), []);

  if (!ready) {
    return (
      <>
        <MSWBoot onReady={handleReady} />
        <p className="boot-message">Starting mock server (MSW)…</p>
      </>
    );
  }

  return <>{children}</>;
}
