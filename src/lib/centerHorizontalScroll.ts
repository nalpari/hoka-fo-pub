export function centerHorizontalScroll(viewport: HTMLElement, item: HTMLElement) {
  if (viewport.scrollWidth <= viewport.clientWidth) return;

  const offset = item.getBoundingClientRect().left - viewport.getBoundingClientRect().left;
  const centerOffset = (viewport.clientWidth - item.getBoundingClientRect().width) / 2;
  viewport.scrollTo({ left: viewport.scrollLeft + offset - centerOffset });
}
