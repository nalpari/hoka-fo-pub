import { css } from 'styled-system/css';
import Image from 'next/image';
import { Box, Grid } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { runClubImage, type RunClubSession } from './runClub.data';
import { RunClubBadge } from './RunClubBadge';
import { RunClubSessionNotes } from './RunClubSessionNotes';
import { RunClubApplyButton } from './RunClubApplyButton';
import { RunClubFacts, type RunClubFact } from './RunClubFacts';

const styles = {
  image: css({ w: '100%', h: 'auto', aspectRatio: '1', objectFit: 'cover', display: 'block' }),
  heading: css({
    m: '12px 0 10px',
  }),
  schedule: css({ m: '0 0 24px', _mobile: { mb: '10' } }),
  opening: css({ color: 'var(--color-blue-100)', mb: '24px' }),
};

type RunClubSessionHeroProps = {
  session: RunClubSession;
  rows: RunClubFact[];
  onApply: () => void;
};

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
        <RunClubBadge category={session.category} />
        <Typography
          as="h1"
          variant="sessionTitle"
          mo="body1"
          weight="black"
          className={styles.heading}
        >
          {session.title}
        </Typography>
        <Typography as="p" variant="body3" className={styles.schedule}>
          {session.schedule} | {session.location} {session.distance}
        </Typography>
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
