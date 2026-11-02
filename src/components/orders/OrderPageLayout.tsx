import type { ReactNode } from 'react';

import { Box, Flex } from 'styled-system/jsx';

import { StepIndicator } from '@/components/common/molecules/StepIndicator';

import { ContentSection } from '@/components/common/layouts/ContentSection';

const stepItems = [{ label: '장바구니' }, { label: '주문/결제' }, { label: '주문완료' }];

type Props = {
  title: ReactNode;
  step: 1 | 2 | 3;
  headerSpacing?: 'default' | 'none';
  showSteps?: boolean;
  maxWidth?: string;
  children: ReactNode;
};

/** 장바구니·결제의 공통 프레임과 주문 진행 단계를 배치합니다. (Arranges the shared cart and checkout frame with order progress.) */
export function OrderPageLayout({
  title,
  step,
  headerSpacing = 'default',
  showSteps = true,
  maxWidth = '1100px',
  children,
}: Props) {
  return (
    <Box
      as="main"
      maxW={maxWidth}
      mx="auto"
      pt={{ base: '62px', _mobile: '6' }}
      px={{ base: '0', _mobile: '4' }}
      pb={{ base: '110px', _mobile: '64px' }}
    >
      <ContentSection
        gap={
          headerSpacing === 'default' ? { base: '10', _mobile: '6' } : { base: '0', _mobile: '6' }
        }
        header={
          <Flex as="header" alignItems="center" justifyContent="space-between">
            {title}
            {showSteps ? (
              <StepIndicator
                ariaLabel="주문 진행 단계"
                current={step}
                items={stepItems}
                mobileHidden
              />
            ) : null}
          </Flex>
        }
      >
        {children}
      </ContentSection>
    </Box>
  );
}
