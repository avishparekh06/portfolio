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
