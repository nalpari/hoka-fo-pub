import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, URL } from 'node:url';
import vm from 'node:vm';

import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));

const data = JSON.parse(
  readFileSync(path.join(root, 'src/app/screen-index/screenChangeHistory.generated.json'), 'utf8'),
);

const module = { exports: {} };

const code = ts.transpileModule(
  readFileSync(path.join(root, 'src/app/screen-index/screenChangeHistory.ts'), 'utf8'),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  },
).outputText;

vm.runInThisContext(`(function(require, module, exports) {${code}\n})`)(
  (specifier) =>
    specifier === './screenDevelopers'
      ? {
          getScreenDeveloperNames: (screen, href) =>
            screen.stateDevelopers?.[href] ?? screen.developers ?? [],
          getScreenDevelopers: (screen, href) =>
            (screen.stateDevelopers?.[href] ?? screen.developers ?? []).map((name) => ({ name })),
        }
      : data,
  module,
  module.exports,
);

const {
  getChangeReportsForDate,
  getReportUrlState,
  getReportNavigationUrl,
  getChangeOwnerPath,
  groupChangeHistoryEntries,
  getChangeReportTableGroups,
  getChangeScreenLabels,
} = module.exports;

const entry = (id, path, href = null) => ({ id, owners: [{ path, href }] });

test('menu labels preserve multiple owners and state URLs without treating indirect impact as ownership', () => {
  assert.deepEqual(
    getChangeScreenLabels({
      owners: [
        { path: '마이페이지|구매내역|주문배송 조회', href: '/mypage/orders?state=empty#list' },
        { path: '마이페이지|구매내역|취소/반품 내역', href: null },
      ],
    }),
    [
      '마이페이지 > 구매내역 > 주문배송 조회 · STATE: /mypage/orders?state=empty#list',
      '마이페이지 > 구매내역 > 취소/반품 내역',
    ],
  );
  assert.deepEqual(getChangeScreenLabels(entry('product', 'product:eland_hca_02')), [
    '상품 공통 > 상품 상세',
  ]);
  assert.deepEqual(getChangeScreenLabels({ owners: [], affectedIa: [1] }), [
    '공통 UI · 영향 가능 화면',
  ]);
  assert.deepEqual(getChangeScreenLabels({ owners: [], affectedIa: [] }), [
    '화면 외 공통 · 설정/에셋',
  ]);
});

test('product aliases share the existing product summary owner', () => {
  assert.equal(
    getChangeOwnerPath({ screenCode: 'eland_hca_01', depths: ['MEN', '신발'] }),
    'product:eland_hca_01',
  );
  assert.equal(
    getChangeOwnerPath({ screenCode: 'eland_hca_01', depths: ['WOMEN', '신발'] }),
    'product:eland_hca_01',
  );
});

test('identical summaries group files once without losing file-specific ranges', () => {
  const entries = [
    { id: 'one', summary: 'SVG 경로 변경', ranges: [{ oldStart: 1 }] },
    { id: 'two', summary: 'SVG 경로 변경', ranges: [{ oldStart: 8 }] },
    { id: 'three', summary: '선택 시트 변경', ranges: [] },
  ];
  const groups = groupChangeHistoryEntries(entries);
  assert.equal(groups.length, 2);
  assert.deepEqual(
    groups[0].entries.map(({ id }) => id),
    ['one', 'two'],
  );
  assert.equal(groups[0].entries[1].ranges[0].oldStart, 8);
});

