import { Drawer } from '@base-ui/react/drawer';
import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';

const drawer = css({
  position: 'fixed',
  inset: '0',
  zIndex: '100',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  bg: 'var(--color-white-000)',
  color: 'var(--color-black-100)',
});

const viewport = css({ position: 'fixed', inset: '0', zIndex: '100' });

const backdrop = css({ position: 'fixed', inset: '0', zIndex: '100', bg: 'transparent' });

const primaryMenu = css({
  flex: '1',
  minH: '445px',
  px: '4',
  pt: '16',
  pb: '12',
});

const closeButton = css({
  position: 'absolute',
  top: '17px',
  right: '3.5',
  display: 'grid',
  placeItems: 'center',
  w: '8',
  h: '8',
  border: '0',
  bg: 'transparent',
  color: 'var(--color-black-100)',
  fontSize: '28' /* 기존 30px */,
  fontWeight: 'normal',
  lineHeight: 'hoka',
  cursor: 'pointer',
  _focusVisible: { outline: '2px solid var(--color-black-100)', outlineOffset: '2px' },
});

const primaryList = css({ display: 'grid', gap: '18px', m: '0', p: '0', listStyle: 'none' });

const primaryLink = css({
  display: 'inline-flex',
  color: 'var(--color-black-100)',
  fontSize: '24',
  fontWeight: 'extrabold',
  lineHeight: 'koreanHeading',
  letterSpacing: 'korean',
  textDecoration: 'none',
  _focusVisible: { outline: '2px solid var(--color-black-100)', outlineOffset: '3px' },
});

const utilityMenu = css({
  display: 'grid',
  gap: '4',
  flexShrink: '0',
  minH: '222px',
  px: '4',
  py: '46px',
  bg: 'var(--color-black-100)',
  color: 'var(--color-white-000)',
});

const utilityList = css({ display: 'grid', gap: '4', m: '0', p: '0', listStyle: 'none' });

const utilityLink = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  color: 'var(--color-white-000)',
  fontSize: '14',
  fontWeight: 'bold',
  lineHeight: 'koreanHeading',
  letterSpacing: 'korean',
  textDecoration: 'none',
  _focusVisible: { outline: '2px solid var(--color-white-000)', outlineOffset: '3px' },
});

const utilityIcon = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '4',
  flexShrink: '0',
  color: 'var(--color-white-000)',
  fontSize: '16',
  lineHeight: 'hoka',
});

const primaryItems = [
  ['Shoe Finder', '/explore/shoe-finder'],
  ['New', '/products?sort=new'],
  ['Women', '/products?gender=women'],
  ['Men', '/products?gender=men'],
  ['Kids', '/products?gender=kids'],
  ['Explore', '/explore'],
  ['Sale', '/products?sale=true'],
] as const;

const utilityItems = [
  ['♟', 'My Account', '/mypage'],
  ['✪', 'HOKA Membership', '/mypage'],
  ['▰', 'Track a Package', '/mypage/orders'],
  ['●', 'Store Locator', '/support/store'],
  ['☁', 'Customer Service', '/support'],
  ['🇺🇸', 'United States | English', '/'],
] as const;

export function MenuDrawer({ close }: { close: () => void }) {
  return (
    <Drawer.Root open onOpenChange={(open) => !open && close()} swipeDirection="left">
      <Drawer.Portal>
        <Drawer.Backdrop className={backdrop} />
        <Drawer.Viewport className={viewport}>
          <Drawer.Popup aria-label="전체 메뉴" className={drawer}>
            <div className={primaryMenu}>
              <button type="button" className={closeButton} aria-label="메뉴 닫기" onClick={close}>
                ×
              </button>
              <nav aria-label="쇼핑 메뉴">
                <ul className={primaryList}>
                  {primaryItems.map(([label, to]) => (
                    <li key={label}>
                      <Link className={primaryLink} to={to} onClick={close}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <nav className={utilityMenu} aria-label="고객 지원 메뉴">
              <ul className={utilityList}>
                {utilityItems.map(([icon, label, to]) => (
                  <li key={label}>
                    <Link className={utilityLink} to={to} onClick={close}>
                      <span className={utilityIcon} aria-hidden="true">
                        {icon}
                      </span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
