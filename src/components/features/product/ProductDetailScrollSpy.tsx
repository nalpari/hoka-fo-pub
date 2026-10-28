'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Stack } from 'styled-system/jsx';
import { ProductDetailNavigation, type ProductDetailAnchor } from './ProductDetailNavigation';

type Props = { items: readonly ProductDetailAnchor[]; children: ReactNode };

export function ProductDetailScrollSpy({ items, children }: Props) {
  const [activeSection, setActiveSection] = useState(items[0]?.id);
  const [navigationHeight, setNavigationHeight] = useState(64);
  const rootRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const navigation = navigationRef.current;
    if (!root || !navigation) return;

    const sections = items.map(({ id }) => root.querySelector<HTMLElement>(`#${id}`));
    let frame = 0;

    const update = () => {
      frame = 0;
      const boundary = navigation.getBoundingClientRect().bottom + 24;
      let current = items[0]?.id;

      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= boundary + 1) {
          current = items[index].id;
        }
      });
      setActiveSection(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(() => {
      setNavigationHeight(navigation.getBoundingClientRect().height);
      scheduleUpdate();
    });
    observer.observe(navigation);
    observer.observe(root);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  const layoutStyle = {
    '--product-detail-nav-height': `${navigationHeight}px`,
  } as CSSProperties;

  return (
    <Stack gap="10" ref={rootRef} style={layoutStyle}>
      <ProductDetailNavigation ref={navigationRef} items={items} activeId={activeSection} />
      {children}
    </Stack>
  );
}
