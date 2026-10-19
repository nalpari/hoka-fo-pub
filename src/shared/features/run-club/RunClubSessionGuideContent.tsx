import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { RunClubFacts } from './RunClubFacts';
import { RunClubSessionNotes } from './RunClubSessionNotes';
import type { RunClubGuideRow } from './RunClubSessionGuide';
import { Box } from 'styled-system/jsx';

type Props = { title: string; rows: RunClubGuideRow[] };

export function RunClubSessionGuideContent({ title, rows }: Props) {
  return (
    <Box maxW="640px" _mobile={{ maxW: 'none' }}>
      <Typography
        as="h2"
        variant="body1"
        mo="body2"
        weight="black"
        className={css({ m: '0 0 16px' })}
      >
        세션 안내
      </Typography>
      <Typography
        as="p"
        variant="sessionGuideBody"
        className={css({ _mobile: { mb: '6' }, mb: '20px' })}
      >
        호카 런 클럽 {title}에서
        <br />
        러너들과 함께 달리며 그룹 러닝의 즐거움을 느껴보세요!
      </Typography>
      <RunClubFacts variant="guide" rows={rows} />
      <RunClubSessionNotes precautions />
    </Box>
  );
}
