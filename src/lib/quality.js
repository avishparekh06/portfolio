export function getQuality(width, cores) {
  const mobile = width < 768 || (cores > 0 && cores <= 4);
  return mobile
    ? { mobile: true, dpr: [1, 1.5], shapeScale: 0.5 }
    : { mobile: false, dpr: [1, 2], shapeScale: 1 };
}

export function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}
