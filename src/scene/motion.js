import * as THREE from 'three';

export const glow = (mesh, v) => {
  if (mesh && mesh.material) mesh.material.emissiveIntensity = v;
};

// Move `cur` toward `target`; reduced motion jumps straight there.
export const approach = (cur, target, dt, reduced) =>
  reduced ? target : THREE.MathUtils.damp(cur, target, 6, dt);
