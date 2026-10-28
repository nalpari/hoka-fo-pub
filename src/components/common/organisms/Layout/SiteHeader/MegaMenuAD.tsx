'use client';

import Link from 'next/link';
import { css, cx } from 'styled-system/css';
import { Square, VStack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { MegaMenuPromo } from '@/components/common/organisms/Layout/SiteHeader/megaMenu';

export type MegaMenuADProps = MegaMenuPromo & {
  onClick?: () => void;
  presentation?: 'desktop' | 'mobile';
  className?: string;
};

/** 메가 메뉴의 프로모션 링크와 텍스트를 표시합니다. (Displays a promotional link and copy in the mega menu.) */
export function MegaMenuAD({
  to,
  imageSrc,
  title,
  onClick,
  presentation = 'desktop',
  className,
}: MegaMenuADProps) {
  const isMobile = presentation === 'mobile';

  return (
    <Link
      href={to}
      onClick={onClick}
      className={cx(
        css({
          display: 'block',
          w: isMobile ? '100%' : '358px',
          aspectRatio: isMobile ? '1' : undefined,
          color: isMobile ? 'var(--color-white-000)' : undefined,
          textDecoration: isMobile ? 'none' : undefined,
          overflow: isMobile ? 'hidden' : undefined,
          _focusVisible: {
            '& > [data-mega-menu-ad-card]': {
              outline: '2px solid var(--hoka-black)',
              outlineOffset: '3px',
            },
          },
        }),
        className,
      )}
    >
      <Square
        pos="relative"
        overflow="hidden"
        data-mega-menu-ad-card
        size={isMobile ? '100%' : '358px'}
      >
        <img
          className={css({ display: 'block', w: '100%', h: '100%', objectFit: 'cover' })}
          src={imageSrc}
          alt=""
        />
        <VStack
          alignItems="flex-start"
          justifyContent="flex-end"
          pos="absolute"
          w="100%"
          h="100%"
          left="0"
          bottom="0"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          css={{ '&&': { color: 'var(--hoka-white)' } }}
          gap={isMobile ? '8px' : '4'}
          p={isMobile ? '24px 22px' : '30px 24px'}
          bgImage={
            isMobile
              ? 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)'
              : 'linear-gradient(180deg, color-mix(in srgb, var(--color-black-100) 0%, transparent) 32%, color-mix(in srgb, var(--color-black-100) 72%, transparent) 100%)'
          }
        >
          <Typography
            as={isMobile ? 'h2' : 'h3'}
            variant="body1"
            weight="black"
            className={css({ m: 0 })}
          >
            {title}
          </Typography>
          <Typography
            variant={isMobile ? 'textLink2' : 'textLink1'}
            className={css({
              textDecoration: 'underline',
              textDecorationStyle: 'solid',
              textUnderlineOffset: isMobile ? '3px' : '2px',
            })}
          >
            자세히 보기
          </Typography>
        </VStack>
      </Square>
    </Link>
  );
}
