import { type Promotions } from '@/components/common/atoms/Badge/PromotionBadge';

// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type ProductCardVariant } from '@/components/common/molecules/ProductCard/productCardTypography';
import { type ProductOptionThumbnail } from '@/components/common/molecules/ProductOptionList/ProductOptionList';
import { type ProductThumbnailVariant } from '@/components/common/molecules/ProductThumbnail/ProductThumbnail';

import { type Platform } from '@/lib/device';
import { type Product } from '@/mocks/products';
type ProductGenderOption = "Men's" | "Women's" | 'All Gender';
type ProductGenderProps = {
  gender: ProductGenderOption;
  variant?: ProductCardVariant;
};
/** 상품 성별 정보를 표시합니다. (Displays a product's gender label.) */
declare function ProductGender({
  gender,
  variant,
}: ProductGenderProps): import('react').JSX.Element;
type ProductNameProps = {
  name: string;
  variant?: ProductCardVariant;
};
/** Product name styled for its card presentation context. */
declare function ProductName({ name, variant }: ProductNameProps): import('react').JSX.Element;
type ProductPriceProps = {
  /** Current selling price, including any discount. */
  price: number;
  /** Original price; discount details appear only when this exceeds price. */
  originalPrice?: number;
  variant?: ProductCardVariant;
};
/** 판매가와 선택적 정상가·할인율을 표시합니다. (Displays the selling price with an optional original price and discount rate.) */
declare function ProductPrice({
  price,
  originalPrice,
  variant,
}: ProductPriceProps): import('react').JSX.Element;
type Props = Pick<
  ProductDetailsProps,
  'promotion' | 'gender' | 'name' | 'price' | 'originalPrice' | 'variant'
>;
declare function ProductDetailsIdentity({
  promotion,
  gender,
  name,
  price,
  originalPrice,
  variant,
}: Props): import('react').JSX.Element;
type ProductActivityProps = {
  activities: readonly string[];
};
/** 상품의 활동 목적을 쉼표로 구분해 표시합니다. (Displays a product's activity labels as a comma-separated list.) */
declare function ProductActivity({ activities }: ProductActivityProps): import('react').JSX.Element;
type ProductVariantSummaryDisplay = 'colors' | 'widths' | 'colors-widths';
type ProductVariantSummaryProps = {
  colorCount: number;
  display?: ProductVariantSummaryDisplay;
  options: readonly ProductOptionThumbnail[];
  platform: Platform;
  widthCount: number;
};
/** Product color and width option summary: text on web, swatches on mobile. */
declare function ProductVariantSummary({
  colorCount,
  display,
  options,
  platform,
  widthCount,
}: ProductVariantSummaryProps): import('react').JSX.Element;
type ProductDetailsOptionsProps = Pick<
  ProductDetailsProps,
  'activities' | 'colorCount' | 'optionThumbnails' | 'platform' | 'widthCount' | 'variant'
>;
declare function ProductDetailsOptions({
  activities,
  colorCount,
  optionThumbnails,
  platform,
  widthCount,
  variant,
}: ProductDetailsOptionsProps): import('react').JSX.Element;
type ProductDetailsProps = {
  activities?: readonly string[];
  colorCount: number;
  gender?: ProductGenderOption;
  name: string;
  optionThumbnails: readonly ProductOptionThumbnail[];
  platform: Platform;
  price: number;
  originalPrice?: number;
  promotion?: Promotions;
  showVariantSummary?: boolean;
  variant: ProductCardVariant;
  widthCount: number;
};
/** 상품 카드의 이름·성별·가격 요약을 구성합니다. (Composes product name, gender, and price details for a product card.) */
declare function ProductDetails({
  activities,
  colorCount,
  gender,
  name,
  optionThumbnails,
  platform,
  price,
  originalPrice,
  promotion,
  showVariantSummary,
  variant,
  widthCount,
}: ProductDetailsProps): import('react').JSX.Element;
declare function ProductCardPreview({ product }: { product: Product }): import('react').JSX.Element;
type ProductSpecProps = {
  cushioning: string;
  stability: string;
  width: string;
};
/** 상품의 쿠셔닝·안정성·발볼 정보를 요약합니다. (Summarizes a product's cushioning, stability, and width.) */
declare function ProductSpec({
  cushioning,
  stability,
  width,
}: ProductSpecProps): import('react').JSX.Element;
type ProductCardFooterProps = {
  product: Product;
  showSpecifications: boolean;
};
declare function ProductCardFooter({
  product,
  showSpecifications,
}: ProductCardFooterProps): import('react').JSX.Element | null;
type ProductCardHeaderProps = {
  product: Product;
  variant: ProductThumbnailVariant;
};
declare function ProductCardHeader({
  product,
  variant,
}: ProductCardHeaderProps): import('react').JSX.Element;
export type ProductCardOption = 'promotion' | 'like' | 'colors' | 'specifications';
export type ProductCardProps = {
  liked?: boolean;
  onLikedChange?: (liked: boolean) => void;
  options?: readonly ProductCardOption[];
  product: Product;
  variant?: ProductCardVariant;
};
export declare function ProductCard({
  liked,
  onLikedChange,
  options,
  product,
  variant,
}: ProductCardProps): import('react').JSX.Element;
export {
  ProductGender,
  type ProductGenderOption,
  type ProductGenderProps,
  ProductName,
  type ProductNameProps,
  ProductPrice,
  type ProductPriceProps,
  ProductDetailsIdentity,
  ProductActivity,
  type ProductActivityProps,
  ProductVariantSummary,
  type ProductVariantSummaryDisplay,
  type ProductVariantSummaryProps,
  ProductDetailsOptions,
  ProductDetails,
  type ProductDetailsProps,
  ProductCardPreview,
  ProductSpec,
  type ProductSpecProps,
  ProductCardFooter,
  type ProductCardFooterProps,
  ProductCardHeader,
  type ProductCardHeaderProps,
};
