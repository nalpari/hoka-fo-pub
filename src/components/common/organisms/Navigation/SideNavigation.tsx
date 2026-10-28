'use client';

import Link from 'next/link';

import { cva } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

export type SideNavigationGroup = {
  heading: string;
  items: { label: string; to: string; active?: boolean; disabled?: boolean }[];
};

export type SideNavigationProps = {
  title: string;
  titleTo: string;
  groups: SideNavigationGroup[];
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

/** Responsive side navigation with active and disabled item states. */
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
