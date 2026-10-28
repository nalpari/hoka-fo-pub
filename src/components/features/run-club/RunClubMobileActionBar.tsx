import { Box } from 'styled-system/jsx';
import { RunClubApplyButton } from './RunClubApplyButton';
import type { RunClubSession } from './runClub.data';

type RunClubMobileActionBarProps = {
  status: RunClubSession['status'];
  onApply: () => void;
};

export function RunClubMobileActionBar({ status, onApply }: RunClubMobileActionBarProps) {
  return (
    <Box
      as="section"
      aria-label="세션 신청"
      display="none"
      _mobile={{
        display: 'block',
        position: 'fixed',
        bottom: '0',
        insetInline: '0',
        zIndex: '20',
        bg: 'white.0',
        borderTop: '1px solid var(--color-border-default)',
        px: '4',
        pt: '4',
        pb: 'max(32px, env(safe-area-inset-bottom))',
      }}
    >
      <RunClubApplyButton status={status} onApply={onApply} />
    </Box>
  );
}
