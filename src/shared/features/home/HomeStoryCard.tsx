import { Link as RouterLink } from 'react-router-dom';
import { css } from 'styled-system/css';

const story = css({
  '& h3': { mt: '13px', mb: '7px', fontSize: '22px', letterSpacing: '-0.06em' },
  '& p': { minH: '38px', mt: 0, mb: '10px', fontSize: '13px', lineHeight: 1.45 },
  '& a': { fontSize: '12px', textDecoration: 'underline', textUnderlineOffset: '3px' },
  _mobile: {
    mb: '18px',
    '& h3, & p, & a': { mx: '16px' },
    '& h3': { mt: '8px', mb: '4px', fontSize: '15px' },
    '& p': { minH: 'auto', mb: '7px', fontSize: '9px' },
    '& a': { fontSize: '9px' },
  },
});
const image = css({
  aspectRatio: '1 / 1.32',
  bgSize: 'cover',
  bgPosition: 'center',
  _mobile: { aspectRatio: '1 / .9' },
});
type HomeStoryCardProps = { title: string; description: string; imageUrl: string };

export function HomeStoryCard({ title, description, imageUrl }: HomeStoryCardProps) {
  return (
    <article className={story}>
      <div className={image} style={{ backgroundImage: `url(${imageUrl})` }} />
      <h3>{title}</h3>
      <p>{description}</p>
      <RouterLink to="/explore">
        살펴보기 <span aria-hidden="true">→</span>
      </RouterLink>
    </article>
  );
}
