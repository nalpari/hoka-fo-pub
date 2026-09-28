import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { legalLinks } from '@/shared/components/organisms/Layout/SiteFooter/footerData';
import { css } from 'styled-system/css';
import { Divider } from 'styled-system/jsx';

const styles = {
  links: css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    rowGap: '10px',
    columnGap: '16px',
    color: 'rgb(255 255 255 / 75%)',
    fontSize: '11px',
    _mobile: { display: 'grid', gap: '14px', color: '#fff', fontSize: '12px' },
  }),
  internationalLink: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: 'inherit',
    textDecoration: 'none',
    _hover: { textDecoration: 'underline' },
    _mobile: { display: 'none' },
  }),
  flag: css({ w: '18px', h: '12px', objectFit: 'cover' }),
  divider: css({ _mobile: { display: 'none' } }),
};

export function FooterLegalLinks() {
  return (
    <div className={styles.links}>
      {legalLinks.map((item, index) => (
        <Fragment key={item}>
          {index > 0 ? <Divider className={styles.divider} orientation="vertical" h="14px" w="1px" bg="#ffffff" /> : null}
          {item === 'Visit our international sites' ? (
            <Link className={styles.internationalLink} to="/locales">
              <img className={styles.flag} src="/images/flag/us.svg" alt="United States" />
              {item}
            </Link>
          ) : (
            <span>{item}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
