import type { Ref } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type HeaderPromotionButtonType = 'details' | 'memberBenefits';

const promotionLink = css({
  '&&': {
    '& span': {
      color: 'var(--hoka-white)',
    },
  },
});

/** Own the member promotion message, link, and button-specific arrangement. */
export function HeaderPromotionContent({
  buttonType = 'details',
  message = '회원님께만 드리는 무료 배송 및 반품 기간 연장',
  href = '/products',
  ref,
}: {
  buttonType?: HeaderPromotionButtonType;
  message?: string;
  href?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const isMemberBenefits = buttonType === 'memberBenefits';

  const PromotionStack = isMemberBenefits ? VStack : HStack;

  return (
    <PromotionStack
      ref={ref}
      gap={isMemberBenefits ? '0' : '4'}
      w="max-content"
      maxW="calc(100cqw - 150px)"
      textAlign="center"
    >
      <Typography tone="inverse" variant="action" mo="body5" weight="medium">
        {message}
      </Typography>
      <ButtonLink className={promotionLink} href={href} variant="link" size="sm">
        <Typography variant="textLink2" mo="textLink3">
          <span>{isMemberBenefits ? '회원 혜택 자세히 보기' : '자세히 보기'}</span>
        </Typography>
      </ButtonLink>
    </PromotionStack>
  );
}
