import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { LocaleRegion } from './locales.data';

type Props = { countries: LocaleRegion['countries'] };

const styles = {
  country: css({
    display: 'flex',
    alignItems: 'center',
    gap: '2.5',
    minW: 0,
    mb: '3.5',
    breakInside: 'avoid',
    textDecoration: 'none',
    _hover: { textDecoration: 'underline' },
    _mobile: { gap: '9px', mb: '3' },
  }),
  flag: css({
    flexShrink: 0,
    w: '23px',
    h: '18px',
    border: '1px solid var(--color-border-tertiary)',
    objectFit: 'cover',
  }),
};

export function LocaleCountryList({ countries }: Props) {
  return (
    <Box columnCount={4} columnGap="12" _mobile={{ columnCount: 2, columnGap: '6' }}>
      {countries.map((country) => (
        <a className={styles.country} href={country.href} key={`${country.label}-${country.href}`}>
          <img className={styles.flag} src={`/images/flag/${country.code}.svg`} alt="" />
          <Typography variant="body3" tone="primary">
            {country.label}
          </Typography>
        </a>
      ))}
    </Box>
  );
}
