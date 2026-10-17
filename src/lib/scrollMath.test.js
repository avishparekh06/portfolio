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
