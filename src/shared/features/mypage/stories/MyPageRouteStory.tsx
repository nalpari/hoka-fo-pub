import { MemoryRouter } from 'react-router-dom';
import { ShopShell } from '@/shared/ShopApp';

export function createMyPageStory(path: string) {
  return function MyPageRouteStory() {
    return (
      <MemoryRouter initialEntries={[path]}>
        <ShopShell />
      </MemoryRouter>
    );
  };
}
