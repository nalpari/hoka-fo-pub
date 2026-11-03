import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';

import { css, cva } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { token } from 'styled-system/tokens';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';

const list = cva({
  base: {
    _focusVisible: {
      outline: 'token(spacing.0.5) solid token(colors.focus.default)',
      outlineOffset: 'token(spacing.0.5)',
    },
  },
  variants: {
    layout: {
      scroll: {
        display: 'flex',
        minW: '0',
        maxW: 'full',
        gap: '1',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      },
      history: {
        display: 'flex',
        minW: '0',
        maxW: 'full',
        gap: '1',
        pb: '1',
        overflowX: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'token(colors.black.40) transparent',
        '&::-webkit-scrollbar': { h: '1' },
        '&::-webkit-scrollbar-thumb': { bg: 'black.40' },
      },
      preview: {
        display: 'flex',
        gap: '1.5',
        minW: '0',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        alignItems: 'start',
        '&::-webkit-scrollbar': { display: 'none' },
      },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 76px)', gap: '2' },
      cart: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 74px)',
        gap: '2',
        _mobile: {
          display: 'flex',
          overflowX: 'auto',
          marginRight: '-4',
          '&::after': { content: '""', flex: '0 0 token(sizes.4)' },
        },
      },
    },
  },
});

const arrow = css({ w: '1.5!', minW: '1.5!', h: '2.5!', minH: '2.5!' });

const option = cva({
  base: { display: 'grid', overflow: 'hidden', bg: 'black.10', placeItems: 'center' },
  variants: {
    layout: {
      scroll: { flex: '0 0 34px', w: '34px', h: '34px' },
      history: {
        flex: '0 0 76px',
        w: '76px',
        h: '76px',
        _mobile: { flexBasis: '34px', w: '34px', h: '34px' },
      },
      preview: { flex: '0 0 token(sizes.12)', w: '12', h: '12' },
      grid: { w: '76px', h: '60px' },
      cart: { flex: '0 0 74px', w: '74px' },
    },
    selected: { true: { boxShadow: 'inset 0 -3px token(colors.black.100)' }, false: {} },
  },
});

const optionButton = css.raw({
  cursor: 'pointer',
  border: '0',
  p: '0',
  _hover: { boxShadow: 'inset 0 -3px token(colors.black.100)' },
  _focusVisible: {
    boxShadow: 'inset 0 -3px token(colors.black.100)',
    outline: 'token(spacing.0.5) solid token(colors.blue.100)',
    outlineOffset: 'token(spacing.0.5)',
  },
});

const image = css({ w: 'full', h: 'full', objectFit: 'contain' });

const previewImage = css({ display: 'block', w: 'full', h: '12', objectFit: 'contain' });

const cartImage = css({
  w: 'full',
  aspectRatio: 'media.oneByOne',
  objectFit: 'contain',
  bg: 'black.10',
});

const thumbnailSize = {
  scroll: { width: 34, height: 34, sizes: '34px' },
  history: { width: 76, height: 76, sizes: '(max-width: 1024px) 34px, 76px' },
  preview: { width: 48, height: 48, sizes: '48px' },
  grid: { width: 76, height: 60, sizes: '76px' },
  cart: { width: 74, height: 74, sizes: '74px' },
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
    const thumbnail = element.firstElementChild;
    if (!thumbnail) return;
    const step =
      thumbnail.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap);
    if (!Number.isFinite(step) || step <= 0) return;
    element.scrollBy({
      left: direction * Math.max(step, Math.floor(element.clientWidth / step) * step),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };

  const content = (
    <div
      ref={listRef}
      aria-label={ariaLabel}
      tabIndex={
        layout === 'history' || layout === 'scroll' || (layout === 'preview' && !onSelect)
          ? 0
          : undefined
      }
      className={list({ layout })}
      role={
        onSelect || layout === 'history' || layout === 'scroll' || layout === 'preview'
          ? 'group'
          : undefined
      }
    >
      {options.map((optionItem) => {
        const selected = optionItem.id === selectedId;
        const className = css(
          option.raw({ layout, selected }),
          onSelect && optionButton,
          layout === 'preview' && {
            position: 'relative',
            h: 'auto',
            pb: '2.5px',
            bg: 'transparent',
            boxShadow: 'none',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              h: '2.5px',
              borderRadius: 'full',
              bg: selected ? 'black.100' : 'transparent',
            },
            _hover: { boxShadow: 'none', '&::after': { bg: 'black.100' } },
            _focusVisible: { boxShadow: 'none' },
          },
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
              h: '1',
              borderRadius: '50px',
              bg: selected ? 'black.100' : 'transparent',
              pointerEvents: 'none',
            },
            _hover: { boxShadow: 'none' },
            _focusVisible: {
              boxShadow: 'none',
              outline: 'token(spacing.0.5) solid token(colors.black.100)',
            },
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
    <Grid
      gap="1.5"
      gridTemplateColumns="token(sizes.1.5) minmax(0, 1fr) token(sizes.1.5)"
      alignItems="center"
      minW="0"
      w="full"
    >
      <Button
        variant="icon"
        size={10}
        aria-label="이전 색상"
        className={arrow}
        disabled={edges.start}
        onClick={() => move(-1)}
      >
        <Icon
          name="product-carousel-caret"
          size={token.var('sizes.2.5')}
          style={{ width: token.var('sizes.1.5') }}
        />
      </Button>
      {content}
      <Button
        variant="icon"
        size={10}
        aria-label="다음 색상"
        className={arrow}
        disabled={edges.end}
        onClick={() => move(1)}
      >
        <Icon
          name="product-carousel-caret"
          size={token.var('sizes.2.5')}
          style={{ width: token.var('sizes.1.5'), transform: 'rotate(180deg)' }}
        />
      </Button>
    </Grid>
  );
}
