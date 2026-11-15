import { lazy, Suspense, useCallback, useState } from "react";

import { ConstructionGate } from "./gate/ConstructionGate";

/**
 * The real marketing site is code-split, so its JS is only downloaded once the
 * gate is unlocked — casual visitors just get the "coming soon" page.
 */
const App = lazy(() => import("./App"));

const UNLOCK_KEY = "tobla-unlocked";

function readUnlocked(): boolean {
  try {
    return window.localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

export default function Root() {
  const [unlocked, setUnlocked] = useState<boolean>(readUnlocked);

  const unlock = useCallback(() => {
    try {
      window.localStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      /* storage can be blocked — unlock for this session anyway */
    }
    setUnlocked(true);
  }, []);

  if (!unlocked) return <ConstructionGate onUnlock={unlock} />;

  return (
    <Suspense fallback={<SiteLoader />}>
      <App />
    </Suspense>
  );
}

function SiteLoader() {
  return (
    <div className="grid min-h-dvh place-items-center bg-paper text-muted">
      <span className="sr-only">Loading…</span>
    </div>
  );
}
