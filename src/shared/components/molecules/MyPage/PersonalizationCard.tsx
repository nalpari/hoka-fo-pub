import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';

type Props = { eyebrow: string; title: string; description: string; to: string; action: string };

const card = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '24px',
  minH: '185px',
  p: '30px 38px',
  bg: '#e7f3f8',
  _mobile: { minH: '210px', p: '25px' },
});

const eyebrowStyle = css({ fontSize: '11px', letterSpacing: '.08em' });

const titleStyle = css({ m: '8px 0', fontSize: '24px', _mobile: { fontSize: '21px' } });

const descriptionStyle = css({
  maxW: '500px',
  m: '0',
  color: '#555',
  fontSize: '13px',
  lineHeight: '1.6',
});

const actionStyle = css({
  flex: 'none',
  fontSize: '13px',
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
