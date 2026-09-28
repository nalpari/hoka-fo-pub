import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

export function PromotionCard() {
  return (
    <article
      className={css({
        position: 'relative',
        minW: '0',
        h: { base: '280px', _mobile: '190px' },
        display: 'grid',
        placeItems: 'end center',
        p: '18px',
        bg: 'linear-gradient(135deg, #3b3835, #e5ddcf 52%, #9b927f)',
        color: '#111',
        textAlign: 'center',
      })}
    >
      <Box w="100%" p="12px" bg="rgb(255 255 255 / 80%)">
        <small>LIMITED COLLECTION</small>
        <strong
          className={css({
            display: 'block',
            m: '8px',
            fontFamily: 'var(--font-family-base)',
            fontSize: '28px',
            fontWeight: '700',
            lineHeight: '1',
          })}
        >
          740 Pure
          <br />
          White Pack
        </strong>
        <Link
          className={css({
            display: 'inline-block',
            borderRadius: '3px',
            py: '9px',
            px: '15px',
            bg: '#111',
            color: '#fff',
          })}
          to="/collections"
        >
          자세히 보기
        </Link>
      </Box>
    </article>
  );
}
