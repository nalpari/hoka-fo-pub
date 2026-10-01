import { useMemo, useState } from 'react';
import { Box, Flex } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { screens } from '@/data/screenRegistry';
import { ProgressBar } from '@/shared/components/atoms/ProgressBar/ProgressBar';
import { Button } from '@/shared/components/atoms/Button/Button';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import { storybookUrlsFor } from '@/shared/features/screen-index/storybookLinks';

const styles = {
  tabs: css({ display: 'flex', gap: '6', borderBottom: '1px solid #d9d9d9', _mobile: { gap: '4', overflowX: 'auto' }, '& button': { pb: '3.5', border: '0', borderBottom: '2px solid transparent', bg: 'transparent', color: '#666', fontSize: '15px', fontWeight: '600', cursor: 'pointer', _mobile: { flex: '0 0 auto' } } }),
  activeTab: css({ borderColor: '#111!', color: '#111!' }),
  panel: css({ pt: '6' }),
  depthSummary: css({ mb: '6', '& h2': { m: '0 0 3', fontSize: '16px' } }),
  depthTabs: css({ display: 'flex', gap: '2', overflowX: 'auto', borderBottom: '1px solid #ddd', '& button': { flex: '0 0 auto', p: '2.5 3', border: '0', borderBottom: '2px solid transparent', bg: 'transparent', color: '#666', fontSize: '13px', fontWeight: '600', cursor: 'pointer' } }),
  activeDepthTab: css({ borderColor: '#111!', color: '#111!' }),
  depthProgress: css({ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))', gap: '4', p: '4', border: '1px solid #ddd', borderTop: '0', _mobile: { gridTemplateColumns: '1fr' } }),
  progressLabel: css({ display: 'flex', justifyContent: 'space-between', gap: '2', mb: '2.5', fontSize: '13px', '& span': { color: '#666' }, '& b': { color: '#111' } }),
  toolbar: css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4', mb: '4', _mobile: { display: 'grid' }, '& p': { m: '0', color: '#666', fontSize: '14px' }, '& input': { w: 'min(100%, 280px)', _mobile: { w: '100%' } } }),
  tableWrap: css({ overflowX: 'auto', border: '1px solid #ddd' }),
  table: css({ w: '100%', minW: '1150px', borderCollapse: 'collapse', fontSize: '13px', '& th, & td': { p: '3 2.5', borderBottom: '1px solid #e7e7e7', textAlign: 'left', whiteSpace: 'nowrap' }, '& th': { bg: '#f7f7f7', fontSize: '12px', color: '#444' }, '& tbody tr:hover': { bg: '#fafafa' } }),
  note: css({ minW: '320px', maxW: '520px', whiteSpace: 'normal!', lineHeight: '1.5' }),
  screenLinks: css({ display: 'flex', gap: '2', '& a': { color: '#111', fontWeight: '700', textDecoration: 'underline', textUnderlineOffset: '3px' } }),
  empty: css({ m: '8 0', color: '#666', textAlign: 'center' }),
  guide: css({ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #111', _mobile: { gridTemplateColumns: '1fr' }, '& article': { minH: '190px', p: '6', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', _mobile: { borderRight: '0' } }, '& article:last-child': { borderRight: '0' }, '& small': { color: '#777', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em' }, '& h2': { m: '4 0 2.5', fontSize: '20px' }, '& p': { m: '0', color: '#666', lineHeight: '1.6' } }),
};

type TabId = 'screens' | 'guide';

const tabs: { id: TabId; label: string }[] = [
  { id: 'screens', label: '화면 검수 목록' },
  { id: 'guide', label: 'Design Guide' },
];

const workStages = [
  { id: 'planning', label: '기획' },
  { id: 'design', label: '디자인' },
  { id: 'publishing', label: '퍼블' },
] as const;

const completedRequirementIds: Record<(typeof workStages)[number]['id'], ReadonlySet<string>> = {
  planning: new Set(),
  design: new Set(),
  publishing: new Set(),
};

const pageLayout = css({
  maxW: 'var(--layout-content-max-width)',
  mx: 'auto',
  py: '16',
  _mobile: {
    px: 'var(--layout-mobile-inline-gutter)',
    py: 'var(--layout-mobile-page-block-padding)',
  },
});

function ScreenList() {
  const [query, setQuery] = useState('');
  const depth1Groups = useMemo(
    () =>
      Array.from(new Set(screens.map((screen) => screen.depth1))).map((depth1) => ({
        depth1,
        total: screens.filter((screen) => screen.depth1 === depth1).length,
      })),
    [],
  );
  const [activeDepth1, setActiveDepth1] = useState(() => depth1Groups[0]?.depth1 ?? '');
  const activeDepth1Group =
    depth1Groups.find((group) => group.depth1 === activeDepth1) ?? depth1Groups[0];
  const rows = useMemo(
    () =>
      screens.filter((screen) => {
        const searchTarget =
          `${screen.id} ${screen.depth1} ${screen.depth2} ${screen.depth3} ${screen.note}`.toLowerCase();
        return searchTarget.includes(query.trim().toLowerCase());
      }),
    [query],
  );

  return (
    <>
      <section className={styles.depthSummary} aria-label="Depth 1별 작업 현황">
        <div className={styles.depthTabs} role="tablist" aria-label="Depth 1별 작업 현황">
          {depth1Groups.map((group) => (
            <Button
              key={group.depth1}

              role="tab"
              aria-selected={activeDepth1 === group.depth1}
              className={activeDepth1 === group.depth1 ? styles.activeDepthTab : ''}
              onClick={() => setActiveDepth1(group.depth1)}
            >
              {group.depth1}
            </Button>
          ))}
        </div>
        {activeDepth1Group && (
          <div className={styles.depthProgress} role="tabpanel">
            {workStages.map((stage) => {
              const completedPages = screens.filter(
                (screen) =>
                  screen.depth1 === activeDepth1Group.depth1 &&
                  completedRequirementIds[stage.id].has(screen.id),
              ).length;
              return (
                <div key={stage.id}>
                  <div className={styles.progressLabel}>
                    <strong>{stage.label}</strong>
                    <span>
                      <b>{completedPages}</b> / {activeDepth1Group.total} 페이지
                    </span>
                  </div>
                  <ProgressBar
                    value={completedPages}
                    max={activeDepth1Group.total}
                    label={`${activeDepth1Group.depth1} ${stage.label} 진척률`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>
      <Flex className={styles.toolbar}>
        <p>
          전체 <strong>{screens.length}</strong>개 화면 중 <strong>{rows.length}</strong>개를
          표시합니다.
        </p>
        <TextInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="요구사항 또는 ID 검색"
          aria-label="화면 검색"
        />
      </Flex>
      <Box className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Depth 1</th>
              <th>Depth 2</th>
              <th>Depth 3</th>
              <th>PC/MO</th>
              <th>비고</th>
              <th>기획</th>
              <th>디자인</th>
              <th>퍼블리싱</th>
              <th>담당자 확인</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((screen) => {
              const storybookUrls = storybookUrlsFor(screen.id);
              return (
                <tr key={screen.id}>
                  <td>{screen.id}</td>
                  <td>{screen.depth1}</td>
                  <td>{screen.depth2}</td>
                  <td>{screen.depth3}</td>
                  <td className={styles.screenLinks}>
                    {storybookUrls?.web && (
                      <a href={storybookUrls.web} target="_blank" rel="noreferrer">
                        WEB
                      </a>
                    )}
                    {storybookUrls?.mobile && (
                      <a href={storybookUrls.mobile} target="_blank" rel="noreferrer">
                        MO
                      </a>
                    )}
                  </td>
                  <td className={styles.note}>{screen.note}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
      {!rows.length && <p className={styles.empty}>검색 결과가 없습니다.</p>}
    </>
  );
}

function DesignGuide() {
  return (
    <section className={styles.guide} aria-label="Design Guide">
      <article>
        <small>FOUNDATION</small>
        <h2>색상과 여백</h2>
        <p>
          주요 색상은 Black, White, Gray를 기준으로 사용하며 콘텐츠 영역은 일관된 여백과 구분선을
          적용합니다.
        </p>
      </article>
      <article>
        <small>TYPOGRAPHY</small>
        <h2>정보 위계</h2>
        <p>페이지 제목, 섹션 제목, 본문 순서로 크기와 굵기를 구분해 읽기 흐름을 만듭니다.</p>
      </article>
      <article>
        <small>INTERACTION</small>
        <h2>상태 표현</h2>
        <p>완료·진행 중·예정 상태는 텍스트와 색상을 함께 사용해 명확하게 표시합니다.</p>
      </article>
    </section>
  );
}

export function ScreenIndexPage() {
  const [activeTab, setActiveTab] = useState<TabId>('screens');
  return (
    <ContentLayout
      className={pageLayout}
      breadcrumbItems={[{ label: 'HOME', href: '/' }, { label: '개발 검수' }]}
      title="개발 검수 허브"
      description="화면 목록, 디자인 기준 및 컴포넌트 구성을 한 곳에서 확인합니다."
    >
      <Flex className={styles.tabs} role="tablist" aria-label="개발 검수 메뉴">
        {tabs.map((tab) => (
          <Button
            key={tab.id}

            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? styles.activeTab : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </Flex>
      <Box className={styles.panel} role="tabpanel">
        {activeTab === 'screens' && <ScreenList />}
        {activeTab === 'guide' && <DesignGuide />}
      </Box>
    </ContentLayout>
  );
}
