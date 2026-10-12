import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Link } from 'react-router-dom';
import type { MegaMenuPromo } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { css } from 'styled-system/css';
import { Square, VStack } from 'styled-system/jsx';

export type MegaMenuADProps = MegaMenuPromo & {
  onClick?: () => void;
};

const styles = {
  link: css({
    display: 'block',
    w: '358px',
    _focusVisible: {
      '& .mega-menu-ad-card': {
        outline: '2px solid var(--hoka-black)',
        outlineOffset: '3px',
      },
    },
  }),
  card: css({ position: 'relative', overflow: 'hidden' }),
  image: css({
    display: 'block',
    w: '100%',
    h: '100%',
    objectFit: 'cover',
  }),
  gradient: css({
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: '4',
    pos: 'absolute',
    w: '100%',
    h: '100%',
    left: '0',
    bottom: '0',
    p: '30px 24px',
    bgImage:
      'linear-gradient(180deg, color-mix(in srgb, var(--color-black-100) 0%, transparent) 32%, color-mix(in srgb, var(--color-black-100) 72%, transparent) 100%)',
    bgPosition: 'center',
    bgRepeat: 'no-repeat',
    bgSize: 'cover',
    '&&': {
      color: 'var(--hoka-white)',
    },
  }),
  title: css({
    m: 0,
  }),
  action: css({
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    textUnderlineOffset: '2px',
  }),
};

export function MegaMenuAD({ to, imageSrc, title, onClick }: MegaMenuADProps) {
  return (
    <Link className={styles.link} to={to} onClick={onClick}>
      <Square className={`${styles.card} mega-menu-ad-card`} size="358px">
        <img className={styles.image} src={imageSrc} alt="" />
        <VStack className={styles.gradient}>
          <Typography as="h3" variant="heading9" className={styles.title}>
            {title}
          </Typography>
          <Typography variant="textLink1" className={styles.action}>
            자세히 보기
          </Typography>
        </VStack>
      </Square>
    </Link>
  );
}
