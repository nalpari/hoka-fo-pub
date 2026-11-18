import type { StoreResult } from '@/types/component-contracts/app-support-store-page';

/**
 * [ 개발팀 바인딩 ] 현재 매장 목록은 시안 확인용 fixture이며 최종 매장 정보가 아닙니다.
 * 통합 담당자는 이 데이터 소유자에서 준비된 stores를 교체합니다.
 * 사용자 요청으로 지역 탭은 표시하지 않으며 API·지도·길 찾기·요청 상태는 미연결입니다.
 * 모바일 전화 링크는 각 매장의 phoneHref를 사용합니다.
 */
export const stores: readonly StoreResult[] = [
  {
    name: '신세계백화점 강남점',
    address: '서울 강남구 영동대로 513 스타필드 코엑스몰 B1 K102호',
    phone: '02-0000-0000',
    phoneHref: 'tel:0200000000',
    hours: '매일 09:00 - 20:00',
  },
  {
    name: '성수 플래그십 스토어 (오픈예정)',
    address: '서울특별시 성동구 연무장로 00 1층',
    phone: '02-0000-0000',
    phoneHref: 'tel:0200000000',
    hours: '매일 09:00 - 20:00',
  },
  {
    name: '성수 플래그십 스토어',
    address: '서울특별시 성동구 연무장로 00 1층',
    phone: '02-6002-1002',
    phoneHref: 'tel:0260021002',
    hours: '매일 09:00 - 20:00',
  },
];
