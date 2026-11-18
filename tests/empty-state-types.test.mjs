import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL, URL } from 'node:url';

import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));

test('empty states preserve optional variants, overrides and compound callers', () => {
  const config = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const filename = path.join(root, 'tests', '__empty-state-contract__.tsx').replaceAll('\\', '/');
  const source = `
import type { ComponentProps } from 'react';
import { EmptyState, EmptyStateTitle, EmptyStateDescription, EmptyStateAction, EmptyStateIcon } from '@/components/common/atoms/EmptyState';
import { emptyStateRecipe } from '@/components/common/atoms/EmptyState.recipe';
const omitted = <EmptyState title="빈 목록" />;
const undefinedVariant = <EmptyState variant={undefined} title="빈 목록" />;
const variants: NonNullable<ComponentProps<typeof EmptyState>['variant']>[] = ['standard', 'minimal', 'plain', 'page', 'content'];
const states = variants.map(variant => <EmptyState variant={variant} title="제목" description="설명" action={<button>확인</button>} role="status" as="section" titleProps={{ as: 'p', web: 'body3', mo: 'body4', tone: 'tertiary' }} descriptionProps={{ variant: 'body3' }} layoutProps={{ pt: '20px', _mobile: { py: '8' } }} />);
const layouts: NonNullable<ComponentProps<typeof EmptyState>['layout']>[] = ['default', 'cart', 'claimHistory', 'history', 'wishlist', 'restock', 'address', 'embeddedAddress', 'reviews', 'catalog', 'search', 'inquiries', 'inquiryPreview', 'faq', 'orderSummary', 'orders', 'launch', 'runningSession', 'productInquiry', 'inquiryBoard'];
layouts.map(layout => <EmptyState variant="page" layout={layout} title="제목" />);
const iconState = <EmptyState layout="cart" icon={<svg aria-hidden="true" />} title="빈 목록" />;
const defaultLayout = <EmptyState variant="standard" layout={undefined} title="제목" />;
// @ts-expect-error Unknown layouts remain unsupported.
const invalidLayout = <EmptyState layout="unknown" />;
const compound = <><EmptyState.Title as="span">제목</EmptyState.Title><EmptyState.Description>설명</EmptyState.Description><EmptyState.Action><button>확인</button></EmptyState.Action><EmptyState.Icon>!</EmptyState.Icon></>;
const named = <><EmptyStateTitle>제목</EmptyStateTitle><EmptyStateDescription>설명</EmptyStateDescription><EmptyStateAction /><EmptyStateIcon /></>;
emptyStateRecipe();
emptyStateRecipe({ variant: undefined });
emptyStateRecipe.raw();
variants.forEach(variant => emptyStateRecipe.raw({ variant, hasAction: true }));
// @ts-expect-error Unknown variants are still rejected.
const invalid = <EmptyState variant="unknown" />;
`;
  const options = { ...parsed.options, incremental: false, noEmit: true };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (file, languageVersion, onError, shouldCreateNewSourceFile) =>
    file === filename
      ? ts.createSourceFile(file, source, languageVersion, true, ts.ScriptKind.TSX)
      : getSourceFile(file, languageVersion, onError, shouldCreateNewSourceFile);
  const program = ts.createProgram([filename], options, host);
  const errors = ts.getPreEmitDiagnostics(program);
  assert.equal(
    errors.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(errors, {
      getCurrentDirectory: () => root,
      getCanonicalFileName: (file) => file,
      getNewLine: () => '\n',
    }),
  );
});

test('layout typography wins over language defaults and legacy overrides retain their type scale', async () => {
  const filename = path.join(root, 'src/components/common/atoms/EmptyState.recipe.tsx');
  const source = readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const moduleSource = compiled.replaceAll(
    'styled-system/css',
    pathToFileURL(path.join(root, 'styled-system/css/index.mjs')).href,
  );
  const { getEmptyStateStyles } = await import(
    'data:text/javascript;base64,' + Buffer.from(moduleSource).toString('base64')
  );
  const korean = {
    titleKorean: true,
    descriptionKorean: true,
    customTitle: false,
    customDescription: false,
  };
  const review = getEmptyStateStyles({ variant: 'page', layout: 'reviews' }, korean);
  assert.equal(review.title._mobile.fontWeight, 'bold');
  assert.equal(review.title._mobile.fontSize, 'var(--font-sizes-20)');
  const inquiry = getEmptyStateStyles({ variant: 'plain', layout: 'inquiries' }, korean);
  assert.equal(inquiry.title.lineHeight, 'body');
  assert.equal(inquiry.title._mobile.fontWeight, 'normal');
  const english = getEmptyStateStyles(
    {},
    { ...korean, titleKorean: false, descriptionKorean: false },
  );
  assert.equal(english.title.fontFamily, 'hoka');
  assert.equal(english.title._mobile.fontWeight, 'bold');
  const legacy = getEmptyStateStyles(
    { layout: 'reviews' },
    { ...korean, customTitle: true, customDescription: true },
  );
  assert.equal(legacy.title.fontSize, undefined);
  assert.equal(legacy.description.fontSize, undefined);
});
