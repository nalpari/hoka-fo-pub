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
      '& .mega-menu-ad-card': { outline: '2px solid var(--hoka-black)', outlineOffset: '3px' },
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
    color: 'var(--hoka-white)',
    p: '30px 24px',
    bgImage:
      'linear-gradient(180deg, color-mix(in srgb, var(--color-black-100) 0%, transparent) 32%, color-mix(in srgb, var(--color-black-100) 72%, transparent) 100%)',
    bgPosition: 'center',
    bgRepeat: 'no-repeat',
    bgSize: 'cover',
  }),
  title: css({
    m: 0,
    fontSize: '16' /* 기존 18px */,
    fontWeight: 'black',
    lineHeight: 'body',
    letterSpacing: 0,
  }),
  action: css({
    fontFamily: 'Pretendard',
    fontSize: '16',
    fontWeight: 'bold',
    lineHeight: 'body',

    letterSpacing: 'korean',
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
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.action}>자세히 보기</span>
        </VStack>
      </Square>
    </Link>
  );
}
