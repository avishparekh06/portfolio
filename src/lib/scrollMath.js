const clamp01 = (v) => Math.min(1, Math.max(0, v));

// anchors: vertical center (px from document top) of each section, in order.
// Returns 0..1 journey progress; 0 = first section centered, 1 = last centered.
export function sectionProgress(anchors, scrollY, viewportH) {
  const n = anchors.length;
  if (n < 2) return 0;
  const y = scrollY + viewportH / 2;
  if (y <= anchors[0]) return 0;
  if (y >= anchors[n - 1]) return 1;
  for (let i = 0; i < n - 1; i++) {
    if (y >= anchors[i] && y < anchors[i + 1]) {
      const local = (y - anchors[i]) / (anchors[i + 1] - anchors[i]);
      return clamp01((i + local) / (n - 1));
    }
  }
  return 1;
}

export function snapProgress(t, count) {
  if (count < 2) return 0;
  return Math.round(clamp01(t) * (count - 1)) / (count - 1);
}
