import { cva } from 'styled-system/css';

const badge = cva({
  base: {
    color: 'var(--color-red-100)',
    fontSize: '14',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 'body',
    _mobile: {
      fontWeight: 'medium',
      fontSize: '14' /* 기존 13px */,
      lineHeight: 'koreanHeading',
    },
  },
  variants: {
    exclusive: { true: { color: 'var(--color-blue-100)' }, false: {} },
  },
});

export type Promotion = 'Best' | 'New' | 'Exclusive';

export type PromotionBadgeProps = {
  className?: string;
  promotion: Promotion;
};

/** Promotional label that highlights exclusive items in the brand color. */
export function PromotionBadge({ className, promotion }: PromotionBadgeProps) {
  return (
    <span
      className={[badge({ exclusive: promotion === 'Exclusive' }), className]
        .filter(Boolean)
        .join(' ')}
    >
      {promotion}
    </span>
  );
}
