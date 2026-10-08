import { useMemo, useState } from 'react';
import { css } from 'styled-system/css';
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

export const storeFinderStyles = {
  page: css({ '--support-content-width': '710px', '--support-max-width': '1100px' }),
  content: css({ '--support-content-title-gap': '37px' }),
  search: css({
    display: 'grid',
    gridTemplateColumns: '80px 315px 63px',
    alignItems: 'center',
    rowGap: '3.5',
    columnGap: '3',
    py: '8',
    px: '30px',
    borderTop: '2px solid var(--color-black-60)',
    bg: 'var(--color-black-10)',
    fontSize: '14' /* 기존 13px */,
    _mobile: { gridTemplateColumns: '65px 1fr 55px', gap: '2.5', py: '5', px: '3.5' },
    '& label': { display: 'contents' },
    '& input, & select': {
      h: '37px',
      px: '3',
      border: '1px solid var(--color-black-20)',
      bg: 'var(--color-white-000)',
      fontSize: '12',
    },
    '& select': { w: '165px', gridColumn: '2' },
    '& button': {
      h: '37px',
      p: '0',
      bg: 'var(--color-black-100)',
      color: 'var(--color-white-000)',
      fontSize: '12',
    },
    '& input': { _mobile: { minW: '0' } },
  }),
  tabs: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    mt: '16',
    borderBottom: '1px solid var(--color-black-100)',
    _mobile: { overflow: 'auto', gridTemplateColumns: 'repeat(5, 125px)' },
    '& button': {
      h: '12',
      border: '1px solid var(--color-black-20)',
      borderBottom: '0',
      bg: 'var(--color-white-000)',
      fontSize: '14' /* 기존 13px */,
    },
  }),
  active: css({
    borderColor: 'var(--color-black-100)!',
    borderBottom: '1px solid var(--color-white-000)!',
    fontWeight: 'var(--font-weights-bold)',
  }),
  more: css({
    display: 'block',
    m: '30px auto 0',
    border: '0',
    fontSize: '14' /* 기존 13px */,
  }),
};

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
      className={storeFinderStyles.page}
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <section className={storeFinderStyles.content}>
        <PageHeader title="매장 찾기" />
        <form
          className={storeFinderStyles.search}
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
        <nav className={storeFinderStyles.tabs}>
          {storeTypes.map((item) => (
            <Button
              className={type === item ? storeFinderStyles.active : ''}
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
            className={storeFinderStyles.more}
            onClick={() => setShown((count) => count + 6)}
            remaining={filtered.length - shown}
          />
        )}
      </section>
    </SidebarNavigationLayout>
  );
}
