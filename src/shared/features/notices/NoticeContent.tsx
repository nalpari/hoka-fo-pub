import { Divider, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function NoticeContent({ notice, index }: { notice: { title: string }; index: number }) {
  return (
    <>
      <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
      <Stack px="6" py="8" gap="3" bg="black.10" _mobile={{ px: '4', py: '6' }}>
        {index === 0 ? (
          <>
            <Typography as="p" variant="body4">
              1. 이벤트 진행기간: 9월 1일 00:00 ~ 9월 14일 09:59
            </Typography>
            <Typography as="p" variant="body4">
              2. 네이버페이로 10만원 이상 결제 시 7천원 즉시할인
            </Typography>
            <Typography as="p" variant="body4">
              3. 대상 상품: 호카 공식 홈페이지 내 전 상품
            </Typography>
            <Typography as="p" variant="body4">
              4. 이벤트 기간 내 1회 한정으로 진행되며, 운영 상황에 따라 조기 종료될 수 있습니다.
            </Typography>
          </>
        ) : (
          <Typography as="p" variant="body4">
            {notice.title} 상세 안내입니다.
          </Typography>
        )}
      </Stack>
    </>
  );
}
