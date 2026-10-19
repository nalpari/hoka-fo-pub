import type { ReactNode } from 'react';
import { Box, Flex } from 'styled-system/jsx';
import { StepIndicator } from '@/shared/components/molecules/StepIndicator/StepIndicator';

const stepItems = [{ label: '장바구니' }, { label: '주문/결제' }, { label: '주문완료' }];

type Props = {
  title: ReactNode;
  step: 1 | 2 | 3;
  headerSpacing?: 'default' | 'none';
  children: ReactNode;
};

/** Shared cart/checkout frame and order progress, with feature-owned heading typography. */
export function OrderPageLayout({ title, step, headerSpacing = 'default', children }: Props) {
  return (
    <Box
      as="main"
      maxW="1100px"
      mx="auto"
      pt={{ base: '62px', _mobile: '6' }}
      px={{ base: '0', _mobile: '4' }}
      pb={{ base: '110px', _mobile: '120px' }}
    >
      <Flex
        as="header"
        alignItems="center"
        justifyContent="space-between"
        mb={
          headerSpacing === 'default' ? { base: '10', _mobile: '6' } : { base: '0', _mobile: '6' }
        }
      >
        {title}
        <StepIndicator ariaLabel="주문 진행 단계" current={step} items={stepItems} mobileHidden />
      </Flex>
      {children}
    </Box>
  );
}
