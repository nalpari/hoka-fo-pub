import { DataRows } from '@/shared/components/molecules/DataRows/DataRows';

export type AccountDataRow = { label: string; value: string; status?: string };

type Props = { rows: AccountDataRow[]; emptyMessage?: string };

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
