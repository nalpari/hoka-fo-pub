import Image from 'next/image';
import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';

/** Keeps the existing map sample undistorted within the PC/mobile preview frames. */
export function StoreMapPreview({ storeName }: { storeName: string }) {
  return (
    <Box
      pos="relative"
      w="100%"
      h={{ base: '422px', _mobile: '240px' }}
      overflow="hidden"
      aria-label={`${storeName} 지도 미리보기`}
    >
      <Image
        src="/images/store-finder/map-preview.png"
        alt=""
        width={1170}
        height={2532}
        className={css({
          pos: 'absolute',
          w: '105.36%',
          h: 'auto',
          top: '50%',
          left: '-0.09%',
          transform: 'translateY(-50%)',
          maxW: 'none',
        })}
        unoptimized
      />
      <Grid pos="absolute" inset="0" gap="0" placeItems="center" bg="rgba(0, 0, 0, 0.5)">
        <Typography variant="body4" tone="inverse">
          API 지도 노출 영역
        </Typography>
      </Grid>
    </Box>
  );
}
