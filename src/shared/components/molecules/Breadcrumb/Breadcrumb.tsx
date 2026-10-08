import { Link } from 'react-router-dom';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { css } from 'styled-system/css';

const root = css({
  fontWeight: 'semibold',
  fontSize: '14' /* 기존 13px */,
  lineHeight: 'body',
  letterSpacing: 'korean',
  color: 'var(--color-black-100)',
});

const link = css({
  _hover: { textDecoration: 'underline' },
});

const separator = css({ display: 'inline-flex', mx: '7px', verticalAlign: 'middle' });

const current = css({ color: 'var(--color-black-50)' });

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
            <Link className={link} to={item.href}>
              {item.label}
            </Link>
          ) : (
            <span
              className={current}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
