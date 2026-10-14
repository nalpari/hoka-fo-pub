'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import Link from 'next/link';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { css } from 'styled-system/css';

const root = css({
  '&&': {
    fontWeight: 'semibold',
    color: 'var(--color-text-primary)',
  },
});

const link = css({
  _hover: {
    textDecoration: 'underline',
  },
});

const separator = css({ display: 'inline-flex', mx: '7px', verticalAlign: 'middle' });

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className={root} aria-label="현재 위치">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 && (
            <span className={separator} aria-hidden="true">
              <Icon name="breadcrumb" style={{ width: '4px', height: '8px' }} />
            </span>
          )}
          {item.href && index < items.length - 1 ? (
            <Link className={link} href={item.href}>
              <Typography variant="body4" weight="inherit">
                {item.label}
              </Typography>
            </Link>
          ) : (
            <Typography
              variant="body4"
              weight="inherit"
              tone="tertiary"
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Typography>
          )}
        </span>
      ))}
    </nav>
  );
}
