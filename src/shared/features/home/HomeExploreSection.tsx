import { css } from 'styled-system/css';
import { MainSection } from '@/shared/components/molecules/MainSection/MainSection';
import { HomeStoryCard } from './HomeStoryCard';
import { homeStories } from './homeContent';
const storyGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  _mobile: { display: 'block', mx: '-16px' },
});
export function HomeExploreSection() {
  return (
    <MainSection title="Explore">
      <div className={storyGrid}>
        {homeStories.map((story) => (
          <HomeStoryCard key={story.title} {...story} />
        ))}
      </div>
    </MainSection>
  );
}
