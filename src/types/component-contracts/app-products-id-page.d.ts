// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type ComponentPropsWithoutRef, type ReactNode, type Ref } from 'react';
import { type Platform } from '@/context/platform';

import { type IconButtonProps } from '@/components/common/atoms/IconButton/IconButton';

import {
  type ProductDetailSpecification,
  type ProductEditorialFeature,
  type ProductTechnicalScaleData,
} from '@/components/product/productDetailPresentation';
import { type Product, type ProductWidthOption } from '@/mocks/products';
import { type CartItem } from '@/types/cart';
declare function ProductDetailGrid({
  children,
}: {
  children: ReactNode;
}): import('react').JSX.Element;
type Props = {
  isViewing: boolean;
  children: ReactNode;
  footer: ReactNode;
};
/** Keep the purchasing grid contained and its footer outside the grid. */
declare function ProductDetailBody({
  isViewing,
  children,
  footer,
}: Props): import('react').JSX.Element;
type ProductDetailLayoutProps = {
  viewer: ReactNode;
  isViewing: boolean;
  children: ReactNode;
  footer: ReactNode;
};
declare function ProductDetailLayout({
  viewer,
  isViewing,
  children,
  footer,
}: ProductDetailLayoutProps): import('react').JSX.Element;
type ProductDetailImageProps = {
  alt: string;
  src: string;
  onClick?: () => void;
};
declare function ProductDetailImage({
  alt,
  src,
  onClick,
}: ProductDetailImageProps): import('react').JSX.Element;
type ProductDetailViewerGalleryProps = {
  images: string[];
  productName: string;
};
declare function ProductDetailViewerGallery({
  images,
  productName,
}: ProductDetailViewerGalleryProps): import('react').JSX.Element;
type ProductDetailImageViewerProps = {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  productName: string;
};
declare function ProductDetailImageViewer({
  images,
  initialIndex,
  onClose,
  productName,
}: ProductDetailImageViewerProps): import('react').JSX.Element;
type ProductDetailGalleryProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
};
/** 상품 이미지를 그리드 또는 캐러셀로 표시합니다. (Displays product images in a grid or carousel.) */
declare function ProductDetailGallery({
  images,
  productName,
  onOpenImage,
}: ProductDetailGalleryProps): import('react').JSX.Element;
type InquiryBoardHeaderProps = {
  headingId: string;
  title: string;
  count: number;
  variant?: 'default' | 'product';
  filterDisabled?: boolean;
  excludePrivate: boolean;
  onExcludePrivateChange: (checked: boolean) => void;
  action?: ReactNode;
};
/** 문의 게시판의 제목·건수·필터 동작을 배치합니다. (Arranges the inquiry board title, count, and filter action.) */
declare function InquiryBoardHeader({
  headingId,
  title,
  count,
  variant,
  filterDisabled,
  excludePrivate,
  onExcludePrivateChange,
  action,
}: InquiryBoardHeaderProps): import('react').JSX.Element;
declare function InquiryBoardContent({
  item,
  variant,
}: {
  item: InquiryBoardEntry;
  variant?: 'default' | 'product';
}): import('react').JSX.Element;
type InquiryMetadata = {
  id: string;
  author: string;
  date: string;
  status: 'pending' | 'answered';
};
/** Restricted entries deliberately carry no private title, body, or answer. */
type InquiryBoardEntry = InquiryMetadata &
  (
    | {
        visibility: 'restricted';
      }
    | {
        visibility: 'public' | 'private';
        title: string;
        content: ReactNode;
        answer?: ReactNode;
      }
  );
