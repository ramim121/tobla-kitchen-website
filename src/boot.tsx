import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/jost/wght.css";
import "@fontsource-variable/anek-bangla/wght.css";
import "@fontsource-variable/noto-sans-bengali/wght.css";
import "./index.css";

/** Shared start-up for both entries: the site (src/main.tsx) and the gate (src/gate/main.tsx). */
export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(<StrictMode>{node}</StrictMode>);
}
