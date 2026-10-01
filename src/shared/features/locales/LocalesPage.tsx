import { css } from 'styled-system/css';

type Country = { code: string; label: string; href: string };

type Region = { name: string; countries: Country[] };

const regions: Region[] = [
  {
    name: 'Africa',
    countries: [
      ['dz', 'Algeria', 'https://www.hoka.com/en/dz/'],
      ['ma', 'Morocco', 'https://www.hoka.com/en/ma/'],
      ['re', 'Réunion', 'https://www.hoka.com/en/re/'],
      ['za', 'South Africa', 'https://www.hoka.com/en/za/'],
      ['tn', 'Tunisia', 'https://www.hoka.com/en/tn/'],
    ].map(([code, label, href]) => ({ code, label, href })),
  },
  {
    name: 'Asia Pacific',
    countries: [
      ['au', 'Australia', 'https://au.hoka.com/'],
      ['id', 'Indonesia', 'https://www.hoka.com/en/id/'],
      ['nz', 'New Zealand', 'https://nz.hoka.com/'],
      ['ph', 'Philippines', 'https://www.hoka.com/en/ph/'],
      ['cn', '中国', 'https://www.hokaoneone.cn/'],
      ['jp', '日本', 'https://www.hoka.com/jp/'],
    ].map(([code, label, href]) => ({ code, label, href })),
  },
  {
    name: 'Europe',
    countries: [
      ['al', 'Albania', 'https://www.hoka.com/en/al/'],
      ['ad', 'Andorra', 'https://www.hoka.com/en/ad/'],
      ['be', 'België (Nederlands)', 'https://www.hoka.com/nl/be/'],
      ['be', 'Belgique (Français)', 'https://www.hoka.com/nl/be/'],
      ['ba', 'Bosnia & Herzegovina', 'https://www.hoka.com/en/ba/'],
      ['bg', 'Bulgaria', 'https://www.hoka.com/en/bg/'],
      ['hr', 'Croatia', 'https://www.hoka.com/en/hr/'],
      ['cy', 'Cyprus', 'https://www.hoka.com/en/cy/'],
      ['cz', 'Czechia', 'https://www.hoka.com/en/cz/'],
      ['dk', 'Denmark', 'https://www.hoka.com/en/dk/'],
      ['de', 'Deutschland', 'https://www.hoka.com/de/de/'],
      ['es', 'España (Español)', 'https://www.hoka.com/es/es/'],
      ['ee', 'Estonia', 'https://www.hoka.com/en/ee/'],
      ['fi', 'Finland', 'https://www.hoka.com/en/fi/'],
      ['fr', 'France', 'https://www.hoka.com/fr/fr/'],
      ['gr', 'Greece', 'https://www.hoka.com/en/gr/'],
      ['hu', 'Hungary', 'https://www.hoka.com/en/hu/'],
      ['is', 'Iceland', 'https://www.hoka.com/en/is/'],
      ['ie', 'Ireland', 'https://www.hoka.com/en/ie/'],
      ['it', 'Italia (Italiano)', 'https://www.hoka.com/it/it/'],
      ['it', 'Italy (English)', 'https://www.hoka.com/it/it/'],
      ['je', 'Jersey', 'https://www.hoka.com/en/je/'],
      ['kz', 'Kazakhstan', 'https://www.hoka.com/en/kz/'],
      ['lv', 'Latvia', 'https://www.hoka.com/en/lv/'],
      ['lt', 'Lithuania', 'https://www.hoka.com/en/lt/'],
      ['lu', 'Luxembourg', 'https://www.hoka.com/en/lu/'],
      ['mt', 'Malta', 'https://www.hoka.com/en/mt/'],
      ['md', 'Moldova', 'https://www.hoka.com/en/md/'],
      ['mc', 'Monaco', 'https://www.hoka.com/en/mc/'],
      ['me', 'Montenegro', 'https://www.hoka.com/en/me/'],
      ['nl', 'Nederland (Nederlands)', 'https://www.hoka.com/nl/nl/'],
      ['nl', 'Netherlands (English)', 'https://www.hoka.com/nl/nl/'],
      ['mk', 'North Macedonia', 'https://www.hoka.com/en/mk/'],
      ['no', 'Norway', 'https://www.hoka.com/en/no/'],
      ['at', 'Österreich', 'https://www.hoka.com/de/at/'],
      ['pl', 'Poland', 'https://www.hoka.com/en/pl/'],
      ['pt', 'Portugal', 'https://www.hoka.com/en/pt/'],
      ['ro', 'Romania', 'https://www.hoka.com/en/ro/'],
      ['rs', 'Serbia', 'https://www.hoka.com/en/rs/'],
      ['sk', 'Slovakia', 'https://www.hoka.com/en/sk/'],
      ['si', 'Slovenia', 'https://www.hoka.com/en/si/'],
      ['es', 'Spain (English)', 'https://www.hoka.com/es/es/'],
      ['se', 'Sweden', 'https://www.hoka.com/en/se/'],
      ['ch', 'Switzerland', 'https://www.hoka.com/en/ch/'],
      ['gb', 'United Kingdom', 'https://www.hoka.com/en/gb/'],
    ].map(([code, label, href]) => ({ code, label, href })),
  },
  {
    name: 'Middle East',
    countries: [
      ['il', 'Israel', 'https://www.hoka.com/en/il/'],
      ['tr', 'Türkiye', 'https://www.hoka.com/en/tr/'],
      ['ae', 'United Arab Emirates', 'https://www.hoka.com/en/ae/'],
    ].map(([code, label, href]) => ({ code, label, href })),
  },
  {
    name: 'North America',
    countries: [
      ['ca', 'Canada (English)', 'https://www.hoka.com/en/ca/'],
      ['ca', 'Canada (Français)', 'https://www.hoka.com/fr/ca/'],
      ['us', 'United States', 'https://www.hoka.com/en/us/'],
    ].map(([code, label, href]) => ({ code, label, href })),
  },
  {
    name: 'South America',
    countries: [
      ['br', 'Brasil', 'https://www.hokabrasil.com.br/'],
      ['cl', 'Chile', 'https://cl.hoka.com/'],
    ].map(([code, label, href]) => ({ code, label, href })),
  },
];

