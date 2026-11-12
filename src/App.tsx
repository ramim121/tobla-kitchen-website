import { MotionConfig } from "motion/react";

import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { About } from "./components/sections/About";
import { Brochure } from "./components/sections/Brochure";
import { Contact } from "./components/sections/Contact";
import { DishMarquee } from "./components/sections/DishMarquee";
import { Hero } from "./components/sections/Hero";
import { MenuExplorer } from "./components/sections/MenuExplorer";
import { PremiumDishes } from "./components/sections/PremiumDishes";
import { Quote } from "./components/sections/Quote";
import { Process } from "./components/sections/Process";
import { RiskCompare } from "./components/sections/RiskCompare";
import { Sourcing } from "./components/sections/Sourcing";
import { StatBand } from "./components/sections/StatBand";
import { site } from "./content/site";
import { LanguageProvider, useLang } from "./lib/i18n";
import { useSmoothScroll } from "./lib/smooth-scroll";

function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="sr-only rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80]"
    >
      {t(site.nav.skip)}
    </a>
  );
}

export default function App() {
  useSmoothScroll();
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider meta={site.meta}>
        <SkipLink />
        <ScrollProgress />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <DishMarquee />
          <StatBand />
          <Sourcing />
          <RiskCompare />
          <MenuExplorer />
          <PremiumDishes />
          <Quote />
          <Process />
          <About />
          <Brochure />
          <Contact />
        </main>
        <Footer />
      </LanguageProvider>
    </MotionConfig>
  );
}
