import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { paletteAt } from '../lib/palette.js';
import { PALETTE_STOPS } from './path.js';

// Tints the background and fog by journey progress; adds soft warm lighting.
export default function Backdrop({ progress }) {
  const color = useMemo(() => new THREE.Color(PALETTE_STOPS[0]), []);
  const fog = useMemo(() => new THREE.Fog(PALETTE_STOPS[0], 18, 60), []);

  useFrame((state) => {
    color.set(paletteAt(PALETTE_STOPS, progress.current));
    state.scene.background = color;
    state.scene.fog = fog;
    fog.color.copy(color);
  });

  return (
    <>
      <hemisphereLight args={['#fff6e6', '#e8dcc6', 0.9]} />
      <directionalLight position={[6, 10, 8]} intensity={1.4} color="#fff0d8" />
    </>
  );
}
