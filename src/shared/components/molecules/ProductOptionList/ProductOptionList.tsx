import { css, cva } from 'styled-system/css';

const list = cva({
  variants: {
    layout: {
      scroll: {
        display: 'flex',
        gap: '4px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 76px)', gap: '8px' },
    },
  },
});

const option = cva({
  base: { display: 'grid', overflow: 'hidden', bg: '#f7f7f8', placeItems: 'center' },
  variants: {
    layout: {
      scroll: { flex: '0 0 34px', w: '34px', h: '34px' },
      grid: { w: '76px', h: '60px' },
    },
    selected: { true: { boxShadow: 'inset 0 -3px #111' }, false: {} },
  },
});

const optionButton = css({
  cursor: 'pointer',
  border: '0',
  p: '0',
  _hover: { boxShadow: 'inset 0 -3px #111' },
  _focusVisible: {
    boxShadow: 'inset 0 -3px #111',
    outline: '2px solid #0082ca',
    outlineOffset: '2px',
  },
});

const image = css({ w: '100%', h: '100%', objectFit: 'contain' });

export type ProductOptionThumbnail = {
  id: string;
  image: string;
  label: string;
};

export type ProductOptionListProps = {
  ariaLabel?: string;
  layout: 'scroll' | 'grid';
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
  return (
    <div aria-label={ariaLabel} className={list({ layout })} role={onSelect ? 'group' : undefined}>
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
              <img alt="" aria-hidden="true" className={image} src={optionItem.image} />
            </button>
          );
        }

        return (
          <span aria-label={optionItem.label} className={className} key={optionItem.id} role="img">
            <img alt="" aria-hidden="true" className={image} src={optionItem.image} />
          </span>
        );
      })}
    </div>
  );
}
