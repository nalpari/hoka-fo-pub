import type { ScreenDefinition } from '@/data/screenRegistry';

const storybookReadyIaNumbers = new Set([
  1, 158, 200, 223, 224, 226, 227, 229, 230, 231, 233, 234, 235, 236, 237, 238, 251, 252, 253, 254,
  255, 256, 257, 258, 259,
]);

const storybookReadyScreenCodes = new Set(['eland_hca_01', 'eland_hut_01']);

const storybookPendingIaNumbers = new Set([225, 228]);

const storybookWorkingScreenCodes = new Set(['eland_hca_02']);

const storybookWorkingScreenCodePrefixes = ['eland_hlo_'];

export function isStorybookReady(iaNumber: number, screenCode: string) {
  return storybookReadyIaNumbers.has(iaNumber) || storybookReadyScreenCodes.has(screenCode);
}

export function isStorybookPending(iaNumber: number) {
  return storybookPendingIaNumbers.has(iaNumber);
}

export function isStorybookWorking(screenCode: string) {
  return (
    storybookWorkingScreenCodes.has(screenCode) ||
    storybookWorkingScreenCodePrefixes.some((prefix) => screenCode.startsWith(prefix))
  );
}

export type ScreenProgress = {
  pcDesign: 'received' | 'missing' | null;
  moDesign: 'received' | 'missing' | null;
  pcPublishing: 'ready' | 'working' | 'pending';
  moPublishing: 'ready' | 'working' | 'pending';
};

export type ScreenProgressOverrides = Readonly<Partial<Record<number, Partial<ScreenProgress>>>>;

// 기존 통합 상태를 초기값으로 보존하며 플랫폼별 확인값은 별도로 전달한다.
// 디자인 수급은 퍼블리싱 상태나 파일·스토리 존재로 추정하지 않는다.
export function getScreenProgress(
  screen: ScreenDefinition,
  overrides: ScreenProgressOverrides,
): ScreenProgress {
  const publishing = isStorybookPending(screen.iaNumber)
    ? 'pending'
    : isStorybookReady(screen.iaNumber, screen.screenCode)
      ? 'ready'
      : isStorybookWorking(screen.screenCode)
        ? 'working'
        : 'pending';
  const override = overrides[screen.iaNumber];
  return {
    pcDesign: override?.pcDesign ?? null,
    moDesign: override?.moDesign ?? null,
    pcPublishing: override?.pcPublishing ?? publishing,
    moPublishing: override?.moPublishing ?? publishing,
  };
}
