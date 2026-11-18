import type { L } from "../../lib/i18n";
import { useLang } from "../../lib/i18n";
import { cx } from "../../lib/cx";
import { Reveal } from "./Reveal";
import { Rich } from "./Rich";

type Props = {
  eyebrow: L;
  title: L;
  lead?: L;
  align?: "left" | "center";
  className?: string;
  titleId?: string;
};

export function SectionHeading({ eyebrow, title, lead, align = "left", className, titleId }: Props) {
  const { t } = useLang();
  const center = align === "center";
  return (
    <Reveal className={cx("max-w-3xl", center && "mx-auto text-center", className)}>
      <p className="eyebrow inline-flex items-center gap-2.5 text-orange-700">
        <span aria-hidden="true" className="h-[2px] w-6 rounded-full bg-current" />
        {t(eyebrow)}
      </p>
      <h2 id={titleId} className="mt-4 text-[2rem] font-semibold text-ink sm:text-[2.6rem] lg:text-[3.1rem]">
        <Rich text={t(title)} accent="text-orange-600" />
      </h2>
      {lead && <p className={cx("mt-5 max-w-2xl text-lg text-muted sm:text-xl", center && "mx-auto")}>{t(lead)}</p>}
    </Reveal>
  );
}
