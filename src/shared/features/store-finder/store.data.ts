export type StoreType = '전체' | '백화점/쇼핑몰' | '상설 매장' | '키즈 매장' | '직영/대리점';
export type Store = { name: string; address: string; type: StoreType; phone: string };
export const storeTypes: StoreType[] = [
  '전체',
  '백화점/쇼핑몰',
  '상설 매장',
  '키즈 매장',
  '직영/대리점',
];
export const regions = ['전체', '서울', '경기', '충청', '전라'];
export const stores: Store[] = [
  {
    name: '금촌',
    address: '경기도 파주시 금촌동 595 호카',
    type: '직영/대리점',
    phone: '031-949-5220',
  },
  {
    name: '현대신촌',
    address: '서울특별시 서대문구 신촌로 83 현대백화점 신촌점 유플렉스 9층',
    type: '백화점/쇼핑몰',
    phone: '02-3145-1566',
  },
  {
    name: '롯데잠실',
    address: '서울특별시 송파구 올림픽로 240 롯데백화점 잠실점 7층',
    type: '백화점/쇼핑몰',
    phone: '02-2143-7580',
  },
  {
    name: '충주',
    address: '충청북도 충주시 성서동 368 호카',
    type: '직영/대리점',
    phone: '070-7792-4152',
  },
  {
    name: '대학로',
    address: '서울특별시 종로구 명륜4가 19-1 호카',
    type: '직영/대리점',
    phone: '02-762-9292',
  },
  {
    name: '신세계천안아산',
    address: '충청남도 천안시 동남구 만남로 43 신세계백화점 천안아산점',
    type: '백화점/쇼핑몰',
    phone: '041-640-5389',
  },
  {
    name: '현대목동',
    address: '서울특별시 양천구 목동동로 257 현대백화점 목동점',
    type: '백화점/쇼핑몰',
    phone: '02-2163-3580',
  },
  {
    name: '롯데전주',
    address: '전라북도 전주시 완산구 온고을로 2 롯데백화점 전주점',
    type: '백화점/쇼핑몰',
    phone: '063-289-3454',
  },
];
