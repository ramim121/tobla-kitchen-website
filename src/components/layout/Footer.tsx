import { ArrowUp } from "lucide-react";
import { LogoLockup } from "../brand/Logo";
import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { site } from "../../content/site";
import { useLang } from "../../lib/i18n";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-ink text-paper">
      <Container className="border-t border-paper/10 pb-10 pt-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <LogoLockup tone="light" />
            <p className="mt-5 max-w-sm text-sm text-paper/60">{t(site.footer.tagline)}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-paper/70 sm:flex sm:flex-wrap sm:gap-x-8">
              {site.nav.items.map((item) => (
                <li key={item.id}>
                  <AnchorLink to={item.id} className="transition-colors hover:text-orange">
                    {t(item.label)}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col-reverse gap-5 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{t(site.footer.rights)}</p>
          <AnchorLink
            to="top"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-paper/15 px-4 py-2 text-paper/70 transition-colors hover:border-orange hover:text-orange sm:self-auto"
          >
            {t(site.footer.top)}
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </AnchorLink>
        </div>
      </Container>
    </footer>
  );
}
