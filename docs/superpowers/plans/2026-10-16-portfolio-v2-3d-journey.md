# Portfolio v2: Scroll-Driven 3D Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat portfolio background with one fixed react-three-fiber scene whose camera flies along a path as the page scrolls, with a clay-style world per section, and sync the site copy to the current resume.

**Architecture:** A fixed full-screen `<Canvas>` sits behind normal scrolling HTML. Native document scroll is converted to a 0..1 journey value (piecewise by section centers). A `CameraRig` samples a `CatmullRomCurve3` with that value; per-section "world" components and a background/light palette are placed along the path. Pure logic (scroll math, palette lerp, quality tier) lives in `src/lib/` and is unit-tested with `node --test`; the 3D scene is checked with build, lint and the dev server.

**Tech Stack:** React 19, Vite 7, Tailwind 3, framer-motion 12, three 0.182 (already installed), `@react-three/fiber` ^9, `@react-three/drei` ^10 (new).

**Spec:** `docs/superpowers/specs/2026-10-16-portfolio-v2-3d-journey-design.md`

## Global Constraints

- Keep the cream clay palette: canvas `#fffaf0`, accents pink `#d4a8b8`, teal `#2a4040`, lavender `#c0b4d8`, peach `#e0c0a0`, ochre `#c8a850`, mint `#a0c0b8` (the values already used in the site).
- Scene shapes are primitives only: no model, texture or HDR downloads (do NOT use drei `<Environment preset>`, it fetches from a CDN).
- Same sections, ids and copy (`home`, `about`, `experience`, `projects`, `contact`), except the resume corrections in Task 5. `public/resume.pdf` is the source of truth.
- `npm run build` and `npm run lint` must pass after every task.
- Mobile / low-power: lower pixel ratio and fewer shapes, no postprocessing.
- `prefers-reduced-motion`: camera snaps between per-section views; float and pointer effects disabled.
- No WebGL: plain cream background; all content still works.
- Three.js / r3f must load in a lazy chunk so HTML content paints first.
- Commit messages end with: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`

## Review Focus

- Document height changes after load (fonts, images, resize): anchors must be re-measured, so the camera doesn't drift. (Task 1, Task 2)
- Jumping via nav hash links (`#projects`) causes a large instant scroll: the camera must damp smoothly, never snap or overshoot past the curve ends. (Task 1: clamping test)
- Scroll position outside the page range (iOS rubber-band, negative, past the end): journey value stays within 0..1. (Task 1)
- React StrictMode double-mount: only one canvas, with no duplicate listeners. (Task 2)
- WebGL unavailable or context creation fails: page still readable, no crash or blank screen. (Task 2)
- Touch devices have no hover pointer: scene must not rely on pointer position. (Task 2)

---

## File Structure

- Create `src/lib/scrollMath.js`: `sectionProgress`, `snapProgress` (pure).
- Create `src/lib/palette.js`: `lerpHex`, `paletteAt` (pure).
- Create `src/lib/quality.js`: `getQuality` (pure), `hasWebGL`.
- Create `src/lib/*.test.js`: node:test unit tests.
- Create `src/scene/path.js`: waypoints, world centers, palette stops (data).
- Create `src/scene/useJourney.js`: scroll listener, returns a ref with the 0..1 value.
- Create `src/scene/ClayShape.jsx`: one reusable floating clay primitive.
- Create `src/scene/CameraRig.jsx`: scroll to camera path.
- Create `src/scene/Backdrop.jsx`: background color and light tint by progress.
- Create `src/scene/worlds/{HeroWorld,AboutWorld,ExperienceWorld,ProjectsWorld,ContactWorld}.jsx`
- Create `src/scene/Scene.jsx`: Canvas, composition, hidden-tab pause, default export for lazy import.
- Create `src/components/SceneLayer.jsx`: lazy mount plus WebGL/fallback guard.
- Create `src/components/ScrollProgress.jsx`: top progress bar.
- Create `src/components/SectionHeading.jsx`: heading with a drawn underline.
- Modify `src/App.jsx`, `src/index.css`, `package.json`, all five section components, `Navbar.jsx` (background only).
- Delete `src/components/ThreeBackground.jsx`.

