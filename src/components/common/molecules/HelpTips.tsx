'use client';

import { Popover } from '@base-ui/react/popover';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { type CSSProperties, useState } from 'react';

import { css, cva } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon, type IconProps } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

export type HelpTipSide = 'top' | 'right' | 'bottom' | 'left';

type SignifierProps = {
  label: string;
  icon?: 'info' | 'question';
  iconColor?: IconProps['color'];
  /** 안내 아이콘 버튼에 적용하는 클래스입니다. */
  className?: string;
};

type TooltipProps = SignifierProps & {
  text: string;
  side?: HelpTipSide;
} & ({ variant?: 'standard'; maxWidth?: never } | { variant: 'description'; maxWidth?: number });

type ToggletipProps = SignifierProps & {
  defaultOpen?: boolean;
  title?: string;
  description: string;
  action?: { label: string; onClick?: () => void };
  side?: HelpTipSide;
};

const popupBase = css.raw({
  maxW: 'min(280px, calc(100vw - 32px))',
  bg: 'surface.default',
  color: 'black.100',
  borderRadius: '4px',
  filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.12))',
  outline: 'none',
});

const popup = css(popupBase);

const tooltipPopup = cva({
  base: popupBase,
  variants: {
    variant: {
      standard: { px: '2', py: '3', textAlign: 'center', whiteSpace: 'normal' },
      description: {
        w: 'min(var(--help-tooltip-max-width, 375px), calc(100vw - 32px))',
        maxW: 'none',
        p: '3',
        bg: 'white.0',
        filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.16))',
        textAlign: 'left',
        overflowWrap: 'anywhere',
      },
    },
  },
  defaultVariants: { variant: 'standard' },
});

const toggletipPopup = css({
  w: '192px',
  p: '4',
  '&[data-side=left], &[data-side=right]': { w: '164px' },
});

const arrow = css({
  display: 'grid',
  placeItems: 'center',
  w: 'var(--help-tip-arrow-width, 17px)',
  h: '8px',
  '&[data-side=top]': { bottom: '-7px' },
  '&[data-side=bottom]': { top: '-7px', '& img': { transform: 'rotate(180deg)' } },
  '&[data-side=right]': {
    left: '-7px',
    w: '8px',
    h: 'var(--help-tip-arrow-width, 17px)',
    '& img': {
      pos: 'absolute',
      top: '50%',
      left: '50%',
      w: 'var(--help-tip-arrow-width, 17px)',
      h: '8px',
      maxW: 'none',
      transform: 'translate(-50%, -50%) rotate(90deg)',
    },
  },
  '&[data-side=left]': {
    right: '-7px',
    w: '8px',
    h: 'var(--help-tip-arrow-width, 17px)',
    '& img': {
      pos: 'absolute',
      top: '50%',
      left: '50%',
      w: 'var(--help-tip-arrow-width, 17px)',
      h: '8px',
      maxW: 'none',
      transform: 'translate(-50%, -50%) rotate(-90deg)',
    },
  },
});

const positioner = css({ zIndex: '100' });

const wideArrow = css({ '--help-tip-arrow-width': '34px' });

function renderSignifier({ label, icon = 'info', iconColor, className }: SignifierProps) {
  return (
    <Button variant="icon" size={16} aria-label={label} type="button" className={className}>
      <Icon
        name={icon === 'info' ? 'circle-info-regular' : 'circle-question-regular'}
        size={16}
        color={iconColor}
      />
    </Button>
  );
}

function TipArrow({ kind, wide = false }: { kind: 'tooltip' | 'toggletip'; wide?: boolean }) {
  const Arrow = kind === 'tooltip' ? BaseTooltip.Arrow : Popover.Arrow;

  return (
    <Arrow className={wide ? `${arrow} ${wideArrow}` : arrow}>
      <Icon
        name="arrow"
        size={wide ? 34 : 17}
        style={{ height: 8, objectFit: wide ? 'fill' : undefined }}
        aria-hidden="true"
      />
    </Arrow>
  );
}

/** 안내 아이콘에서 보조 설명을 표시하며 기본 스타일은 standard입니다. (Shows helper text from an info icon and defaults to the standard style.) */
export function HelpTooltip({
  label,
  text,
  icon,
  iconColor,
  className,
  side = 'top',
  variant = 'standard',
  maxWidth,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const description = variant === 'description';

  return (
    <BaseTooltip.Root open={open} onOpenChange={setOpen}>
      <BaseTooltip.Trigger
        closeOnClick={false}
        render={renderSignifier({ label, icon, iconColor, className })}
        onClick={() => setOpen((current) => !current)}
      />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          side={side}
          align={description ? 'start' : undefined}
          alignOffset={description ? -40 : undefined}
          sideOffset={10}
          collisionPadding={16}
          className={positioner}
        >
          <BaseTooltip.Popup
            className={tooltipPopup({ variant })}
            style={
              maxWidth === undefined
                ? undefined
                : ({ '--help-tooltip-max-width': `${maxWidth}px` } as CSSProperties)
            }
          >
            <Typography variant="b8" className={css({ whiteSpace: 'pre-line' })}>
              {text}
            </Typography>
            <TipArrow kind="tooltip" wide={description} />
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

/** 제목·설명과 선택적 액션을 안내 아이콘에서 엽니다. (Opens a richer help popover with an optional action.) */
export function HelpToggletip({
  defaultOpen = false,
  label,
  title,
  description,
  action,
  icon,
  iconColor,
  className,
  side = 'top',
}: ToggletipProps) {
  return (
    <Popover.Root defaultOpen={defaultOpen}>
      <Popover.Trigger render={renderSignifier({ label, icon, iconColor, className })} />
      <Popover.Portal>
        <Popover.Positioner
          side={side}
          sideOffset={10}
          collisionPadding={16}
          className={positioner}
        >
          <Popover.Popup className={`${popup} ${toggletipPopup}`}>
            <Stack gap="2">
              {title ? (
                <Popover.Title
                  render={(props) => (
                    <Typography {...props} as="h2" variant="b6M">
                      {props.children}
                    </Typography>
                  )}
                >
                  {title}
                </Popover.Title>
              ) : null}
              <Popover.Description
                render={(props) => (
                  <Typography {...props} as="p" variant="b8">
                    {props.children}
                  </Typography>
                )}
              >
                {description}
              </Popover.Description>
              {action ? (
                <Popover.Close
                  render={<Button variant="link" size="sm" type="button" />}
                  onClick={action.onClick}
                >
                  {action.label}
                </Popover.Close>
              ) : null}
            </Stack>
            <TipArrow kind="toggletip" />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
