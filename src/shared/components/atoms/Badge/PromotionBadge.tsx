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
    fontWeight: {
      medium: { fontWeight: 'medium', _mobile: { fontWeight: 'medium' } },
    },
  },
});

export type Promotion = 'Best' | 'New' | 'Exclusive';

export type PromotionBadgeProps = {
  className?: string;
  fontWeight?: 'medium';
  promotion: Promotion;
};

/** Promotional label that highlights exclusive items in the brand color. */
export function PromotionBadge({ className, fontWeight, promotion }: PromotionBadgeProps) {
  return (
    <span
      className={[badge({ exclusive: promotion === 'Exclusive', fontWeight }), className]
        .filter(Boolean)
        .join(' ')}
    >
      {promotion}
    </span>
  );
}
