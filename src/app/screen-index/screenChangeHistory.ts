import type { ScreenDefinition } from '@/data/screenRegistry';

import history from './screenChangeHistory.generated.json';
import { getScreenDeveloperNames, getScreenDevelopers } from './screenDevelopers';

export type ChangeHistoryEntry = (typeof history.reports)[number]['entries'][number];

export type ChangeHistoryReport = (typeof history.reports)[number];

export const screenChangeReports = history.reports;

export function getReportUrlState(query: string) {
  const params = new URLSearchParams(query);
  const date = params.get('report') ?? '';
  const developer = params.get('developer')?.trim() || 'all';
  const normalized = developer.toLowerCase();
  return {
    open: /^\d{4}-\d{2}-\d{2}$/.test(date),
    date,
    developer: ['all', 'unassigned'].includes(normalized) ? normalized : developer,
  };
}

export function getReportNavigationUrl(
  pathname: string,
  query: string,
  selection: { date: string; developer: string } | null,
  hash = '',
) {
  const params = new URLSearchParams(query);
  if (selection) {
    params.set('report', selection.date);
    params.set('developer', selection.developer);
  } else {
    params.delete('report');
    params.delete('developer');
  }
  const search = params.toString();
  return pathname + (search ? '?' + search : '') + hash;
}

export function getChangeReportsForDate(reports: readonly ChangeHistoryReport[], date: string) {
  return reports.filter((report) => report.collectedAtKst.slice(0, 10) === date);
}

export function groupChangeHistoryEntries(entries: readonly ChangeHistoryEntry[]) {
  const groups = new Map<
    string,
    {
      summary: string;
      entries: ChangeHistoryEntry[];
    }
  >();
  entries.forEach((entry) => {
    const key = entry.summary;
    const group = groups.get(key) ?? {
      summary: entry.summary,
      entries: [],
    };
    group.entries.push(entry);
    groups.set(key, group);
  });
  return [...groups.values()];
}

export function getChangeOwnerPath(screen: ScreenDefinition): string {
  return ['eland_hca_01', 'eland_hca_02'].includes(screen.screenCode)
    ? `product:${screen.screenCode}`
    : screen.depths.filter(Boolean).join('|');
}

export function getChangeScreenLabels(entry: ChangeHistoryEntry): string[] {
  if (!entry.owners.length)
    return [entry.affectedIa.length ? '공통 UI · 영향 가능 화면' : '화면 외 공통 · 설정/에셋'];
  return [
    ...new Set(
      entry.owners.map(({ path, href }) => {
        const label =
          path === 'product:eland_hca_01'
            ? '상품 공통 > 상품 목록'
            : path === 'product:eland_hca_02'
              ? '상품 공통 > 상품 상세'
              : path.split('|').filter(Boolean).join(' > ');
        return href ? `${label} · STATE: ${href}` : label;
      }),
    ),
  ];
}

export function getChangeReportTableGroups(
  report: ChangeHistoryReport,
  screens: readonly ScreenDefinition[],
  developerFilter = 'all',
) {
  const groups = new Map<string, ChangeHistoryEntry[]>();
  report.entries.forEach((entry) => {
    const owners = screens.filter((screen) =>
      entry.owners.some(({ path }) => {
        const candidate = getChangeOwnerPath(screen);
        return candidate === path || candidate.startsWith(path + '|');
      }),
    );
    const related = owners.length
      ? owners
      : screens.filter(({ iaNumber }) => entry.affectedIa.includes(iaNumber));
    const names = [
      ...new Set(
        related.flatMap((screen) => {
          const path = getChangeOwnerPath(screen);
          const hrefs = entry.owners
            .filter((owner) => path === owner.path || path.startsWith(owner.path + '|'))
            .map((owner) => owner.href ?? undefined);
          return hrefs.length
            ? hrefs.flatMap((href) =>
                href
                  ? getScreenDevelopers(screen, href).flatMap(({ name }) =>
                      name
                        .split(/[,/]/)
                        .map((part) => part.trim())
                        .filter(Boolean),
                    )
                  : getScreenDeveloperNames(screen),
              )
            : getScreenDeveloperNames(screen);
        }),
      ),
    ].sort((a, b) => a.localeCompare(b, 'ko'));
    if (
      developerFilter === 'unassigned'
        ? names.length > 0
        : developerFilter !== 'all' && !names.includes(developerFilter)
    )
      return;
    const developer =
      (entry.owners.length ? '' : related.length ? '공통 · ' : '') + (names.join(', ') || '미지정');
    const entries = groups.get(developer) ?? [];
    entries.push(entry);
    groups.set(developer, entries);
  });
  return [...groups]
    .sort(([a], [b]) => {
      const order = (name: string) => (name === '미지정' ? 2 : name.startsWith('공통 · ') ? 1 : 0);
      return order(a) - order(b) || a.localeCompare(b, 'ko');
    })
    .map(([developer, entries]) => ({
      developer,
      rowCount: entries.length,
      changes: groupChangeHistoryEntries(entries),
    }));
}