---

### Task 1: Dependencies and pure logic

**Files:**
- Modify: `package.json`
- Create: `src/lib/scrollMath.js`, `src/lib/palette.js`, `src/lib/quality.js`
- Test: `src/lib/scrollMath.test.js`, `src/lib/palette.test.js`, `src/lib/quality.test.js`

**Interfaces:**
- Produces:
  - `sectionProgress(anchors: number[], scrollY: number, viewportH: number): number` returns 0..1.
  - `snapProgress(t: number, count: number): number` returns the nearest section value.
  - `lerpHex(a: string, b: string, k: number): string`
  - `paletteAt(stops: string[], t: number): string`
  - `getQuality(width: number, cores: number): { mobile: boolean, dpr: [number, number], shapeScale: number }`
  - `hasWebGL(): boolean`

- [ ] **Step 1: Install dependencies and add the test script**

```bash
cd /Users/avish/Desktop/portfolio
npm install @react-three/fiber@^9 @react-three/drei@^10
npm pkg set scripts.test="node --test src/lib/"
```

Expected: both packages are added to `dependencies` with no peer-dependency errors (React 19 is supported by fiber 9).

- [ ] **Step 2: Write failing tests**

`src/lib/scrollMath.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { sectionProgress, snapProgress } from './scrollMath.js';

const anchors = [500, 1500, 2500]; // section centers
const vh = 1000;

test('start of page is 0', () => {
  assert.equal(sectionProgress(anchors, 0, vh), 0);
});
test('middle anchor is 0.5', () => {
  assert.equal(sectionProgress(anchors, 1000, vh), 0.5);
});
test('between anchors interpolates', () => {
  assert.equal(sectionProgress(anchors, 500, vh), 0.25);
});
test('past the end clamps to 1', () => {
  assert.equal(sectionProgress(anchors, 99999, vh), 1);
});
test('negative scroll (rubber-band) clamps to 0', () => {
  assert.equal(sectionProgress(anchors, -300, vh), 0);
});
test('fewer than 2 anchors returns 0', () => {
  assert.equal(sectionProgress([100], 500, vh), 0);
  assert.equal(sectionProgress([], 500, vh), 0);
});
test('snapProgress picks the nearest section', () => {
  assert.equal(snapProgress(0.3, 5), 0.25);
  assert.equal(snapProgress(0.9, 5), 1);
  assert.equal(snapProgress(0, 5), 0);
});
```

`src/lib/palette.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { lerpHex, paletteAt } from './palette.js';

test('lerpHex endpoints', () => {
  assert.equal(lerpHex('#000000', '#ffffff', 0), '#000000');
  assert.equal(lerpHex('#000000', '#ffffff', 1), '#ffffff');
});
test('lerpHex midpoint', () => {
  assert.equal(lerpHex('#000000', '#ffffff', 0.5), '#808080');
});
test('paletteAt hits stops and clamps', () => {
  const stops = ['#000000', '#ffffff', '#ff0000'];
  assert.equal(paletteAt(stops, 0), '#000000');
  assert.equal(paletteAt(stops, 0.5), '#ffffff');
  assert.equal(paletteAt(stops, 1), '#ff0000');
  assert.equal(paletteAt(stops, 2), '#ff0000');
  assert.equal(paletteAt(stops, -1), '#000000');
});
```

`src/lib/quality.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { getQuality } from './quality.js';

test('narrow screens are mobile tier', () => {
  const q = getQuality(390, 8);
  assert.equal(q.mobile, true);
  assert.deepEqual(q.dpr, [1, 1.5]);
  assert.equal(q.shapeScale, 0.5);
});
test('few cores is mobile tier', () => {
  assert.equal(getQuality(1440, 2).mobile, true);
});
test('desktop is full tier', () => {
  const q = getQuality(1440, 8);
  assert.equal(q.mobile, false);
  assert.deepEqual(q.dpr, [1, 2]);
  assert.equal(q.shapeScale, 1);
});
test('unknown core count (0/undefined) falls back to width only', () => {
  assert.equal(getQuality(1440, 0).mobile, false);
  assert.equal(getQuality(1440, undefined).mobile, false);
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL with "Cannot find module './scrollMath.js'" (and the same for the others).

- [ ] **Step 4: Implement**

`src/lib/scrollMath.js`:

```js
const clamp01 = (v) => Math.min(1, Math.max(0, v));

