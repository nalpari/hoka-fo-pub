import type { StoreResult } from '@/components/common/organisms/StoreFinder/StoreResults';

export type StoreCity = '서울' | '인천' | '경기';

export const storeCities: StoreCity[] = ['서울', '인천', '경기'];

export const storesByCity: Record<StoreCity, StoreResult[]> = {
  서울: [
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
  ],
  인천: [],
  경기: [
    {
      name: '금촌',
      address: '경기도 파주시 금촌동 595 호카',
      phone: '031-949-5220',
    },
  ],
};
