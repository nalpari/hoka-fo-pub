import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { MainSection } from '@/shared/components/molecules/MainSection/MainSection';
import { MainContentCard } from '@/shared/components/molecules/MainContentCard/MainContentCard';
import { usePlatform } from '@/shared/context/platform';
import { homeExplores } from './homeContent';

const storyGrid = css({
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '4',
  _mobile: { gap: '12', gridTemplateColumns: 'repeat(1, 1fr)' },
});

export function HomeExploreSection() {
  const platform = usePlatform();
  const isMobile = platform === 'mobile';

  return (
    <MainSection title="Explore">
      <Grid className={storyGrid}>
        {homeExplores.map((explore) => (
          <MainContentCard
            key={explore.title}
            {...explore}
            actions={explore.actions.map((action) => ({
              ...action,
              variant: isMobile ? 'secondary' : action.variant,
            }))}
            variant={isMobile ? 'overlay' : 'descriptionLink'}
          />
        ))}
      </Grid>
    </MainSection>
  );
}
