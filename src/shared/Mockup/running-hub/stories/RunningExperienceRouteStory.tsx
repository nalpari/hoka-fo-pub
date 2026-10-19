import { ShopShell } from '@/shared/ShopShell';
import {
  RunningExperiencePage,
  type RunningExperienceKind,
} from '@/shared/Mockup/running-hub/RunningExperiencePage';
import { NotFoundPage } from '@/shared/features/not-found/NotFoundPage';

const kinds = [
  'shoe-finder',
  'rewards',
  'reviews',
  'alerts',
  'rotation',
  'plans',
  'store-experience',
] satisfies RunningExperienceKind[];

export function createRunningExperienceStory(path: string) {
  return function RunningExperienceRouteStory() {
    const kind = kinds.find(
      (value) =>
        path === (value === 'store-experience' ? '/store/experience' : `/running/${value}`),
    );
    return <ShopShell>{kind ? <RunningExperiencePage kind={kind} /> : <NotFoundPage />}</ShopShell>;
  };
}
