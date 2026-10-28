"use client";

import { useEffect } from "react";

// Keep the promise at module level so the worker only starts once
let workerReady: Promise<void> | undefined;

function startWorker() {
  workerReady ??= import("./browser")
    .then(({ worker }) => worker.start({ onUnhandledFrame: "bypass" }))
    .then(() => undefined);
  return workerReady;
}

/**
 * Start the MSW Service Worker and report back through onReady.
 * This file is only loaded on the client (see MSWProvider), because "msw/browser"
 * does not exist in Node and must not end up in the SSR bundle.
 */
export default function MSWBoot({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    let cancelled = false;
    startWorker().then(() => {
      if (!cancelled) onReady();
    });
    return () => {
      cancelled = true;
    };
  }, [onReady]);

  return null;
}
