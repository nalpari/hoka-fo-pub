import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { LocaleRegion } from '@/shared/features/locales/locales.data';

const styles = {
  region: css({ mb: '11', _mobile: { mb: '10' } }),
  regionTitle: css({
    mb: '5',
    _mobile: { mb: '18px' },
  }),
  countryGrid: css({
    columnCount: 4,
    columnGap: '12',
    _mobile: { columnCount: 2, columnGap: '6' },
  }),
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

export function LocaleRegionSection({ region }: { region: LocaleRegion }) {
  return (
    <section className={styles.region} aria-labelledby={`region-${region.id}`}>
      <Typography
        as="h2"
        variant="heading8"
        className={styles.regionTitle}
        id={`region-${region.id}`}
      >
        {region.name}
      </Typography>
      <div className={styles.countryGrid}>
        {region.countries.map((country) => (
          <a
            className={styles.country}
            href={country.href}
            key={`${country.label}-${country.href}`}
          >
            <img className={styles.flag} src={`/images/flag/${country.code}.svg`} alt="" />
            <Typography variant="body3" tone="primary">
              {country.label}
            </Typography>
          </a>
        ))}
      </div>
    </section>
  );
}
