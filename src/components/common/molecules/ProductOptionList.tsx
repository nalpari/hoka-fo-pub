import Image from 'next/image';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

import { css, cva } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';

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
      history: {
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
      cart: { display: 'flex', gap: '2', overflowX: 'auto' },
    },
  },
});

const arrow = css({ w: '16px!', minW: '16px!', '--button-height': '32px' });

const option = cva({
  base: { display: 'grid', overflow: 'hidden', bg: 'var(--color-black-10)', placeItems: 'center' },
  variants: {
    layout: {
      scroll: { flex: '0 0 34px', w: '34px', h: '34px' },
      history: {
        flex: '0 0 76px',
        w: '76px',
        h: '76px',
        _mobile: { flexBasis: '34px', w: '34px', h: '34px' },
      },
      preview: { flex: '0 0 80px', w: '80px', h: '53px' },
      grid: { w: '76px', h: '60px' },
      cart: { flex: '0 0 72px', w: '18' },
    },
    selected: { true: { boxShadow: 'inset 0 -3px var(--color-black-100)' }, false: {} },
  },
});

const optionButton = css.raw({
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

const cartImage = css({ w: '100%', aspectRatio: '1', objectFit: 'contain', bg: 'black.10' });

const thumbnailSize = {
  scroll: { width: 34, height: 34, sizes: '34px' },
  history: { width: 76, height: 76, sizes: '(max-width: 1024px) 34px, 76px' },
  preview: { width: 80, height: 53, sizes: '80px' },
  grid: { width: 76, height: 60, sizes: '76px' },
  cart: { width: 72, height: 72, sizes: '72px' },
} as const;

export type ProductOptionThumbnail = {
  id: string;
  image: string;
  label: string;
};

export type ProductOptionListProps = {
  ariaLabel?: string;
  layout: 'scroll' | 'grid' | 'preview' | 'cart' | 'history';
  onSelect?: (id: string) => void;
  options: readonly ProductOptionThumbnail[];
  selectedId?: string;
};

/** 상품 옵션 썸네일을 목록 미리보기와 상세 선택에 표시합니다. (Displays product option thumbnails in listing previews and detail selection.) */
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
        const className = css(
          option.raw({ layout, selected }),
          onSelect && optionButton,
          layout === 'cart' && {
            display: 'block',
            position: 'relative',
            bg: 'transparent',
            boxShadow: 'none',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              h: '4px',
              borderRadius: '50px',
              bg: selected ? 'var(--color-black-100)' : 'transparent',
              pointerEvents: 'none',
            },
            _hover: { boxShadow: 'none' },
            _focusVisible: { boxShadow: 'none', outline: '2px solid var(--colors-black-100)' },
          },
        );

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
              <Image
                alt=""
                aria-hidden="true"
                className={
                  layout === 'preview' ? previewImage : layout === 'cart' ? cartImage : image
                }
                src={optionItem.image}
                width={thumbnailSize[layout].width}
                height={thumbnailSize[layout].height}
                sizes={thumbnailSize[layout].sizes}
              />
            </button>
          );
        }

        return (
          <span aria-label={optionItem.label} className={className} key={optionItem.id} role="img">
            <Image
              alt=""
              aria-hidden="true"
              className={
                layout === 'preview' ? previewImage : layout === 'cart' ? cartImage : image
              }
              src={optionItem.image}
              width={thumbnailSize[layout].width}
              height={thumbnailSize[layout].height}
              sizes={thumbnailSize[layout].sizes}
            />
          </span>
        );
      })}
    </div>
  );

  if (layout !== 'preview') return content;

  return (
    <Grid gap="normal" gridTemplateColumns="16px minmax(0, 1fr) 16px" alignItems="center" minW="0">
      <Button
        variant="icon"
        size={16}
        aria-label="이전 색상"
        className={arrow}
        disabled={edges.start}
        onClick={() => move(-1)}
      >
        <Icon fontAwesomeIcon={faChevronLeft} size={12} />
      </Button>
      {content}
      <Button
        variant="icon"
        size={16}
        aria-label="다음 색상"
        className={arrow}
        disabled={edges.end}
        onClick={() => move(1)}
      >
        <Icon fontAwesomeIcon={faChevronRight} size={12} />
      </Button>
    </Grid>
  );
}
