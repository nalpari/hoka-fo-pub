import { Typography } from '@/components/common/atoms/Typography/Typography';
import { type ReactNode } from 'react';
import { css } from 'styled-system/css';
import { EmptyState } from '@/components/common/atoms/EmptyState/EmptyState';
import { Grid } from 'styled-system/jsx';

type DataRow = { label: ReactNode; value: ReactNode; meta?: ReactNode; id?: string };

type DataRowsProps = {
  rows: DataRow[];
  emptyMessage?: ReactNode;
  className?: string;
  ariaLabel?: string;
};

const list = css({ borderTop: '2px solid var(--color-black-100)' });

/** 레이블과 값으로 구성된 내역 목록을 표시합니다 (Label/value row list with a shared empty state for account and order histories). */
function DataRows({
  rows,
  emptyMessage = '표시할 내역이 없습니다.',
  className,
  ariaLabel,
}: DataRowsProps) {
  return (
    <section aria-label={ariaLabel} className={[list, className].filter(Boolean).join(' ')}>
      {rows.length ? (
        rows.map((item, index) => (
          <Grid
            as="article"
            gridTemplateColumns="minmax(120px, .7fr) 2fr auto"
            gap="4"
            alignItems="center"
            minH="16"
            px="4"
            borderBottom="1px solid var(--color-border-subtle)"
            _mobile={{
              gridTemplateColumns: '1fr auto',
              '& span:first-child': {
                gridColumn: '1 / -1',
              },
            }}
            css={{
              '&&': {
                _mobile: {
                  '& span:first-child': {
                    color: 'var(--color-text-tertiary)',
                  },
                },
              },
            }}
            key={item.id ?? index}
          >
            <Typography variant="body4">{item.label}</Typography>
            <Typography as="strong" variant="body4" weight="bold">
              {item.value}
            </Typography>
            {item.meta ? (
              <Typography as="small" variant="body5">
                {item.meta}
              </Typography>
            ) : null}
          </Grid>
        ))
      ) : (
        <EmptyState description={emptyMessage} title="내역이 없습니다." />
      )}
    </section>
  );
}

export type AccountDataRow = { label: string; value: string; status?: string };

type Props = { rows: AccountDataRow[]; emptyMessage?: string };

/** 계정 내역의 행과 빈 상태를 표시합니다 (Displays the account data list composition). */
export function AccountDataList({ rows, emptyMessage }: Props) {
  return (
    <DataRows
      emptyMessage={emptyMessage}
      rows={rows.map((row) => ({
        label: row.label,
        value: row.value,
        meta: row.status,
        id: row.label,
      }))}
    />
  );
}

export { DataRows };
