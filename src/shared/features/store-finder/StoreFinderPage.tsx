import { useMemo, useState } from 'react';
import { StoreResults } from '@/shared/components/organisms/StoreFinder/StoreResults';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { Button } from '@/shared/components/atoms/Button/Button';
import { LoadMoreButton } from '@/shared/components/atoms/LoadMoreButton/LoadMoreButton';
import { Select } from '@/shared/components/atoms/Select/Select';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import {
  regions,
  stores,
  storeTypes,
  type StoreType,
} from '@/shared/features/store-finder/store.data';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import styles from '@/shared/features/store-finder/StoreFinderPage.module.scss';

export function StoreFinderPage() {
  const [keyword, setKeyword] = useState('');
  const [region, setRegion] = useState('전체');
  const [type, setType] = useState<StoreType>('전체');
  const [shown, setShown] = useState(6);
  const filtered = useMemo(
    () =>
      stores.filter(
        (store) =>
          (type === '전체' || store.type === type) &&
          (region === '전체' || store.address.includes(region)) &&
          `${store.name} ${store.address}`.toLowerCase().includes(keyword.toLowerCase()),
      ),
    [keyword, region, type],
  );
  const resetList = () => setShown(6);
  return (
    <SidebarNavigationLayout
      activePath="/support/store"
      className={styles.page}
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <section className={styles.content}>
        <PageHeader title="매장 찾기" />
        <form
          className={styles.search}
          onSubmit={(event) => {
            event.preventDefault();
            resetList();
          }}
        >
          <label>
            매장 검색
            <TextInput
              aria-label="매장명 또는 주소"
              placeholder="매장명 또는 주소로 검색이 가능합니다."
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
                resetList();
              }}
            />
          </label>
          <Button type="submit" variant="primary">
            검색
          </Button>
          <label>
            지역 검색
            <Select
              value={region}
              onChange={(event) => {
                setRegion(event.target.value);
                resetList();
              }}
            >
              {regions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
          </label>
        </form>
        <nav className={styles.tabs}>
          {storeTypes.map((item) => (
            <Button
              className={type === item ? styles.active : ''}
              onClick={() => {
                setType(item);
                resetList();
              }}
              key={item}
            >
              {item}
            </Button>
          ))}
        </nav>
        <StoreResults stores={filtered.slice(0, shown)} />
        {shown < filtered.length && (
          <LoadMoreButton
            className={styles.more}
            onClick={() => setShown((count) => count + 6)}
            remaining={filtered.length - shown}
          />
        )}
      </section>
    </SidebarNavigationLayout>
  );
}
