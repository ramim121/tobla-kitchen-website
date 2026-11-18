import { useCallback, useEffect, useRef } from "react";

const KEY = "tobla-overlay";

/**
 * Phone (and browser) Back closes a full-screen overlay instead of leaving the site.
 *
 * While `open`, one history entry is added (same URL); Back pops it and `onClose` runs.
 * Close buttons and Esc should call the returned `requestClose`: it closes at once and drops that
 * entry again, so history ends up exactly as it was before the overlay opened.
 */
export function useBackToClose(open: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose);
  const token = useRef<string | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const mine = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    token.current = mine;
    window.history.pushState({ ...window.history.state, [KEY]: mine }, "");
    const onPop = () => {
      if (token.current !== mine) return; // our own history.back() from requestClose — already closed
      token.current = null;
      onCloseRef.current();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [open]);

  return useCallback(() => {
    const mine = token.current;
    token.current = null;
    onCloseRef.current();
    if (mine && window.history.state?.[KEY] === mine) window.history.back();
  }, []);
}
