import { Egg, Feather, Leaf, ShieldCheck, type LucideIcon } from "lucide-react";
import { TAGS, type TagKey } from "../../content/menu";
import { useLang } from "../../lib/i18n";
import { cx } from "../../lib/cx";

const TAG_STYLE: Record<TagKey, { icon: LucideIcon; cls: string }> = {
  FR: { icon: Feather, cls: "bg-orange-50 text-[#9a3f0b] ring-orange-200/80" },
  O3: { icon: Egg, cls: "bg-amber-50 text-amber-900 ring-amber-200/80" },
  AP: { icon: ShieldCheck, cls: "bg-rose-50 text-rose-900 ring-rose-200/80" },
  DS: { icon: Leaf, cls: "bg-emerald-50 text-emerald-900 ring-emerald-200/80" },
};

/** Ingredient-source chip (free-range, omega-3, trusted source, fresh today). */
export function TagChip({ tag, iconOnly = false }: { tag: TagKey; iconOnly?: boolean }) {
  const { t } = useLang();
  const { icon: Icon, cls } = TAG_STYLE[tag];
  return (
    <span
      title={t(TAGS[tag].long)}
      className={cx(
        "inline-flex shrink-0 items-center gap-1 rounded-full font-medium ring-1",
        iconOnly ? "size-7 justify-center" : "px-2.5 py-1 text-xs",
        cls,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {!iconOnly && t(TAGS[tag].short)}
    </span>
  );
}
