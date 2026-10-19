/** Fill wireframe rails so dragging can be reviewed even on a 3840px viewport. */
export function createHomeCarouselPreviewItems<T>(items: readonly T[]): T[] {
  if (items.length === 0) return [];

  return Array.from({ length: 12 }, (_, index) => items[index % items.length]);
}
