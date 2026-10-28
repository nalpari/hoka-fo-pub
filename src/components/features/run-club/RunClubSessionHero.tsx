import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { css } from 'styled-system/css';
import Image from 'next/image';
import { Box, Grid, HStack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { runClubImage, type RunClubSession } from './runClub.data';
import { RunClubBadge } from './RunClubBadge';
import { RunClubSessionNotes } from './RunClubSessionNotes';
import { RunClubApplyButton } from './RunClubApplyButton';
import { RunClubFacts, type RunClubFact } from './RunClubFacts';

const styles = {
  image: css({ w: '100%', h: 'auto', aspectRatio: '1', objectFit: 'cover', display: 'block' }),
  opening: css({ color: 'var(--color-blue-100)', mb: '24px' }),
};

type RunClubSessionHeroProps = {
  session: RunClubSession;
  rows: RunClubFact[];
  onApply: () => void;
};

/** 세션 대표 이미지와 일정·신청 정보를 표시합니다. (Displays a session hero image, schedule, and application details.) */
export function RunClubSessionHero({ session, rows, onApply }: RunClubSessionHeroProps) {
  const upcoming = session.status === 'upcoming';

  return (
    <Grid
      as="section"
      gridTemplateColumns="1fr 1fr"
      gap="60px"
      w="min(calc(100% - 110px), 1340px)"
      mx="auto"
      py="72px"
      alignItems="center"
      _mobile={{ w: '100%', gridTemplateColumns: '1fr', gap: '0', py: '0' }}
    >
      <Image
        className={styles.image}
        src={runClubImage(session.detailImage)}
        alt={`${session.title} 러닝 현장`}
        width={544}
        height={544}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <Box _mobile={{ px: '4', pt: '4', pb: '10' }}>
        <HStack>
          <RunClubBadge category={session.category} />
        </HStack>
        <ContentHeader
          mt="3"
          mb={{ base: '6', _mobile: '10' }}
          gap="10px"
          title={session.title}
          titleAs="h1"
          titleProps={{ variant: 'heading6', mo: 'heading4', weight: 'black' }}
          description={
            <>
              {session.schedule} | {session.location} {session.distance}
            </>
          }
          descriptionProps={{ variant: 'body3' }}
        />
        {upcoming ? (
          <Typography as="p" variant="body4" weight="bold" className={styles.opening}>
            ⓘ 1월 23일 (토) 10:00 신청 시작
          </Typography>
        ) : null}
        <RunClubFacts variant="hero" rows={rows} />
        <RunClubSessionNotes />
        <Box _mobile={{ display: 'none' }}>
          <RunClubApplyButton status={session.status} onApply={onApply} />
        </Box>
      </Box>
    </Grid>
  );
}
