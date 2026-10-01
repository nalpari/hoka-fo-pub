import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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
        color: 'var(--color-text-primary)',
        textAlign: 'center',
      })}
    >
      <Box w="100%" p="3" bg="rgb(255 255 255 / 80%)">
        <Typography as="small" variant="meta">
          LIMITED COLLECTION
        </Typography>
        <Typography
          as="strong"
          className={css({
            display: 'block',
            m: '2',
            fontSize: 'var(--type-heading-font-size)',
            lineHeight: '1',
          })}
          variant="heading"
        >
          740 Pure
          <br />
          White Pack
        </Typography>
        <Link
          className={css({
            display: 'inline-block',
            borderRadius: '3px',
            py: '9px',
            px: '15px',
            bg: 'var(--color-text-primary)',
            color: 'var(--color-text-inverse)',
          })}
          to="/collections"
        >
          자세히 보기
        </Link>
      </Box>
    </article>
  );
}
