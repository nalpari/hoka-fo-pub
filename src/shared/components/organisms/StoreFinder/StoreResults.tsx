import type { Store } from '@/shared/features/store-finder/store.data';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

export function StoreResults({ stores }: { stores: Store[] }) {
  return (
    <Box className={storeList} id="stores">
      {stores.map((store) => (
        <article key={store.name}>
          <Box>
            <h2>{store.name}</h2>
            <p>{store.address}</p>
            <small>
              {store.type} <i>|</i> {store.phone}
            </small>
          </Box>
          <Button aria-label={`${store.name} 약도 보기`} variant="ghost">
            <b>♧</b>
            <span>약도보기</span>
          </Button>
        </article>
      ))}
      {!stores.length && <p className={noResult}>검색 결과가 없습니다.</p>}
    </Box>
  );
}

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
    color: 'var(--color-black-50)',
    fontSize: '12' /* 기존: 10px */,
  },
  '& article button b': {
    fontSize: '28' /* 기존 30px */,
    fontWeight: 'var(--font-weights-normal)',
    lineHeight: 'var(--line-heights-hoka)',
  },
  '& h2': { m: '0 0 var(--spacing-3)', fontSize: '14' },
  '& p': {
    m: '0 0 1',
    color: 'var(--color-black-50)',
    fontSize: '12' /* 기존: 11px */,
    _mobile: { maxW: '260px', lineHeight: 'var(--line-heights-body)' },
  },
  '& small': { color: 'var(--color-red-100)', fontSize: '12' /* 기존: 11px */ },
  '& i': { color: 'var(--color-black-40)', fontStyle: 'normal' },
});

const noResult = css({
  p: '70px',
  color: 'var(--color-black-50)',
  textAlign: 'center',
});
