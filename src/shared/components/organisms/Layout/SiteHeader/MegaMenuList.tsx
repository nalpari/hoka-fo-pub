import { Link, useLocation } from 'react-router-dom';
import type { MegaMenu } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { Flex, Grid } from 'styled-system/jsx';
import { css } from 'styled-system/css';

const styles = {
  column: css({
    minW: 0,
    '& a': {
      display: 'inline-flex',
      gap: '5px',
      _hover: { textDecoration: 'underline', textUnderlineOffset: '3px' },
      _focusVisible: { textDecoration: 'underline', textUnderlineOffset: '3px' },
    },
    '& a:hover [data-sale], & a:focus-visible [data-sale]': { color: 'sale' },
  }),
  title: css({
    m: 0,
    color: 'black',
    fontSize: '2xl',
    fontWeight: 'black',
    lineHeight: '23px',
    textTransform: 'capitalize',
  }),
  list: css({
    m: 0,
    p: 0,
    listStyle: 'none',
  }),
  itemLabel: css({
    color: 'black',
    fontSize: 'md',
    fontWeight: 'normal',
    lineHeight: '130%',
    letterSpacing: '-0.02em',
  }),
  saleItemLabel: css({ color: 'sale' }),
  activeItemLabel: css({ fontWeight: 'bold' }),
};

type MegaMenuListProps = {
  columns: MegaMenu['columns'];
  onClose: () => void;
};

export function MegaMenuList({ columns, onClose }: MegaMenuListProps) {
  const location = useLocation();

  const currentPath = `${location.pathname}${location.search}`;

  return (
    <Grid gridTemplateColumns="repeat(5, minmax(110px, 1fr))" gap="4">
      {columns.map((column) => (
        <Flex className={styles.column} direction="column" gap="30px" key={column.title}>
          <h2 className={styles.title}>{column.title}</h2>
          <Grid as="ul" className={styles.list} gap="30px">
            {column.items.map((item) => (
              <li key={item.label}>
                <Link to={item.to} onClick={onClose}>
                  <span
                    className={[
                      styles.itemLabel,
                      item.label === 'Sale' && styles.saleItemLabel,
                      currentPath === item.to && styles.activeItemLabel,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    data-sale={item.label === 'Sale' || undefined}
                  >
                    {item.label}
                  </span>
                  {item.badge ? <small>{item.badge}</small> : null}
                </Link>
              </li>
            ))}
          </Grid>
        </Flex>
      ))}
    </Grid>
  );
}
