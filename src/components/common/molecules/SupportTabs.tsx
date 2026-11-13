'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Tabs } from '@base-ui/react/tabs';
import { type ReactNode, Suspense } from 'react';

import { css } from 'styled-system/css';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

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

type SupportTabsBaseProps = {
  ariaLabel: string;
  tabs: readonly SupportTab[];
  defaultValue: string;
  variant?: 'default' | 'scrollable' | 'guide' | 'care' | 'shipping-returns' | 'terms';
};

type SupportTabsProps = SupportTabsBaseProps &
  (
    | { syncQuery: true; value?: never; onValueChange?: never }
    | { syncQuery?: false; value?: string; onValueChange?: (value: string) => void }
  );

function QuerySupportTabs(props: SupportTabsBaseProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const requested = searchParams.get('tab');
  const value = props.tabs.some((tab) => tab.value === requested) ? requested! : props.defaultValue;
  return (
    <SupportTabs
      {...props}
      value={value}
      onValueChange={(next) => {
        const query = new URLSearchParams(searchParams.toString());
        query.set('tab', next);
        router.push(`${pathname}?${query.toString()}`, { scroll: false });
      }}
    />
  );
}

/** [ 개발팀 바인딩 ] syncQuery는 URL tab과 로컬 탭 표시만 연결합니다. 안내 본문은 각 route의 고정 표시 자료이며 요청·저장 상태를 나타내지 않습니다. */
/** 고객지원 탭과 대응하는 패널을 표시합니다. (Displays support tabs and their associated panels.) */
export function SupportTabs({ syncQuery = false, ...props }: SupportTabsProps) {
  if (syncQuery)
    return (
      <Suspense fallback={<SupportTabs {...props} />}>
        <QuerySupportTabs {...props} />
      </Suspense>
    );
  const { ariaLabel, tabs, defaultValue, value, onValueChange, variant = 'default' } = props;
  return (
    <Tabs.Root defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
      <Tabs.List
        aria-label={ariaLabel}
        className={css(
          list,
          variant === 'care' && { borderBottom: '0' },
          (variant === 'scrollable' || variant === 'guide') && {
            overflowX: 'auto',
            borderBottom: '1px solid var(--color-border-subtle)',
          },
        )}
      >
        {tabs.map(({ label, value }) => (
          <Tabs.Tab
            render={variant === 'scrollable' ? <Button /> : undefined}
            className={
              variant === 'guide'
                ? css({
                    flex: '1 0 auto',
                    _mobile: { flex: '0 0 auto' },
                    minW: '0',
                    h: '40px',
                    px: '5',
                    whiteSpace: 'nowrap',
                    border: '0',
                    borderBottom: '2px solid transparent',
                    bg: 'transparent',
                    cursor: 'pointer',
                    '&[data-active]': { borderBottomColor: 'var(--color-black-100)' },
                    _focusVisible: {
                      outline: '2px solid var(--color-focus-ring)',
                      outlineOffset: '-2px',
                    },
                  })
                : variant === 'scrollable'
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
                  : css(
                      tab,
                      (variant === 'care' || variant === 'shipping-returns') && {
                        h: '42px',
                        _mobile: { h: '32px' },
                      },
                      variant === 'terms' && { h: '40px', _mobile: { h: '32px' } },
                      variant === 'care' && {
                        borderBottom: '1px solid token(colors.black.40)',
                        '&[data-active]': { borderBottom: '2px solid token(colors.black.100)' },
                      },
                    )
            }
            key={value}
            value={value}
          >
            {variant === 'scrollable' ? (
              label
            ) : (
              <Typography
                variant={variant === 'guide' ? 'body4' : 'body3'}
                weight={
                  variant === 'guide' ||
                  variant === 'care' ||
                  variant === 'shipping-returns' ||
                  variant === 'terms'
                    ? 'regular'
                    : 'medium'
                }
              >
                {label}
              </Typography>
            )}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map(({ content, value }) => (
        <Tabs.Panel
          key={value}
          value={value}
          className={
            variant === 'care' || variant === 'shipping-returns'
              ? css({
                  pt: '10',
                  _mobile: { pt: variant === 'shipping-returns' ? '8' : '6' },
                })
              : undefined
          }
        >
          {content}
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
