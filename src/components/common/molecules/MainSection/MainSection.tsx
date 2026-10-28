import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { contentFrame } from 'styled-system/patterns';
import type { TypographyVariant } from '@/components/common/atoms/Typography/Typography';
import { MainSectionHeader } from './MainSectionHeader';

export type MainSectionProps = {
  title: string;
  titleVariant?: TypographyVariant;
  actionSlot?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Extended content starts on the central grid and reaches the frame's right edge. */
  contentWidth?: 'contained' | 'fullBleed' | 'extended';
  spacing?: 'default' | 'compact';
};

const content = contentFrame({
  mx: 'auto',
  mobileWidth: '100%',
});

const fullBleedContent = css({
  w: '100vw',
  mx: 'calc(50% - 50vw)',
});

const extendedContent = css({
  w: 'calc(100% - var(--section-content-offset))',
  ml: 'var(--section-content-offset)',
  minW: '0',
  _mobile: { w: '100%', ml: '0' },
});

/** 홈 콘텐츠 영역과 반응형 제목 및 헤더 액션을 배치합니다. (Arranges a home content region with a responsive title and header actions.) */
export function MainSection({
  title,
  titleVariant,
  actionSlot,
  children,
  className,
  contentWidth = 'contained',
  spacing = 'default',
}: MainSectionProps) {
  return (
    <Box
      as="section"
      className={className}
      w="100%"
      containerType="inline-size"
      css={{
        '--section-content-width':
          'min(calc(100cqw - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))',
        '--section-content-offset': 'calc((100cqw - var(--section-content-width)) / 2)',
      }}
    >
      <ContentSection
        alignItems="flex-start"
        gap={
          spacing === 'compact'
            ? { base: '32px', _mobile: '24px' }
            : { base: '40px', _mobile: '24px' }
        }
        header={
          <MainSectionHeader title={title} titleVariant={titleVariant} actionSlot={actionSlot} />
        }
      >
        <div
          className={
            contentWidth === 'extended'
              ? extendedContent
              : contentWidth === 'fullBleed'
                ? fullBleedContent
                : content
          }
        >
          {children}
        </div>
      </ContentSection>
    </Box>
  );
}
