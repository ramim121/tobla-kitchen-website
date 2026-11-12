import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Crown, Sparkles } from "lucide-react";

import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { Reveal, item, stagger } from "../ui/Reveal";
import { Rich } from "../ui/Rich";
import { SectionHeading } from "../ui/SectionHeading";
import { TablaRings } from "../ui/TablaRings";
import { TagChip } from "../ui/TagChip";
import { DISH_PHOTOS, dishSrcSet, type DishKey } from "../../content/images";
import { site } from "../../content/site";
import type { TagKey } from "../../content/menu";
import { useLang } from "../../lib/i18n";

const SIZES = "(min-width: 1024px) 400px, (min-width: 640px) 46vw, 78vw";
const PHONE = "(max-width: 639px)";

/** True on phones, where the dish row scrolls sideways (and so must be keyboard-focusable). */
function useIsPhone() {
  const [phone, setPhone] = useState(() => typeof window !== "undefined" && window.matchMedia(PHONE).matches);
  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const onChange = () => setPhone(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return phone;
}

/** Real photos of our richest dishes, plus the three meal plans. Phones scroll it sideways. */
export function PremiumDishes() {
  const { t } = useLang();
  const p = site.premium;
  const isPhone = useIsPhone();

  return (
    <section id="premium" tabIndex={-1} className="relative overflow-hidden bg-cream py-20 outline-none sm:py-28">
      <Container>
        <SectionHeading eyebrow={p.eyebrow} title={p.title} lead={p.lead} />

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          tabIndex={isPhone ? 0 : undefined}
          aria-label={isPhone ? t(p.swipeLabel) : undefined}
          className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16 lg:grid-cols-3"
        >
          {p.dishes.map((dish) => (
            <motion.li key={dish.key} variants={item} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-line transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-36px_rgba(35,31,32,0.55)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#5b5d63]">
                  <img
                    src={DISH_PHOTOS[dish.key as DishKey].large}
                    srcSet={dishSrcSet(dish.key as DishKey)}
                    sizes={SIZES}
                    width={800}
                    height={600}
                    alt={t(dish.alt)}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm">
                    <Crown className="size-3.5 text-orange-600" aria-hidden="true" />
                    {t(p.badge)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-semibold text-ink">{t(dish.name)}</h3>
                  <p className="mt-2 text-[15px] text-muted">{t(dish.text)}</p>
                  {dish.tags.length > 0 && (
                    <p className="mt-auto flex flex-wrap gap-1.5 pt-4">
                      {(dish.tags as TagKey[]).map((tag) => (
                        <TagChip key={tag} tag={tag} />
                      ))}
                    </p>
                  )}
                </div>
              </article>
            </motion.li>
          ))}

          {/* meal plans: 6th grid cell on tablet/desktop */}
          <motion.li variants={item} className="hidden sm:block">
            <PlansCard />
          </motion.li>
        </motion.ul>

        {/* phones: plans sit under the swipeable dishes, so dish cards stay compact */}
        <Reveal className="mt-6 sm:hidden">
          <PlansCard />
        </Reveal>
      </Container>
    </section>
  );
}

function PlansCard() {
  const { t } = useLang();
  const plans = site.premium.plans;
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-ink p-6 text-paper sm:p-7">
      <TablaRings dark className="pointer-events-none absolute -right-24 -top-24 size-64 opacity-60" />
      <p className="relative eyebrow inline-flex items-center gap-2 text-orange">
        <Sparkles className="size-4" aria-hidden="true" />
        {t(plans.eyebrow)}
      </p>
      <h3 className="relative mt-3 text-2xl font-semibold">
        <Rich text={t(plans.title)} accent="text-orange" />
      </h3>
      <ul className="relative mt-5 space-y-4">
        {plans.items.map((plan) => (
          <li key={plan.name.en} className="border-l-2 border-orange/70 pl-3">
            <p className="font-semibold text-paper">{t(plan.name)}</p>
            <p className="mt-0.5 text-sm text-paper/70">{t(plan.text)}</p>
          </li>
        ))}
      </ul>
      <div className="relative mt-auto pt-6">
        <AnchorLink
          to="contact"
          className="group inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-paper"
        >
          {t(plans.cta)}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </AnchorLink>
      </div>
    </article>
  );
}
