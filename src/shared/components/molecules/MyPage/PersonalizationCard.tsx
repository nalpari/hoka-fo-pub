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
  _mobile: { minH: '210px', p: '25px' },
});

const eyebrowStyle = css({
  fontSize: '12' /* 기존: 11px */,
  letterSpacing: 'var(--letter-spacings-korean)',
});

const titleStyle = css({
  my: '2',
  mx: '0',
  fontSize: '24',
  _mobile: { fontSize: '20' /* 기존 21px */ },
});

const descriptionStyle = css({
  maxW: '500px',
  m: '0',
  color: 'var(--color-black-60)',
  fontSize: '14' /* 기존 13px */,
  lineHeight: 'var(--line-heights-body)',
});

const actionStyle = css({
  flex: 'none',
  fontSize: '14' /* 기존 13px */,
  textDecoration: 'underline',
  textUnderlineOffset: '4px',
});

export function PersonalizationCard({ eyebrow, title, description, to, action }: Props) {
  return (
    <article className={card}>
      <div>
        <small className={eyebrowStyle}>{eyebrow}</small>
        <h3 className={titleStyle}>{title}</h3>
        <p className={descriptionStyle}>{description}</p>
      </div>
      <Link className={actionStyle} to={to}>
        {action} →
      </Link>
    </article>
  );
}
