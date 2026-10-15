import Link from 'next/link';
import { css } from 'styled-system/css';
import { hstack } from 'styled-system/patterns';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { faBox, faComments, faLocationDot, faUserSolid } from '@/shared/icons/fontAwesome';

const styles = {
  navigation: css({
    flexShrink: 0,
    px: '16px',
    pt: '32px',
    pb: 'calc(32px + env(safe-area-inset-bottom))',
    bg: 'var(--color-black-100)',
    color: 'var(--color-text-inverse)',
  }),
  list: css({ listStyle: 'none', p: 0, m: 0 }),
  link: hstack({ gap: '16px', minH: '40px', color: 'inherit', textDecoration: 'none' }),
  icon: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    w: '16px',
    flexShrink: 0,
  }),
};

const utilityItems = [
  { label: '마이페이지', to: '/mypage', icon: faUserSolid },
  { label: 'HOKA 멤버십', to: '/support/member-benefits', icon: null },
  { label: '주문/배송 조회', to: '/mypage/orders', icon: faBox },
  { label: '매장 찾기', to: '/support/store', icon: faLocationDot },
  { label: '고객센터', to: '/support', icon: faComments },
] as const;

export function MenuDrawerUtilityLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav className={styles.navigation} aria-label="고객 지원 메뉴">
      <ul className={styles.list}>
        {utilityItems.map((item) => (
          <li key={item.to}>
            <Link className={styles.link} href={item.to} onClick={onNavigate}>
              <span className={styles.icon}>
                {item.icon ? (
                  <Icon fontAwesomeIcon={item.icon} size="16px" aria-hidden="true" />
                ) : (
                  <Icon name="navigation/membership" size="16px" alt="" />
                )}
              </span>
              <Typography variant="body4">{item.label}</Typography>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
