import type { Product } from '@/mocks/products';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

const root = css({
  position: 'sticky',
  bottom: { base: '18px', _mobile: '8px' },
  zIndex: '3',
  display: 'flex',
  alignItems: 'center',
  flexWrap: { base: 'nowrap', _mobile: 'wrap' },
  gap: '2.5',
  mt: '5',
  border: '1px solid #111',
  p: { base: '14px 18px', _mobile: '10px' },
  bg: '#fff',
  boxShadow: '0 8px 24px rgb(0 0 0 / 12%)',
});

export function CompareBar({
  products,
  onClear,
  onCompare,
}: {
  products: Product[];
  onClear: () => void;
  onCompare: () => void;
}) {
  return (
    <aside className={root} aria-live="polite">
      <Stack flex="1" gap="3px">
        <small>상품 비교 · 최대 3개</small>
        <strong className={css({ fontSize: { _mobile: '12px' } })}>
          {products.map((product) => product.name).join('  ·  ')}
        </strong>
      </Stack>
      <Button className={css({ p: '8px 12px' })} onClick={onClear} size="sm">
        선택 해제
      </Button>
      <Button className={css({ p: '8px 12px' })} onClick={onCompare} size="sm" variant="primary">
        비교하기 ({products.length})
      </Button>
    </aside>
  );
}
