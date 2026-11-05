import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/jost/wght.css";
import "@fontsource-variable/anek-bangla/wght.css";
import "@fontsource-variable/noto-sans-bengali/wght.css";
import "./index.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
