import { MainContentCard } from '@/components/common/molecules/MainContentCard/MainContentCard';
import { cva } from 'styled-system/css';
import { token } from 'styled-system/tokens';

const promotion = {
  title: '데일리 러닝화 가이드',
  description: '목적에 맞는 호카 러닝화 기능을 비교해보세요.',
  image: '/images/temp/@product-list-promotion.png',
  actions: [{ label: '바로가기', to: '/explore/guides/running' }],
} as const;

export type PromotionCardVariant = 'inline' | 'fullWidth';

type PromotionCardProps = {
  variant?: PromotionCardVariant;
};

const root = cva({
  base: { w: '100%' },
  variants: {
    variant: {
      inline: {
        _mobile: {
          gap: '3',
          '& .card__header': { px: '3', gap: '2' },
          '& h3': { fontSize: '16px', fontWeight: 'bold', lineHeight: '1.4' },
          '& .card__action': { px: '3' },
        },
      },
      fullWidth: {
        _mobile: {
          gap: '4',
          '& h3': { fontSize: '24px', fontWeight: 'black', lineHeight: '1.4' },
        },
      },
    },
  },
  defaultVariants: { variant: 'inline' },
});

const imageAspectRatios = {
  inline: {
    desktop: token.var('aspectRatios.media.productThumbnail'),
    mobile: token.var('aspectRatios.media.productThumbnail'),
  },
  fullWidth: { desktop: '375 / 248', mobile: '375 / 248' },
} as const;

/** Catalog promotion card with inline and full-width presentations. */
export function PromotionCard({ variant = 'inline' }: PromotionCardProps) {
  return (
    <MainContentCard
      {...promotion}
      className={root({ variant })}
      imageAspectRatio={imageAspectRatios[variant]}
      variant="descriptionLink"
    />
  );
}
