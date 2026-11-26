import { Typography } from '@/components/common/atoms/Typography';

/** 인증번호 입력의 남은 시간을 강조 색상으로 표시합니다. (Displays the remaining verification time in the selected tone.) */
export function VerificationCountdown({
  secondsLeft,
  tone = 'accent',
}: {
  secondsLeft: number;
  tone?: 'accent' | 'red80';
}) {
  return (
    <Typography as="p" variant="b8" tone={tone}>
      남은 시간{' '}
      {Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, '0')}
      :{(secondsLeft % 60).toString().padStart(2, '0')}초
    </Typography>
  );
}
