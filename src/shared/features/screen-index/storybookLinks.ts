const storybookReadyIaNumbers = new Set([1, 3, 207, 208, 211, 217, 218, 219, 220, 221, 222]);

export function isStorybookReady(iaNumber: number) {
  return storybookReadyIaNumbers.has(iaNumber);
}
