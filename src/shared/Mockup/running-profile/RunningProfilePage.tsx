'use client';

import { useState } from 'react';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { RunningProfileContent } from './RunningProfileContent';
import { myPageNavigation } from '@/shared/features/mypage/mypage.data';
import { profileQuestions } from './running-profile.data';

export function RunningProfilePage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const completed = profileQuestions.every(({ id }) => answers[id]);
  const answeredCount = Object.keys(answers).length;

  return (
    <SidebarNavigationLayout
      activePath="/mypage/running-profile"
      groups={myPageNavigation}
      title="MY HOKA"
      titleTo="/mypage"
    >
      <RunningProfileContent
        questions={profileQuestions}
        answers={answers}
        answeredCount={answeredCount}
        completed={completed}
        onAnswerChange={(id, value) => setAnswers((previous) => ({ ...previous, [id]: value }))}
      />
    </SidebarNavigationLayout>
  );
}
