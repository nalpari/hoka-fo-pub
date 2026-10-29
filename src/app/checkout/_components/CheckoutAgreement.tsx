'use client';

import Link from 'next/link';

import { css } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';

import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Typography } from '@/components/common/atoms/Typography';

/** 결제 필수 동의 두 항목을 표시합니다. (Displays the two required checkout agreements.) */
export function CheckoutAgreement({
  orderAgreed,
  privacyAgreed,
  error,
  onOrderAgreedChange,
  onPrivacyAgreedChange,
}: {
  orderAgreed: boolean;
  privacyAgreed: boolean;
  error: boolean;
  onOrderAgreedChange: (agreed: boolean) => void;
  onPrivacyAgreedChange: (agreed: boolean) => void;
}) {
  const detailsLink = css({
    flexShrink: '0',
    fontSize: '12px',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    whiteSpace: 'nowrap',
  });

  return (
    <Stack gap="2">
      <Flex alignItems="flex-start" justifyContent="space-between" gap="6">
        <Checkbox
          className={css({
            alignItems: 'flex-start',
          })}
          checked={orderAgreed}
          interactiveLabel
          onCheckedChange={onOrderAgreedChange}
          label={
            <Typography variant="body5">주문 내용을 확인하였으며 결제에 동의합니다.</Typography>
          }
        />
        <Link href="/support/terms" className={detailsLink}>
          전문보기
        </Link>
      </Flex>
      <Flex alignItems="flex-start" justifyContent="space-between" gap="6">
        <Checkbox
          className={css({
            alignItems: 'flex-start',
          })}
          checked={privacyAgreed}
          interactiveLabel
          onCheckedChange={onPrivacyAgreedChange}
          label={
            <Typography variant="body5">
              개인정보 수집 · 이용내용을 확인하였으며 결제에 동의합니다.
            </Typography>
          }
        />
        <Link href="/support/terms?tab=privacy" className={detailsLink}>
          전문보기
        </Link>
      </Flex>
      {error ? (
        <Typography as="p" variant="body5" className={css({ color: 'red.100' })} role="alert">
          필수 항목에 동의해 주세요.
        </Typography>
      ) : null}
    </Stack>
  );
}
