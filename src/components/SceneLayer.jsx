import React, { lazy, Suspense, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { getQuality, hasWebGL } from '../lib/quality.js';

const Scene = lazy(() => import('../scene/Scene.jsx'));

class SceneBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Mounts the lazy 3D scene only when WebGL works; otherwise the cream body background shows.
export default function SceneLayer() {
  const reduced = useReducedMotion() ?? false;
  const webgl = useMemo(() => hasWebGL(), []);
  const quality = useMemo(() => getQuality(window.innerWidth, navigator.hardwareConcurrency), []);
  if (!webgl) return null;
  return (
    <SceneBoundary>
      <Suspense fallback={null}>
        <Scene reduced={reduced} quality={quality} />
      </Suspense>
    </SceneBoundary>
  );
}
