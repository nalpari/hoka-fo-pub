import { Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { css } from 'styled-system/css';
import type { PaymentMethod } from './CheckoutPayment';

const marks = { naver: 'N pay', toss: 'toss', samsung: 'SAMSUNG pay', payco: 'PAYCO' } as const;

/** 결제 타일의 브랜드 표시 영역을 구성합니다. (Displays the payment tile brand mark.) */
export function CheckoutPaymentMark({ method }: { method: PaymentMethod }) {
  return (
    <Box h="4" display="flex" alignItems="center" justifyContent="center" aria-hidden="true">
      {method === 'kakao' ? (
        <img
          src="/images/checkout/kakaopay.png"
          alt=""
          className={css({ w: '28px', h: '16px', objectFit: 'contain' })}
        />
      ) : method === 'card' ? (
        <Icon fontAwesomeIcon={faCreditCard} size={16} />
      ) : (
        <Typography
          variant="body5"
          weight="bold"
          className={css({
            color: method === 'payco' ? 'red.100' : method === 'naver' ? '#00a949' : '#2357c9',
          })}
        >
          {marks[method]}
        </Typography>
      )}
    </Box>
  );
}
