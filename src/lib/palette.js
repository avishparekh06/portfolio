const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (rgb) =>
  '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

export function lerpHex(a, b, k) {
  const ca = toRgb(a);
  const cb = toRgb(b);
  return toHex(ca.map((v, i) => v + (cb[i] - v) * k));
}

export function paletteAt(stops, t) {
  const c = Math.min(1, Math.max(0, t));
  const scaled = c * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(scaled));
  return lerpHex(stops[i], stops[i + 1], scaled - i);
}