// anchors: vertical center (px from document top) of each section, in order.
// Returns 0..1 journey progress; 0 = first section centered, 1 = last centered.
export function sectionProgress(anchors, scrollY, viewportH) {
  const n = anchors.length;
  if (n < 2) return 0;
  const y = scrollY + viewportH / 2;
  if (y <= anchors[0]) return 0;
  if (y >= anchors[n - 1]) return 1;
  for (let i = 0; i < n - 1; i++) {
    if (y >= anchors[i] && y < anchors[i + 1]) {
      const local = (y - anchors[i]) / (anchors[i + 1] - anchors[i]);
      return clamp01((i + local) / (n - 1));
    }
  }
  return 1;
}

export function snapProgress(t, count) {
  if (count < 2) return 0;
  return Math.round(clamp01(t) * (count - 1)) / (count - 1);
}
```

`src/lib/palette.js`:

```js
const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (rgb) =>
  '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

export function lerpHex(a, b, k) {
  const ca = toRgb(a);
  const cb = toRgb(b);
  return toHex(ca.map((v, i) => v + (cb[i] - v) * k));
}

export function paletteAt(stops, t) {
  const c = Math.min(1, Math.max(0, t));
  const scaled = c * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(scaled));
  return lerpHex(stops[i], stops[i + 1], scaled - i);
}
```

`src/lib/quality.js`:

```js
export function getQuality(width, cores) {
  const mobile = width < 768 || (cores > 0 && cores <= 4);
  return mobile
    ? { mobile: true, dpr: [1, 1.5], shapeScale: 0.5 }
    : { mobile: false, dpr: [1, 2], shapeScale: 1 };
}

export function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS, all tests green.

- [ ] **Step 6: Lint, build and commit**

```bash
npm run lint && npm run build
git add package.json package-lock.json src/lib
git commit -m "feat: add r3f deps and pure scroll/palette/quality logic

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Scene shell with Hero world, camera path, and fallbacks

**Files:**
- Create: `src/scene/path.js`, `src/scene/useJourney.js`, `src/scene/ClayShape.jsx`, `src/scene/CameraRig.jsx`, `src/scene/Backdrop.jsx`, `src/scene/worlds/HeroWorld.jsx`, `src/scene/Scene.jsx`, `src/components/SceneLayer.jsx`
- Modify: `src/App.jsx`, `src/index.css`
- Delete: `src/components/ThreeBackground.jsx`

**Interfaces:**
- Consumes: `sectionProgress`, `snapProgress`, `paletteAt`, `getQuality`, `hasWebGL` from Task 1.
- Produces:
  - `WAYPOINTS: [number,number,number][]` (5), `WORLD_CENTERS: [number,number,number][]` (5), `PALETTE_STOPS: string[]` (5), `SECTION_IDS: string[]` from `path.js`.
  - `useJourney(): React.MutableRefObject<number>` (0..1).
  - `<ClayShape kind color position scale rotation float reduced />`, where `kind` is `'sphere' | 'block' | 'torus' | 'capsule'`.
  - `Scene` props: `{ reduced: boolean, quality: { dpr, shapeScale, mobile } }`; each world takes `{ reduced, shapeScale }`.

- [ ] **Step 1: Write `src/scene/path.js`**

```js
export const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'contact'];

// Camera waypoints, one per section; the journey runs mostly down -z with a gentle sway.
export const WAYPOINTS = [
  [0, 0, 14],
  [-1.5, 0.6, -8],
  [1.5, 0.2, -30],
  [-1, 0.8, -52],
  [0, 0.2, -74],
];

// Where each section's world sits: ahead of its waypoint, offset to the side opposite the text.
export const WORLD_CENTERS = [
  [4, 0, 2],
  [-4.5, 0, -20],
  [4.5, 0, -42],
  [0, 0, -64],
  [0, 0, -86],
];

