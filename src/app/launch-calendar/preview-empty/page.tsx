import { LaunchCalendarContent } from '@/app/launch-calendar/_components/LaunchCalendarContent';

/** 등록된 런칭 일정이 없는 Feed를 표시합니다. (Displays the empty launch calendar feed.) */
export default function Page() {
  return <LaunchCalendarContent mode="feed" items={[]} />;
}
