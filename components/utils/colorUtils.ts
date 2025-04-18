// components/utils/colorUtils.ts
import {
  parse,
  formatCss,
  clampRgb,
  p3,
  rgb,
} from "culori";

export function toDisplayP3(input: string) {
  const parsed = parse(input);
  if (!parsed) return null;

  const clamped = clampRgb(parsed);
  const convertedP3 = p3(clamped);
  if (!convertedP3) return null;

  const { r, g, b } = convertedP3;
  return `color(display-p3 ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;
}