// Background tint per section; all within the cream family.
export const PALETTE_STOPS = ['#fffaf0', '#fbf0e0', '#f6efe2', '#fdf1e4', '#fff6e6'];
```

- [ ] **Step 2: Write `src/scene/useJourney.js`**

```js
import { useEffect, useRef } from 'react';
import { sectionProgress } from '../lib/scrollMath.js';
import { SECTION_IDS } from './path.js';

// Returns a ref holding 0..1 journey progress. Re-measures section anchors when the
// document resizes (fonts/images loading) so the camera never drifts.
export default function useJourney() {
  const progress = useRef(0);

  useEffect(() => {
    let anchors = [];
    const measure = () => {
      anchors = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.top + window.scrollY + r.height / 2;
      }).filter((v) => v !== null);
    };
    const update = () => {
      progress.current = sectionProgress(anchors, window.scrollY, window.innerHeight);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, []);

  return progress;
}
```

- [ ] **Step 3: Write `src/scene/ClayShape.jsx`**

```jsx
import { Float, RoundedBox } from '@react-three/drei';

const GEOMETRY = {
  sphere: <sphereGeometry args={[1, 48, 48]} />,
  torus: <torusGeometry args={[1, 0.35, 24, 64]} />,
  capsule: <capsuleGeometry args={[0.5, 1, 8, 24]} />,
};

// One matte, soft-shaded clay primitive that floats gently. `reduced` freezes the float.
export default function ClayShape({
  kind = 'sphere',
  color,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  float = 1,
  reduced = false,
}) {
  const material = <meshStandardMaterial color={color} roughness={0.88} metalness={0} />;
  return (
    <Float
      speed={reduced ? 0 : 1.2}
      rotationIntensity={reduced ? 0 : 0.4 * float}
      floatIntensity={reduced ? 0 : 0.8 * float}
    >
      {kind === 'block' ? (
        <RoundedBox args={[1, 1, 1]} radius={0.22} smoothness={4} position={position} scale={scale} rotation={rotation}>
          {material}
        </RoundedBox>
      ) : (
        <mesh position={position} scale={scale} rotation={rotation}>
          {GEOMETRY[kind]}
          {material}
        </mesh>
      )}
    </Float>
  );
}
```

- [ ] **Step 4: Write `src/scene/CameraRig.jsx`**

```jsx
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { snapProgress } from '../lib/scrollMath.js';
import { WAYPOINTS } from './path.js';

export default function CameraRig({ progress, reduced }) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(WAYPOINTS.map((p) => new THREE.Vector3(...p))),
    [],
  );
  const smooth = useRef(0);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const tan = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    const raw = progress.current;
    const target = reduced ? snapProgress(raw, WAYPOINTS.length) : raw;
    smooth.current = reduced ? target : THREE.MathUtils.damp(smooth.current, target, 4, dt);
    const t = THREE.MathUtils.clamp(smooth.current, 0, 1);

    curve.getPointAt(t, pos);
    curve.getTangentAt(t, tan);
    look.copy(pos).addScaledVector(tan, 8);
    if (!reduced) pos.x += state.pointer.x * 0.5; // touch devices keep pointer at 0,0 so this is a no-op there
    state.camera.position.copy(pos);
    state.camera.lookAt(look);
  });
  return null;
}
```

- [ ] **Step 5: Write `src/scene/Backdrop.jsx`**

```jsx
import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { paletteAt } from '../lib/palette.js';
import { PALETTE_STOPS } from './path.js';

// Tints the background, fog and a warm key light by journey progress.
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
```

- [ ] **Step 6: Write `src/scene/worlds/HeroWorld.jsx`**

```jsx
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
```

- [ ] **Step 7: Write `src/scene/Scene.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import useJourney from './useJourney.js';
import CameraRig from './CameraRig.jsx';
import Backdrop from './Backdrop.jsx';
import HeroWorld from './worlds/HeroWorld.jsx';

