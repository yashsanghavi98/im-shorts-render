// Text measurement for the series font (Baloo2), from its real glyph advances (src/kit/metrics.json, made with
// fontTools from public/Baloo2.ttf at weights 400–800). Pure and deterministic: no DOM, no font-load race.
import M from './metrics.json';

const TABLE = M as unknown as Record<string, Record<string, number>>;
const WEIGHTS = [400, 500, 600, 700, 800];
const table = (weight: number) => TABLE[String(WEIGHTS.reduce((a, b) => (Math.abs(b - weight) < Math.abs(a - weight) ? b : a)))];

/** rendered width in px of `s` at `size` px (kerning ignored, which slightly overestimates: safe for fitting) */
export const textW = (s: string, size: number, weight = 700, letterSpacing = 0) => {
  const t = table(weight);
  let em = 0;
  for (const ch of s) em += t[ch] ?? 0.55;
  return em * size + letterSpacing * Math.max(0, [...s].length - 1);
};
/** the font size at which `s` fits in `maxW` (never larger than `size`, never below `min` × size) */
export const fitSize = (s: string, size: number, weight: number, maxW?: number, min = 0.5, letterSpacing = 0) => {
  if (!maxW) return size;
  const w = textW(s, size, weight, letterSpacing);
  return w <= maxW ? size : Math.max(size * min, size * (maxW / w));
};
/** plain text of React children (strings, numbers, arrays of them) */
export const plain = (c: unknown): string => (c == null || c === false ? '' : Array.isArray(c) ? c.map(plain).join('') : typeof c === 'object' ? '' : String(c));
