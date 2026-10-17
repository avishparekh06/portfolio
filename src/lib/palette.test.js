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
