import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  link: css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    _hover: { textDecoration: 'underline' },
  }),
  flag: css({
    display: 'block',
    w: '16px',
    h: '12px',
    flexShrink: 0,
  }),
  arrow: css({
    h: '12px',
    pos: 'relative',
    top: '1px',
  }),
};

export function FooterLocaleSelectors() {
  return (
    <Link to="/locales" className={styles.link}>
      <img className={styles.flag} src="/images/flag/kr.svg" alt="대한민국" />
      <HStack gap="0">
        <Typography variant="body5" tone="inverse">
          Visit our international sites
        </Typography>
        <img className={styles.arrow} src="/images/icon/chevron-right.svg" alt="" />
      </HStack>
    </Link>
  );
}
