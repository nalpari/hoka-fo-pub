import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, URL } from 'node:url';

import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));

test('modal callers can select twelve variants while incompatible content and action slots are rejected', () => {
  const config = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const filename = path.join(root, 'tests', '__modal-dialog-contract__.tsx').replaceAll('\\', '/');
  const source = `
import { ModalDialog, type ModalDialogProps, type ModalDialogVariant } from '@/components/common/layouts/ModalDialog';
const base = { open: true, onOpenChange: (_open: boolean) => {}, title: '제목', closeLabel: '닫기' };
const variants: Exclude<ModalDialogVariant, 'alert' | 'confirm'>[] = ['terms', 'form', 'selection', 'orderLookup', 'productSelection', 'productOption', 'tracking', 'detail', 'image', 'sizeGuide'];
variants.map(variant => <ModalDialog {...base} variant={variant}><p>본문</p></ModalDialog>);
const alert = <ModalDialog {...base} variant="alert" message="완료" description="설명" actions={{ kind: 'single', onConfirm: () => {} }} />;
const defaultAlert = <ModalDialog {...base} message="완료" description="설명" actions={{ kind: 'single' }} />;
const undefinedAlert = <ModalDialog {...base} variant={undefined} message="안내" />;
const confirm = <ModalDialog {...base} variant="confirm" message="진행할까요?" actions={{ kind: 'confirm', onConfirm: () => {}, confirmDisabled: true }} />;
const feedback = <ModalDialog {...base} variant="alert" message="안내" feedback={<span role="alert">요청 실패</span>} />;
const result = <ModalDialog {...base} variant="confirm" noticeLayout="result" intro="조회 결과" message="account" description="설명" />;
// @ts-expect-error Result layout requires an introduction.
const resultWithoutIntro = <ModalDialog {...base} variant="confirm" noticeLayout="result" message="account" />;
// @ts-expect-error Result presentation belongs to confirm.
const alertResult = <ModalDialog {...base} variant="alert" noticeLayout="result" intro="결과" message="account" />;
// @ts-expect-error Intro cannot silently change ordinary notice layout.
const ordinaryIntro = <ModalDialog {...base} variant="confirm" intro="결과" message="account" />;
const form = <ModalDialog {...base} variant="form" formLayout="divided" actions={{ kind: 'single', buttonProps: { type: 'submit', form: 'editor', disabled: true } }}><form id="editor" /></ModalDialog>;
// @ts-expect-error Structured content and custom children are exclusive.
const mixedContent = <ModalDialog {...base} variant="alert" message="안내"><p>중복 본문</p></ModalDialog>;
// @ts-expect-error Alerts cannot bypass structured typography with custom content.
const customAlert = <ModalDialog {...base} variant="alert"><p>개별 본문</p></ModalDialog>;
// @ts-expect-error Confirmations cannot bypass structured typography with custom content.
const customConfirm = <ModalDialog {...base} variant="confirm"><p>개별 본문</p></ModalDialog>;
// @ts-expect-error A description requires structured message content.
const orphanDescription = <ModalDialog {...base} variant="alert" description="설명" />;
// @ts-expect-error Domain content variants do not accept generated message content.
const wrongContent = <ModalDialog {...base} variant="tracking" message="안내" />;
// @ts-expect-error Generated actions and a custom footer are exclusive.
const mixedActions = <ModalDialog {...base} variant="alert" message="안내" actions={{ kind: 'single' }} footer={<button>중복</button>} />;
// @ts-expect-error The default alert still requires structured content.
const noVariant = <ModalDialog {...base}><p>본문</p></ModalDialog>;
// @ts-expect-error Request feedback belongs to the structured content contract.
const customFeedback = <ModalDialog {...base} variant="alert" feedback={<span>실패</span>}><p>본문</p></ModalDialog>;
// @ts-expect-error The retired catch-all content variant is unsupported.
const retired: ModalDialogProps = { ...base, variant: 'content', children: '본문' };
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
