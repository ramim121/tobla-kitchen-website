import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const GATE_BG = "#231f20";

/** index.html edits for a gated build: [what must be there, what replaces it]. */
const GATE_HTML: [string | RegExp, string][] = [
  // start from the gate's entry; the site downloads only after unlock
  ['src="/src/main.tsx"', 'src="/src/gate/main.tsx"'],
  // paint dark before JS runs, inline so the gate can hand the light colours back on unlock
  [/<html lang="bn">/, `<html lang="bn" style="background: ${GATE_BG}">`],
  [/<body>/, `<body style="background: ${GATE_BG}">`],
  [/(<meta name="theme-color" content=")[^"]*(")/, `$1${GATE_BG}$2`],
];

/**
 * The "launch or lunch" gate (src/gate) is off unless the build runs with VITE_GATE=on; then
 * index.html is rewritten as above. Normal builds are untouched: white first paint, no gate code.
 */
function gateMode(): Plugin {
  let gateOn = false;
  return {
    name: "tobla-gate-mode",
    configResolved(config) {
      gateOn = config.env.VITE_GATE === "on";
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        if (!gateOn) return html;
        return GATE_HTML.reduce((out, [find, replace]) => {
          const next = out.replace(find, replace);
          if (next === out) throw new Error(`tobla-gate-mode: index.html no longer matches ${String(find)}`);
          return next;
        }, html);
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), gateMode()],
  build: {
    target: "es2022",
    cssCodeSplit: false,
    rolldownOptions: {
      output: {
        // vendor code changes rarely — keep it in its own long-cached chunks
        codeSplitting: {
          groups: [
            { name: "react", test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: "motion", test: /node_modules[\\/](motion|framer-motion|motion-dom|motion-utils|lenis)[\\/]/ },
          ],
        },
      },
    },
  },
});
