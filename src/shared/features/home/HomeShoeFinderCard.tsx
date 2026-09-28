import { Link as RouterLink } from 'react-router-dom';
import { css } from 'styled-system/css';
const card = css({
  w: 'min(19vw, 304px)',
  p: '15px',
  borderRadius: '5px',
  bg: '#f5f5f5',
  '& h3': { mt: '9px', mb: '4px', fontSize: '21px' },
  '& p': { minH: '30px', mt: 0, mb: '5px', fontSize: '12px', lineHeight: 1.35 },
  '& span': { fontSize: '12px', textDecoration: 'underline' },
  _mobile: {
    w: '137px',
    p: '8px',
    '& h3': { mt: '5px', mb: '2px', fontSize: '14px' },
    '& p': { minH: '23px', mb: '2px', fontSize: '8px' },
    '& span': { fontSize: '9px' },
  },
});
const image = css({
  h: 'min(17vw, 250px)',
  bgSize: 'contain',
  bgPosition: 'center',
  bgRepeat: 'no-repeat',
  _mobile: { h: '114px' },
});
type HomeShoeFinderCardProps = { title: string; description: string; imageUrl: string };
export function HomeShoeFinderCard({ title, description, imageUrl }: HomeShoeFinderCardProps) {
  return (
    <RouterLink className={card} to="/explore/shoe-finder">
      <div className={image} style={{ backgroundImage: `url(${imageUrl})` }} />
      <h3>{title}</h3>
      <p>{description}</p>
      <span>남성 바로가기 여성 바로가기</span>
    </RouterLink>
  );
}
