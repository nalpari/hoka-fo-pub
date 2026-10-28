// Type-only contracts for moved local components; never import these declarations as runtime values.
type CouponRegistrationSectionProps = {
  code: string;
  error: string;
  onCodeChange: (code: string) => void;
  onRegister: () => void;
};
declare function CouponRegistrationSection({
  code,
  error,
  onCodeChange,
  onRegister,
}: CouponRegistrationSectionProps): import('react').JSX.Element;
type CouponItem = {
  id: string;
  name: string;
  benefit: string;
  condition: string;
  expiresAt: string;
  category: '상품 할인' | '배송 할인';
};
type CouponCardProps = {
  coupon: CouponItem;
  onDetails: (coupon: CouponItem) => void;
};
declare function CouponCard({ coupon, onDetails }: CouponCardProps): import('react').JSX.Element;
type CouponHistorySectionProps = {
  coupons: CouponItem[];
  onDetails: (coupon: CouponItem) => void;
};
declare function CouponHistorySection({
  coupons,
  onDetails,
}: CouponHistorySectionProps): import('react').JSX.Element;
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
declare function CouponRegistrationDialog({
  open,
  onOpenChange,
}: Props): import('react').JSX.Element;
type CouponDetailsDialogProps = {
  coupon: CouponItem | null;
  onOpenChange: (open: boolean) => void;
};
declare function CouponDetailsDialog({
  coupon,
  onOpenChange,
}: CouponDetailsDialogProps): import('react').JSX.Element;
declare function EmployeeCoupons(): import('react').JSX.Element;
type CouponManagerProps = {
  coupons: CouponItem[];
};
declare function CouponManager({ coupons }: CouponManagerProps): import('react').JSX.Element;
/** 보유 쿠폰과 쿠폰 등록 예시 상태를 관리합니다. (Manages owned coupons and the example coupon registration state.) */
export default function Page(): import('react').JSX.Element;
export {
  CouponRegistrationSection,
  CouponCard,
  type CouponItem,
  CouponHistorySection,
  CouponRegistrationDialog,
  CouponDetailsDialog,
  EmployeeCoupons,
  CouponManager,
};
