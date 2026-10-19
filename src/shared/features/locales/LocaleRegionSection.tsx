import { Box } from 'styled-system/jsx';
import type { LocaleRegion } from './locales.data';
import { LocaleRegionHeading } from './LocaleRegionHeading';
import { LocaleCountryList } from './LocaleCountryList';

export function LocaleRegionSection({ region }: { region: LocaleRegion }) {
  const headingId = `region-${region.id}`;

  return (
    <Box as="section" mb="11" _mobile={{ mb: '10' }} aria-labelledby={headingId}>
      <LocaleRegionHeading id={headingId} name={region.name} />
      <LocaleCountryList countries={region.countries} />
    </Box>
  );
}
