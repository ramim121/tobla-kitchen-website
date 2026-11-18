import { ArrowUp } from "lucide-react";
import { LogoLockup } from "../brand/Logo";
import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { site } from "../../content/site";
import { useLang } from "../../lib/i18n";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <Container className="pb-10 pt-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <LogoLockup />
            <p className="mt-5 max-w-sm text-sm text-muted">{t(site.footer.tagline)}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-ink/75 sm:flex sm:flex-wrap sm:gap-x-8">
              {site.nav.items.map((item) => (
                <li key={item.id}>
                  <AnchorLink to={item.id} className="transition-colors hover:text-orange-700">
                    {t(item.label)}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col-reverse gap-5 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t(site.footer.rights)}</p>
          <AnchorLink
            to="top"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-ink/75 transition-colors hover:border-orange hover:text-orange-700 sm:self-auto"
          >
            {t(site.footer.top)}
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </AnchorLink>
        </div>
      </Container>
    </footer>
  );
}
