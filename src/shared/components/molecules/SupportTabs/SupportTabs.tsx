'use client';

import type { ReactNode } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';

const list = css.raw({
  display: 'flex',
  w: '100%',
  borderBottom: '1px solid token(colors.black.40)',
});

const tab = css.raw({
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  justifyContent: 'center',
  minW: '0',
  h: '32px',
  p: '0',
  border: '0',
  borderBottom: '2px solid transparent',
  bg: 'transparent',
  cursor: 'pointer',
  '&[data-active]': { borderBottomColor: 'black.100' },
  _focusVisible: { outline: '2px solid token(colors.black.100)', outlineOffset: '2px' },
});

export type SupportTab = {
  value: string;
  label: string;
  content: ReactNode;
};

export function SupportTabs({
  ariaLabel,
  tabs,
  defaultValue,
  value,
  onValueChange,
  variant = 'default',
}: {
  ariaLabel: string;
  tabs: readonly SupportTab[];
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'scrollable';
}) {
  return (
    <Tabs.Root defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
      <Tabs.List
        aria-label={ariaLabel}
        className={css(
          list,
          variant === 'scrollable' && {
            overflowX: 'auto',
            borderBottom: '1px solid var(--color-border-subtle)',
          },
        )}
      >
        {tabs.map(({ label, value }) => (
          <Tabs.Tab
            render={variant === 'scrollable' ? <Button /> : undefined}
            className={
              variant === 'scrollable'
                ? css({
                    flex: '0 0 auto',
                    minH: '11',
                    border: '0',
                    borderBottom: '2px solid transparent',
                    bg: 'transparent',
                    px: '3.5',
                    '&[data-active]': {
                      borderBottomColor: 'var(--color-black-100)',
                      fontWeight: 'var(--font-weights-extrabold)',
                    },
                  })
                : css(tab)
            }
            key={value}
            value={value}
          >
            {variant === 'scrollable' ? (
              label
            ) : (
              <Typography variant="body3" weight="medium">
                {label}
              </Typography>
            )}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map(({ content, value }) => (
        <Tabs.Panel key={value} value={value}>
          {content}
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
