import { SystemStatusPage } from './SystemStatusPage';

/** Fallback page rendered for paths that are not registered in the app router. */
export function NotFoundPage() {
  return <SystemStatusPage status="not-found" />;
}
