import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ReactNode } from 'react';
import { css, cva } from 'styled-system/css';
import { Circle, Stack } from 'styled-system/jsx';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export type StepIndicatorItem = { label: ReactNode; id?: string };

export type StepIndicatorProps = {
  items: StepIndicatorItem[];
  current: number;
  ariaLabel: string;
  mobileHidden?: boolean;
  className?: string;
  variant?: 'standard' | 'connected';
};

const list = cva({
  base: {
    display: 'flex',
    gap: '5',
    m: '0',
    p: '0',
    listStyle: 'none',
    '&&': {
      color: 'var(--color-black-40)',
    },
  },
  variants: {
    mobileHidden: {
      true: {
        _mobile: {
          display: 'none',
        },
      },
      false: {},
    },
  },
  defaultVariants: { mobileHidden: false },
});

const item = cva({
  base: {
    '& + &::before': {
      mr: '5',
      content: '"›"',
    },
  },
  variants: {
    current: {
      true: {
        textDecoration: 'underline',
        textUnderlineOffset: '9px',
        '&&': {
          color: 'var(--color-text-primary)',
          fontWeight: 'bold',
        },
      },
      false: {},
    },
  },
});

/** 주문·가입 흐름의 단계와 연결형 진행 상태를 표시합니다. (Displays standard or connected progress for multistep flows.) */
export function StepIndicator({
  items,
  current,
  ariaLabel,
  mobileHidden,
  className,
  variant = 'standard',
}: StepIndicatorProps) {
  return (
    <ol
      aria-label={ariaLabel}
      className={[
        css(list.raw({ mobileHidden }), variant === 'connected' && { gap: '0' }),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((itemValue, index) => (
        <li
          aria-current={current === index + 1 ? 'step' : undefined}
          className={
            variant === 'connected'
              ? css({
                  pos: 'relative',
                  flex: '1',
                  textAlign: 'center',
                  _after: {
                    content: '""',
                    pos: 'absolute',
                    top: '11px',
                    left: 'calc(50% + 12px)',
                    w: 'calc(100% - 24px)',
                    h: '3px',
                    bg: index < current - 1 ? 'blue.100' : 'black.20',
                  },
                  '&:last-child::after': { display: 'none' },
                })
              : item({ current: current === index + 1 })
          }
          key={itemValue.id ?? index}
        >
          {variant === 'connected' ? (
            <Stack gap="3" alignItems="center">
              <Circle size="6" bg={index < current ? 'blue.100' : 'black.20'} aria-hidden="true">
                {index < current ? (
                  <Icon fontAwesomeIcon={faCheck} size={12} color="white" />
                ) : (
                  <Circle size="3" bg="white" />
                )}
              </Circle>
              <Typography variant="body5">{itemValue.label}</Typography>
            </Stack>
          ) : (
            <Typography variant="body4">{itemValue.label}</Typography>
          )}
        </li>
      ))}
    </ol>
  );
}
