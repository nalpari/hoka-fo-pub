import { css } from 'styled-system/css';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { HStack } from 'styled-system/jsx';

const promotionBanner = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  h: '50px',
  gap: '10px',
  px: '72px',
  bg: 'var(--hoka-black)',
  color: 'var(--hoka-white)',
});

const promotionLink = css({
  '& span': {
    color: 'var(--hoka-white)',
    fontWeight: 'medium',
    fontSize: '14',
  },
});

/** Desktop-only first-purchase promotion shown above the sticky global navigation. */
export function HeaderPromotionBanner() {
  return (
    <aside className={promotionBanner} aria-label="신규회원 혜택 안내">
      <HStack gap="4">
        <Typography as="span" tone="inverse" variant="action">
          신규회원 첫구매 5% 할인 및 스페셜 혜택
        </Typography>
        <ButtonLink className={promotionLink} to="/products" variant="link" size="sm">
          자세히 보기
        </ButtonLink>
      </HStack>
    </aside>
  );
}
