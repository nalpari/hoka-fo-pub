import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';

const drawer = css({
  position: 'fixed',
  inset: '0',
  zIndex: '100',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  bg: '#fff',
  color: '#000',
});

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
  color: '#000',
  fontSize: '30px',
  fontWeight: '400',
  lineHeight: '1',
  cursor: 'pointer',
  _focusVisible: { outline: '2px solid #000', outlineOffset: '2px' },
});

const primaryList = css({ display: 'grid', gap: '18px', m: '0', p: '0', listStyle: 'none' });

const primaryLink = css({
  display: 'inline-flex',
  color: '#000',
  fontSize: '24px',
  fontWeight: '800',
  lineHeight: '1.2',
  letterSpacing: '-0.055em',
  textDecoration: 'none',
  _focusVisible: { outline: '2px solid #000', outlineOffset: '3px' },
});

const utilityMenu = css({
  display: 'grid',
  gap: '4',
  flexShrink: '0',
  minH: '222px',
  px: '4',
  py: '46px',
  bg: '#000',
  color: '#fff',
});

const utilityList = css({ display: 'grid', gap: '4', m: '0', p: '0', listStyle: 'none' });

const utilityLink = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '700',
  lineHeight: '1.2',
  letterSpacing: '-0.035em',
  textDecoration: 'none',
  _focusVisible: { outline: '2px solid #fff', outlineOffset: '3px' },
});

const utilityIcon = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '4',
  flexShrink: '0',
  color: '#fff',
  fontSize: '16px',
  lineHeight: '1',
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
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <section className={drawer} role="dialog" aria-label="전체 메뉴" aria-modal="true">
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
    </section>
  );
}
