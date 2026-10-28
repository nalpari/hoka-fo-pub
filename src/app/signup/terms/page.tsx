'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  SignupTermsContent,
  signupTerms,
} from '@/components/features/signup-terms/SignupTermsContent';

/** 약관 동의 상태와 다음 회원가입 단계로의 이동을 관리합니다. (Manages agreement state and navigation to the next signup step.) */
export default function Page() {
  const router = useRouter();
  const [agreements, setAgreements] = useState([false, false, false, false]);
  const [detail, setDetail] = useState<number | null>(null);
  const [previous, setPrevious] = useState(false);
  const [previousPickerOpen, setPreviousPickerOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const next = () => {
    if (signupTerms.some((term, index) => term.required && !agreements[index])) {
      setNotice('필수 약관에 모두 동의해 주세요.');
      return;
    }
    router.push('/signup/information');
  };

  return (
    <SignupTermsContent
      agreements={agreements}
      detail={detail}
      previous={previous}
      previousPickerOpen={previousPickerOpen}
      notice={notice}
      onAllChange={(checked) => {
        setAgreements(agreements.map(() => checked));
        setNotice('');
      }}
      onChange={(index, checked) => {
        const next = agreements.map((value, position) => (position === index ? checked : value));
        setAgreements(next);
        if (!signupTerms.some((term, position) => term.required && !next[position])) setNotice('');
      }}
      onDetail={(index) => {
        setDetail(index);
        setPrevious(false);
        setPreviousPickerOpen(false);
      }}
      onPrevious={() => {
        if (previous) setPrevious(false);
        else setPreviousPickerOpen(true);
      }}
      onPreviousPickerClose={() => setPreviousPickerOpen(false)}
      onPreviousVersionSelect={() => {
        setPrevious(true);
        setPreviousPickerOpen(false);
      }}
      onCancel={() => router.push('/signup/verify')}
      onNext={next}
    />
  );
}
