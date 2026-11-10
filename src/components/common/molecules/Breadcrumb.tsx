'use client';

import Link from 'next/link';

import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

const style = {
  link: css({
    display: 'flex',
    alignItems: 'center',
    _hover: {
      textDecoration: 'underline',
    },
  }),
  label: css({
    display: 'flex',
    alignItems: 'center',
    lineHeight: '1 !important',
  }),
};

export type BreadcrumbItem = { label: string; href?: string };

/** 현재 페이지의 탐색 경로를 표시합니다. (Displays the navigation path to the current page.) */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <HStack as="nav" gap="4px" alignItems="center" minH="24px" aria-label="현재 위치">
      {items.map((item, index) => (
        <HStack as="span" key={`${item.label}-${index}`} gap="2" alignItems="center">
          {index > 0 && (
            <HStack as="span" w="13px" h="11px" justifyContent="center" aria-hidden="true">
              <Icon name="chevron-right" size="12px" color="black.50" />
            </HStack>
          )}
          {item.href && index < items.length - 1 ? (
            <Link className={style.link} href={item.href}>
              <Typography variant="body4" className={style.label}>
                {item.label}
              </Typography>
            </Link>
          ) : (
            <Typography
              variant="body4"
              tone="tertiary"
              aria-current={index === items.length - 1 ? 'page' : undefined}
              className={style.label}
            >
              {item.label}
            </Typography>
          )}
        </HStack>
      ))}
    </HStack>
  );
}
