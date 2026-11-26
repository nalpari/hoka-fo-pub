import { css } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { supportApparelCareSections, supportShoeCareSections } from '@/app/support/care/care.data';
import { apparelCareIntroduction, shoeCareOverview } from '@/components/care-guide/care.data';
import { CareInstructions } from '@/components/care-guide/CareInstructions';

const overviewTargets = [
  [0, 3, 6, 9],
  [1, 4, 7],
  [2, 5, 8],
] as const;

const styles = {
  overviewItem: css({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '4px',
    '&::before': {
      content: '"·"',
      flexShrink: '0',
      color: 'var(--color-text-subtle)',
      fontFamily: 'ko',
      fontSize: 'body.16',
      lineHeight: 'body',
      _mobile: { fontSize: 'body.14', lineHeight: 'body', color: 'black.100' },
    },
  }),
  overviewText: css({ _mobile: { color: 'black.100' } }),
  overviewLink: css({
    textDecoration: 'none',
    _mobile: { textDecoration: 'underline', textUnderlineOffset: '2px' },
  }),
};

/** 세탁 안내의 소개와 분류별 관리 지침을 표시합니다. (Displays the introduction and category-specific care instructions.) */
export function CareContent({ category }: { category: 'shoes' | 'apparel' }) {
  const shoes = category === 'shoes';
  return (
    <Stack gap={shoes ? '8' : '4'} color="black.100" _mobile={{ gap: '6' }}>
      <ContentSection
        title={
          shoes ? '신발 착화 및 손질에 대한 올바른 방법' : '의류 및 용품 손질에 대한 올바른 방법'
        }
        gap={shoes ? '4' : { base: '3', _mobile: '4' }}
        headerProps={{ titleAs: 'h2', titleProps: { web: 'h10', mo: 'h8' } }}
      >
        {shoes ? (
          <Flex
            gap="10"
            border="1px solid"
            borderColor="black.20"
            px="4"
            py="6"
            _mobile={{ flexDirection: 'column', gap: '10px', px: '2', py: '4' }}
          >
            {shoeCareOverview.map((column, index) => (
              <Stack
                as="ul"
                key={index}
                gap={{ base: '2', _mobile: '10px' }}
                flex="1"
                minW="0"
                m="0"
                p="0"
                listStyleType="none"
              >
                {column.map((item, itemIndex) => (
                  <li key={item} className={styles.overviewItem}>
                    <Typography
                      web="b4M"
                      mo="b6"
                      tone="subtle"

                      className={styles.overviewText}
                    >
                      <a
                        href={`#care-section-${overviewTargets[index][itemIndex]}`}
                        className={styles.overviewLink}
                      >
                        {item}
                      </a>
                    </Typography>
                  </li>
                ))}
              </Stack>
            ))}
          </Flex>
        ) : (
          <Typography web="b4" mo="b6">
            {apparelCareIntroduction[0]}
            <br />
            {apparelCareIntroduction[1]}
          </Typography>
        )}
      </ContentSection>
      {shoes ? (
        <ContentSection
          title="신발 손질 및 관리 방법"
          gap={{ base: '6', _mobile: '4' }}
          headerProps={{ titleAs: 'h2', titleProps: { web: 'h10', mo: 'h8' } }}
        >
          <CareInstructions sections={supportShoeCareSections} variant="care" />
        </ContentSection>
      ) : (
        <CareInstructions sections={supportApparelCareSections} variant="care" />
      )}
    </Stack>
  );
}
