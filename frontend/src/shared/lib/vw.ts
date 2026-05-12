const MOBILE  = 375;
const TABLET  = 768;
const DESKTOP = 1920;

const toVw = (px: number, base: number) =>
  `${((px / base) * 100).toFixed(4)}vw`;

/** Raw vw unit: px / base * 100vw  (default base = 1920) */
export const vw = (px: number, base = DESKTOP) => toVw(px, base);

/** min(maxPx, vw)  — scales up but caps. Default base = 375 (mobile) */
export const minVw = (maxPx: number, designPx: number, base = MOBILE) =>
  `min(${maxPx}px, ${toVw(designPx, base)})`;

/** max(minPx, vw)  — scales with floor. Default base = 1920 (desktop) */
export const maxVw = (minPx: number, designPx: number, base = DESKTOP) =>
  `max(${minPx}px, ${toVw(designPx, base)})`;

/** clamp(minPx, vw, maxPx)  — full fluid range. Default base = 1920 */
export const clampVw = (
  minPx: number,
  designPx: number,
  maxPx: number,
  base = DESKTOP,
) => `clamp(${minPx}px, ${toVw(designPx, base)}, ${maxPx}px)`;

export { MOBILE, TABLET, DESKTOP };
