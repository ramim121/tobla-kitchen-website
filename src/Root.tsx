import { lazy, Suspense, useCallback, useState } from "react";

import { ConstructionGate } from "./gate/ConstructionGate";

/**
 * The real marketing site is code-split, so its JS is only downloaded once the
 * gate is unlocked — casual visitors just get the "coming soon" page.
 */
const App = lazy(() => import("./App"));

export default function Root() {
  // The construction gate is shown on EVERY fresh page load. Unlocking only
  // lasts for the current page view (kept in memory, not persisted), so a
  // reload or a new visit always shows the gate and asks for the phrase again.
  const [unlocked, setUnlocked] = useState(false);

  const unlock = useCallback(() => setUnlocked(true), []);

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
