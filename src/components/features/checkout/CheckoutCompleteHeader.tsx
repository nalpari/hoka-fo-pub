import { Circle } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { faCheck } from '@/icons/fontAwesome';

/** 주문 완료 아이콘과 감사 인사를 표시합니다. (Displays the order completion icon and thank-you message.) */
export function CheckoutCompleteHeader() {
  return (
    <>
      <Circle
        border="2px solid var(--colors-black-100)"
        size="10"
        flex="0 1 auto"
        display={{ _mobile: 'none' }}
        aria-hidden="true"
      >
        <Icon fontAwesomeIcon={faCheck} size={26} />
      </Circle>
      <Typography as="p" variant="heading7">
        구매해 주셔서 감사합니다.
      </Typography>
    </>
  );
}
