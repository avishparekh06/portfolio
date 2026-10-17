import test from 'node:test';
import assert from 'node:assert/strict';
import { localProgress, activeIndex, smoothstep, lerp } from './story.js';

test('localProgress is 0 before and 1 after the section passes the viewport center', () => {
  // section spans 1000..2000, viewport 800 tall => center line = scrollY + 400
  assert.equal(localProgress(1000, 1000, 0, 800), 0);
  assert.equal(localProgress(1000, 1000, 5000, 800), 1);
});
test('localProgress is 0.5 when the center line is mid-section', () => {
  assert.equal(localProgress(1000, 1000, 1100, 800), 0.5);
});
test('localProgress with zero height does not divide by zero', () => {
  assert.equal(localProgress(1000, 0, 1000, 800), 1);
});

const vh = 800;
test('activeIndex picks the card containing the viewport center', () => {
  const rects = [{ top: -300, bottom: 100 }, { top: 150, bottom: 600 }, { top: 650, bottom: 1100 }];
  assert.equal(activeIndex(rects, vh), 1);
});
test('activeIndex falls back to the visible card nearest the center', () => {
  const rects = [{ top: 100, bottom: 300 }, { top: 500, bottom: 700 }];
  // center = 400; card 0 center 200 (dist 200), card 1 center 600 (dist 200) -> tie goes to first
  assert.equal(activeIndex(rects, vh), 0);
});
test('activeIndex is -1 when no card is on screen', () => {
  assert.equal(activeIndex([{ top: 900, bottom: 1200 }, { top: -500, bottom: -100 }], vh), -1);
  assert.equal(activeIndex([], vh), -1);
});

test('smoothstep clamps and eases', () => {
  assert.equal(smoothstep(0.2, 0.8, 0), 0);
  assert.equal(smoothstep(0.2, 0.8, 1), 1);
  assert.ok(Math.abs(smoothstep(0.2, 0.8, 0.5) - 0.5) < 1e-9);
});
test('lerp interpolates', () => {
  assert.equal(lerp(10, 20, 0.25), 12.5);
});
