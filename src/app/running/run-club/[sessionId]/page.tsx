'use client';

import { useContext } from 'react';
import { RunClubSessionContext } from '@/components/features/run-club/RunClubSessionContext';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NotFoundPage } from '@/components/features/not-found/NotFoundPage';
import { usePlatform } from '@/context/platform';
import { products } from '@/mocks/products';
import {
  runClubSessions,
  runClubVenue,
  runClubAddress,
} from '@/components/features/run-club/runClub.data';
import { RunClubSessionHero } from '@/components/features/run-club/RunClubSessionHero';
import {
  RunClubSessionGuide,
  type RunClubGuideRow,
} from '@/components/features/run-club/RunClubSessionGuide';
import { RunClubSessionImage } from '@/components/features/run-club/RunClubSessionImage';
import { RunClubRecommendations } from '@/components/features/run-club/RunClubRecommendations';
import { RunClubApplicationNotice } from '@/components/features/run-club/RunClubApplicationNotice';
import { RunClubMobileActionBar } from '@/components/features/run-club/RunClubMobileActionBar';
import { RunClubDetailLayout } from '@/components/features/run-club/RunClubDetailLayout';
import type { RunClubFact } from '@/components/features/run-club/RunClubFacts';

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
  const suppliedSession = useContext(RunClubSessionContext);
  const { sessionId } = useParams<{ sessionId: string }>();
  const platform = usePlatform();
  const [showApplicationNotice, setShowApplicationNotice] = useState(false);
  const session =
    suppliedSession ?? runClubSessions.find((candidate) => candidate.id === sessionId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sessionId]);

  if (!session) return <NotFoundPage />;

  const recommendedProducts = products.slice(0, 6);
  const heroRows: RunClubFact[] = [
    { label: '일시', value: session.schedule },
    { label: '장소', value: runClubVenue, detail: runClubAddress },
    { label: '정원', value: '20명' },
    {
      label: '예약금',
      value: '5,000원',
      detail: '노쇼 방지를 위해 예약금을 받고 있습니다. 현장 출석 확인 후 자동 취소 됩니다.',
    },
    { label: '신청 기간', value: '1월 23일 (토) - 1월 29일 (금)' },
  ];
  const guideRows: RunClubGuideRow[] = [
    { label: '장소', value: `${runClubVenue} · ${runClubAddress}` },
    { label: '체크인', value: '세션 시작 20분 전부터' },
    { label: '소요시간', value: '약 1시간 30분 소요' },
    { label: '코스', value: session.location },
    { label: '페이스', value: '6′30″ / 7′00″ (중급 레벨)' },
    { label: '거리', value: session.distance },
    { label: '준비물', value: '러닝화, 편안한 복장, 헤드 랜턴' },
    { label: '혜택', value: '세션에서 제공되는 선물 & 트라이얼 서비스' },
  ];

  return (
    <RunClubDetailLayout
      hero={
        <RunClubSessionHero
          session={session}
          rows={heroRows}
          onApply={() => setShowApplicationNotice(true)}
        />
      }
      guide={<RunClubSessionGuide session={session} rows={guideRows} />}
      desktopContent={
        <>
          {session.id === 'bukchon-night' ? <RunClubSessionImage /> : null}
          <RunClubRecommendations products={recommendedProducts} platform={platform} />
        </>
      }
      mobileAction={
        <RunClubMobileActionBar
          status={session.status}
          onApply={() => setShowApplicationNotice(true)}
        />
      }
      applicationNotice={
        <RunClubApplicationNotice
          open={showApplicationNotice}
          onOpenChange={setShowApplicationNotice}
        />
      }
    />
  );
}
