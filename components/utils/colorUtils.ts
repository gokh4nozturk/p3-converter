// components/utils/colorUtils.ts
import { clampRgb, formatCss, formatHex, formatHsl, formatRgb, hsl, p3, parse, rgb } from 'culori';

export function toDisplayP3(input: string) {
  const parsed = parse(input);
  if (!parsed) return null;

  const clamped = clampRgb(parsed);
  const convertedP3 = p3(clamped);
  if (!convertedP3) return null;

  const { r, g, b } = convertedP3;
  return `color(display-p3 ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;
}

export function toHex(input: string) {
  const parsed = parse(input);
  if (!parsed) return null;
  return formatHex(parsed);
}

export function toRgb(input: string) {
  const parsed = parse(input);
  if (!parsed) return null;
  return formatRgb(parsed);
}

export function toHsl(input: string) {
  const parsed = parse(input);
  if (!parsed) return null;
  return formatHsl(parsed);
}

export function isValidColor(input: string) {
  return parse(input) !== null;
}

export function getColorComponents(input: string) {
  const parsed = parse(input);
  if (!parsed) return null;

  // Convert to different color models
  const rgbColor = rgb(parsed);
  const hslColor = hsl(parsed);
  const p3Color = p3(parsed);

  return {
    hex: formatHex(parsed),
    rgb: rgbColor
      ? {
          r: Math.round(rgbColor.r * 255),
          g: Math.round(rgbColor.g * 255),
          b: Math.round(rgbColor.b * 255),
        }
      : null,
    hsl: hslColor
      ? {
          h: Math.round(hslColor.h || 0),
          s: Math.round(hslColor.s * 100),
          l: Math.round(hslColor.l * 100),
        }
      : null,
    p3: p3Color ? { r: p3Color.r, g: p3Color.g, b: p3Color.b } : null,
  };
}
