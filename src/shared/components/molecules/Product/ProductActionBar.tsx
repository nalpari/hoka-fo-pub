import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

export type ProductActionBarProps = {
  onOpenPurchase: () => void;
};

const bar = css({
  display: 'none',
  '.platform-mobile &': {
    position: 'fixed',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '20',
    display: 'grid',
    gridTemplateColumns: '64px 1fr',
    gap: '2',
    p: '2.5 var(--layout-mobile-inline-gutter)',
    borderTop: '1px solid var(--color-border-subtle)',
    bg: '#fff',
    boxShadow: '0 -5px 20px rgba(0,0,0,.08)',
  },
});

const wish = css({ border: '1px solid #111', bg: '#fff', fontSize: '20px' });

const purchase = css({
  minH: '12',
  border: '1px solid #111',
  bg: '#111',
  color: '#fff',
  fontSize: '15px',
  fontWeight: '700',
});

/** Shared product purchase action, rendered for the active application platform. */
export function ProductActionBar({ onOpenPurchase }: ProductActionBarProps) {
  return (
    <div className={bar}>
      <Button aria-label="관심상품에 추가" className={wish} type="button">
        ♡
      </Button>
      <Button className={purchase} onClick={onOpenPurchase} type="button">
        사이즈 선택하기
      </Button>
    </div>
  );
}
