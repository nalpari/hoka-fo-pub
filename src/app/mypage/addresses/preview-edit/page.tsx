import { AddressStatePreview } from '@/app/mypage/addresses/_components/AddressStatePreview';

/** 고정 상태의 퍼블리싱 마크업을 직접 표시합니다. (Displays fixed publishing state markup directly.) */
export default function Page() {
  return <AddressStatePreview state="edit" />;
}
