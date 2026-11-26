'use client';

import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import {
  DesignGuideTypography,
  typographyGuideSections,
} from '@/components/screen-index/DesignGuideTypography';

import { GuideTimeline } from './GuideTimeline';

const guide = css({
  gridTemplateColumns: { base: 'minmax(0, 1fr) 240px', _mobile: 'minmax(0, 1fr)' },
});

/** 디자인 시스템의 텍스트 스타일과 복사 가능한 코드를 보여줍니다. (Shows design-system text styles and copyable snippets.) */
export function TypographyGuide() {
  return (
    <Grid className={guide} gap="4" alignItems="start" pt="6">
      <Stack minW="0" gap={{ base: '6', _mobile: '4' }}>
        <Typography as="h2" web="h10B" mo="h7B">
          Typography
        </Typography>
        <DesignGuideTypography />
      </Stack>
      <GuideTimeline title="타이포그래피 유형" entries={typographyGuideSections} />
    </Grid>
  );
}
