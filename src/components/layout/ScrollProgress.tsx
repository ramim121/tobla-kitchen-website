import { motion, useScroll, useSpring } from "motion/react";

/** Thin orange reading-progress line at the very top. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 170, damping: 32, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-orange"
      style={{ scaleX }}
    />
  );
}
