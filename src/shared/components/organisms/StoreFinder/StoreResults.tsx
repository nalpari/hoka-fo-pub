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

const storeList = css({ '& article': { display: 'flex', alignItems: 'center', justifyContent: 'space-between', minH: '135px', p: '6 15px', borderBottom: '1px solid #ddd', _mobile: { p: '5 1' } }, '& article button': { display: 'grid', justifyItems: 'center', gap: '0.5', border: '0', color: '#777', fontSize: '10px' }, '& article button b': { fontSize: '30px', fontWeight: '400', lineHeight: '0.75' }, '& h2': { m: '0 0 11px', fontSize: '14px' }, '& p': { m: '0 0 1', color: '#777', fontSize: '11px', _mobile: { maxW: '260px', lineHeight: '1.5' } }, '& small': { color: '#ef3340', fontSize: '11px' }, '& i': { color: '#aaa', fontStyle: 'normal' } });

const noResult = css({ p: '70px', color: '#777', textAlign: 'center' });
