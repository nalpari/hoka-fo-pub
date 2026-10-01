import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Backdrop } from '@/shared/components/atoms/Backdrop/Backdrop';
import { Button } from '@/shared/components/atoms/Button/Button';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { Select } from '@/shared/components/atoms/Select/Select';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';

const dialog = css({ w: '100%', minH: '520px', bg: '#fff', _mobile: { minH: '100%' } });

const inner = css({
  w: 'min(100% - 48px, 820px)',
  mx: 'auto',
  pt: '26px',
  pb: '20',
  _mobile: { w: 'min(100% - 32px, 820px)', pt: '4' },
});

const heading = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: '5',
  '& h2': { m: '0', fontSize: '17px' },
});

const close = css({
  w: '8',
  h: '8',
  border: '0',
  bg: 'transparent',
  fontSize: '28px',
  lineHeight: '1',
});

const form = css({
  display: 'grid',
  gridTemplateColumns: '78px minmax(0, 1fr) 66px',
  border: '1px solid #dadada',
  '& input': { w: '100%', h: '11', minW: '0', border: '0', bg: '#fff', color: '#222', px: '3.5', fontSize: '13px' },
  '& input::placeholder': { color: '#9a9a9a' },
});

const categoryStyle = css({
  borderRight: '1px solid #dadada',
  '& select': { w: '100%', h: '11', border: '0', bg: '#fff', color: '#222', px: '2', fontSize: '13px', fontWeight: '600' },
});

const submit = css({ border: '0', bg: '#151515', color: '#fff', fontSize: '13px', fontWeight: '700' });

const collectionLinksStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0',
  py: '18px',
  _mobile: { justifyContent: 'flex-start', rowGap: '2', columnGap: '0' },
  '& button': { border: '0', borderRight: '1px solid #ddd', py: '0', px: '4', bg: 'transparent', color: '#444', fontSize: '12px', fontWeight: '600', _hover: { textDecoration: 'underline' }, _mobile: { px: '2.5' } },
  '& button:last-child': { borderRight: '0' },
});

const suggestions = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  minH: '250px',
  border: '1px solid #e2e2e2',
  borderTop: '0',
  _mobile: { gridTemplateColumns: '1fr' },
  '& section': { p: '4' },
  '& header': { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  '& h3': { m: '0', fontSize: '14px' },
  '& header button': { border: '0', p: '0', bg: 'transparent', color: '#999', fontSize: '11px' },
  '& ul, & ol': { m: '22px 0 0', p: '0', listStyle: 'none' },
  '& li': { display: 'flex', alignItems: 'center', justifyContent: 'space-between', minH: '26px', fontSize: '13px' },
  '& p': { display: 'grid', minH: '158px', m: '0', placeItems: 'center', color: '#666', fontSize: '13px', textAlign: 'center' },
});

const recent = css({ borderRight: '1px solid #e2e2e2', _mobile: { borderRight: '0', borderBottom: '1px solid #e2e2e2' } });

const recentQuery = css({ border: '0', p: '0', bg: 'transparent', color: '#333', fontSize: 'inherit', textAlign: 'left', _hover: { textDecoration: 'underline' } });

const remove = css({ border: '0', bg: 'transparent', color: '#aaa', fontSize: '17px', lineHeight: '1' });

const recommended = css({
  '& ol': { counterReset: 'item' },
  '& li': { justifyContent: 'flex-start', gap: '7px' },
  '& li::before': { counterIncrement: 'item', content: "counter(item) '.'" },
  '& button': { border: '0', p: '0', bg: 'transparent', color: '#333', fontSize: 'inherit', textAlign: 'left', _hover: { textDecoration: 'underline' } },
});

const srOnly = css({ position: 'absolute', w: '1px', h: '1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap' });

const storageKey = 'hoka-recent-searches';
const suggestedSearches = [
  '플라잉77 경량 다운',
  '26FW 브리즈 신규 발매',
  '호카 베스트 바람막이',
  '1906REH 재입고',
  '빈티지무드 베스트 반팔티',
];

