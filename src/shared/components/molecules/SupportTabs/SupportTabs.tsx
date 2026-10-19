'use client';

import type { ReactNode } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const list = css({
  display: 'flex',
  w: '100%',
  borderBottom: '1px solid token(colors.black.40)',
});

const tab = css({
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
}: {
  ariaLabel: string;
  tabs: readonly SupportTab[];
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Tabs.Root defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
      <Tabs.List aria-label={ariaLabel} className={list}>
        {tabs.map(({ label, value }) => (
          <Tabs.Tab className={tab} key={value} value={value}>
            <Typography web="body3" mo="body3" weight="medium">
              {label}
            </Typography>
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
