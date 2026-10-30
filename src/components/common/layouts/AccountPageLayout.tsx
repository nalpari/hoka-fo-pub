import type { ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';
import type { SystemStyleObject } from 'styled-system/types';

import { ContentSection } from '@/components/common/layouts/ContentSection';

type Props = {
  children: ReactNode;
  title?: ReactNode;
  description?: string;
  actions?: ReactNode;
  actionsSpacing?: 'default' | 'compact';
  contentWidth?: '420px' | '500px' | '568px';
  contentAs?: 'div' | 'section';
  contentLabelledBy?: string;
  outsideContent?: ReactNode;
  contentCss?: SystemStyleObject;
};

/** 계정 화면의 프레임과 선택적 제목·폼 액션을 배치합니다. (Arranges the account-page frame with an optional heading and form actions.) */
export function AccountPageLayout({
  children,
  title,
  description,
  actions,
  actionsSpacing = 'default',
  contentWidth = '500px',
  contentAs = 'div',
  contentLabelledBy,
  outsideContent,
  contentCss,
}: Props) {
  return (
    <Box as="main" pt="24" px="5" pb="24" _mobile={{ pt: '10', px: '4', pb: '64px' }}>
      <Box
        as={contentAs}
        aria-labelledby={contentLabelledBy}
        className={css(
          { maxW: '500px', mx: 'auto' },
          contentWidth === '420px' && { maxW: '420px' },
          contentWidth === '568px' && { maxW: '568px' },
          contentCss,
        )}
      >
        {title !== undefined ? (
          <ContentSection
            gap={{ base: '10', _mobile: '8' }}
            title={title}
            headerProps={{
              titleAs: 'h1',
              titleProps: { web: 'heading7', mo: 'heading5' },
              description,
              descriptionProps: { variant: 'body3', tone: 'tertiary' },
            }}
          >
            {children}
          </ContentSection>
        ) : (
          children
        )}
        {actions ? (
          <Grid gridTemplateColumns="1fr 1fr" gap="2" mt={actionsSpacing === 'compact' ? '6' : '8'}>
            {actions}
          </Grid>
        ) : null}
      </Box>
      {outsideContent}
    </Box>
  );
}
