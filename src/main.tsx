import App from "./App";
import { mount } from "./boot";

// The site. A build with VITE_GATE=on starts from src/gate/main.tsx instead (see vite.config.ts).
mount(<App />);
