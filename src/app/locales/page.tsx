'use client';

import { type ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box, Flex } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { type LocaleRegion, localeRegions } from '@/components/locales/locales.data';

const globe = css({ w: '7', h: '7', flexShrink: 0 });

/** 국가 선택 화면의 제목과 지구본 아이콘을 표시합니다. (Displays the locale selection heading and globe icon.) */
function LocalesHeading() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      gap="3"
      minH="92px"
      bg="var(--color-black-10)"
      _mobile={{ minH: '15' }}
    >
      <svg
        className={globe}
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.7 2.5 4.1 5.5 4.1 9S14.7 18.5 12 21c-2.7-2.5-4.1-5.5-4.1-9S9.3 5.5 12 3" />
      </svg>
      <Typography as="h1" web="body2" mo="body3" weight="bold">
        Choose your shipping country
      </Typography>
    </Flex>
  );
}

function LocalesLayout({ children }: { children: ReactNode }) {
  return (
    <Box as="main">
      <LocalesHeading />
      <Box
        maxW="1200px"
        mx="auto"
        px="10"
        pt="13"
        pb="18"
        _mobile={{ px: 'var(--layout-mobile-inline-gutter)', pt: '11', pb: '12' }}
      >
        {children}
      </Box>
    </Box>
  );
}

type Props = { id: string; name: string };

const heading = css({
  mb: '5',
  _mobile: { mb: '18px' },
});

function LocaleRegionHeading({ id, name }: Props) {
  return (
    <Typography as="h2" variant="heading8" className={heading} id={id}>
      {name}
    </Typography>
  );
}

type LocaleCountryListProps = { countries: LocaleRegion['countries'] };

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

function LocaleCountryList({ countries }: LocaleCountryListProps) {
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

function LocaleRegionSection({ region }: { region: LocaleRegion }) {
  const headingId = `region-${region.id}`;

  return (
    <Box as="section" mb="11" _mobile={{ mb: '10' }} aria-labelledby={headingId}>
      <LocaleRegionHeading id={headingId} name={region.name} />
      <LocaleCountryList countries={region.countries} />
    </Box>
  );
}

/** 국가별 사이트 선택 화면을 표시합니다. (Displays the country site selection screen.) */
export default function Page() {
  return (
    <LocalesLayout>
      {localeRegions.map((region) => (
        <LocaleRegionSection key={region.id} region={region} />
      ))}
    </LocalesLayout>
  );
}