const styles = {
  heading: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3',
    minH: '92px',
    bg: '#f7f7f9',
    fontSize: '20px',
    fontWeight: 700,
    '& h1': { fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 1.2 },
    _mobile: { minH: '15', fontSize: '18px' },
  }),
  globe: css({ w: '7', h: '7', flexShrink: 0 }),
  content: css({
    maxW: '1200px',
    mx: 'auto',
    px: '10',
    pt: '13',
    pb: '18',
    _mobile: { px: 'var(--layout-mobile-inline-gutter)', pt: '11', pb: '12' },
  }),
  region: css({ mb: '11', _mobile: { mb: '10' } }),
  regionTitle: css({
    mb: '5',
    fontSize: '22px',
    fontWeight: 700,
    _mobile: { mb: '18px', fontSize: '19px' },
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
    color: '#000',
    fontSize: '16px',
    fontWeight: 500,
    textDecoration: 'none',
    _hover: { textDecoration: 'underline' },
    _mobile: { gap: '9px', mb: '3', fontSize: '16px' },
  }),
  flag: css({
    flexShrink: 0,
    w: '23px',
    h: '18px',
    border: '1px solid #a4a4a4',
    objectFit: 'cover',
  }),
};

export function LocalesPage() {
  return (
    <main>
      <div className={styles.heading}>
        <svg
          className={styles.globe}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.7 2.5 4.1 5.5 4.1 9S14.7 18.5 12 21c-2.7-2.5-4.1-5.5-4.1-9S9.3 5.5 12 3" />
        </svg>
        <h1>Choose your shipping country</h1>
      </div>
      <div className={styles.content}>
        {regions.map((region) => (
          <section
            className={styles.region}
            key={region.name}
            aria-labelledby={`region-${region.name}`}
          >
            <h2 className={styles.regionTitle} id={`region-${region.name}`}>
              {region.name}
            </h2>
            <div className={styles.countryGrid}>
              {region.countries.map((country) => (
                <a
                  className={styles.country}
                  href={country.href}
                  key={`${country.label}-${country.href}`}
                >
                  <img className={styles.flag} src={`/images/flag/${country.code}.svg`} alt="" />
                  <span>{country.label}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
