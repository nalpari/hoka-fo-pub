import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { DataTable } from '@/shared/components/atoms/DataTable/DataTable';

const secondaryHeader = css({ '& thead tr:nth-child(2) th': { bg: 'var(--color-off-white-100)' } });

const sizeRows = [
  ['220', '5', '230', '6'],
  ['225', '5½', '235', '6½'],
  ['230', '6', '240', '7'],
  ['235', '6½', '245', '7½'],
  ['240', '7', '250', '8'],
  ['245', '7½', '255', '8½'],
  ['250', '8', '260', '9'],
  ['255', '8½', '265', '9½'],
  ['260', '9', '270', '10'],
] as const;

/** 한국·미국 신발 사이즈와 발볼 기준을 안내합니다. */
export function SizeGuideTable() {
  return (
    <Box mt="38px">
      <h3 className={css({ m: '36px 0 14px', fontSize: '16' /* 기존 17px */ })}>발 길이(성인)</h3>
      <DataTable caption="성인 발 길이 사이즈표" className={secondaryHeader}>
        <thead>
          <tr>
            <th colSpan={2}>남성</th>
            <th colSpan={2}>여성</th>
          </tr>
          <tr>
            <th>한국 (mm)</th>
            <th>미국</th>
            <th>한국 (mm)</th>
            <th>미국</th>
          </tr>
        </thead>
        <tbody>
          {sizeRows.map(([menMm, menUs, womenMm, womenUs]) => (
            <tr key={menMm}>
              <td>{menMm}</td>
              <td>{menUs}</td>
              <td>{womenMm}</td>
              <td>{womenUs}</td>
            </tr>
          ))}
        </tbody>
      </DataTable>
      <h3 className={css({ m: '36px 0 14px', fontSize: '16' /* 기존 17px */ })}>발볼 넓이</h3>
      <DataTable caption="발볼 넓이 사이즈표">
        <thead>
          <tr>
            <th>성별</th>
            <th>B</th>
            <th>D</th>
            <th>2E</th>
            <th>4E</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>남성</th>
            <td>좁음</td>
            <td>보통</td>
            <td>약간 넓음</td>
            <td>넓음</td>
          </tr>
          <tr>
            <th>여성</th>
            <td>보통</td>
            <td>약간 넓음</td>
            <td>넓음</td>
            <td>-</td>
          </tr>
        </tbody>
      </DataTable>
    </Box>
  );
}
