import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { css } from 'styled-system/css';
import { contentFrame } from 'styled-system/patterns';
import type { MainSectionProps as ImportedMainSectionProps } from '@/types/component-contracts/components-common-molecules-MainSection-MainSection';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { type ReactNode } from 'react';
import { Box } from 'styled-system/jsx';
import { type TypographyVariant } from '@/components/common/atoms/Typography/Typography';

type Props = Pick<ImportedMainSectionProps, 'title' | 'titleVariant' | 'actionSlot'>;

const heading = css({ m: '0' });

/** 섹션 제목과 액션을 콘텐츠 그리드에 맞춥니다. (Aligns the section title and actions to the content grid.) */
function MainSectionHeader({ title, titleVariant, actionSlot }: Props) {
  return (
    <ContentHeader
      title={title}
      titleProps={{
        className: heading,
        web: titleVariant ?? 'heading5',
        mo: titleVariant ?? 'heading4',
      }}
      orientation="horizontal"
      gap="8px"
      action={actionSlot}
      className={contentFrame({
        mobileWidth: 'calc(100% - var(--layout-mobile-content-inline-space))',
      })}
      mx="auto"
    />
  );
}

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
