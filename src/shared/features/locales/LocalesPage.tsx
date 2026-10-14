import { localeRegions } from '@/shared/features/locales/locales.data';
import { LocalesLayout } from '@/shared/features/locales/LocalesLayout';
import { LocaleRegionSection } from '@/shared/features/locales/LocaleRegionSection';

export function LocalesPage() {
  return (
    <LocalesLayout>
      {localeRegions.map((region) => (
        <LocaleRegionSection key={region.id} region={region} />
      ))}
    </LocalesLayout>
  );
}
