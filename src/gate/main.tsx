import { mount } from "../boot";
import GatedRoot from "./GatedRoot";

// Entry used only by builds with VITE_GATE=on (vite.config.ts swaps it into index.html):
// the "launch or lunch" gate first, the site after unlock.
mount(<GatedRoot />);
