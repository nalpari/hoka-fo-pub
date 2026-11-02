import type { ReactNode } from 'react';

import { Box, Flex } from 'styled-system/jsx';

import { ContentSection } from '@/components/common/layouts/ContentSection';

type Props = {
  title: ReactNode | null;
  headerSpacing?: 'default' | 'none';
  maxWidth?: string;
  paddingX?: { base: string; _mobile: string };
  children: ReactNode;
};

/** 장바구니·결제 화면의 공통 제목 프레임을 구성합니다. (Composes the shared title frame for cart and checkout pages.) */
export function OrderPageLayout({
  title,
  headerSpacing = 'default',
  maxWidth = '1200px',
  paddingX = { base: '34px', _mobile: '16px' },
  children,
}: Props) {
  return (
    <Box
      as="main"
      maxW={maxWidth}
      mx="auto"
      pt={{ base: '56px', _mobile: '24px' }}
      px={paddingX}
      pb={{ base: '96px', _mobile: '64px' }}
    >
      {title === null ? (
        children
      ) : (
        <ContentSection
          gap={
            headerSpacing === 'default' ? { base: '10', _mobile: '6' } : { base: '0', _mobile: '6' }
          }
          header={
            <Flex as="header" alignItems="center">
              {title}
            </Flex>
          }
        >
          {children}
        </ContentSection>
      )}
    </Box>
  );
}
