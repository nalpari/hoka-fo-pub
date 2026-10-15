'use client';

import Link from 'next/link';
import { sva, cx } from 'styled-system/css';
import { Square, VStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { MegaMenuPromo } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';

export type MegaMenuADProps = MegaMenuPromo & {
  onClick?: () => void;
  presentation?: 'desktop' | 'mobile';
  className?: string;
};

const promo = sva({
  slots: ['link', 'card', 'image', 'gradient', 'title', 'action'],
  base: {
    link: {
      display: 'block',
      _focusVisible: {
        '& > [data-mega-menu-ad-card]': {
          outline: '2px solid var(--hoka-black)',
          outlineOffset: '3px',
        },
      },
    },
    card: { position: 'relative', overflow: 'hidden' },
    image: { display: 'block', w: '100%', h: '100%', objectFit: 'cover' },
    gradient: {
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      pos: 'absolute',
      w: '100%',
      h: '100%',
      left: 0,
      bottom: 0,
      bgPosition: 'center',
      bgRepeat: 'no-repeat',
      bgSize: 'cover',
      '&&': { color: 'var(--hoka-white)' },
    },
    title: { m: 0 },
    action: { textDecoration: 'underline', textDecorationStyle: 'solid' },
  },
  variants: {
    presentation: {
      desktop: {
        link: { w: '358px' },
        gradient: {
          gap: '4',
          p: '30px 24px',
          bgImage:
            'linear-gradient(180deg, color-mix(in srgb, var(--color-black-100) 0%, transparent) 32%, color-mix(in srgb, var(--color-black-100) 72%, transparent) 100%)',
        },
        action: { textUnderlineOffset: '2px' },
      },
      mobile: {
        link: {
          w: '100%',
          aspectRatio: '1',
          color: 'var(--color-white-000)',
          textDecoration: 'none',
          overflow: 'hidden',
        },
        gradient: {
          gap: '8px',
          p: '24px 22px',
          bgImage: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)',
        },
        action: { textUnderlineOffset: '3px' },
      },
    },
  },
  defaultVariants: { presentation: 'desktop' },
});

export function MegaMenuAD({
  to,
  imageSrc,
  title,
  onClick,
  presentation = 'desktop',
  className,
}: MegaMenuADProps) {
  const styles = promo({ presentation });
  const isMobile = presentation === 'mobile';

  return (
    <Link className={cx(styles.link, className)} href={to} onClick={onClick}>
      <Square className={styles.card} data-mega-menu-ad-card size={isMobile ? '100%' : '358px'}>
        <img className={styles.image} src={imageSrc} alt="" />
        <VStack className={styles.gradient}>
          <Typography
            as={isMobile ? 'h2' : 'h3'}
            variant={isMobile ? 'navigationPromoTitle' : 'heading9'}
            className={styles.title}
          >
            {title}
          </Typography>
          <Typography variant={isMobile ? 'textLink2' : 'textLink1'} className={styles.action}>
            자세히 보기
          </Typography>
        </VStack>
      </Square>
    </Link>
  );
}