test('generated reports cover the net diff except Markdown once with valid source ranges', () => {
  for (const report of data.reports) {
    const files = execFileSync(
      'git',
      ['diff', '--name-status', '--find-renames', report.baseSha, report.targetSha],
      {
        cwd: root,
        encoding: 'utf8',
      },
    )
      .trim()
      .split('\n')
      .filter(Boolean)
      .filter(
        (line) =>
          !line
            .split('\t')
            .slice(1)
            .some((file) => /\.md$/i.test(file)),
      )
      .filter(
        (line) =>
          !line
            .split('\t')
            .slice(1)
            .some(
              (file) =>
                file.startsWith('src/app/publishing-guide/') ||
                file.startsWith('src/app/screen-index/') ||
                file === 'src/data/screenRegistry.ts' ||
                [
                  'tests/main-change-history.test.mjs',
                  'tests/preview-links.test.mjs',
                  'tests/screen-files.test.mjs',
                  'tests/screen-progress.test.mjs',
                ].includes(file),
            ),
      )
      .map((line) => line.split('\t').at(-1));
    const included = files.filter((file) => !report.excludedAuthorFiles.includes(file));
    assert.deepEqual(report.entries.map(({ file }) => file).sort(), included.sort());
    for (const file of report.excludedAuthorFiles) {
      const authors = execFileSync(
        'git',
        ['log', '--format=%an', `${report.baseSha}..${report.targetSha}`, '--', file],
        { cwd: root, encoding: 'utf8' },
      )
        .trim()
        .split('\n');
      assert.ok(authors.length && authors.every((author) => author.toLowerCase() === 'nalpari'));
    }
    assert.equal(new Set(report.entries.map(({ id }) => id)).size, report.entries.length);
    for (const item of report.entries) {
      assert.ok(item.summary.trim());
      assert.ok(!/\.md$/i.test(item.file));
      assert.ok(item.commits.every((commit) => !('author' in commit)));
      for (const range of item.ranges) {
        assert.ok(range.oldCount >= 0 && range.newCount >= 0);
        assert.ok(range.oldCount + range.newCount > 0);
      }
      assert.equal(
        new Set(item.owners.map((owner) => owner.path + '@' + owner.href)).size,
        item.owners.length,
      );
    }
  }
});

test('report table rowspans preserve each file once and resolve state ownership from IA', () => {
  const screens = [
    {
      iaNumber: 1,
      screenCode: '',
      depths: ['주문', '상세'],
      developers: ['전은주'],
      stateDevelopers: { '/checkout/preview-shipping': ['김진영'] },
    },
  ];
  const report = {
    entries: [
      {
        ...entry('shipping', '주문|상세', '/checkout/preview-shipping'),
        summary: '배송지 변경',
        affectedIa: [1],
      },
      { ...entry('payment', '주문|상세'), summary: '결제 변경', affectedIa: [1] },
      { id: 'common', owners: [], summary: 'SVG 변경', affectedIa: [1] },
    ],
  };
  const groups = getChangeReportTableGroups(report, screens);
  assert.equal(
    groups.reduce((count, group) => count + group.rowCount, 0),
    3,
  );
  assert.ok(
    groups.some(
      (group) => group.developer === '김진영' && group.changes[0].entries[0].id === 'shipping',
    ),
  );
  assert.ok(
    groups.some(
      (group) => group.developer === '전은주' && group.changes[0].entries[0].id === 'payment',
    ),
  );
  for (const group of groups) {
    assert.equal(
      group.changes.reduce((count, change) => count + change.entries.length, 0),
      group.rowCount,
    );
  }
});

test('the reverted Button width experiment is absent from final contributing commits', () => {
  const report = data.reports.find(
    ({ startSha }) => startSha === '72ae26eb09661ccc346556b3ad0ef36417e53010',
  );
  assert.ok(report);
  const button = report.entries.find(
    ({ file }) => file === 'src/components/common/atoms/Button.tsx',
  );
  assert.ok(button);
  assert.ok(button.commits.length);
  assert.ok(
    button.commits.every(({ sha }) => !sha.startsWith('ad5c4f55') && !sha.startsWith('5ae9f0e1')),
  );
  assert.ok(button.ranges.every(({ oldCount, newCount }) => oldCount === 1 && newCount === 1));
});

