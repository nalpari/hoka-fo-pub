import { LaunchCalendarContent } from '@/app/launch-calendar/_components/LaunchCalendarContent';

/** 출시 예정 상품이 없는 Upcoming을 표시합니다. (Displays the empty upcoming launch listing.) */
export default function Page() {
  return <LaunchCalendarContent mode="upcoming" items={[]} />;
}
