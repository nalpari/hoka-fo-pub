import { SystemStatusPage } from './SystemStatusPage';

/** 등록되지 않은 경로의 안내 화면을 표시합니다 (Fallback page rendered for paths that are not registered in the app router). */
export function NotFoundPage() {
  return <SystemStatusPage status="not-found" />;
}
