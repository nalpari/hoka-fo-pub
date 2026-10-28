import Link from 'next/link';

import type { ReactNode } from 'react';

import { css, cva } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { Breadcrumb, type BreadcrumbItem } from '@/components/common/molecules/Breadcrumb';

export type SidebarNavigationGroup = {
  heading: string;
  items: { label: string; to: string; active?: boolean; disabled?: boolean }[];
};

type SideNavigationProps = {
  title: string;
  titleTo: string;
  groups: SidebarNavigationGroup[];
  activePath: string;
  mobileNavigation?: 'scroll' | 'hidden';
  appearance?: 'default' | 'support';
  className?: string;
};

const navLink = cva({
  base: { color: 'var(--color-text-tertiary)' },
  variants: {
    active: { true: { color: 'var(--color-blue-100)' }, false: {} },
    disabled: { true: { cursor: 'not-allowed', opacity: '0.5', pointerEvents: 'none' }, false: {} },
  },
});

/** 활성 항목과 비활성 상태를 표시하는 반응형 사이드 탐색입니다. (Displays responsive side navigation with active and disabled states.) */
export function SideNavigation({
  title,
  titleTo,
  groups,
  activePath,
  mobileNavigation,
  appearance = 'default',
  className,
}: SideNavigationProps) {
  if (appearance === 'support') {
    return (
      <Box as="aside" className={className} w="190px" _mobile={{ display: 'none' }}>
        <Stack alignItems="flex-start" gap="10">
          <Link href={titleTo}>
            <Typography as="span" variant="heading7">
              {title}
            </Typography>
          </Link>
          <Stack as="nav" aria-label={title} alignItems="flex-start" gap="6">
            {groups
              .flatMap((group) => group.items)
              .map((item) => {
                const isActive = item.active ?? item.to === activePath;

                return (
                  <Box
                    key={`${item.to}-${item.label}`}
                    py="2"
                    borderBottomWidth={isActive ? '2px' : '0'}
                    borderBottomStyle="solid"
                    borderBottomColor="black.100"
                    pointerEvents={item.disabled ? 'none' : undefined}
                  >
                    <Link
                      aria-current={isActive ? 'page' : undefined}
                      aria-disabled={item.disabled || undefined}
                      href={item.to}
                      tabIndex={item.disabled ? -1 : undefined}
                    >
                      <Typography
                        as="span"
                        variant="body2"
                        weight="medium"
                        tone={isActive ? 'primary' : 'subtle'}
                      >
                        {item.label}
                      </Typography>
                    </Link>
                  </Box>
                );
              })}
          </Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      as="aside"
      className={className}
      flex="0 0 180px"
      _mobile={{
        display: mobileNavigation === 'hidden' ? 'none' : 'flex',
        flexDirection: 'row',
        gap: '9',
        overflow: 'auto',
        mb: '7',
        pb: '2',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <Box display="block" mb="7" _mobile={{ flex: 'none', mr: '10', mb: '0' }}>
        <Link href={titleTo}>
          <Typography as="span" variant="heading7">
            {title}
          </Typography>
        </Link>
      </Box>
      {groups.map((group) => (
        <Stack
          as="section"
          alignItems="stretch"
          gap="0"
          mb="25px"
          _mobile={{ display: 'contents' }}
          key={group.heading}
        >
          <Box mb="2" _mobile={{ display: 'none' }}>
            <Typography as="h2" variant="body4" weight="bold">
              {group.heading}
            </Typography>
          </Box>
          {group.items.map((item) => {
            const isActive = item.active ?? item.to === activePath;

            return (
              <Box
                as="div"
                my="2"
                _mobile={{
                  flex: 'none',
                  my: '0',
                  py: '1',
                  whiteSpace: 'nowrap',
                }}
                key={`${item.to}-${item.label}`}
              >
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  className={navLink({ active: isActive, disabled: item.disabled })}
                  href={item.to}
                >
                  <Typography
                    as="span"
                    web="body4"
                    mo="body5"
                    weight={isActive ? 'bold' : 'regular'}
                  >
                    {item.label}
                  </Typography>
                </Link>
              </Box>
            );
          })}
        </Stack>
      ))}
    </Box>
  );
}

type Props = {
  title: string;
  titleTo: string;
  groups: SidebarNavigationGroup[];
  activePath: string;
  children: ReactNode;
  className?: string;
} & (
  | {
      appearance?: 'default';
      mobileNavigation?: 'scroll' | 'hidden';
      mobileSpacing?: 'default' | 'none';
      breadcrumbItems?: never;
    }
  | {
      appearance: 'support';
      breadcrumbItems?: BreadcrumbItem[];
      mobileNavigation?: never;
      mobileSpacing?: never;
    }
);

const page = css.raw({
  maxW: 'var(--layout-content-max-width)',
  mx: 'auto',
  py: '70px',
  pb: '120px',
  _mobile: {
    px: 'var(--layout-mobile-inline-gutter)',
    py: '38px',
    pb: '70px',
  },
});

/** 기본·고객센터 탐색의 폭과 반응형 본문 프레임을 배치합니다. (Arranges default or support navigation with its responsive content frame.) */
export function SidebarNavigationLayout({
  title: navigationTitle,
  titleTo,
  groups,
  activePath,
  children,
  appearance = 'default',
  mobileNavigation = 'scroll',
  className,
  mobileSpacing = 'default',
  breadcrumbItems,
}: Props) {
  const support = appearance === 'support';
  const columns = (
    <Grid
      as={support ? 'div' : 'main'}
      gridTemplateColumns={support ? '190px minmax(0, 1fr)' : '180px minmax(0, 1fr)'}
      gap={support ? '98px' : '50px'}
      pt={support ? { base: '14', _mobile: '6' } : undefined}
      _mobile={{ display: 'block' }}
      className={
        support
          ? undefined
          : [
              css(page, mobileSpacing === 'none' && { _mobile: { px: '0', py: '0', pb: '0' } }),
              className,
            ]
              .filter(Boolean)
              .join(' ')
      }
    >
      <SideNavigation
        activePath={activePath}
        appearance={appearance}
        groups={groups}
        mobileNavigation={support ? 'hidden' : mobileNavigation}
        title={navigationTitle}
        titleTo={titleTo}
      />
      {support ? children : <Box minW="0">{children}</Box>}
    </Grid>
  );

  if (!support) return columns;

  return (
    <Box
      as="main"
      className={className}
      w="min(calc(100% - var(--layout-web-content-inline-space)), 1532px)"
      mx="auto"
      pb="24"
      _mobile={{ w: '100%', px: '4', pb: '10' }}
    >
      {breadcrumbItems?.length ? (
        <Box h="14" pt="6" pb="2">
          <Breadcrumb items={breadcrumbItems} />
        </Box>
      ) : null}
      <Box w="1200px" maxW="100%" mx="auto" px="34px" _mobile={{ px: '0' }}>
        {columns}
      </Box>
    </Box>
  );
}