export default function Scene({ reduced, quality }) {
  const progress = useJourney();
  const [visible, setVisible] = useState(!document.hidden);

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const worldProps = { reduced, shapeScale: quality.shapeScale };

  return (
    <Canvas
      dpr={quality.dpr}
      frameloop={visible ? 'always' : 'never'}
      camera={{ fov: 50, near: 0.1, far: 200, position: [0, 0, 14] }}
      gl={{ antialias: !quality.mobile, powerPreference: 'high-performance' }}
      eventSource={document.body}
      eventPrefix="client"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Backdrop progress={progress} />
      <CameraRig progress={progress} reduced={reduced} />
      <HeroWorld {...worldProps} />
    </Canvas>
  );
}
```

- [ ] **Step 8: Write `src/components/SceneLayer.jsx`**

```jsx
import { lazy, Suspense, useMemo } from 'react';
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
```

Add `import React from 'react';` at the top of this file (class component needs it under the existing lint config).

- [ ] **Step 9: Mount it in `src/App.jsx`, delete the old background, add a content layer**

Replace the `App` component body with:

```jsx
import React from 'react';
import SceneLayer from './components/SceneLayer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div style={{ minHeight: '100vh', color: '#0a0a0a' }}>
      <SceneLayer />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
```

```bash
git rm src/components/ThreeBackground.jsx
```

In `src/index.css`, the `body` rule already sets `background-color: #fffaf0`; leave it (it is the no-WebGL fallback and the pre-load color).

- [ ] **Step 10: Make section backgrounds transparent so the scene shows**

In `Hero.jsx`, `About.jsx`, `Experience.jsx`, `Projects.jsx`, `Contact.jsx`, change each `<section ...>` style `backgroundColor: '#...'` to `backgroundColor: 'transparent'`. In `Hero.jsx` also remove any solid `backgroundColor` on the section (keep the faint radial-gradient overlay if present).

Run: `grep -n "backgroundColor" src/components/{Hero,About,Experience,Projects,Contact}.jsx | grep -i "section" `
Expected: no remaining solid-color section backgrounds.

- [ ] **Step 11: Verify**

```bash
npm test && npm run lint && npm run build
npm run dev
```

Open the dev URL. Expected: a pink clay blob with orbiting spheres on the right of the hero, the camera visibly moves forward and sways as you scroll, the background tint shifts subtly, with no console errors. Build output shows a separate lazy chunk for the scene. Then disable WebGL (Chrome flag `--disable-gpu` or the `chrome://flags` WebGL toggle): the cream page still renders with all content.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: add scroll-driven 3D scene shell with hero world

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: The other four worlds

**Files:**
- Create: `src/scene/worlds/AboutWorld.jsx`, `ExperienceWorld.jsx`, `ProjectsWorld.jsx`, `ContactWorld.jsx`
- Modify: `src/scene/Scene.jsx`

**Interfaces:**
- Consumes: `ClayShape` (Task 2), `WORLD_CENTERS`, `useThree`/`useFrame`.
- Produces: default-export components taking `{ reduced, shapeScale }`.

- [ ] **Step 1: Write `AboutWorld.jsx`** (lavender and mint stepping stones, drifted past)

```jsx
import ClayShape from '../ClayShape.jsx';
import { WORLD_CENTERS } from '../path.js';

const STONES = [
  { kind: 'block', color: '#c0b4d8', position: [0, 0, 0], scale: [2.4, 0.7, 2.4] },
  { kind: 'sphere', color: '#a0c0b8', position: [3.5, 1.4, -4], scale: 1.1 },
  { kind: 'block', color: '#a0c0b8', position: [-2.5, -1.2, -7], scale: [1.8, 0.6, 1.8] },
  { kind: 'capsule', color: '#c0b4d8', position: [2, 0.4, -11], scale: 1.0, rotation: [0, 0, 1] },
  { kind: 'sphere', color: '#e0c0a0', position: [-3.5, 1.8, -14], scale: 0.8 },
  { kind: 'block', color: '#c0b4d8', position: [1.5, -0.8, -17], scale: [2, 0.6, 2] },
];

export default function AboutWorld({ reduced, shapeScale }) {
  const count = Math.max(3, Math.round(STONES.length * shapeScale));
  return (
    <group position={WORLD_CENTERS[1]}>
      {STONES.slice(0, count).map((s, i) => (
        <ClayShape key={i} reduced={reduced} {...s} />
      ))}
    </group>
  );
}
```

- [ ] **Step 2: Write `ExperienceWorld.jsx`** (winding path; one block per role, in order)

