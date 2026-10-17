import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Part } from '../parts.jsx';
import { glow, approach } from '../motion.js';
import { WORLD_CENTERS } from '../path.js';
import { lerp } from '../../lib/story.js';
import { story } from '../storyState.js';

const TEAL = '#2a4040';

// Each project is drawn as what it is. The object for the project card on screen scales up and
// animates; the others rest.

// MyToyota: a car driving along a road toward the personalised recommendations it produces.
function Car({ act, reduced }) {
  const car = useRef();
  const recs = useRef([]);
  useFrame((state) => {
    const a = act.current;
    if (car.current) car.current.position.x = (reduced ? 0 : Math.sin(state.clock.elapsedTime * 1.2)) * 1.4 * a - 1;
    recs.current.forEach((m, i) => {
      if (!m) return;
      m.scale.setScalar(0.2 + 0.8 * a);
      glow(m, lerp(0.05, 0.7, a));
      m.position.y = 0.4 + i * 0.7;
    });
  });
  return (
    <group>
      <Part size={[9, 0.1, 2.6]} color={TEAL} position={[0, -0.85, 0]} />
      <group ref={car} position={[-1, 0, 0]}>
        <Part size={[3, 0.8, 1.5]} color="#d4a8b8" position={[0, -0.2, 0]} />
        <Part size={[1.5, 0.7, 1.3]} color="#e0c0a0" position={[-0.2, 0.5, 0]} />
        {[[-1, -0.55, 0.75], [1, -0.55, 0.75], [-1, -0.55, -0.75], [1, -0.55, -0.75]].map((p, i) => (
          <Part key={i} kind="wheel" size={[0.38, 0.3]} color={TEAL} position={p} />
        ))}
      </group>
      {[0, 1, 2].map((i) => (
        <Part key={i} ref={(el) => (recs.current[i] = el)} kind="sphere" size={[0.35]} color="#c8a850" position={[4.2, 0.4 + i * 0.7, (i - 1) * 0.9]} />
      ))}
    </group>
  );
}

// Pintos: memory pages that swap while a clock hand sweeps over them (clock eviction).
function Pages({ act, reduced }) {
  const pages = useRef([]);
  const hand = useRef();
  useFrame((state) => {
    const a = act.current;
    const t = reduced ? 0 : state.clock.elapsedTime;
    pages.current.forEach((p, i) => {
      if (!p) return;
      p.position.x = Math.sin(t * 1.6 + i * 1.3) * 0.7 * a * (i % 2 ? 1 : -1);
      glow(p, i === Math.floor(t * 3) % 6 ? 0.6 * a : 0.04);
    });
    if (hand.current) hand.current.position.set(1.8, -0.4 + (Math.floor(t * 3) % 6) * 0.38, 0);
  });
  return (
    <group>
      {Array.from({ length: 6 }, (_, i) => (
        <Part key={i} ref={(el) => (pages.current[i] = el)} size={[2.6, 0.28, 2]} color={i % 2 ? '#c0b4d8' : TEAL} position={[0, -0.4 + i * 0.38, 0]} />
      ))}
      <Part ref={hand} kind="sphere" size={[0.22]} color="#ff4d8b" position={[1.8, -0.4, 0]} />
    </group>
  );
}

// charmV5: the five pipeline stages in a row, with an instruction moving through them.
function Pipeline({ act, reduced }) {
  const stages = useRef([]);
  useFrame((state) => {
    const a = act.current;
    const lit = reduced ? 0 : Math.floor(state.clock.elapsedTime * 2.2) % 5;
    stages.current.forEach((s, i) => {
      if (!s) return;
      const on = i === lit ? a : 0;
      s.position.y = 0.45 * on;
      glow(s, lerp(0.04, 0.7, on));
    });
  });
  return (
    <group>
      <Part size={[8, 0.1, 1.6]} color="#e8dcc6" position={[0, -0.6, 0]} />
      {Array.from({ length: 5 }, (_, i) => (
        <Part key={i} ref={(el) => (stages.current[i] = el)} size={[1.2, 1, 1.2]} color="#c0b4d8" position={[(i - 2) * 1.6, 0, 0]} />
      ))}
    </group>
  );
}

const PROJECTS = [
  { Obj: Car, pos: [0, 0, 0] },
  { Obj: Pages, pos: [0, 0, -9] },
  { Obj: Pipeline, pos: [0, 0, -18] },
];

function Project(props) {
  const { Obj, pos, index, reduced } = props;
  const root = useRef();
  const act = useRef(0);
  useFrame((state, dt) => {
    act.current = approach(act.current, story.active.projects === index ? 1 : 0, dt, reduced);
    if (root.current) root.current.scale.setScalar(0.8 + 0.3 * act.current);
  });
  return (
    <group ref={root} position={pos}>
      <Obj act={act} reduced={reduced} />
    </group>
  );
}

export default function ProjectsWorld({ reduced }) {
  return (
    <group position={WORLD_CENTERS[3]}>
      {PROJECTS.map((p, i) => (
        <Project key={i} Obj={p.Obj} pos={p.pos} index={i} reduced={reduced} />
      ))}
    </group>
  );
}
