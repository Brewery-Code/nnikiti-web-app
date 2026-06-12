export const isTouchDevice =
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export function getSlideOffset() {
  if (typeof window === "undefined") return 16;
  const vw = window.innerWidth;
  if (vw >= 1280) return Math.max(24, Math.round((vw - 1280) / 2) + 24);
  if (vw >= 640) return 24;
  return 16;
}
