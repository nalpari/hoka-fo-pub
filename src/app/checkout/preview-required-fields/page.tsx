import { CheckoutStatePreview } from '@/app/checkout/_components/CheckoutStatePreview';

/** 필수 입력 누락 안내를 직접 표시합니다. (Displays the missing required fields notice directly.) */
export default function Page() {
  return <CheckoutStatePreview state="required-fields" />;
}
