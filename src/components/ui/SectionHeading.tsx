import type { L } from "../../lib/i18n";
import { langFor, useLang } from "../../lib/i18n";
import { cx } from "../../lib/cx";
import { Reveal } from "./Reveal";
import { Rich } from "./Rich";

type Props = {
  eyebrow: L;
  title: L;
  lead?: L;
  align?: "left" | "center";
  dark?: boolean;
  /** "lg" (default) for the big section titles; "md" (28–32px phones, 36–42px desktop) for sections 2–6 */
  size?: "md" | "lg";
  className?: string;
  titleId?: string;
};

const TITLE_SIZE = {
  md: "text-[1.875rem] sm:text-[2.25rem] lg:text-[2.6rem]",
  lg: "text-[2rem] sm:text-[2.6rem] lg:text-[3.1rem]",
};
const LEAD_SIZE = {
  md: "mt-4 text-[16.5px] leading-relaxed sm:text-lg",
  lg: "mt-5 text-lg sm:text-xl",
};

export function SectionHeading({ eyebrow, title, lead, align = "left", dark = false, size = "lg", className, titleId }: Props) {
  const { t } = useLang();
  const center = align === "center";
  const [e, h, l] = [t(eyebrow), t(title), lead ? t(lead) : ""];
  return (
    <Reveal className={cx("max-w-3xl", center && "mx-auto text-center", className)}>
      <p lang={langFor(e)} className={cx("eyebrow inline-flex items-center gap-2.5", dark ? "text-orange" : "text-orange-700")}>
        <span aria-hidden="true" className="h-[2px] w-6 rounded-full bg-current" />
        {e}
      </p>
      <h2 id={titleId} lang={langFor(h)} className={cx("mt-4 font-semibold", TITLE_SIZE[size], dark ? "text-paper" : "text-ink")}>
        <Rich text={h} accent={dark ? "text-orange" : "text-orange-600"} />
      </h2>
      {lead && (
        <p lang={langFor(l)} className={cx("max-w-2xl", LEAD_SIZE[size], dark ? "text-paper/70" : "text-muted", center && "mx-auto")}>
          {l}
        </p>
      )}
    </Reveal>
  );
}
