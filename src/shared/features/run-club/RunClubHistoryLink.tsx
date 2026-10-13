import { Flex } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';

export function RunClubHistoryLink() {
  return (
    <Flex justifyContent="flex-end">
      <ButtonLink to="/mypage/event-entries" variant="link" size="lg">
        세션 신청 내역
      </ButtonLink>
    </Flex>
  );
}
