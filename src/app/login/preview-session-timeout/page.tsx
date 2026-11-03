import { LoginContent } from '@/app/login/_components/LoginContent';

/** 장시간 미입력 로그아웃 안내를 열린 상태로 표시합니다. (Displays the idle-session logout notice open on entry.) */
export default function Page() {
  return <LoginContent showSessionTimeout />;
}
