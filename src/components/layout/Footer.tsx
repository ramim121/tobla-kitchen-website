import { ArrowUp } from "lucide-react";
import { LogoLockup } from "../brand/Logo";
import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { site } from "../../content/site";
import { langFor, useLang } from "../../lib/i18n";

export function Footer() {
  const { t } = useLang();
  const f = site.footer;
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <Container className="pb-10 pt-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <LogoLockup />
            <p lang={langFor(t(f.tagline))} className="mt-3 text-sm text-muted">
              {t(f.tagline)}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[15px] text-ink/80">
              {f.links.map((link) => (
                <li key={link.id}>
                  <AnchorLink to={link.id} lang={langFor(t(link.label))} className="transition-colors hover:text-orange-700">
                    {t(link.label)}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col-reverse gap-5 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p lang={langFor(t(f.rights))}>{t(f.rights)}</p>
          <AnchorLink
            to="top"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-ink/75 transition-colors hover:border-orange hover:text-orange-700 sm:self-auto"
          >
            {t(f.top)}
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </AnchorLink>
        </div>
      </Container>
    </footer>
  );
}
