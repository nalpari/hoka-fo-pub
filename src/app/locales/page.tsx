'use client';

/**
 * [개발팀 바인딩]
 * localeRegions의 id/name/countries(code/label/href)가 운영 국가 사이트 목록입니다. 국가 코드에 맞는 국기 자산과 목적지 URL을 함께 전달합니다.
 * 현재 국가 선택은 외부 사이트 이동입니다. 배송 국가 확정/세션 저장이 필요하면 링크 클릭 소유자에서 실제 서비스 처리와 결과를 연결해야 합니다.
 */

import { localeRegions } from '@/app/locales/locales.data';

import { LocaleRegionSection, LocalesLayout } from './_components/LocalesContent';

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
