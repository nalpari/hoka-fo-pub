import type { Ref } from 'react';
import { css } from 'styled-system/css';
import { Typography } from '@/components/common/atoms/Typography/Typography';

export type ProductDetailAnchor = { id: string; label: string };

const navigation = css({
  pos: 'sticky',
  top: 'var(--layout-site-header-height)',
  zIndex: '5',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  borderBottom: '1px solid var(--color-black-20)',
  bg: 'var(--hoka-white)',
});

const link = css({
  textAlign: 'center',
  py: '5',
  color: 'inherit',
  textDecoration: 'none',
  borderBottom: '2px solid transparent',
  '&[aria-current="location"]': { borderBottomColor: 'var(--color-black-100)' },
  _focusVisible: { outline: '2px solid var(--color-focus-ring)' },
});

type Props = {
  ref?: Ref<HTMLElement>;
  items: readonly ProductDetailAnchor[];
  activeId?: string;
};

/** The measured native nav keeps its HTMLElement ref contract. */
export function ProductDetailNavigation({ ref, items, activeId }: Props) {
  return (
    <nav ref={ref} aria-label="상품 상세 정보" className={navigation}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={link}
          aria-current={activeId === item.id ? 'location' : undefined}
        >
          <Typography variant="body3">{item.label}</Typography>
        </a>
      ))}
    </nav>
  );
}
