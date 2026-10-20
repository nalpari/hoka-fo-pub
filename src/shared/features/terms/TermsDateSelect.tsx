'use client';

import { useState } from 'react';
import { Popover } from '@base-ui/react/popover';
import { css } from 'styled-system/css';
import { usePlatform } from '@/shared/context/platform';
import { Radio, type RadioProps } from '@/shared/components/atoms/Radio/Radio';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type TermsDateSelectProps = Pick<RadioProps, 'name' | 'options' | 'value' | 'onValueChange'>;

const dateOptions = css({
  w: 'max-content',
  p: '3',
  border: '1px solid token(colors.black.40)',
  borderRadius: '4px',
  bg: 'white.0',
  '& [role="radiogroup"]': { gap: '4' },
});

export function TermsDateSelect({ name, options, value, onValueChange }: TermsDateSelectProps) {
  const platform = usePlatform();
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        type="button"
        aria-label="약관 시행일 선택"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          p: '0',
          border: '0',
          bg: 'transparent',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
        })}
      >
        <Typography variant="body3" weight="medium">
          {value.replaceAll('.', '. ')}
        </Typography>
        <Icon src="/images/icon/chevron-down-small.svg" size="14px" aria-hidden="true" />
      </Popover.Trigger>
      <Popover.Portal>
        <div className={`platform-${platform}`}>
          <Popover.Positioner
            side="bottom"
            align="start"
            sideOffset={8}
            className={css({ zIndex: 2 })}
          >
            <Popover.Popup aria-label="약관 시행일 선택" className={dateOptions}>
              <Radio
                ariaLabel="약관 시행일"
                name={name}
                options={options}
                value={value}
                onValueChange={(next) => {
                  onValueChange(next);
                  setOpen(false);
                }}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </div>
      </Popover.Portal>
    </Popover.Root>
  );
}
