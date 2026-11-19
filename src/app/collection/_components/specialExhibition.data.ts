import { type Product, products } from '@/mocks/products';

export type SpecialExhibitionCategory = {
  id: string;
  title: string;
  products: readonly Product[];
};

// [ 개발팀 바인딩 ] 기획전 카테고리와 상품은 Figma 확인용 고정 fixture입니다. 기획전 통합 소유자가 카테고리 ID·타이틀·대표 이미지와 정렬된 상품 표시 모델을 전달하고, 목록 갱신·실패·재시도 책임을 연결합니다. 현재 앵커 이동과 관심상품/색상 미리보기만 로컬로 동작하며 실제 조회나 저장 요청은 실행하지 않습니다.
export const specialExhibitionCategories: readonly SpecialExhibitionCategory[] = [
  { id: 'trail-running-shoes', title: '트레일 러닝화', products: products.slice(0, 8) },
  { id: 'base-layer', title: '베이스 레이어', products: products.slice(8, 12) },
  { id: 'outer-layer', title: '아우터 레이어', products: products.slice(12, 14) },
  { id: 'mid-layer', title: '미드 레이어', products: products.slice(14, 18) },
  { id: 'pants', title: '팬츠', products: products.slice(18, 22) },
  { id: 'accessories', title: '용품', products: products.slice(22, 26) },
];
