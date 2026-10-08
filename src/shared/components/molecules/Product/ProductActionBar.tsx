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
    bg: 'var(--color-white-000)',
    boxShadow: '0 -5px 20px color-mix(in srgb, var(--color-black-100) 8%, transparent)',
  },
});

const wish = css({
  border: '1px solid var(--color-black-100)',
  bg: 'var(--color-white-000)',
  fontSize: '20',
});

const purchase = css({
  minH: '12',
  border: '1px solid var(--color-black-100)',
  bg: 'var(--color-black-100)',
  color: 'var(--color-white-000)',
  fontSize: '16' /* 기존 15px */,
  fontWeight: 'bold',
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
