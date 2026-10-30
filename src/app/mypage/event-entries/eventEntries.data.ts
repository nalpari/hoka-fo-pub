import type { RunningSessionEntry } from '@/context/RunningSessionDataContext';

import { runningSessionSessions } from '@/components/running-session/runningSession.data';

export const eventEntryPreview = {
  totalCount: 62,
  pageInfo: { current: 1, total: 10 },
  items: [
    {
      id: 'preview-entry-bukhansan',
      session: {
        ...runningSessionSessions[2],
        image: '/images/mypage/event-entries/entry-trail.png',
        title: '북악산 트레일 세션',
        location: '북한산 국립공원',
        distance: '10KM',
        schedule: '2026.11.10(금) 19:30~21:30',
      },
      status: '종료',
      appliedAt: '2025.09.30',
      canCancel: false,
    },
    {
      id: 'preview-entry-marathon',
      session: {
        ...runningSessionSessions[1],
        image: '/images/mypage/event-entries/entry-marathon.png',
        title: '호카와 함께한 2025 서울마라톤',
        location: '북한산 국립공원',
        distance: '40KM',
        schedule: '2026.11.10(금) 19:30~21:30',
      },
      status: '신청완료',
      appliedAt: '2025.09.30',
      canCancel: true,
    },
    {
      id: 'preview-entry-jeju',
      session: {
        ...runningSessionSessions[0],
        image: '/images/mypage/event-entries/entry-jeju.png',
        title: '파리에서 제주까지. 함께 달리는 발걸음',
        location: '북한산 국립공원',
        distance: '20KM',
        schedule: '2026.11.10(금) 19:30~21:30',
      },
      status: '취소',
      appliedAt: '2025.09.30',
      canCancel: false,
    },
  ] satisfies RunningSessionEntry[],
};
