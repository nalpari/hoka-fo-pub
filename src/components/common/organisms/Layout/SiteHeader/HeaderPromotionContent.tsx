import type { Ref } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { ButtonLink } from '@/components/common/atoms/Button/Button';
import { Typography } from '@/components/common/atoms/Typography/Typography';

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
      maxW="calc(100cqw - var(--promotion-frame-space, 150px))"
      textAlign="center"
      justifyContent={isMemberBenefits ? 'center' : undefined}
    >
      <Typography tone="inverse" web="body3" mo="body5" weight="medium">
        {message}
      </Typography>
      <ButtonLink className={promotionLink} href={href} variant="link" size="sm">
        <Typography web="textLink2" mo="textLink3">
          <Typography as="span">
            {isMemberBenefits ? '회원 혜택 자세히 보기' : '자세히 보기'}
          </Typography>
        </Typography>
      </ButtonLink>
    </PromotionStack>
  );
}
