import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { URL } from 'node:url';

import ts from 'typescript';

const source = readFileSync(
  new URL('../src/components/common/molecules/dateRange.ts', import.meta.url),
  'utf8',
);

const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;

const { getPresetDateRange } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`
);

test('preset ranges use local calendar dates and clamp month ends and leap days', () => {
  assert.deepEqual(getPresetDateRange('1', new Date(2026, 2, 31, 23)), {
    period: '1',
    start: '2026-02-28',
    end: '2026-03-31',
  });
  assert.deepEqual(getPresetDateRange('1', new Date(2024, 2, 31)), {
    period: '1',
    start: '2024-02-29',
    end: '2024-03-31',
  });
  assert.deepEqual(getPresetDateRange('12', new Date(2024, 1, 29)), {
    period: '12',
    start: '2023-02-28',
    end: '2024-02-29',
  });
  for (const [period, start] of [
    ['1', '2026-10-18'],
    ['3', '2026-08-18'],
    ['6', '2026-05-18'],
    ['12', '2025-11-18'],
  ]) {
    assert.deepEqual(getPresetDateRange(period, new Date(2026, 10, 18)), {
      period,
      start,
      end: '2026-11-18',
    });
  }
  assert.equal(getPresetDateRange('3', new Date(2026, 0, 31)).start, '2025-10-31');
});
