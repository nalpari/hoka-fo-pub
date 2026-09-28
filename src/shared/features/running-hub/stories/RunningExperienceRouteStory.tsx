import { MemoryRouter } from 'react-router-dom';
import { ShopShell } from '@/shared/ShopApp';

export function createRunningExperienceStory(path: string) {
  return function RunningExperienceRouteStory() {
    return (
      <MemoryRouter initialEntries={[path]}>
        <ShopShell />
      </MemoryRouter>
    );
  };
}
