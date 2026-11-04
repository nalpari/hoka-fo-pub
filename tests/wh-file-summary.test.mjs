import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

import ts from 'typescript';

const source = readFileSync(
  new URL('../src/app/wh/file-summary/route.ts', import.meta.url),
  'utf8',
);
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const sha = 'a'.repeat(40);

function setup(fetch, env = { OPENROUTER_API_KEY: 'test' }) {
  const context = { exports: {}, Request, Response, process: { env }, fetch };
  vm.runInNewContext(code, context);
  return context.exports.POST;
}

function request(body) {
  return new Request('http://localhost/wh/file-summary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

test('passes the requested file diff to OpenRouter', async () => {
  const calls = [];
  const post = setup(async (url, options) => {
    calls.push({ url, options });
    return url.includes('api.github.com')
      ? Response.json({ files: [{ filename: 'a.ts', patch: '@@\n-old\n+new' }] })
      : Response.json({ choices: [{ message: { content: '변경 요약' } }] });
  });
  const response = await post(request({ file: 'a.ts', commits: [sha] }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).summary, '변경 요약');
  assert.equal(calls.length, 2);
  assert.match(calls[1].options.body, /\+new/);
});

test('reports unavailable diff without calling OpenRouter', async () => {
  let calls = 0;
  const post = setup(async () => {
    calls++;
    return Response.json({ files: [{ filename: 'a.ts' }] });
  });
  const response = await post(request({ file: 'a.ts', commits: [sha] }));
  assert.match((await response.json()).summary, /diff를 제공받지/);
  assert.equal(calls, 1);
});

test('rejects invalid commit identifiers before making external requests', async () => {
  let calls = 0;
  const post = setup(async () => {
    calls++;
    return Response.json({});
  });
  const response = await post(request({ file: 'a.ts', commits: ['invalid'] }));
  assert.equal(response.status, 400);
  assert.equal(calls, 0);
});
