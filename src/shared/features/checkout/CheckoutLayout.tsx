import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StepIndicator } from '@/shared/components/molecules/StepIndicator/StepIndicator';
import { Box, Flex } from 'styled-system/jsx';

const stepItems = [{ label: '장바구니' }, { label: '주문/결제' }, { label: '주문완료' }];

export function CheckoutLayout({
  completed,
  children,
}: {
  completed: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      as="main"
      maxW="1100px"
      mx="auto"
      pt={{ base: '62px', _mobile: '38px' }}
      px={{ base: '0', _mobile: '4' }}
      pb={{ base: '110px', _mobile: '62px' }}
    >
      <Flex as="header" alignItems="center" justifyContent="space-between" mb="10">
        <Typography as="h1" variant="pageTitle" className={css({ m: '0' })}>
          {completed ? '주문완료' : '주문/결제'}
        </Typography>
        <StepIndicator
          ariaLabel="주문 진행 단계"
          current={completed ? 3 : 2}
          items={stepItems}
          mobileHidden
        />
      </Flex>
      {children}
    </Box>
  );
}
