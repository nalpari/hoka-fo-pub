'use client';

import Link from 'next/link';
import Image from 'next/image';
import { css } from 'styled-system/css';
import { LinkOverlay, Stack, VStack, HStack, Square, Flex } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { runClubImage, type RunClubSession } from './runClub.data';
import { RunClubBadge } from './RunClubBadge';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  image: css({
    position: 'relative',
    aspectRatio: '3 / 4',
    overflow: 'hidden',
    borderRadius: '8px',
    _mobile: { aspectRatio: '1', borderRadius: '0' },
    '& img': { w: '100%', h: '100%', objectFit: 'cover' },
    '&::before': {
      bg: 'rgba(0, 0, 0, 0.3)',
    },
  }),
};

export function RunClubSessionCard({ session }: { session: RunClubSession }) {
  return (
    <Stack as="article" gap="5" _mobile={{ gap: '3' }}>
      <LinkOverlay
        as={Link}
        href={`/running/run-club/${session.id}`}
        className={styles.image}
        aria-label={`${session.title} 상세 보기`}
      >
        <Image
          src={runClubImage(session.image)}
          alt=""
          width={371}
          height={494}
          sizes="(max-width: 767px) 100vw, 25vw"
        />
        <Square pos="absolute" left="0" top="0" w="100%" h="100%">
          <VStack gap="4" color="#fff" _mobile={{ gap: '0' }}>
            <Typography variant="sessionOverlay">{session.overlayDate}</Typography>
            <HStack gap="2">
              <Typography variant="sessionOverlay">{session.location}</Typography>
              <Typography variant="sessionOverlay">{session.distance}</Typography>
            </HStack>
          </VStack>
        </Square>
      </LinkOverlay>
      <Stack gap="8" _mobile={{ px: '4' }}>
        <Stack gap="3.5" _mobile={{ gap: '2' }}>
          <Flex justifyContent="flex-start">
            <RunClubBadge category={session.category} />
          </Flex>
          <Stack gap="4" _mobile={{ gap: '2' }}>
            <Typography variant="heading6" mo="body1" weight="black" as="h2">
              {session.title}
            </Typography>
            <Typography variant="body3" mo="body4" as="p">
              {session.schedule} | {session.location} {session.distance}
            </Typography>
          </Stack>
        </Stack>
        <ButtonLink
          href={`/running/run-club/${session.id}`}
          variant="primary"
          className={css({ _mobile: { display: 'none' } })}
        >
          자세히 보기
        </ButtonLink>
      </Stack>
    </Stack>
  );
}
