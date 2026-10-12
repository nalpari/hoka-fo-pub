import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';

type Props = { eyebrow: string; title: string; description: string; to: string; action: string };

const card = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '6',
  minH: '185px',
  p: '30px 38px',
  bg: 'var(--color-off-white-100)',
  _mobile: {
    minH: '210px',
    p: '25px',
  },
});

const titleStyle = css({
  my: '2',
  mx: '0',
});

const descriptionStyle = css({
  maxW: '500px',
  m: '0',
  '&&': {
    color: 'var(--color-black-60)',
  },
});

const actionStyle = css({
  flex: 'none',
  textDecoration: 'underline',
  textUnderlineOffset: '4px',
});

export function PersonalizationCard({ eyebrow, title, description, to, action }: Props) {
  return (
    <article className={card}>
      <div>
        <Typography as="small" variant="body5">
          {eyebrow}
        </Typography>
        <Typography as="h3" variant="heading8" className={titleStyle}>
          {title}
        </Typography>
        <Typography as="p" variant="body5" className={descriptionStyle}>
          {description}
        </Typography>
      </div>
      <Link to={to}>
        <Typography variant="textLink2" className={actionStyle}>
          {action} →
        </Typography>
      </Link>
    </article>
  );
}
