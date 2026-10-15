import { Flex } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';

export function RunClubHistoryLink({ compact = false }: { compact?: boolean }) {
  return (
    <Flex justifyContent="flex-end">
      <ButtonLink href="/mypage/event-entries" variant="link" size={compact ? 'sm' : 'lg'}>
        세션 신청 내역
      </ButtonLink>
    </Flex>
  );
}
