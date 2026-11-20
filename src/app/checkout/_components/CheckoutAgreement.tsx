'use client';

import { css } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Typography } from '@/components/common/atoms/Typography';

const detailsLink = css({ flexShrink: '0', whiteSpace: 'nowrap', fontWeight: 'medium' });

/** 결제 필수 동의 두 항목을 표시합니다. (Displays the two required checkout agreements.) */
export function CheckoutAgreement({ showError = false }: { showError?: boolean }) {
  return (
    <Stack gap={{ base: '10px', _mobile: '16px' }}>
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        gap={{ base: '8px', _mobile: '0px' }}
      >
        <Checkbox
          className={css({
            alignItems: 'flex-start',
          })}
          interactiveLabel
          label={
            <Typography variant="body4">주문 내용을 확인하였으며 결제에 동의합니다.</Typography>
          }
        />
        <ButtonLink variant="link" size="md" href="/support/terms" className={detailsLink}>
          전문보기
        </ButtonLink>
      </Flex>
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        gap={{ base: '8px', _mobile: '24px' }}
      >
        <Checkbox
          className={css({
            alignItems: 'flex-start',
          })}
          interactiveLabel
          label={
            <Typography variant="body4">
              개인정보 수집 · 이용내용을 확인하였으며 결제에 동의합니다.
            </Typography>
          }
        />
        <ButtonLink
          variant="link"
          size="md"
          href="/support/terms?tab=privacy"
          className={detailsLink}
        >
          전문보기
        </ButtonLink>
      </Flex>
      {showError ? (
        <Typography as="p" variant="body5" className={css({ color: 'red.100' })} role="alert">
          필수 항목에 동의해 주세요.
        </Typography>
      ) : null}
    </Stack>
  );
}
