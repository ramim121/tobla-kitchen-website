import { lazy, Suspense, useCallback, useState } from "react";

import { ConstructionGate } from "./gate/ConstructionGate";

/**
 * The real marketing site is code-split, so its JS is only downloaded once the
 * gate is unlocked — casual visitors just get the "coming soon" page.
 */
const loadApp = () => import("./App");
const App = lazy(loadApp);

export default function Root() {
  // The construction gate is shown on EVERY fresh page load. Unlocking only
  // lasts for the current page view (kept in memory, not persisted), so a
  // reload or a new visit always shows the gate and asks for the phrase again.
  const [unlocked, setUnlocked] = useState(false);

  const unlock = useCallback(() => setUnlocked(true), []);

  // The download starts the moment the phrase is accepted, so the site is
  // already there when the gate's reveal finishes.
  if (!unlocked) return <ConstructionGate onUnlock={unlock} onUnlockStart={loadApp} />;

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
