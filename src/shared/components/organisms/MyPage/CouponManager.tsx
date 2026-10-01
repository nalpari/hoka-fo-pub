import { useState } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { css, cva } from 'styled-system/css';

export type CouponItem = {
  id: string;
  name: string;
  benefit: string;
  condition: string;
  expiresAt: string;
  category: '상품 할인' | '배송 할인';
};

type Props = { coupons: CouponItem[] };

const register = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '2',
  p: '5',
  bg: 'var(--color-surface-muted)',
  _mobile: { gridTemplateColumns: '1fr' },
});

const filters = css({ display: 'flex', gap: '2', mt: '6', overflowX: 'auto', pb: '0.5' });

const filter = cva({
  base: {
    flex: '0 0 auto',
    px: '15px',
    py: '9px',
    border: '1px solid #bbb',
    bg: '#fff',
    fontSize: '13px',
  },
  variants: { active: { true: { bg: '#111', color: '#fff', borderColor: '#111' }, false: {} } },
});

const table = css({ mt: '18px', borderTop: '2px solid #111' });

const couponRow = css({
  display: 'grid',
  gridTemplateColumns: '120px 1.3fr 1.4fr 1.2fr',
  gap: '3.5',
  alignItems: 'center',
  minH: '92px',
  px: '4',
  borderBottom: '1px solid var(--color-border-subtle)',
  fontSize: '13px',
  _mobile: {
    gridTemplateColumns: '1fr auto',
    gap: '1.5',
    py: '4',
    '& strong': { fontSize: '20px' },
    '& span': { gridColumn: '1 / -1', color: 'var(--color-text-muted)' },
    '& time': { gridColumn: '1 / -1', color: 'var(--color-text-muted)', fontSize: '12px' },
  },
});

/** Coupon registration, category filtering, and mobile-first coupon history. */
export function CouponManager({ coupons }: Props) {
  const [category, setCategory] = useState<'전체' | CouponItem['category']>('전체');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const visibleCoupons = coupons.filter(
    (coupon) => category === '전체' || coupon.category === category,
  );

  return (
    <section aria-label="쿠폰 관리">
      <div className={register}>
        <TextInput
          aria-label="쿠폰 번호"
          invalid={message === '쿠폰 번호를 확인해 주세요.'}
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setMessage(null);
          }}
          placeholder="쿠폰 번호를 입력해 주세요"
        />
        <Button
          type="button"
          onClick={() =>
            setMessage(
              code.trim().length >= 6 ? '쿠폰이 등록되었습니다.' : '쿠폰 번호를 확인해 주세요.',
            )
          }
        >
          쿠폰 등록
        </Button>
      </div>
      {message ? (
        <p
          className={css({
            mt: '2',
            color: message.includes('등록') ? '#157347' : '#db1f2d',
            fontSize: '12px',
            fontWeight: '700',
          })}
        >
          {message}
        </p>
      ) : null}
      <div className={filters} role="tablist" aria-label="쿠폰 종류">
        {(['전체', '상품 할인', '배송 할인'] as const).map((value) => (
          <Button
            className={filter({ active: category === value })}
            key={value}
            onClick={() => setCategory(value)}
            role="tab"
            type="button"
          >
            {value}
          </Button>
        ))}
      </div>
      <div className={table}>
        {visibleCoupons.map((coupon) => (
          <article className={couponRow} key={coupon.id}>
            <strong>{coupon.benefit}</strong>
            <b>{coupon.name}</b>
            <span>{coupon.condition}</span>
            <time>{coupon.expiresAt}</time>
          </article>
        ))}
      </div>
    </section>
  );
}
