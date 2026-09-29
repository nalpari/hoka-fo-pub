import { cva } from 'styled-system/css';

const badge = cva({
  base: {
    color: '#E10F00',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '130%',
    _mobile: {
      fontWeight: '500',
      fontSize: '13px',
      lineHeight: '120%',
    },
  },
  variants: {
    exclusive: { true: { color: '#009DFF' }, false: {} },
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
