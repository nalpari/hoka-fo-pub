import Link from 'next/link';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const textAction = css({
  p: '0',
  border: '0',
  borderRadius: '0',
});

/** 고객센터 연락처와 문의 링크를 표시합니다. (Displays cart support contact details and the inquiry link.) */
export function CartSupportContact() {
  return (
    <>
      <Typography variant="heading7">HOKA/HOKA 고객센터 내용 미정</Typography>
      <Typography variant="body4">TEL. 080-665-5552</Typography>
      <Typography variant="body5" tone="tertiary">
        *아래 1:1문의를 이용하시면 조금 더 빠르게 답변 받으실수 있습니다.
      </Typography>
      <Link href="/support/inquiries/new" className={textAction}>
        <Typography variant="textLink3">1:1 문의하기</Typography>
      </Link>
    </>
  );
}
