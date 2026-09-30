import { Link } from 'react-router-dom';
import { css, cva } from 'styled-system/css';

export type SideNavigationGroup = {
  heading: string;
  items: { label: string; to: string; disabled?: boolean }[];
};
export type SideNavigationProps = {
  title: string;
  titleTo: string;
  groups: SideNavigationGroup[];
  activePath: string;
  mobileNavigation?: 'scroll' | 'hidden';
  className?: string;
};

const sidebar = cva({
  base: {
    flex: '0 0 180px',
    _mobile: {
      display: 'flex',
      gap: '9px',
      overflow: 'auto',
      mb: '28px',
      pb: '8px',
      borderBottom: '1px solid var(--color-border-subtle)',
    },
  },
  variants: { mobileNavigation: { scroll: {}, hidden: { _mobile: { display: 'none' } } } },
  defaultVariants: { mobileNavigation: 'scroll' },
});
const titleStyle = css({
  display: 'block',
  mb: '28px',
  fontSize: '30px',
  fontWeight: '800',
  letterSpacing: '-1px',
  _mobile: { flex: 'none', m: '0 10px 0 0', fontSize: '18px' },
});
const navGroup = css({ mb: '25px', _mobile: { display: 'contents' } });
const navHeading = css({ m: '0 0 10px', fontSize: '14px', _mobile: { display: 'none' } });
const navLink = cva({
  base: {
    display: 'block',
    my: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    _mobile: { flex: 'none', m: '0', py: '4px', fontSize: '12px', whiteSpace: 'nowrap' },
  },
  variants: {
    active: { true: { color: '#0082ca', fontWeight: '700' }, false: {} },
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
  className,
}: SideNavigationProps) {
  return (
    <aside className={[sidebar({ mobileNavigation }), className].filter(Boolean).join(' ')}>
      <Link className={titleStyle} to={titleTo}>
        {title}
      </Link>
      {groups.map((group) => (
        <section className={navGroup} key={group.heading}>
          <h2 className={navHeading}>{group.heading}</h2>
          {group.items.map((item) => (
            <Link
              aria-current={item.to === activePath ? 'page' : undefined}
              className={navLink({ active: item.to === activePath, disabled: item.disabled })}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </section>
      ))}
    </aside>
  );
}