type InquiryBoardProps = {
  title: string;
  items: readonly InquiryBoardEntry[];
  action?: ReactNode;
  defaultExpandedIds?: string[];
  className?: string;
  variant?: 'default' | 'product';
  pageSize?: number;
  loadMoreSize?: number;
};
/** Shared inquiry board for product details and account inquiry history. */
declare function InquiryBoard({
  title,
  items,
  action,
  defaultExpandedIds,
  className,
  variant,
  pageSize,
  loadMoreSize,
}: InquiryBoardProps): import('react').JSX.Element;
declare function ProductInquiryLink(): import('react').JSX.Element;
declare function ProductDetailInquiryContent(): import('react').JSX.Element;
type ProductSpecificationHelpProps = {
  label: string;
  description: string;
};
/** Product specification help; Base UI owns hover, focus, dismissal and positioning. */
declare function ProductSpecificationHelp({
  label,
  description,
}: ProductSpecificationHelpProps): import('react').JSX.Element;
type ProductDetailSpecificationListProps = {
  items: readonly ProductDetailSpecification[];
  gap: '4' | '8';
};
declare function ProductDetailSpecificationList({
  items,
  gap,
}: ProductDetailSpecificationListProps): import('react').JSX.Element;
type ProductTechnicalScaleBarProps = Pick<ProductTechnicalScaleData, 'level'>;
declare function ProductTechnicalScaleBar({
  level,
}: ProductTechnicalScaleBarProps): import('react').JSX.Element;
/** Static qualitative scale; it is neither an editable Slider nor a numeric Meter. */
declare function ProductTechnicalScale({
  title,
  labels,
  level,
  help,
}: ProductTechnicalScaleData): import('react').JSX.Element;
type ProductTechSpecsProps = {
  specifications: readonly ProductDetailSpecification[];
  attributes: readonly ProductDetailSpecification[];
  scales: readonly ProductTechnicalScaleData[];
};
declare function ProductTechSpecs({
  specifications,
  attributes,
  scales,
}: ProductTechSpecsProps): import('react').JSX.Element;
declare function ProductDetailEditorial({
  features,
}: {
  features: readonly ProductEditorialFeature[];
}): import('react').JSX.Element;
type ProductDetailAnchor = {
  id: string;
  label: string;
};
type ProductDetailNavigationProps = {
  ref?: Ref<HTMLElement>;
  items: readonly ProductDetailAnchor[];
  activeId?: string;
};
/** The measured native nav keeps its HTMLElement ref contract. */
declare function ProductDetailNavigation({
  ref,
  items,
  activeId,
}: ProductDetailNavigationProps): import('react').JSX.Element;
type ProductDetailScrollSpyProps = {
  items: readonly ProductDetailAnchor[];
  children: ReactNode;
};
declare function ProductDetailScrollSpy({
  items,
  children,
}: ProductDetailScrollSpyProps): import('react').JSX.Element;
/** Shared geometry for the feature's IMC and external review integration slots. */
declare function ProductDetailPlaceholder({
  children,
}: {
  children: ReactNode;
}): import('react').JSX.Element;
type ProductDetailReviewsProps = {
  count: number;
  id: string;
  className?: string;
  children?: ReactNode;
};
/** 상품 리뷰 섹션의 제목·건수와 내용을 구성합니다. (Composes the product review heading, count, and content.) */
declare function ProductDetailReviews({
  count,
  id,
  className,
  children,
}: ProductDetailReviewsProps): import('react').JSX.Element;
type ProductSupportTextLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'href'> & {
  href: string;
};
declare function ProductSupportTextLink({
  href,
  ...props
}: ProductSupportTextLinkProps): import('react').JSX.Element;
declare function ProductDetailDeliverySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): import('react').JSX.Element;
declare function ProductDetailDeliveryList({
  children,
}: {
  children: ReactNode;
}): import('react').JSX.Element;
declare function ProductDetailShippingGuide(): import('react').JSX.Element;
declare function ProductDetailReturnPrecautions(): import('react').JSX.Element;
declare function ProductSupportContact(): import('react').JSX.Element;
type ProductSupportLinkProps = {
  title: string;
  description: string;
  label: string;
  to: string;
};
declare function ProductSupportLink({
  title,
  description,
  label,
  to,
}: ProductSupportLinkProps): import('react').JSX.Element;
declare function ProductDetailDeliverySupport(): import('react').JSX.Element;
declare function ProductDetailReturnGuide(): import('react').JSX.Element;
declare function ProductDetailDeliveryContent(): import('react').JSX.Element;
/** 상품 고시 정보를 이름과 값의 목록으로 표시합니다. (Displays product specifications as a list of labels and values.) */
declare function ProductDetailNoticeTable({
  items,
}: {
  items: readonly ProductDetailSpecification[];
}): import('react').JSX.Element;
/** 상품 고시·배송·관리 안내 섹션을 구성합니다. (Composes product specification, delivery, and care sections.) */
declare function ProductDetailSupportSections({
  specifications,
}: {
  specifications: readonly ProductDetailSpecification[];
}): import('react').JSX.Element;
declare function ProductDetailSections({
  product,
}: {
  product: Product;
}): import('react').JSX.Element;
type ProductDetailMediaProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
  product: Product;
};
declare function ProductDetailMedia({
  images,
  productName,
  onOpenImage,
  product,
}: ProductDetailMediaProps): import('react').JSX.Element;
type ProductColorSelectorProps = {
  colors: string[];
  gallery: string[];
  colorThumbnails?: Product['colorThumbnails'];
  value: string;
  onValueChange: (color: string) => void;
};
/** 상품의 컬러 이미지와 갤러리 대체 이미지를 공통 선택 UI에 전달합니다. (Prepares product color images and gallery fallbacks for the shared selector.) */
declare function ProductColorSelector({
  colors,
  gallery,
  colorThumbnails,
  value,
  onValueChange,
}: ProductColorSelectorProps): import('react').JSX.Element;
type ProductSizeSelectorProps = {
  selectedWidth?: ProductWidthOption;
  value: string;
  error: string;
  onValueChange: (size: string) => void;
};
/** 상품 재고 선택지와 사이즈 가이드·오류 안내를 조합합니다. (Composes product availability, size guidance, and validation feedback.) */
declare function ProductSizeSelector({
  selectedWidth,
  value,
  error,
  onValueChange,
}: ProductSizeSelectorProps): import('react').JSX.Element;
declare function productWidthOptions(product: Product, color: string): ProductWidthOption[];
type ProductVariantSelectorsProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
};
/** 상품별 옵션 데이터와 변경 콜백을 선택 영역에 연결합니다. (Connects product option data and callbacks to the selectors.) */
declare function ProductVariantSelectors({
  product,
  gallery,
  color,
  width,
  size,
  error,
  onColorChange,
  onWidthChange,
  onSizeChange,
}: ProductVariantSelectorsProps): import('react').JSX.Element;
type ProductInformationProps = {
  id?: string;
  title?: string;
  sections: readonly {
    title: string;
    content: ReactNode;
  }[];
  specifications: readonly {
    label: string;
    value: ReactNode;
  }[];
};
/** 상품 설명 섹션과 규격 정보를 의미 있는 목록으로 표시합니다. (Displays product description sections and specifications as a semantic list.) */
declare function ProductInformation({
  id,
  title,
  sections,
  specifications,
}: ProductInformationProps): import('react').JSX.Element;
type ProductPurchaseActionsProps = {
  placement: 'inline' | 'fixed';
  onAddToCart: () => void;
  onOrder: () => void;
};
declare function ProductPurchaseActions({
  placement,
  onAddToCart,
  onOrder,
}: ProductPurchaseActionsProps): import('react').JSX.Element;
type ProductDetailContentProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  selectedOptions: ReactNode;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
  onAddToCart: () => void;
  onOrder: () => void;
};
/** 상품 상세의 선택 정보와 콘텐츠를 배치합니다. (Arranges product detail selections and content.) */
declare function ProductDetailContent({
  product,
  gallery,
  color,
  width,
  size,
  error,
  selectedOptions,
  onColorChange,
  onWidthChange,
  onSizeChange,
  onAddToCart,
  onOrder,
}: ProductDetailContentProps): import('react').JSX.Element;
type ShareButtonProps = Omit<IconButtonProps, 'children'>;
/** Reusable share action with a platform-sized icon. */
declare function ShareButton({
  'aria-label': ariaLabel,
  size,
  ...props
}: ShareButtonProps): import('react').JSX.Element;
type ProductDetailHeaderActionsProps = {
  product: Product;
  wish: boolean;
  onWishChange: () => void;
};
declare function ProductDetailHeaderActions({
  product,
  wish,
  onWishChange,
}: ProductDetailHeaderActionsProps): import('react').JSX.Element;
type ProductDetailHeaderMetaProps = {
  product: Product;
};
/** 상품의 성별과 사용 목적 메타데이터를 표시합니다. (Displays a product's gender and use metadata.) */
declare function ProductDetailHeaderMeta({
  product,
}: ProductDetailHeaderMetaProps): import('react').JSX.Element;
type ProductDetailHeaderTitleProps = {
  product: Product;
};
/** 상품 상세의 상품명과 가격을 표시합니다. (Displays the product name and price on the product detail page.) */
declare function ProductDetailHeaderTitle({
  product,
}: ProductDetailHeaderTitleProps): import('react').JSX.Element;
type ProductDetailHeaderProps = {
  product: Product;
  wish: boolean;
  onWishChange: () => void;
};
declare function ProductDetailHeader({
  product,
  wish,
  onWishChange,
}: ProductDetailHeaderProps): import('react').JSX.Element;
declare function ProductAfterSalesContacts(): import('react').JSX.Element;
declare function ProductAfterSalesProcess(): import('react').JSX.Element;
declare function ProductAfterSalesQuestions(): import('react').JSX.Element;
declare function ProductDetailAfterSalesContent(): import('react').JSX.Element;
declare function ProductDetailSupport(): import('react').JSX.Element;
declare function ProductDetailSupportRegion({
  platform,
}: {
  platform: Platform;
}): import('react').JSX.Element;
type ProductDetailPanelProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  selectedOptions: ReactNode;
  wish: boolean;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
  onAddToCart: () => void;
  onOrder: () => void;
  onWishChange: () => void;
};
/** 상품 상세의 선택 정보와 콘텐츠를 배치합니다. (Arranges product detail selections and content.) */
declare function ProductDetailPanel({
  product,
  gallery,
  color,
  width,
  size,
  error,
  selectedOptions,
  wish,
  onColorChange,
  onWidthChange,
  onSizeChange,
  onAddToCart,
  onOrder,
  onWishChange,
}: ProductDetailPanelProps): import('react').JSX.Element;
type ProductDetailRecommendProps = {
  products: Product[];
  title?: string;
};
declare function ProductDetailRecommend({
  products,
  title,
}: ProductDetailRecommendProps): import('react').JSX.Element;
/** Owns the recommendation regions' leading space, common interval, and platform visibility. */
declare function ProductDetailRecommendations({
  products,
}: {
  products: Product[];
}): import('react').JSX.Element;
type ProductDetailFooterProps = {
  recommendations: Product[];
  onAddToCart: () => void;
  onOrder: () => void;
};
/** Composes recommendations and the mobile fixed purchase controls without extra DOM. */
declare function ProductDetailFooter({
  recommendations,
  onAddToCart,
  onOrder,
}: ProductDetailFooterProps): import('react').JSX.Element;
type ProductSelectedOptionsProps = {
  items: readonly CartItem[];
  unitPrice: number;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
};
/** 선택한 상품 옵션별 수량과 삭제 버튼 및 합계를 표시합니다. (Displays quantity, removal, and totals for selected product options.) */
declare function ProductSelectedOptions({
  items,
  unitPrice,
  onQuantityChange,
  onRemove,
}: ProductSelectedOptionsProps): import('react').JSX.Element | null;
/** 상품 옵션 누적 선택과 구매 및 상세 보기를 관리합니다. (Manages accumulated product selections, purchase actions, and detail viewing.) */
export default function Page(): import('react').JSX.Element;
export {
  ProductDetailGrid,
  ProductDetailBody,
  ProductDetailLayout,
  ProductDetailImage,
  ProductDetailViewerGallery,
  ProductDetailImageViewer,
  ProductDetailGallery,
  InquiryBoardHeader,
  InquiryBoardContent,
  InquiryBoard,
  type InquiryBoardEntry,
  type InquiryBoardProps,
  ProductInquiryLink,
  ProductDetailInquiryContent,
  ProductSpecificationHelp,
  ProductDetailSpecificationList,
  ProductTechnicalScaleBar,
  ProductTechnicalScale,
  ProductTechSpecs,
  ProductDetailEditorial,
  ProductDetailNavigation,
  type ProductDetailAnchor,
  ProductDetailScrollSpy,
  ProductDetailPlaceholder,
  ProductDetailReviews,
  ProductSupportTextLink,
  ProductDetailDeliverySection,
  ProductDetailDeliveryList,
  ProductDetailShippingGuide,
  ProductDetailReturnPrecautions,
  ProductSupportContact,
  ProductSupportLink,
  ProductDetailDeliverySupport,
  ProductDetailReturnGuide,
  ProductDetailDeliveryContent,
  ProductDetailNoticeTable,
  ProductDetailSupportSections,
  ProductDetailSections,
  ProductDetailMedia,
  ProductColorSelector,
  ProductSizeSelector,
  productWidthOptions,
  ProductVariantSelectors,
  ProductInformation,
  type ProductInformationProps,
  ProductPurchaseActions,
  ProductDetailContent,
  ShareButton,
  type ShareButtonProps,
  ProductDetailHeaderActions,
  ProductDetailHeaderMeta,
  ProductDetailHeaderTitle,
  ProductDetailHeader,
  ProductAfterSalesContacts,
  ProductAfterSalesProcess,
  ProductAfterSalesQuestions,
  ProductDetailAfterSalesContent,
  ProductDetailSupport,
  ProductDetailSupportRegion,
  ProductDetailPanel,
  ProductDetailRecommend,
  ProductDetailRecommendations,
  ProductDetailFooter,
  ProductSelectedOptions,
  type ProductSelectedOptionsProps,
};
