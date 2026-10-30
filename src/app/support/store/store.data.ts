import type { StoreResult } from '@/types/component-contracts/app-support-store-page';

/**
 * [ 개발팀 바인딩 ] 현재 매장 목록은 미확정 퍼블리싱 fixture이며 최종 매장 데이터가 아닙니다.
 * 매장명·주소·전화번호·제공된 영업시간을 표시하고, 확정 목록은 이 데이터 소유자에서 교체합니다.
 * 지도 API·길 찾기·조회 요청은 연결하지 않습니다. 누락된 영업시간은 표시하지 않습니다.
 */
export const stores: readonly StoreResult[] = [
  {
    name: '신세계백화점 강남점',
    address: '서울 강남구 영동대로 513 스타필드 코엑스몰 B1 K102호',
    phone: '02-6002-1002',
    hours: '매일 10:00 - 22:00',
  },
  {
    name: '스타필드 코엑스점',
    address: '서울 강남구 영동대로 513 스타필드 코엑스몰 B1 K102호',
    phone: '02-6002-1002',
    hours: '매일 10:00 - 22:00',
  },
  {
    name: '영등포 타임스퀘어점',
    address: '서울 영등포구 영중로 15 타임스퀘어 2층',
    phone: '02-6002-1002',
    hours: '매일 10:00 - 22:00',
  },
  {
    name: '금촌',
    address: '경기도 파주시 금촌동 595 호카',
    phone: '031-949-5220',
  },
];
