import { LaunchCalendarDetail } from '@/app/launch-calendar/_components/LaunchCalendarDetail';

/** 런칭 상품의 입고 알림 신청 완료 표시를 확인합니다. (Previews a launch product's completed notification state.) */
export default function Page() {
  return <LaunchCalendarDetail notificationStatus="notified" />;
}
