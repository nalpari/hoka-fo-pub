'use client';

import { Popover } from '@base-ui/react/popover';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { useState } from 'react';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

export type HelpTipSide = 'top' | 'right' | 'bottom' | 'left';

type SignifierProps = {
  label: string;
  icon?: 'info' | 'question';
};

type TooltipProps = SignifierProps & {
  text: string;
  side?: HelpTipSide;
};

type ToggletipProps = SignifierProps & {
  title?: string;
  description: string;
  action?: { label: string; onClick?: () => void };
  side?: HelpTipSide;
};

const popup = css({
  maxW: 'min(280px, calc(100vw - 32px))',
  bg: 'surface.default',
  color: 'black.100',
  borderRadius: '4px',
  filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.12))',
  outline: 'none',
});

const tooltipPopup = css({
  px: '2',
  py: '3',
  textAlign: 'center',
  whiteSpace: 'normal',
});

const toggletipPopup = css({
  w: '192px',
  p: '4',
  '&[data-side=left], &[data-side=right]': { w: '164px' },
});

const arrow = css({
  display: 'grid',
  placeItems: 'center',
  w: '17px',
  h: '8px',
  '&[data-side=top]': { bottom: '-7px' },
  '&[data-side=bottom]': { top: '-7px', '& img': { transform: 'rotate(180deg)' } },
  '&[data-side=right]': {
    left: '-7px',
    w: '8px',
    h: '17px',
    '& img': {
      pos: 'absolute',
      top: '50%',
      left: '50%',
      w: '17px',
      h: '8px',
      maxW: 'none',
      transform: 'translate(-50%, -50%) rotate(90deg)',
    },
  },
  '&[data-side=left]': {
    right: '-7px',
    w: '8px',
    h: '17px',
    '& img': {
      pos: 'absolute',
      top: '50%',
      left: '50%',
      w: '17px',
      h: '8px',
      maxW: 'none',
      transform: 'translate(-50%, -50%) rotate(-90deg)',
    },
  },
});

const positioner = css({ zIndex: '100' });

function renderSignifier({ label, icon = 'info' }: SignifierProps) {
  return (
    <Button variant="icon" size={16} aria-label={label} type="button">
      <Icon src={`/images/icon/tooltip/${icon}.svg`} size={16} />
    </Button>
  );
}

function TipArrow({ kind }: { kind: 'tooltip' | 'toggletip' }) {
  const Arrow = kind === 'tooltip' ? BaseTooltip.Arrow : Popover.Arrow;

  return (
    <Arrow className={arrow}>
      <img src="/images/icon/tooltip/arrow.svg" width={17} height={8} alt="" aria-hidden="true" />
    </Arrow>
  );
}

/** 짧은 보조 설명을 안내 아이콘에 표시합니다. (Shows brief helper text from an info icon.) */
export function HelpTooltip({ label, text, icon, side = 'top' }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <BaseTooltip.Root open={open} onOpenChange={setOpen}>
      <BaseTooltip.Trigger
        closeOnClick={false}
        render={renderSignifier({ label, icon })}
        onClick={() => setOpen((current) => !current)}
      />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          side={side}
          sideOffset={10}
          collisionPadding={16}
          className={positioner}
        >
          <BaseTooltip.Popup className={`${popup} ${tooltipPopup}`}>
            <Typography variant="body5">{text}</Typography>
            <TipArrow kind="tooltip" />
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

/** 제목·설명과 선택적 액션을 안내 아이콘에서 엽니다. (Opens a richer help popover with an optional action.) */
export function HelpToggletip({
  label,
  title,
  description,
  action,
  icon,
  side = 'top',
}: ToggletipProps) {
  return (
    <Popover.Root>
      <Popover.Trigger render={renderSignifier({ label, icon })} />
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
                    <Typography {...props} as="h2" variant="body4" weight="medium">
                      {props.children}
                    </Typography>
                  )}
                >
                  {title}
                </Popover.Title>
              ) : null}
              <Popover.Description
                render={(props) => (
                  <Typography {...props} as="p" variant="body5">
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