test('author exclusion keeps other ShopShell changes and removes the excluded-only area', () => {
  const report = data.reports[0];
  assert.ok(!report.entries.some(({ file }) => file.startsWith('src/app/wh/')));
  const shell = report.entries.find(({ file }) => file === 'src/context/ShopShell.tsx');
  assert.ok(shell);
  assert.ok(shell.commits.every(({ sha }) => sha !== report.startSha));
  assert.ok(
    shell.ranges.every(
      (range) => !(range.oldCount === 0 && range.newStart === 2820 && range.newCount === 4),
    ),
  );
  assert.equal(report.excludedAuthorHunkCount, 1);
});

test('date selection opens only saved reports for that day', () => {
  const reports = [
    { reportId: 'old', collectedAtKst: '2026-11-03 17:00:00+09:00', entries: [{ id: 'a' }] },
    {
      reportId: 'new',
      collectedAtKst: '2026-11-04 17:00:00+09:00',
      entries: [{ id: 'b' }, { id: 'c' }],
    },
  ];
  assert.deepEqual(
    getChangeReportsForDate(reports, '2026-11-03').map(({ reportId }) => reportId),
    ['old'],
  );
  assert.equal(getChangeReportsForDate(reports, '2026-11-02').length, 0);
});

test('report developer selection filters exact IA names and distinguishes unassigned', () => {
  const screens = [
    { iaNumber: 1, screenCode: '', depths: ['주문'], developers: ['김진영'] },
    { iaNumber: 2, screenCode: '', depths: ['상품'], developers: ['박혜리'] },
  ];
  const report = {
    entries: [
      { ...entry('orders', '주문'), summary: '주문 변경', affectedIa: [1] },
      { ...entry('products', '상품'), summary: '상품 변경', affectedIa: [2] },
      { id: 'common', summary: '공통 변경', owners: [], affectedIa: [1, 2] },
      { id: 'none', summary: '미지정 변경', owners: [], affectedIa: [] },
    ],
  };
  const ids = (developer) =>
    getChangeReportTableGroups(report, screens, developer)
      .flatMap((group) => group.changes.flatMap((change) => change.entries.map(({ id }) => id)))
      .sort();
  assert.deepEqual(ids('김진영'), ['common', 'orders']);
  assert.deepEqual(ids('박혜리'), ['common', 'products']);
  assert.deepEqual(ids('unassigned'), ['none']);
  assert.equal(ids('all').length, 4);
});

test('report-only URLs default to every developer and support encoded developer selection', () => {
  for (const value of ['ALL', 'All', 'all', '%20ALL%20', '']) {
    const state = getReportUrlState(`report=2026-11-04&developer=${value}`);
    assert.equal(state.developer, 'all');
    const screens = [{ iaNumber: 1, screenCode: '', depths: ['주문'], developers: ['김진영'] }];
    const report = {
      entries: [{ ...entry('orders', '주문'), summary: '주문 변경', affectedIa: [1] }],
    };
    assert.equal(getChangeReportTableGroups(report, screens, state.developer)[0].rowCount, 1);
  }
  assert.equal(getReportUrlState('report=2026-11-04&developer=UNASSIGNED').developer, 'unassigned');
  assert.deepEqual(getReportUrlState('report=2026-11-04'), {
    open: true,
    date: '2026-11-04',
    developer: 'all',
  });
  assert.equal(
    getReportUrlState('report=2026-11-04&developer=%EA%B9%80%EC%A7%84%EC%98%81').developer,
    '김진영',
  );
  assert.equal(getReportUrlState('report=').open, false);
  assert.equal(getReportUrlState('').open, false);
});

test('report navigation adds and removes only owned query parameters and keeps fragments', () => {
  const url = getReportNavigationUrl(
    '/screen-index',
    'keep=1',
    { date: '2026-11-04', developer: '김진영' },
    '#table',
  );
  assert.equal(new URL(url, 'http://localhost').searchParams.get('developer'), '김진영');
  assert.equal(
    getReportNavigationUrl('/screen-index', url.split('?')[1].split('#')[0], null, '#table'),
    '/screen-index?keep=1#table',
  );
});
