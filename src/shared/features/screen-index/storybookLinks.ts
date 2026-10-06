const storybookReadyIaNumbers = new Set([1, 3]);

export function isStorybookReady(iaNumber: number) {
  return storybookReadyIaNumbers.has(iaNumber);
}
