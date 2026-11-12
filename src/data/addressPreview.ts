import type { Address } from '@/types/mypage-address.types';

export const initialAddresses: Address[] = [
  {
    id: 1,
    recipient: '홍길동',
    name: '우리집',
    phone: '010-8005-6605',
    alternatePhone: '',
    zip: '02157',
    address: '서울시 성북구 테헤란로 27길 54',
    detail: '테헤란 아파트 701호',
    isDefault: true,
  },
  {
    id: 2,
    recipient: '홍길동',
    name: '직장',
    phone: '010-8005-6605',
    alternatePhone: '',
    zip: '02157',
    address: '서울시 성북구 테헤란로 27길 54',
    detail: '테헤란 아파트 701호',
    isDefault: false,
  },
];
