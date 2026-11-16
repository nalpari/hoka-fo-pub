import { Typography } from '@/components/common/atoms/Typography';

/** 인증번호 입력의 남은 시간을 강조 색상으로 표시합니다. (Displays the remaining verification time using the accent color.) */
export function VerificationCountdown({ secondsLeft }: { secondsLeft: number }) {
  return (
    <Typography as="p" variant="body5" tone="accent">
      남은 시간{' '}
      {Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, '0')}
      :{(secondsLeft % 60).toString().padStart(2, '0')}초
    </Typography>
  );
}
