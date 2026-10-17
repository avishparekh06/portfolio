import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Part } from '../parts.jsx';
import { glow, approach } from '../motion.js';
import { WORLD_CENTERS } from '../path.js';
import { lerp, smoothstep } from '../../lib/story.js';
import { story } from '../storyState.js';

// One cluster per skill group, in the same order and colors as the skill cards.
const GROUPS = [
  { name: 'Languages', color: '#2a4040', count: 7, pos: [-2.5, 2.2, 0] },
  { name: 'Frameworks & Tools', color: '#e0c0a0', count: 6, pos: [2.5, 2.2, -3] },
  { name: 'Databases', color: '#d4a8b8', count: 5, pos: [-2.5, -1.6, -6] },
  { name: 'AI / ML', color: '#c8a850', count: 5, pos: [2.5, -1.6, -9] },
];

// Points spread over a sphere shell (fibonacci), so each cluster reads as one cluster.
const shell = (i, n, radius) => {
  const y = 1 - (i / Math.max(1, n - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const phi = i * 2.399963;
  return [Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius];
};

// Pieces drift in from far away and assemble into skill clusters as the section is read;
// the cluster for the skill card on screen grows and lights up.
function Cluster({ group, index, reduced, shapeScale }) {
  const root = useRef();
  const act = useRef(0);
  const n = Math.max(3, Math.round(group.count * shapeScale));

  useFrame((state, dt) => {
    const assemble = smoothstep(0.02, 0.5, story.local[1]);
    act.current = approach(act.current, story.active.skills === index ? 1 : 0, dt, reduced);
    if (!root.current) return;
    root.current.scale.setScalar(0.9 + 0.35 * act.current);
    if (!reduced) root.current.rotation.y = state.clock.elapsedTime * 0.25;
    root.current.children.forEach((mesh, i) => {
      const [bx, by, bz] = shell(i, n, 1.15);
      const far = 1 + (1 - assemble) * 5;
      mesh.position.set(bx * far + (1 - assemble) * (i % 2 ? 4 : -4), by * far, bz * far - (1 - assemble) * 10);
      glow(mesh, lerp(0.05, 0.55, act.current));
    });
  });

  return (
    <group position={group.pos}>
      <group ref={root}>
        {Array.from({ length: n }, (_, i) => (
          <Part key={i} kind="sphere" color={group.color} size={[0.38 + (i % 3) * 0.08]} />
        ))}
      </group>
    </group>
  );
}

export default function AboutWorld({ reduced, shapeScale }) {
  return (
    <group position={WORLD_CENTERS[1]}>
      {GROUPS.map((g, i) => (
        <Cluster key={g.name} group={g} index={i} reduced={reduced} shapeScale={shapeScale} />
      ))}
    </group>
  );
}
