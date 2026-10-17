import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import ClayShape from '../ClayShape.jsx';
import { WORLD_CENTERS } from '../path.js';
import { smoothstep } from '../../lib/story.js';
import { story } from '../storyState.js';

const PIECES = [
  { color: '#c0b4d8', r: 3.2, s: 0.45, speed: 0.35, y: 0.6 },
  { color: '#c8a850', r: 4.2, s: 0.32, speed: -0.25, y: -0.8 },
  { color: '#a0c0b8', r: 5.0, s: 0.55, speed: 0.18, y: 1.4 },
  { color: '#e0c0a0', r: 3.8, s: 0.28, speed: 0.5, y: -1.6 },
  { color: '#2a4040', r: 3.6, s: 0.3, speed: -0.4, y: 1.8 },
  { color: '#d4a8b8', r: 4.6, s: 0.38, speed: 0.3, y: -0.2 },
  { color: '#c0b4d8', r: 5.4, s: 0.26, speed: -0.2, y: -1.2 },
  { color: '#c8a850', r: 3.0, s: 0.24, speed: 0.55, y: 0.2 },
];

// The pink sphere is "you". It sits whole while the intro is read, then as you scroll away it
// shrinks and its pieces scatter forward, toward the skills they become in the next world.
export default function HeroWorld({ reduced, shapeScale }) {
  const core = useRef();
  const pieces = useRef([]);
  const count = Math.max(4, Math.round(PIECES.length * shapeScale));

  useFrame((state) => {
    const leave = smoothstep(0.3, 1, story.local[0]);
    if (core.current) {
      core.current.scale.setScalar(1 - 0.5 * leave);
      if (!reduced) {
        core.current.rotation.y += (state.pointer.x * 0.4 - core.current.rotation.y) * 0.05;
        core.current.rotation.x += (-state.pointer.y * 0.25 - core.current.rotation.x) * 0.05;
      }
    }
    pieces.current.forEach((g, i) => {
      if (!g) return;
      const p = PIECES[i];
      const a = (reduced ? 0 : state.clock.elapsedTime * p.speed) + i;
      const r = p.r * (1 + leave * 1.6);
      g.position.set(Math.cos(a) * r, p.y * (1 + leave), Math.sin(a) * r - leave * 14);
    });
  });

  return (
    <group position={WORLD_CENTERS[0]}>
      <group ref={core}>
        <ClayShape kind="sphere" color="#d4a8b8" scale={2.4} reduced={reduced} float={0.5} />
      </group>
      {PIECES.slice(0, count).map((p, i) => (
        <group key={i} ref={(el) => (pieces.current[i] = el)}>
          <ClayShape kind="sphere" color={p.color} scale={p.s} reduced={reduced} />
        </group>
      ))}
    </group>
  );
}
