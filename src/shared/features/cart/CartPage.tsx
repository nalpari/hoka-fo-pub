import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { NumberStepper } from '@/shared/components/atoms/NumberStepper/NumberStepper';
import { StepIndicator } from '@/shared/components/molecules/StepIndicator/StepIndicator';
import { products } from '@/mocks/products';
import type { CartItem } from '@/shared/types/cart';
import { css, cva } from 'styled-system/css';
import { Box, Flex, Grid } from 'styled-system/jsx';

const cartPage = css({
  maxW: '1100px',
  mx: 'auto',
  pt: { base: '62px', _mobile: '38px' },
  px: { base: '0', _mobile: '16px' },
  pb: { base: '110px', _mobile: '62px' },
});
const titleRow = css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' });
const table = css({ borderTop: '1px solid #111' });
const tableHead = css({
  display: 'grid',
  gridTemplateColumns: { base: '48px 1fr 130px 160px', _mobile: '28px 1fr 66px 0' },
  alignItems: 'center',
  h: '49px',
  borderBottom: '1px solid #e3e3e3',
  fontSize: '12px',
  textAlign: 'center',
});
const cartItem = css({
  display: 'grid',
  gridTemplateColumns: { base: '48px 1fr 130px 160px', _mobile: '28px 1fr 68px' },
  alignItems: 'center',
  minH: '155px',
  borderBottom: '1px solid #e3e3e3',
});
const itemInfo = css({
  display: 'flex',
  alignItems: 'center',
  gap: { base: '18px', _mobile: '10px' },
});
const art = css({
  display: 'grid',
  w: { base: '100px', _mobile: '72px' },
  h: { base: '100px', _mobile: '72px' },
  placeItems: 'center',
  bg: '#f2f2f2',
  fontSize: { base: '50px', _mobile: '36px' },
  fontStyle: 'italic',
  fontWeight: '900',
});
const quantity = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: { base: '18px', _mobile: '8px' },
});
const summary = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: { base: 'flex-end', _mobile: 'center' },
  flexWrap: { base: 'nowrap', _mobile: 'wrap' },
  gap: { base: '28px', _mobile: '12px' },
  p: '25px',
  bg: '#f6f6f6',
  fontSize: '14px',
});
const empty = css({
  display: 'grid',
  minH: '285px',
  placeItems: 'center',
  alignContent: 'center',
  gap: '13px',
  borderBottom: '1px solid #e3e3e3',
});
const recommend = css({ mt: '80px' });
const recommendGrid = css({
  display: 'grid',
  gridTemplateColumns: { base: 'repeat(4, 1fr)', _mobile: 'repeat(2, 1fr)' },
  gap: { base: '30px', _mobile: '25px 10px' },
});
const recommendArt = cva({
  base: {
    display: 'grid',
    w: '100%',
    aspectRatio: '1',
    placeItems: 'center',
    fontSize: '50px',
    fontStyle: 'italic',
    fontWeight: '900',
  },
  variants: {
    tone: {
      0: { bg: '#e9e8e4', color: '#777' },
      1: { bg: '#ededed', color: '#999' },
      2: { bg: '#dfe3e4', color: '#223' },
      3: { bg: '#d6d7d5', color: '#161616' },
    },
  },
});
type Props = {
  cart: CartItem[];
  onQuantityChange: (item: CartItem, quantity: number) => void;
  onRemove: (item: CartItem) => void;
};
const suggestions = products.slice(0, 4);
export function CartPage({ cart, onQuantityChange, onRemove }: Props) {
  const rows = cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ item, product }] : [];
  });
  const total = rows.reduce((sum, { item, product }) => sum + product.price * item.quantity, 0);
  return (
    <main className={cartPage}>
      <header className={titleRow}>
        <h1 className={css({ m: '0', fontSize: '32px' })}>장바구니</h1>
        <StepIndicator
          ariaLabel="주문 진행 단계"
          current={1}
          items={[{ label: '장바구니' }, { label: '주문/결제' }, { label: '주문완료' }]}
          mobileHidden
        />
      </header>
      <p className={css({ m: '39px 0 13px' })}>
        총{' '}
        <b className={css({ color: '#e31b23' })}>
          {rows.reduce((sum, { item }) => sum + item.quantity, 0)}
        </b>
        개
      </p>
      <section className={table}>
        <Grid className={tableHead}>
          <span>✓</span>
          <span>상품/옵션 정보</span>
          <span>수량</span>
          <span>주문금액</span>
        </Grid>
        {rows.length ? (
          <>
            <Box>
              {rows.map(({ item, product }) => (
                <article
                  className={cartItem}
                  key={`${item.id}-${item.color}-${item.width}-${item.size}`}
                >
                  <Checkbox aria-label={`${product.name} 선택`} defaultChecked label={null} />
                  <Flex className={itemInfo}>
                    <span className={art}>N</span>
                    <Box>
                      <strong>{product.name}</strong>
                      <p className={css({ m: '8px 0', color: '#777', fontSize: '13px' })}>
                        {item.color} / {item.width} / {item.size}
                      </p>
                      <Button
                        className={css({
                          p: '0',
                          border: '0',
                          color: '#777',
                          fontSize: '12px',
                          textDecoration: 'underline',
                        })}
                        onClick={() => onRemove(item)}
                      >
                        삭제
                      </Button>
                    </Box>
                  </Flex>
                  <NumberStepper
                    className={quantity}
                    min={1}
                    onChange={(quantity) => onQuantityChange(item, quantity)}
                    value={item.quantity}
                  />
                  <strong className={css({ textAlign: 'center', display: { _mobile: 'none' } })}>
                    {(product.price * item.quantity).toLocaleString()}원
                  </strong>
                </article>
              ))}
            </Box>
            <Flex className={summary}>
              <span>
                상품 금액 <b>{total.toLocaleString()}원</b>
              </span>
              <span>
                배송비 <b>0원</b>
              </span>
              <strong>
                총 결제예정 금액{' '}
                <b className={css({ color: '#e31b23' })}>{total.toLocaleString()}원</b>
              </strong>
              <Button
                className={css({
                  w: { _mobile: '100%' },
                  p: '13px 38px',
                  bg: '#111',
                  color: '#fff',
                })}
              >
                주문하기
              </Button>
            </Flex>
          </>
        ) : (
          <Grid className={empty}>
            <b className={css({ fontSize: '50px' })}>!</b>
            <p className={css({ m: '0' })}>장바구니에 담은 상품이 없습니다.</p>
            <Link
              className={css({ p: '10px 18px', borderBottom: '1px solid #111', fontSize: '13px' })}
              to="/products"
            >
              쇼핑 계속하기
            </Link>
          </Grid>
        )}
      </section>
      <section className={recommend}>
        <h2 className={css({ m: '0 0 38px', textAlign: 'center', fontSize: '23px' })}>
          함께 구매하면 좋은 상품
        </h2>
        <Grid className={recommendGrid}>
          {suggestions.map((product, index) => (
            <Link
              className={css({ display: 'grid', gap: '10px' })}
              to={`/products/${product.id}`}
              key={product.id}
            >
              <span className={recommendArt({ tone: index as 0 | 1 | 2 | 3 })}>N</span>
              <small className={css({ color: 'var(--color-text-muted)' })}>{product.id.toUpperCase()}</small>
              <strong className={css({ fontSize: '15px' })}>{product.name}</strong>
              <b className={css({ fontSize: '14px' })}>{product.price.toLocaleString()}원</b>
            </Link>
          ))}
        </Grid>
      </section>
    </main>
  );
}
