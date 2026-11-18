// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type IconAssetName } from '@/components/common/atoms/Icon';
type LogoutDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};
declare function LogoutDialog({
  open,
  onOpenChange,
  onConfirm,
}: LogoutDialogProps): import('react').JSX.Element;
declare function MyPageMembership(): import('react').JSX.Element;
type MyPageBenefitItemProps = {
  href: string;
  label: string;
  count: number;
  unit: string;
  icon: IconAssetName;
};
declare function MyPageBenefitItem({
  href,
  label,
  count,
  unit,
  icon,
}: MyPageBenefitItemProps): import('react').JSX.Element;
declare function MyPageBenefits(): import('react').JSX.Element;
declare function MyPageOverviewProfile(): import('react').JSX.Element;
type MyPageMenuItemProps = {
  label: string;
  to: string;
};
declare function MyPageMenuItem({ label, to }: MyPageMenuItemProps): import('react').JSX.Element;
declare function MyPageMenuSection({
  title,
  items,
}: {
  title: string;
  items: MyPageMenuItemProps[];
}): import('react').JSX.Element;
/** 마이페이지 요약과 메뉴를 구성하고 로그아웃을 연결합니다. (Composes the account overview and menus and connects logout.) */
export default function Page(): import('react').JSX.Element;
export {
  LogoutDialog,
  type LogoutDialogProps,
  MyPageMembership,
  MyPageBenefitItem,
  MyPageBenefits,
  MyPageOverviewProfile,
  MyPageMenuItem,
  type MyPageMenuItemProps,
  MyPageMenuSection,
};
