import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { buildSourceGraph } from '../scripts/screen-files.mjs';

test('IA graph follows aliases, re-exports, cycles and literal dynamic imports, excluding types and stories', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'hoka-screen-files-'));
  const write = (file, content) => {
    const target = path.join(root, file);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, content);
  };
  try {
    write(
      'tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          moduleResolution: 'bundler',
          paths: { '@/*': ['./src/*'] },
        },
      }),
    );
    write(
      'src/page.tsx',
      `
      import { button } from '@/button';
      import type { Props } from './types';
      import { type OnlyType } from './types';
      import './side-effect';
      export { helper } from './barrel';
      const optional = import('./optional');
      const external = import('react');
      const preview = import('./stories/preview');
    `,
    );
    write('src/button.tsx', "import './page'; export const button = null;");
    write('src/types.ts', 'export type Props = {}; export type OnlyType = {};');
    write('src/side-effect.ts', 'export {};');
    write('src/barrel.ts', "export { helper } from './helper';");
    write('src/helper.ts', 'export const helper = 1;');
    write('src/optional.tsx', 'export default null;');
    write('src/stories/preview.tsx', 'export default null;');
    write('src/context/Data.ts', '/** [ 개발팀 바인딩 ] */ export const data = {};');
    write('src/components/domain/Screen.tsx', '/** [개발팀 바인딩] */ export default null;');
    write(
      'src/components/common/atoms/Button.tsx',
      '/** [ 개발팀 바인딩 ] */ export default null;',
    );
    write('src/hooks/useRequest.ts', '/** [ 개발팀 바인딩 ] */ export default null;');
    write('src/context/RoutePreview.ts', '/** [개발팀 바인딩] */ export default null;');
    assert.deepEqual(buildSourceGraph(root).bindingFiles, [
      'src/components/domain/Screen.tsx',
      'src/context/Data.ts',
    ]);
    const graph = buildSourceGraph(root).imports;
    assert.deepEqual(graph['src/page.tsx'], [
      'src/barrel.ts',
      'src/button.tsx',
      'src/optional.tsx',
      'src/side-effect.ts',
    ]);
    assert.deepEqual(graph['src/button.tsx'], ['src/page.tsx']);
    assert.deepEqual(graph['src/barrel.ts'], ['src/helper.ts']);
    assert.equal(graph['src/stories/preview.tsx'], undefined);

    renameSync(path.join(root, 'src/optional.tsx'), path.join(root, 'src/moved.tsx'));
    write('src/page.tsx', "import './moved';");
    const changed = buildSourceGraph(root).imports;
    assert.deepEqual(changed['src/page.tsx'], ['src/moved.tsx']);
    assert.equal(changed['src/optional.tsx'], undefined);
    rmSync(path.join(root, 'src/moved.tsx'));
    assert.deepEqual(buildSourceGraph(root).imports['src/page.tsx'], []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
