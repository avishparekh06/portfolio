import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { snapProgress } from '../lib/scrollMath.js';
import { WAYPOINTS } from './path.js';

const CURVE = new THREE.CatmullRomCurve3(WAYPOINTS.map((p) => new THREE.Vector3(...p)));
const pos = new THREE.Vector3();
const tan = new THREE.Vector3();
const look = new THREE.Vector3();

export default function CameraRig({ progress, reduced }) {
  const smooth = useRef(0);

  useFrame((state, dt) => {
    const raw = progress.current;
    const target = reduced ? snapProgress(raw, WAYPOINTS.length) : raw;
    smooth.current = reduced ? target : THREE.MathUtils.damp(smooth.current, target, 4, dt);
    const t = THREE.MathUtils.clamp(smooth.current, 0, 1);

    CURVE.getPointAt(t, pos);
    CURVE.getTangentAt(t, tan);
    look.copy(pos).addScaledVector(tan, 8);
    if (!reduced) pos.x += state.pointer.x * 0.5; // touch devices keep pointer at 0,0 so this is a no-op there
    state.camera.position.copy(pos);
    state.camera.lookAt(look);
  });
  return null;
}
