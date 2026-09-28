import type { Store } from '@/shared/features/store-finder/store.data';
import styles from '@/shared/features/store-finder/StoreFinderPage.module.scss';
import { Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
export function StoreResults({ stores }: { stores: Store[] }) {
  return (
    <Box className={styles.storeList} id="stores">
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
      {!stores.length && <p className={styles.noResult}>검색 결과가 없습니다.</p>}
    </Box>
  );
}
