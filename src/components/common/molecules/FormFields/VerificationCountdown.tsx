import { Typography } from '@/components/common/atoms/Typography/Typography';

export function VerificationCountdown({ secondsLeft }: { secondsLeft: number }) {
  return (
    <Typography as="p" variant="body5" tone="error">
      남은 시간{' '}
      {Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, '0')}
      :{(secondsLeft % 60).toString().padStart(2, '0')}초
    </Typography>
  );
}