```jsx
import ClayShape from '../ClayShape.jsx';
import { WORLD_CENTERS } from '../path.js';

// One block per role: Visa, RealWork, Soche, CodeAssist (newest first, like the cards).
const BLOCKS = [
  { color: '#c8a850', position: [-1, 1.4, 0] },
  { color: '#d4a8b8', position: [2, 0.5, -6] },
  { color: '#c0b4d8', position: [-1.5, -0.4, -12] },
  { color: '#a0c0b8', position: [2.2, -1.2, -18] },
];

export default function ExperienceWorld({ reduced, shapeScale }) {
  return (
    <group position={WORLD_CENTERS[2]}>
      {BLOCKS.map((b, i) => (
        <ClayShape key={i} kind="block" scale={[2.4, 1.2, 2.4]} reduced={reduced} float={0.6} {...b} />
      ))}
      {/* teal path stones connecting the blocks; fewer on low-power devices */}
      {Array.from({ length: Math.round(8 * shapeScale) }, (_, i) => (
        <ClayShape
          key={`p${i}`}
          kind="sphere"
          color="#2a4040"
          scale={0.28}
          position={[Math.sin(i * 0.9) * 1.6, 0.6 - i * 0.28, -i * 2.4]}
          reduced={reduced}
          float={0.3}
        />
      ))}
    </group>
  );
}
```

- [ ] **Step 3: Write `ProjectsWorld.jsx`** (arc of tiles; nearest to the camera glows)

```jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { WORLD_CENTERS } from '../path.js';

// MyToyota, Pintos, charmV5, same colors as the project cards.
const TILES = [
  { color: '#d4a8b8', position: [-5, 0.5, 2], rotY: 0.5 },
  { color: '#2a4040', position: [0, -0.2, -3], rotY: 0 },
  { color: '#c0b4d8', position: [5, 0.5, 2], rotY: -0.5 },
];

function Tile({ color, position, rotY, reduced }) {
  const mesh = useRef();
  const mat = useRef();
  const wp = useRef(new THREE.Vector3());
  useFrame((state) => {
    if (!mesh.current || !mat.current) return;
    mesh.current.getWorldPosition(wp.current);
    const dist = state.camera.position.distanceTo(wp.current);
    mat.current.emissiveIntensity = THREE.MathUtils.clamp(1 - dist / 22, 0, 1) * 0.35;
    if (!reduced) {
      mesh.current.rotation.y = rotY + state.pointer.x * 0.2;
      mesh.current.rotation.x = -state.pointer.y * 0.1;
    }
  });
  return (
    <RoundedBox ref={mesh} args={[3.2, 2.2, 0.4]} radius={0.2} smoothness={4} position={position} rotation={[0, rotY, 0]}>
      <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={0} roughness={0.88} />
    </RoundedBox>
  );
}

export default function ProjectsWorld({ reduced }) {
  return (
    <group position={WORLD_CENTERS[3]}>
      {TILES.map((t, i) => (
        <Tile key={i} reduced={reduced} {...t} />
      ))}
    </group>
  );
}
```

- [ ] **Step 4: Write `ContactWorld.jsx`** (calm cluster around a soft ring)

```jsx
import ClayShape from '../ClayShape.jsx';
import { WORLD_CENTERS } from '../path.js';

const CLUSTER = [
  { kind: 'sphere', color: '#d4a8b8', position: [0, 0, 0], scale: 1.4 },
  { kind: 'sphere', color: '#c8a850', position: [2.2, 0.8, -1], scale: 0.7 },
  { kind: 'sphere', color: '#c0b4d8', position: [-2.2, -0.6, -0.5], scale: 0.9 },
  { kind: 'sphere', color: '#a0c0b8', position: [0.8, -1.8, 0.6], scale: 0.55 },
];

export default function ContactWorld({ reduced, shapeScale }) {
  const count = Math.max(2, Math.round(CLUSTER.length * shapeScale));
  return (
    <group position={WORLD_CENTERS[4]}>
      <ClayShape kind="torus" color="#e0c0a0" scale={3.2} rotation={[Math.PI / 2.4, 0, 0]} reduced={reduced} float={0.3} />
      {CLUSTER.slice(0, count).map((s, i) => (
        <ClayShape key={i} reduced={reduced} float={0.4} {...s} />
      ))}
    </group>
  );
}
```

