import Link from 'next/link';
import Image from 'next/image';
import { css } from 'styled-system/css';
import { LinkOverlay, VStack, HStack, Square } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { runClubImage, type RunClubSession } from './runClub.data';

const styles = {
  image: css({
    position: 'relative',
    aspectRatio: '3 / 4',
    overflow: 'hidden',
    borderRadius: '8px',
    _mobile: { aspectRatio: '1', borderRadius: '0' },
    '&::before': {
      bg: 'rgba(0, 0, 0, 0.3)',
    },
  }),
};

/** 세션 이미지 위에 날짜·장소·거리를 겹쳐 표시합니다. (Overlays the session date, location, and distance on its image.) */
export function RunClubSessionCardImage({ session }: { session: RunClubSession }) {
  return (
    <LinkOverlay
      as={Link}
      href={`/running/run-club/${session.id}`}
      className={styles.image}
      aria-label={`${session.title} 상세 보기`}
    >
      <Image
        className={css({ w: '100%', h: '100%', objectFit: 'cover' })}
        src={runClubImage(session.image)}
        alt=""
        width={371}
        height={494}
        sizes="(max-width: 767px) 100vw, 25vw"
      />
      <Square pos="absolute" left="0" top="0" w="100%" h="100%">
        <VStack gap="0" color="#fff">
          <Typography variant="heading6" mo="heading4">{session.overlayDate}</Typography>
          <HStack gap="2">
            <Typography variant="heading6" mo="heading4">{session.location}</Typography>
            <Typography variant="heading6" mo="heading4">{session.distance}</Typography>
          </HStack>
        </VStack>
      </Square>
    </LinkOverlay>
  );
}
