import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import type { CareSection } from './care.data';

const styles = {
  careItem: css({
    '&::before': {
      content: '"·"',
      flexShrink: '0',
      color: 'var(--color-text-subtle)',
      fontFamily: 'ko',
      fontSize: 'body.16',
      lineHeight: 'body',
      _mobile: { fontSize: 'body.14', lineHeight: 'body' },
    },
  }),
};

/** 제품 관리 안내를 섹션별로 표시합니다 (Displays the care instructions composition). */
export function CareInstructions({
  sections,
  variant = 'default',
}: {
  sections: readonly CareSection[];
  variant?: 'default' | 'care';
}) {
  const isCare = variant === 'care';
  return (
    <Stack
      as="ol"
      gap={isCare ? { base: '4', _mobile: '10px' } : '4'}
      m="0"
      px={isCare ? '0' : { base: '3', _mobile: '2' }}
      py={isCare ? '0' : '4'}
      listStyleType="none"
    >
      {sections.map((section, index) => (
        <ContentSection
          as="li"
          key={section.title}
          id={isCare ? `care-section-${index}` : undefined}
          scrollMarginTop={isCare ? 'calc(var(--layout-site-header-height) + 16px)' : undefined}
          gap={isCare ? { base: '3', _mobile: '2' } : '2'}
          title={`${index + 1}. ${section.title}`}
          headerProps={{
            titleAs: 'h3',
            titleProps: isCare ? { web: 'b4M', mo: 'b6M' } : { variant: 'b6' },
          }}
        >
          <Stack as="ul" gap="0" m="0" pl={isCare ? '2' : '3'} listStyleType="none">
            {section.items.map((item) => (
              <HStack
                as="li"
                key={item}
                alignItems="flex-start"
                gap="1"
                className={isCare ? styles.careItem : undefined}
              >
                {!isCare && (
                  <Typography as="span" variant="b6" tone="subtle" aria-hidden="true">
                    ・
                  </Typography>
                )}
                <Typography web={isCare ? 'b4' : 'b6'} mo="b6" tone="subtle">
                  {item}
                </Typography>
              </HStack>
            ))}
          </Stack>
        </ContentSection>
      ))}
    </Stack>
  );
}
