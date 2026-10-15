import Link from 'next/link';
import { css, cx } from 'styled-system/css';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';

const styles = {
  list: css({ listStyle: 'none', p: 0, m: 0 }),
  accordion: css({ '& h3': { m: 0 } }),
  group: css({ minH: '50px' }),
  panel: css({ pb: '10px' }),
  subLink: css({
    display: 'flex',
    alignItems: 'center',
    minH: '40px',
    pl: '16px',
    color: 'inherit',
    textDecoration: 'none',
  }),
  sale: css({ color: '#ff0000' }),
  indicator: css({
    position: 'relative',
    display: 'block',
    w: '16px',
    h: '16px',
    _before: {
      content: '""',
      position: 'absolute',
      left: '2px',
      top: '7px',
      w: '13px',
      h: '1.5px',
      bg: 'currentColor',
    },
    _after: {
      content: '""',
      position: 'absolute',
      left: '8px',
      top: '1px',
      w: '1.5px',
      h: '13px',
      bg: 'currentColor',
    },
    'button[aria-expanded="true"] &': { _after: { display: 'none' } },
  }),
};

type MenuDrawerGroupsProps = {
  columns: readonly MegaMenu['columns'][number][];
  onNavigate: () => void;
};

export function MenuDrawerGroups({ columns, onNavigate }: MenuDrawerGroupsProps) {
  return (
    <Accordion
      multiple={false}
      className={styles.accordion}
      triggerClassName={styles.group}
      panelClassName={styles.panel}
      defaultValue={[columns[0].title]}
      indicator={<span className={styles.indicator} />}
      items={columns.map((column) => ({
        value: column.title,
        title: <Typography variant="navigationHeading">{column.title}</Typography>,
        content: (
          <ul className={styles.list}>
            {column.items.map((item) => (
              <li key={item.to + item.label}>
                <Link
                  className={cx(styles.subLink, item.label === 'Sale' && styles.sale)}
                  href={item.to}
                  onClick={onNavigate}
                >
                  <Typography variant="body3">{item.label}</Typography>
                </Link>
              </li>
            ))}
          </ul>
        ),
      }))}
    />
  );
}
