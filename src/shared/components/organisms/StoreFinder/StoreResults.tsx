import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

export type StoreResult = {
  name: string;
  address: string;
  type: string;
  phone: string;
};

export type StoreResultsProps = { stores: readonly StoreResult[] };

const storeList = css({
  '& article': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minH: '135px',
    px: '4',
    py: '6',
    borderBottom: '1px solid var(--color-black-20)',
    _mobile: { p: '5 1' },
  },
  '& article button': {
    display: 'grid',
    justifyItems: 'center',
    gap: '0.5',
    border: '0',
    color: 'var(--color-text-tertiary)',
    fontSize: '12' /* 기존: 10px */,
  },
  '& article button b': {
    fontSize: '28' /* 기존 30px */,
    fontWeight: 'var(--font-weights-normal)',
    lineHeight: 'var(--line-heights-hoka)',
  },
  '& h2': { m: '0 0 var(--spacing-3)' },
  '& p': {
    m: '0 0 1',
    _mobile: { maxW: '260px' },
  },
  '& i': { color: 'var(--color-black-40)', fontStyle: 'normal' },
});

const noResult = css({
  p: '70px',
  color: 'var(--color-text-tertiary)',
  textAlign: 'center',
});

export function StoreResults({ stores }: StoreResultsProps) {
  return (
    <Box className={storeList} id="stores">
      {stores.map((store) => (
        <article key={store.name}>
          <Box>
            <Typography as="h2" variant="body4" weight="bold">
              {store.name}
            </Typography>
            <Typography as="p" variant="body5" tone="tertiary">
              {store.address}
            </Typography>
            <Typography as="small" variant="body5" tone="red80">
              {store.type} <i>|</i> {store.phone}
            </Typography>
          </Box>
          <Button aria-label={`${store.name} 약도 보기`} variant="ghost">
            <b>♧</b>
            <span>약도보기</span>
          </Button>
        </article>
      ))}
      {!stores.length && (
        <Typography as="p" variant="body5" tone="tertiary" className={noResult}>
          검색 결과가 없습니다.
        </Typography>
      )}
    </Box>
  );
}
