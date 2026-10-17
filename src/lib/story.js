const clamp01 = (v) => Math.min(1, Math.max(0, v));

export const lerp = (a, b, k) => a + (b - a) * k;

export function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

// How far the viewport's center line has travelled through a section: 0 before it, 1 after it.
export function localProgress(top, height, scrollY, viewportH) {
  if (height <= 0) return scrollY + viewportH / 2 >= top ? 1 : 0;
  return clamp01((scrollY + viewportH / 2 - top) / height);
}

// Which card (by viewport-relative rect) the reader is on: the one holding the viewport
// center, else the visible one nearest to it, else -1.
export function activeIndex(rects, viewportH) {
  const mid = viewportH / 2;
  let best = -1;
  let bestDist = Infinity;
  rects.forEach((r, i) => {
    if (r.bottom < 0 || r.top > viewportH) return;
    const dist = r.top <= mid && r.bottom >= mid ? 0 : Math.abs((r.top + r.bottom) / 2 - mid);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });
  return best;
}
