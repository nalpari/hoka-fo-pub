'use client';

/**
 * [개발팀 바인딩]
 * RunningSessionDataContext.detail에 경로 ID의 session/facts/guide/recommendedProducts와 apply를 연결합니다.
 * 정원/예약금/신청기간은 facts로 받습니다. apply의 서버 신청 및 결제 완료 후 resolve해야 접수 안내를 표시합니다.
 */

import { useParams } from 'next/navigation';

import { useContext, useEffect, useState } from 'react';
import { usePlatform } from '@/context/platform';
import { RunningSessionDataContext } from '@/context/RunningSessionDataContext';
import { RunningSessionSessionContext } from '@/context/RunningSessionSessionContext';
import { useBindingQuery } from '@/hooks/useBindingQuery';
import { useRequestAction } from '@/hooks/useRequestAction';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { SystemStatusPage } from '@/components/common/organisms/SystemStatusPage';

import { runningSessionAddress, runningSessionSessions, runningSessionVenue } from '@/components/running-session/runningSession.data';
import { products } from '@/mocks/products';

import {
  RunningSessionApplicationNotice,
  RunningSessionDetailLayout,
  type RunningSessionFact,
  RunningSessionFixedActionBar,
  type RunningSessionGuideRow,
  RunningSessionRecommendations,
  RunningSessionSessionGuide,
  RunningSessionSessionHero,
  RunningSessionSessionImage,
} from './_components/RunningSessionSessionContent';

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
  const suppliedSession = useContext(RunningSessionSessionContext);
  const binding = useContext(RunningSessionDataContext).detail;
  const request = useRequestAction();
  const { sessionId } = useParams<{ sessionId: string }>();
  useBindingQuery(binding?.onQueryChange, { id: sessionId });
  const platform = usePlatform();
  const [showApplicationNotice, setShowApplicationNotice] = useState(false);
  const session = binding
    ? binding.session
    : (suppliedSession ?? runningSessionSessions.find((candidate) => candidate.id === sessionId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sessionId]);

  if (!session)
    return binding?.pending || binding?.error ? (
      <BindingFeedback {...binding} />
    ) : (
      <SystemStatusPage status="not-found" />
    );
  const apply = () => {
    void request.run(async () => {
      if (binding) await binding.apply(session.id);
      setShowApplicationNotice(true);
    });
  };

  const recommendedProducts = binding
    ? [...(binding.recommendedProducts ?? [])]
    : products.slice(0, 6);
  const heroRows: readonly RunningSessionFact[] = binding
    ? binding.facts
    : [
        { label: '일시', value: session.schedule },
        { label: '장소', value: runningSessionVenue, detail: runningSessionAddress },
        { label: '정원', value: '20명' },
        {
          label: '예약금',
          value: '5,000원',
          detail: '노쇼 방지를 위해 예약금을 받고 있습니다. 현장 출석 확인 후 자동 취소 됩니다.',
        },
        { label: '신청 기간', value: '1월 23일 (토) - 1월 29일 (금)' },
      ];
  const guideRows: readonly RunningSessionGuideRow[] = binding
    ? binding.guide
    : [
        { label: '장소', value: `${runningSessionVenue} · ${runningSessionAddress}` },
        { label: '체크인', value: '세션 시작 20분 전부터' },
        { label: '소요시간', value: '약 1시간 30분 소요' },
        { label: '코스', value: session.location },
        { label: '페이스', value: '6′30″ / 7′00″ (중급 레벨)' },
        { label: '거리', value: session.distance },
        { label: '준비물', value: '러닝화, 편안한 복장, 헤드 랜턴' },
        { label: '혜택', value: '세션에서 제공되는 선물 & 트라이얼 서비스' },
      ];

  return (
    <RunningSessionDetailLayout
      hero={
        <>
          <BindingFeedback
            pending={binding?.pending || request.pending}
            error={binding?.error || request.error}
            onRetry={binding?.onRetry}
          />
          <RunningSessionSessionHero session={session} rows={[...heroRows]} onApply={apply} />
        </>
      }
      guide={<RunningSessionSessionGuide session={session} rows={[...guideRows]} />}
      desktopContent={
        <>
          {session.id === 'bukchon-night' ? <RunningSessionSessionImage /> : null}
          <RunningSessionRecommendations products={recommendedProducts} platform={platform} />
        </>
      }
      mobileAction={<RunningSessionFixedActionBar status={session.status} onApply={apply} />}
      applicationNotice={
        <RunningSessionApplicationNotice
          registered={!!binding}
          open={showApplicationNotice}
          onOpenChange={setShowApplicationNotice}
        />
      }
    />
  );
}