- [ ] **Step 5: Compose in `Scene.jsx`**

Add the imports and render all five worlds:

```jsx
import AboutWorld from './worlds/AboutWorld.jsx';
import ExperienceWorld from './worlds/ExperienceWorld.jsx';
import ProjectsWorld from './worlds/ProjectsWorld.jsx';
import ContactWorld from './worlds/ContactWorld.jsx';
```

```jsx
      <HeroWorld {...worldProps} />
      <AboutWorld {...worldProps} />
      <ExperienceWorld {...worldProps} />
      <ProjectsWorld {...worldProps} />
      <ContactWorld {...worldProps} />
```

- [ ] **Step 6: Verify and tune**

```bash
npm run lint && npm run build && npm run dev
```

Scroll the whole page. Expected: each section reveals its world (hero blob, lavender and mint stones, an ochre/pink/lavender/mint block path, three tiles that glow as the camera approaches, a calm ring cluster at the end); fog hides far shapes. If a world is off-screen or hidden behind text at a section's center, adjust that world's entry in `WORLD_CENTERS` (`src/scene/path.js`) in whole units until it frames next to the content. Check at 1440px and 390px widths.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add about, experience, projects and contact worlds

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: HTML overlay restyle, progress bar, and heading reveals

**Files:**
- Create: `src/components/ScrollProgress.jsx`, `src/components/SectionHeading.jsx`
- Modify: `src/index.css`, `src/App.jsx`, `Navbar.jsx`, `About.jsx`, `Experience.jsx`, `Projects.jsx`, `Contact.jsx`

**Interfaces:**
- Produces: `<ScrollProgress />`, `<SectionHeading>{children}</SectionHeading>`, and the CSS class `.glass`.

- [ ] **Step 1: Add the glass style to `src/index.css`**

```css
/* Translucent cream surface so text stays readable over the 3D scene */
.glass {
  background-color: rgba(255, 250, 240, 0.74) !important;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.6) !important;
}
```

- [ ] **Step 2: Write `src/components/ScrollProgress.jsx`**

```jsx
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#ff4d8b',
        zIndex: 60,
      }}
    />
  );
}
```

Render `<ScrollProgress />` inside `App.jsx`'s `<main>` right before `<Navbar />` (add the import).

- [ ] **Step 3: Write `src/components/SectionHeading.jsx`**

```jsx
import { motion } from 'framer-motion';

export default function SectionHeading({ children }) {
  return (
    <h2 className="display-lg" style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -6,
          height: 5,
          borderRadius: 3,
          backgroundColor: '#ff4d8b',
          transformOrigin: '0% 50%',
          display: 'block',
        }}
      />
    </h2>
  );
}
```

- [ ] **Step 4: Swap in the headings**

Run: `grep -n 'h2 className="display-lg"' src/components/*.jsx`
For every match, replace `<h2 className="display-lg">TEXT</h2>` with `<SectionHeading>TEXT</SectionHeading>` and add `import SectionHeading from './SectionHeading';` to that file. If a heading carries extra inline style (e.g. margin) that must be kept, wrap `<SectionHeading>` in a `<div style={{ ...that style }}>`.

- [ ] **Step 5: Make cream cards glass and soften the navbar**

Run: `grep -n "backgroundColor: '#f5f0e0'\|backgroundColor: '#ffffff'\|backgroundColor: '#fffaf0'" src/components/{About,Experience,Projects,Contact}.jsx`
Rule: only cream or white card containers get `className="glass"` added (keep their padding and radius). Do NOT touch the colored clay cards (pink, teal, lavender, peach, ochre), which stay opaque and now read as clay tiles over the scene. In `Navbar.jsx` change the `<nav>` `backgroundColor: '#fffaf0'` to `'rgba(255,250,240,0.78)'` and add `backdropFilter: 'blur(10px)'`.

- [ ] **Step 6: Shift the Experience content so its world is visible**

