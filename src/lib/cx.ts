/** Tiny className joiner. */
export const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

/** Shared easing (expo-out) used for every reveal so motion feels like one system. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
