import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "../../lib/cx";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** starting offset in px */
  y?: number;
};

/** Fade + rise once when scrolled into view (transform/opacity only, so it stays smooth). */
export function Reveal({ children, className, delay = 0, y = 26 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/** Variants for staggered lists: put `stagger` on the parent and `item` on children. */
export const stagger = (gap = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren } },
});

export const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};
