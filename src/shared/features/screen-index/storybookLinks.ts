const storybookReadyIaNumbers = new Set([
  1, 207, 208, 210, 211, 213, 214, 215, 217, 218, 219, 220, 221, 222, 234, 236, 237, 238, 239, 240,
  241,
]);

const storybookReadyScreenCodes = new Set(['eland_hca_01', 'eland_hut_01']);

const storybookPendingIaNumbers = new Set([209, 212]);

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
