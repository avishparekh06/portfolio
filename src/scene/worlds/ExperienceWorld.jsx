import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Part } from '../parts.jsx';
import { glow, approach } from '../motion.js';
import { WORLD_CENTERS } from '../path.js';
import { lerp } from '../../lib/story.js';
import { story } from '../storyState.js';

// One block per role, in the same order and accent colors as the experience cards (newest first).
const ROLES = [
  { company: 'Visa', color: '#c8a850', pos: [-1, 0, 0] },
  { company: 'RealWork', color: '#d4a8b8', pos: [1.5, 0, -6] },
  { company: 'Soche', color: '#c0b4d8', pos: [-1.2, 0, -12] },
  { company: 'CodeAssist', color: '#a0c0b8', pos: [1.5, 0, -18] },
];
const ROAD_START = 3;
const ROAD_LEN = 24;

// A timeline: the road fills as you scroll the section, a marker rides to the role you're
// reading, and that role's block rises and glows.
export default function ExperienceWorld({ reduced }) {
  const blocks = useRef([]);
  const act = useRef([0, 0, 0, 0]);
  const fill = useRef();
  const marker = useRef();
  const markerPos = useRef({ x: 0, z: ROAD_START });

  useFrame((state, dt) => {
    const active = story.active.experience;
    ROLES.forEach((role, i) => {
      act.current[i] = approach(act.current[i], active === i ? 1 : 0, dt, reduced);
      const b = blocks.current[i];
      if (!b) return;
      const sy = 1 + 0.9 * act.current[i];
      b.scale.y = sy;
      b.position.y = 0.5 * sy - 0.5;
      glow(b, lerp(0.05, 0.6, act.current[i]));
    });

    if (fill.current) {
      const len = Math.max(0.01, story.local[2] * ROAD_LEN);
      fill.current.scale.z = len;
      fill.current.position.z = ROAD_START - len / 2;
    }

    if (marker.current) {
      const target = ROLES[Math.max(0, active)].pos;
      markerPos.current.x = approach(markerPos.current.x, target[0], dt, reduced);
      markerPos.current.z = approach(markerPos.current.z, active < 0 ? ROAD_START : target[2], dt, reduced);
      const bob = reduced ? 0 : Math.sin(state.clock.elapsedTime * 3) * 0.15;
      marker.current.position.set(markerPos.current.x, 2.4 + bob + (active >= 0 ? 0.9 * act.current[active] : 0), markerPos.current.z);
    }
  });

  return (
    <group position={WORLD_CENTERS[2]}>
      <Part size={[0.7, 0.12, ROAD_LEN]} color="#e8dcc6" position={[0, -0.95, ROAD_START - ROAD_LEN / 2]} />
      <Part ref={fill} size={[0.74, 0.16, 1]} color="#2a4040" position={[0, -0.93, ROAD_START]} />
      {ROLES.map((r, i) => (
        <Part key={r.company} ref={(el) => (blocks.current[i] = el)} size={[2.2, 1, 2.2]} color={r.color} position={r.pos} />
      ))}
      <Part ref={marker} kind="sphere" size={[0.4]} color="#ff4d8b" position={[0, 2.4, ROAD_START]} />
    </group>
  );
}
