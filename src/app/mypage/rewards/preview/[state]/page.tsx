import { notFound } from 'next/navigation';

import { RewardsPageContent } from '@/app/mypage/rewards/_components/RewardsContent';
import { rewardsPreviews } from '@/app/mypage/rewards/rewardsPreviews';

export function generateStaticParams() {
  return rewardsPreviews.map(({ state }) => ({ state }));
}

/** 회원등급 산정의 고정 표시 상태를 엽니다. (Displays a fixed membership assessment state.) */
export default async function Page({ params }: PageProps<'/mypage/rewards/preview/[state]'>) {
  const { state } = await params;
  const preview = rewardsPreviews.find((entry) => entry.state === state);
  if (!preview) notFound();

  return <RewardsPageContent display={preview.display} />;
}
