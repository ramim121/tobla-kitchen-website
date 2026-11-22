import { MotionConfig } from "motion/react";

import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { AboutUs } from "./components/sections/AboutUs";
import { Brochure } from "./components/sections/Brochure";
import { ContactUs } from "./components/sections/ContactUs";
import { Enquiry } from "./components/sections/Enquiry";
import { Gallery } from "./components/sections/Gallery";
import { Hero } from "./components/sections/Hero";
import { Ingredients } from "./components/sections/Ingredients";
import { KitchenToOffice } from "./components/sections/KitchenToOffice";
import { Process } from "./components/sections/Process";
import { RiskCompare } from "./components/sections/RiskCompare";
import { Support } from "./components/sections/Support";
import { Trust } from "./components/sections/Trust";
import { WeeklyMenu } from "./components/sections/WeeklyMenu";
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
          {/* 1–10: the new page order */}
          <Hero />
          <Trust />
          <Ingredients />
          <WeeklyMenu />
          <Gallery />
          <KitchenToOffice />
          <Support />
          <Enquiry />
          <AboutUs />
          <ContactUs />
          {/* three earlier sections the owner kept */}
          <RiskCompare />
          <Process />
          <Brochure />
        </main>
        <Footer />
      </LanguageProvider>
    </MotionConfig>
  );
}
