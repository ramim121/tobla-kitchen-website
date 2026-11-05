import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/jost/wght.css";
import "@fontsource-variable/anek-bangla/wght.css";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "./index.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
