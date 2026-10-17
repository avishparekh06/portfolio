import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import ClayShape from '../ClayShape.jsx';
import { WORLD_CENTERS } from '../path.js';

const ORBITERS = [
  { color: '#c0b4d8', r: 3.2, s: 0.45, speed: 0.35, y: 0.6 },
  { color: '#c8a850', r: 4.2, s: 0.32, speed: -0.25, y: -0.8 },
  { color: '#a0c0b8', r: 5.0, s: 0.55, speed: 0.18, y: 1.4 },
  { color: '#e0c0a0', r: 3.8, s: 0.28, speed: 0.5, y: -1.6 },
];

export default function HeroWorld({ reduced, shapeScale }) {
  const group = useRef();
  const count = Math.max(2, Math.round(ORBITERS.length * shapeScale));
  useFrame((state) => {
    if (reduced || !group.current) return;
    // blob leans toward the pointer
    group.current.rotation.y += (state.pointer.x * 0.4 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-state.pointer.y * 0.25 - group.current.rotation.x) * 0.05;
  });
  return (
    <group position={WORLD_CENTERS[0]}>
      <group ref={group}>
        <ClayShape kind="sphere" color="#d4a8b8" scale={2.4} reduced={reduced} float={0.5} />
      </group>
      {ORBITERS.slice(0, count).map((o, i) => (
        <Orbiter key={i} {...o} reduced={reduced} />
      ))}
    </group>
  );
}

function Orbiter({ color, r, s, speed, y, reduced }) {
  const ref = useRef();
  useFrame((state) => {
    if (reduced || !ref.current) return;
    const a = state.clock.elapsedTime * speed;
    ref.current.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
  });
  return (
    <group ref={ref} position={[r, y, 0]}>
      <ClayShape kind="sphere" color={color} scale={s} reduced={reduced} />
    </group>
  );
}
