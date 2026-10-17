import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import ClayShape from '../ClayShape.jsx';
import { WORLD_CENTERS } from '../path.js';
import { lerp, smoothstep } from '../../lib/story.js';
import { story } from '../storyState.js';

// The same colors as every earlier world, pulled together at the end.
const PIECES = [
  { color: '#d4a8b8', end: [0, 0, 0], s: 1.4, from: [-9, 4, 6] },
  { color: '#c8a850', end: [2.2, 0.8, -1], s: 0.7, from: [9, 5, 4] },
  { color: '#c0b4d8', end: [-2.2, -0.6, -0.5], s: 0.9, from: [-8, -4, 3] },
  { color: '#a0c0b8', end: [0.8, -1.8, 0.6], s: 0.55, from: [7, -5, 6] },
  { color: '#2a4040', end: [-1.2, 1.7, 0.4], s: 0.5, from: [-5, 7, 2] },
  { color: '#e0c0a0', end: [1.9, -1.2, 1], s: 0.45, from: [5, -7, 5] },
];

// As the last section is read, the scattered pieces converge into one assembled cluster and the
// ring around it forms.
export default function ContactWorld({ reduced, shapeScale }) {
  const pieces = useRef([]);
  const ring = useRef();
  const count = Math.max(3, Math.round(PIECES.length * shapeScale));

  useFrame((state) => {
    const k = smoothstep(0.05, 0.75, story.local[4]);
    pieces.current.forEach((g, i) => {
      if (!g) return;
      const p = PIECES[i];
      g.position.set(lerp(p.from[0], p.end[0], k), lerp(p.from[1], p.end[1], k), lerp(p.from[2], p.end[2], k));
    });
    if (ring.current) {
      ring.current.scale.setScalar(Math.max(0.001, k));
      if (!reduced) ring.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={WORLD_CENTERS[4]}>
      <group ref={ring}>
        <ClayShape kind="torus" color="#e0c0a0" scale={3.2} rotation={[Math.PI / 2.4, 0, 0]} reduced={reduced} float={0.3} />
      </group>
      {PIECES.slice(0, count).map((p, i) => (
        <group key={i} ref={(el) => (pieces.current[i] = el)}>
          <ClayShape kind="sphere" color={p.color} scale={p.s} reduced={reduced} float={0.4} />
        </group>
      ))}
    </group>
  );
}
