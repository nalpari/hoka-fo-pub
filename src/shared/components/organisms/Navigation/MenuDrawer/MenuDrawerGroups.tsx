import Link from 'next/link';
import { css, cx } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';

const styles = {
  accordion: css({ '& h3': { m: 0 } }),
  group: css({ minH: '50px' }),
  panel: css({ pt: '4', pb: '6' }),
  subLink: css({
    display: 'flex',
    alignItems: 'center',
    pl: '4',
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

/** 모바일 메뉴의 카테고리 그룹과 하위 링크를 표시합니다. (Displays mobile menu category groups and their links.) */
export function MenuDrawerGroups({ columns, onNavigate }: MenuDrawerGroupsProps) {
  const groups = columns.filter((column) => !column.to);

  return (
    <>
      <Accordion
        multiple={false}
        className={styles.accordion}
        triggerClassName={styles.group}
        panelClassName={styles.panel}
        defaultValue={groups[0] ? [groups[0].title] : []}
        indicator={<span className={styles.indicator} />}
        items={groups.map((column) => ({
          value: column.title,
          title: <Typography variant="heading8">{column.title}</Typography>,
          content: (
            <Stack as="ul" gap="7" listStyleType="none" p="0" m="0">
              {column.items.map((item) => (
                <li key={item.to + item.label}>
                  <Link
                    className={cx(styles.subLink, item.label === 'Sale' && styles.sale)}
                    href={item.to}
                    onClick={onNavigate}
                  >
                    <Typography
                      variant="body3"
                      weight={item.label === 'Sale' ? 'medium' : undefined}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </Stack>
          ),
        }))}
      />
      {columns
        .filter((column) => column.to)
        .map((column) => (
          <Link
            key={column.title}
            href={column.to!}
            onClick={onNavigate}
            className={css({
              display: 'flex',
              alignItems: 'center',
              minH: '50px',
              color: 'inherit',
              textDecoration: 'none',
            })}
          >
            <Typography variant="heading8">{column.title}</Typography>
          </Link>
        ))}
    </>
  );
}