const collectionLinks = [
  { label: '플라잉77 경량 다운', id: '8386' },
  { label: '26FW 브리즈 신규 발매', id: '8309' },
  { label: '호카 베스트 바람막이', id: '8311' },
  { label: '1906REH 재입고', id: '8300' },
  { label: '빈티지무드 베스트 반팔티', id: '8002' },
];

type SearchOverlayProps = { onClose: () => void };

const readRecentSearches = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
    return Array.isArray(stored)
      ? stored.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
};

/** Global search dialog with persisted recent searches and collection recommendations. */
export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [category, setCategory] = useState('전체');
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(readRecentSearches);
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const persistRecentSearches = (next: string[]) => {
    setRecentSearches(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const search = (nextQuery = query) => {
    const normalizedQuery = nextQuery.trim();
    if (!normalizedQuery) return;

    persistRecentSearches(
      [normalizedQuery, ...recentSearches.filter((item) => item !== normalizedQuery)].slice(0, 10),
    );
    navigate(
      `/search?q=${encodeURIComponent(normalizedQuery)}&category=${encodeURIComponent(category)}`,
    );
    onClose();
  };

  const removeRecentSearch = (queryToRemove: string) => {
    persistRecentSearches(recentSearches.filter((item) => item !== queryToRemove));
  };

  return (
    <Backdrop layer="overlay" onClose={onClose} placement="fill" tone="black72">
      <section
        aria-labelledby="site-search-title"
        aria-modal="true"
        className={dialog}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <Box className={inner}>
          <Box className={heading}>
            <h2 id="site-search-title">검색</h2>
            <IconButton aria-label="검색 닫기" className={close} onClick={onClose}>
              ×
            </IconButton>
          </Box>
          <form
            className={form}
            onSubmit={(event) => {
              event.preventDefault();
              search();
            }}
          >
            <label className={categoryStyle}>
              <span className={srOnly}>검색 범위</span>
              <Select onChange={(event) => setCategory(event.target.value)} value={category}>
                <option>전체</option>
                <option>상품</option>
                <option>컬렉션</option>
                <option>이벤트</option>
              </Select>
            </label>
            <TextInput
              autoFocus
              onBlur={() => setIsFocused(false)}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="상품명 혹은 스타일코드 검색"
              type="search"
              value={query}
            />
            <Button className={submit} type="submit" variant="primary">
              검색
            </Button>
          </form>
          <nav aria-label="기획전 바로가기" className={collectionLinksStyle}>
            {collectionLinks.map((collection) => (
              <Button
                key={collection.id}
                onClick={() => {
                  navigate(`/collection/${collection.id}`);
                  onClose();
                }}
              >
                {collection.label}
              </Button>
            ))}
          </nav>
          {isFocused ? (
            <Box className={suggestions}>
              <section className={recent} aria-labelledby="recent-search-title">
                <header>
                  <h3 id="recent-search-title">최근 검색어</h3>
                  {recentSearches.length ? (
                    <Button
                      onClick={() => persistRecentSearches([])}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      전체 기록 삭제
                    </Button>
                  ) : null}
                </header>
                {recentSearches.length ? (
                  <ul>
                    {recentSearches.map((recent) => (
                      <li key={recent}>
                        <Button
                          className={recentQuery}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => search(recent)}
                        >
                          {recent}
                        </Button>
                        <IconButton
                          aria-label={`${recent} 삭제`}
                          className={remove}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => removeRecentSearch(recent)}
                          size="26px"
                        >
                          ×
                        </IconButton>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>최근 검색어 내역이 없습니다.</p>
                )}
              </section>
              <section className={recommended} aria-labelledby="recommended-search-title">
                <h3 id="recommended-search-title">추천 검색어</h3>
                <ol>
                  {suggestedSearches.map((suggestion) => (
                    <li key={suggestion}>
                      <Button
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => search(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    </li>
                  ))}
                </ol>
              </section>
            </Box>
          ) : null}
        </Box>
      </section>
    </Backdrop>
  );
}
