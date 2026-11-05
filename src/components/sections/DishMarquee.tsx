import { site } from "../../content/site";
import { useLang } from "../../lib/i18n";

/** Endless strip of dish names (pauses on hover, static for reduced motion). */
export function DishMarquee() {
  const { t, lang } = useLang();
  const names = site.marquee.map(t);

  const row = (copy: number) => (
    <ul className="flex shrink-0 items-center" aria-hidden={copy > 0 ? true : undefined}>
      {names.map((name, i) => (
        <li key={`${copy}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-xl font-semibold text-ink sm:px-9 sm:text-[1.65rem]">{name}</span>
          <span aria-hidden="true" className="size-2.5 rounded-full bg-ink ring-[5px] ring-ink/15" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="relative overflow-hidden bg-orange py-4 sm:py-5"
      role="region"
      aria-label={lang === "bn" ? "আমাদের কিছু পদ" : "Some of our dishes"}
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
