'use client';

import { localeRegions } from '@/components/features/locales/locales.data';
import { LocalesLayout } from '@/components/features/locales/LocalesLayout';
import { LocaleRegionSection } from '@/components/features/locales/LocaleRegionSection';

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
