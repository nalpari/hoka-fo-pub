import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import type { TypographyVariant } from '@/shared/components/atoms/Typography/Typography';
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

const content = css({
  w: 'min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))',
  mx: 'auto',
  _mobile: { w: '100%' },
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

/** A home-page content region with a heading and optional header controls. */
export function MainSection({
  title,
  titleVariant = 'sectionHeading',
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
