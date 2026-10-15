import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import type { RunClubSession } from './runClub.data';

const applyButton = css({
  w: '260px',
  '& > span': { w: '100%' },
  _mobile: {
    w: '100%',
    '--button-height': '44px!',
    '--button-label-size': '16px!',
    '--button-disabled-bg': 'var(--color-black-20)!',
    '--button-disabled-color': 'var(--color-black-40)!',
  },
});

type RunClubApplyButtonProps = {
  status: RunClubSession['status'];
  onApply: () => void;
};

export function RunClubApplyButton({ status, onApply }: RunClubApplyButtonProps) {
  return (
    <Button
      variant="primary"
      className={applyButton}
      disabled={status !== 'open'}
      onClick={onApply}
    >
      {status === 'closed'
        ? '모집 마감'
        : status === 'upcoming'
          ? '신청이 곧 시작됩니다.'
          : '신청하기'}
    </Button>
  );
}
