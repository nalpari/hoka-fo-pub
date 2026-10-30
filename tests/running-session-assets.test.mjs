import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import {
  runningSessionImage,
  runningSessionSessions,
} from '../src/components/running-session/runningSession.data.ts';

test('every session card and detail fixture resolves to a real PNG asset', () => {
  const images = new Set(
    runningSessionSessions.flatMap(({ image, detailImage }) => [image, detailImage]),
  );
  assert.ok(images.size >= 10);
  for (const image of images) {
    const href = runningSessionImage(image);
    const bytes = readFileSync(new URL('../public' + href, import.meta.url));
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', href);
    assert.ok(bytes.length > 100, href);
  }
});

test('service-owned absolute and remote image URLs remain unchanged', () => {
  for (const href of ['/images/custom/session.png', 'https://example.com/session.png']) {
    assert.equal(runningSessionImage(href), href);
  }
});
