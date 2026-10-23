import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = {
  appearance: 'detail' | 'cart';
  title: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  id?: string;
};

/** 상품 옵션의 제목·보조 액션과 선택 영역을 배치합니다. (Arranges a product option title, secondary action, and controls.) */
export function ProductOptionSection({ appearance, title, children, action, id }: Props) {
  if (appearance === 'cart') {
    return (
      <Stack gap="3" id={id}>
        <Typography variant="body4" weight="semibold">
          {title}
        </Typography>
        {children}
      </Stack>
    );
  }

  return (
    <ContentSection
      as="section"
      id={id}
      gap="4"
      w="full"
      title={title}
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        css: css.raw({ w: 'full' }),
        titleProps: { variant: 'productSelectorLabel' },
        action: action ? (
          <Flex alignItems="baseline" justifyContent="space-between">
            {action}
          </Flex>
        ) : null,
      }}
    >
      {children}
    </ContentSection>
  );
}
