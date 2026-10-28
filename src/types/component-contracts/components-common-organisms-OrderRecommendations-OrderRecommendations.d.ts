// Type-only contracts for moved local components; never import these declarations as runtime values.
type OrderRecommendation = {
  id: string;
  gender?: string;
  name: string;
  price: number;
  imageSrc: string;
  href: string;
};
type OrderRecommendationLayout = 'compact' | 'portrait';
type Props = {
  item: OrderRecommendation;
  layout?: OrderRecommendationLayout;
};
/** 추천 상품의 이미지와 상품명·가격을 연결합니다. (Links an order recommendation with its image and price.) */
declare function OrderRecommendationItem({ item, layout }: Props): import('react').JSX.Element;
export type OrderRecommendationsProps = {
  items: readonly OrderRecommendation[];
  title?: string;
  layout?: OrderRecommendationLayout;
};
/** 함께 구매할 상품을 가로 스크롤 목록으로 표시합니다. (Displays horizontally scrollable order recommendations.) */
export declare function OrderRecommendations({
  items,
  title,
  layout,
}: OrderRecommendationsProps): import('react').JSX.Element;
export { OrderRecommendationItem, type OrderRecommendation, type OrderRecommendationLayout };
