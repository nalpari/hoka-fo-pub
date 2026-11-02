import { notFound } from 'next/navigation';

import { ProfileContent } from '@/app/mypage/profile/_components/ProfileContent';
import { ProfileStatePreview } from '@/app/mypage/profile/_components/ProfileStatePreview';
import { profilePreviews } from '@/app/mypage/profile/profilePreviews';
/** 회원정보 확인창을 직접 표시합니다. (Displays a prepared profile dialog directly.) */
export default async function Page({
  params,
}: {
  params: Promise<{
    preview: string;
  }>;
}) {
  const { preview } = await params;
  const entry = profilePreviews.find((item) => item.href.endsWith('/' + preview));
  if (!entry) notFound();
  if (entry.state === 'input' || entry.state === 'confirm')
    return <ProfileStatePreview passwordState={entry.state} />;
  return <ProfileContent preview={entry.state} />;
}
