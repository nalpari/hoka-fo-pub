'use client';

import { Tooltip } from '@base-ui/react/tooltip';
import { css } from 'styled-system/css';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { usePlatform } from '@/shared/context/platform';

type Props = { label: string; description: string };

/** Product specification help; Base UI owns hover, focus, dismissal and positioning. */
export function ProductSpecificationHelp({ label, description }: Props) {
  const platform = usePlatform();

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        delay={0}
        closeOnClick={false}
        aria-label={`${label} 안내`}
        render={<IconButton size="16px" color="var(--color-black-60)" />}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7v4M6.5 11h3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="4.5" r="1" fill="currentColor" />
        </svg>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <div className={`platform-${platform}`}>
          <Tooltip.Positioner
            side="bottom"
            align="start"
            alignOffset={-44}
            sideOffset={12}
            collisionPadding={16}
            className={css({ zIndex: '100' })}
          >
            <Tooltip.Popup
              className={css({
                w: 'max-content',
                maxW: 'min(280px, calc(100vw - 32px))',
                p: '3',
                bg: 'white.0',
                color: 'black.100',
                borderRadius: '4px',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.2)',
                outline: 'none',
              })}
            >
              <Tooltip.Arrow
                className={css({
                  w: '3',
                  h: '3',
                  bg: 'white.0',
                  transform: 'rotate(45deg)',
                  '&[data-side=bottom]': { top: '-6px' },
                  '&[data-side=top]': { bottom: '-6px' },
                })}
              />
              <Typography variant="body5" className={css({ whiteSpace: 'pre-line' })}>
                {description}
              </Typography>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </div>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
