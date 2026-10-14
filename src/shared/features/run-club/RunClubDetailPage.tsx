'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NotFoundPage } from '@/shared/features/not-found/NotFoundPage';
import { usePlatform } from '@/shared/context/platform';
import { products } from '@/mocks/products';
import { runClubSessions, runClubVenue, runClubAddress, type RunClubSession } from './runClub.data';
import { RunClubSessionHero } from './RunClubSessionHero';
import { RunClubSessionGuide, type RunClubGuideRow } from './RunClubSessionGuide';
import { RunClubSessionImage } from './RunClubSessionImage';
import { RunClubRecommendations } from './RunClubRecommendations';
import { RunClubApplicationNotice } from './RunClubApplicationNotice';

type RunClubDetailPageProps = { session?: RunClubSession };

export function RunClubDetailPage({ session: suppliedSession }: RunClubDetailPageProps) {
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
    <main>
      <RunClubSessionHero session={session} onApply={() => setShowApplicationNotice(true)} />
      <RunClubSessionGuide session={session} rows={guideRows} />
      {session.id === 'bukchon-night' ? <RunClubSessionImage /> : null}
      <RunClubRecommendations products={recommendedProducts} platform={platform} />
      <RunClubApplicationNotice
        open={showApplicationNotice}
        onOpenChange={setShowApplicationNotice}
      />
    </main>
  );
}
