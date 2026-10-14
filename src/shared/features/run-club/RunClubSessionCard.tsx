'use client';

import Link from 'next/link';
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
    '&::before': {
      bg: 'rgba(0, 0, 0, 0.3)',
    },
  }),
};

export function RunClubSessionCard({ session }: { session: RunClubSession }) {
  return (
    <Stack as="article" gap="5">
      <LinkOverlay
        as={Link}
        href={`/running/run-club/${session.id}`}
        className={styles.image}
        aria-label={`${session.title} 상세 보기`}
      >
        <img src={runClubImage(session.image)} alt="" width={371} height={494} loading="lazy" />
        <Square pos="absolute" left="0" top="0" w="100%" h="100%">
          <VStack gap="4" color="#fff">
            <Typography variant="heading6">{session.overlayDate}</Typography>
            <HStack gap="2">
              <Typography variant="heading6">{session.location}</Typography>
              <Typography variant="heading6">{session.distance}</Typography>
            </HStack>
          </VStack>
        </Square>
      </LinkOverlay>
      <Stack gap="8">
        <Stack gap="3.5">
          <Flex justifyContent="flex-start">
            <RunClubBadge category={session.category} />
          </Flex>
          <Stack gap="4">
            <Typography variant="heading6" as="h2">
              {session.title}
            </Typography>
            <Typography variant="body3" as="p">
              {session.schedule} | {session.location} {session.distance}
            </Typography>
          </Stack>
        </Stack>
        <ButtonLink href={`/running/run-club/${session.id}`} variant="primary">
          자세히 보기
        </ButtonLink>
      </Stack>
    </Stack>
  );
}
