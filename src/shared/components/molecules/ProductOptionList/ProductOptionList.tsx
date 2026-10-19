import { useEffect, useRef, useState } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { css, cva } from 'styled-system/css';

const list = cva({
  variants: {
    layout: {
      scroll: {
        display: 'flex',
        minW: '0',
        maxW: '100%',
        gap: '1',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      },
      preview: {
        display: 'flex',
        gap: '4px',
        minW: '0',
        pb: '12px',
        overflowX: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--color-black-40) transparent',
        alignItems: 'start',
        '&::-webkit-scrollbar': { h: '4px' },
        '&::-webkit-scrollbar-thumb': { bg: 'var(--color-black-40)' },
      },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 76px)', gap: '2' },
    },
  },
});

const previewRow = css({
  display: 'grid',
  gridTemplateColumns: '16px minmax(0, 1fr) 16px',
  alignItems: 'center',
  minW: '0',
});

const arrow = css({ w: '16px!', minW: '16px!', '--button-height': '32px' });

const option = cva({
  base: { display: 'grid', overflow: 'hidden', bg: 'var(--color-black-10)', placeItems: 'center' },
  variants: {
    layout: {
      scroll: { flex: '0 0 34px', w: '34px', h: '34px' },
      preview: { flex: '0 0 80px', w: '80px', h: '53px' },
      grid: { w: '76px', h: '60px' },
    },
    selected: { true: { boxShadow: 'inset 0 -3px var(--color-black-100)' }, false: {} },
  },
});

const optionButton = css({
  cursor: 'pointer',
  border: '0',
  p: '0',
  _hover: { boxShadow: 'inset 0 -3px var(--color-black-100)' },
  _focusVisible: {
    boxShadow: 'inset 0 -3px var(--color-black-100)',
    outline: '2px solid var(--color-blue-100)',
    outlineOffset: '2px',
  },
});

const image = css({ w: '100%', h: '100%', objectFit: 'contain' });

const previewImage = css({ display: 'block', w: '100%', h: '53px', objectFit: 'contain' });

export type ProductOptionThumbnail = {
  id: string;
  image: string;
  label: string;
};

export type ProductOptionListProps = {
  ariaLabel?: string;
  layout: 'scroll' | 'grid' | 'preview';
  onSelect?: (id: string) => void;
  options: readonly ProductOptionThumbnail[];
  selectedId?: string;
};

/** Reusable product-option thumbnails for PLP previews and PDP selection. */
export function ProductOptionList({
  ariaLabel = '상품 옵션',
  layout,
  onSelect,
  options,
  selectedId,
}: ProductOptionListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    if (layout !== 'preview') return;
    const element = listRef.current;
    if (!element) return;
    const update = () =>
      setEdges({
        start: element.scrollLeft <= 1,
        end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 1,
      });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener('scroll', update);
    };
  }, [layout, options.length]);

  const move = (direction: number) => {
    const element = listRef.current;
    if (!element) return;
    element.scrollBy({
      left: direction * Math.max(84, Math.floor(element.clientWidth / 84) * 84),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };

  const content = (
    <div
      ref={listRef}
      aria-label={ariaLabel}
      className={list({ layout })}
      role={onSelect ? 'group' : undefined}
    >
      {options.map((optionItem) => {
        const selected = optionItem.id === selectedId;
        const className = [option({ layout, selected }), onSelect && optionButton]
          .filter(Boolean)
          .join(' ');

        if (onSelect) {
          return (
            <button
              aria-label={optionItem.label}
              aria-pressed={selected}
              className={className}
              key={optionItem.id}
              onClick={() => onSelect(optionItem.id)}
              type="button"
            >
              <img
                alt=""
                aria-hidden="true"
                className={layout === 'preview' ? previewImage : image}
                src={optionItem.image}
              />
            </button>
          );
        }

        return (
          <span aria-label={optionItem.label} className={className} key={optionItem.id} role="img">
            <img
              alt=""
              aria-hidden="true"
              className={layout === 'preview' ? previewImage : image}
              src={optionItem.image}
            />
          </span>
        );
      })}
    </div>
  );

  if (layout !== 'preview') return content;

  return (
    <div className={previewRow}>
      <Button
        variant="ghost"
        aria-label="이전 색상"
        className={arrow}
        disabled={edges.start}
        onClick={() => move(-1)}
        icon={<span aria-hidden="true">◂</span>}
      />
      {content}
      <Button
        variant="ghost"
        aria-label="다음 색상"
        className={arrow}
        disabled={edges.end}
        onClick={() => move(1)}
        icon={<span aria-hidden="true">▸</span>}
      />
    </div>
  );
}
