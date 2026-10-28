import Page from '@/app/login/page';
import { ShopStatePreview } from '@/stories/features/ShopStatePreview';

/** 로그인 페이지에 스토리 콜백을 연결합니다. (Connects the story callback to the login page.) */
export function LoginPage({ onLogin }: { onLogin?: () => void }) {
  return (
    <ShopStatePreview login={onLogin ?? (() => {})}>
      <Page />
    </ShopStatePreview>
  );
}
