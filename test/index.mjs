import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from '../src/parse.mjs';

test('true', t => {
  const value = 'true';
  assert.strictEqual(JSON.parse(value), parse(value));
});

test('false', t => {
  const value = 'false';
  assert.strictEqual(JSON.parse(value), parse(value));
});

test('null', t => {
  const value = 'null';
  assert.strictEqual(JSON.parse(value), parse(value));
});

test('9007199254740991', t => {
  const value = '9007199254740991';
  assert.strictEqual(JSON.parse(value), parse(value));
});

test('-9007199254740991', t => {
  const value = '-9007199254740991';
  assert.strictEqual(JSON.parse(value), parse(value));
});

test('0.0001', t => {
  const value = '0.0001';
  assert.strictEqual(JSON.parse(value).toString(), parse(value).toString());
});

test('1000.0001', t => {
  const value = '1000.0001';
  assert.strictEqual(JSON.parse(value).toString(), parse(value).toString());
});

test('"string"', t => {
  const value = '"string"';
  assert.strictEqual(JSON.parse(value), parse(value));
});

// test('[]', t => {
//   const value = '[]';
//   assert.strictEqual(JSON.parse(value), parse(value));
// });

