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
import { RiskCompare } from "./components/sections/RiskCompare";
import { Trust } from "./components/sections/Trust";
import { WeeklyMenu } from "./components/sections/WeeklyMenu";
import { site } from "./content/site";
import { LanguageProvider, useLang } from "./lib/i18n";
import { useScrollToHashOnLoad, useSmoothScroll } from "./lib/smooth-scroll";

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
  // after Lenis starts: links such as the brochure's QR code (/?lang=en#enquiry) open at their section
  useScrollToHashOnLoad();
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider meta={site.meta}>
        <SkipLink />
        <ScrollProgress />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {/* the new sections, in the owner's order */}
          <Hero />
          <Trust />
          <Ingredients />
          <WeeklyMenu />
          <Gallery />
          {/* two earlier sections the owner kept */}
          <RiskCompare />
          <Brochure />
          {/* about, the enquiry form and contact close the page, just before the footer */}
          <AboutUs />
          <Enquiry />
          <ContactUs />
        </main>
        <Footer />
      </LanguageProvider>
    </MotionConfig>
  );
}
