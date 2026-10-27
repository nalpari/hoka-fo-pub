import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';

import { RunClubFacts } from './RunClubFacts';
import { RunClubSessionNotes } from './RunClubSessionNotes';
import type { RunClubGuideRow } from './RunClubSessionGuide';
import { Box } from 'styled-system/jsx';

type Props = { title: string; rows: RunClubGuideRow[] };

/** 런클럽 세션 안내와 정보 행을 구성합니다. (Composes run club session guidance and fact rows.) */
export function RunClubSessionGuideContent({ title, rows }: Props) {
  return (
    <Box maxW="640px" _mobile={{ maxW: 'none' }}>
      <ContentSection
        gap={{ base: '20px', _mobile: '6' }}
        title="세션 안내"
        headerProps={{
          gap: '4',
          titleProps: { variant: 'body1', mo: 'body2', weight: 'black' },
          description: (
            <>
              호카 런 클럽 {title}에서
              <br />
              러너들과 함께 달리며 그룹 러닝의 즐거움을 느껴보세요!
            </>
          ),
          descriptionProps: { variant: 'body4' },
        }}
      >
        <RunClubFacts variant="guide" rows={rows} />
      </ContentSection>
      <RunClubSessionNotes precautions />
    </Box>
  );
}