In `Experience.jsx`, change the container `margin: '0 auto'` to `margin: '0 0 0 max(0px, calc((100vw - 896px) / 4))'` so on wide screens the cards sit left of center and the world shows on the right; below ~900px it stays full width.

- [ ] **Step 7: Verify**

```bash
npm run lint && npm run build && npm run dev
```

Expected: progress bar fills while scrolling; headings draw a pink underline on entry; cream cards are frosted and legible over shapes; navbar is frosted; Experience content is left-weighted on desktop. Check 1440px and 390px widths.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: restyle overlay with glass cards, progress bar, heading reveals

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Sync site content to the updated resume

**Files:**
- Modify: `src/components/About.jsx`, `src/components/Experience.jsx`

- [ ] **Step 1: Fix Education in `About.jsx`**

```jsx
        details: 'Minor in Statistics and Data Science',
        coursework: [
            'Data Structures & Algorithms', 'Operating Systems', 'Computer Architecture',
            'Machine Learning', 'Object-Oriented Programming', 'Cloud Native Computing',
            'Linear Algebra', 'Multivariable Calculus', 'Discrete Mathematics',
        ],
```

(This replaces `'Major in Mathematics · Minor in Business'`, removes "Probability & Statistics", and adds "Cloud Native Computing".)

- [ ] **Step 2: Add SQLite to Databases in `About.jsx`**

Change the Databases `tools` array to:
`['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Supabase', 'SQLite', 'pgvector', 'Neo4j']`

- [ ] **Step 3: Fix Experience in `Experience.jsx`**

- RealWork first bullet: change `'Reduced reporting workload by 40% for 10,000+ businesses...'` to `'Condensed reporting workload by 40% for 10,000+ businesses by building SEO dashboard with Flask and React.'`
- Soche tags: change `['Mobile Dev', 'RAG', 'OpenAI API', 'UI/UX']` to `['Mobile Dev', 'RAG', 'UI/UX']`.

- [ ] **Step 4: Re-diff against the resume**

Run: `grep -n "Minor in\|Major in\|Cloud Native\|Probability\|SQLite\|Condensed\|OpenAI API" src/components/About.jsx src/components/Experience.jsx`
Expected: "Minor in Statistics and Data Science", "Cloud Native Computing", "SQLite" and "Condensed" present; no "Major in", "Probability" or "OpenAI API" (the CodeAssist tags and bullets don't use "OpenAI API"; "OpenAI-assisted" in a bullet is fine).
Then open `public/resume.pdf` and skim each section against the site once more; fix anything else that differs.

- [ ] **Step 5: Verify and commit**

```bash
npm run lint && npm run build
git add -A
git commit -m "fix: sync education, skills and experience copy with resume

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Reduced motion, performance and final verification

**Files:**
- Modify: as needed from findings (likely none)

- [ ] **Step 1: Reduced-motion check**

In Chrome DevTools, Rendering panel, set "Emulate CSS prefers-reduced-motion: reduce" and reload. Expected: the camera snaps to the five section views (no continuous fly), shapes don't float, the hero blob ignores the pointer. Section fade-ups still run, which is acceptable.

- [ ] **Step 2: Low-power tier check**

Resize to 390px wide and reload. Expected: visibly fewer shapes (hero 2 orbiters, about 3 stones, fewer path stones), no jank. In DevTools Performance monitor, scrolling holds close to 60fps on desktop and stays smooth under 4x CPU throttle.

- [ ] **Step 3: Review Focus checks**

- Hash jump: click each nav link; the camera glides to the section and doesn't snap or fly past the ends.
- Rubber-band: on a touch emulator, overscroll at top and bottom; the scene stays at its first or last view.
- Resize and late content: resize the window mid-scroll; the world stays aligned with its section.
- StrictMode: confirm exactly one `<canvas>` in the DOM and no duplicate console warnings.
- Hidden tab: switch tabs and back; the render loop resumes with no console errors.
- No WebGL: confirm the page is fully readable with the cream background.

- [ ] **Step 4: Full verification and commit**

```bash
npm test && npm run lint && npm run build
git status
```

Expected: tests pass, lint clean, build succeeds with the scene in a separate chunk. If any fixes were made in this task, commit them:

```bash
git add -A
git commit -m "chore: v2 verification fixes

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```
