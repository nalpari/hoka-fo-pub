import { Box, HStack, Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';

export function NoticeDetailPage() {
  return (
    <CustomerCenterLayout
      title="공지사항"
      activePath="/support/notices"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '공지사항', href: '/support/notices' },
        { label: '상세' },
      ]}
      groups={supportNavigation}
    >
      <HStack
        justifyContent="space-between"
        gap="4"
        py="6"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="black.20"
      >
        <Typography web="heading9" mo="body3">
          [공통] 네이버페이 9월 프로모션 안내
        </Typography>
        <Typography as="time" variant="body4" tone="tertiary">
          2026-08-13
        </Typography>
      </HStack>
      <Stack gap="4" px="6" py="8" bg="black.10" _mobile={{ px: '4', py: '6' }}>
        <Typography as="p" variant="body4">
          안녕하세요, HOKA 코리아입니다.
        </Typography>
        <Typography as="p" variant="body4">
          네이버페이 9월 프로모션을 안내드립니다.
        </Typography>
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
          이용해 주셔서 감사합니다.
        </Typography>
      </Stack>
      <Box mt="6" maxW="343px" mx="auto">
        <ButtonLink href="/support/notices" variant="secondary" size="short" fullWidth>
          목록보기
        </ButtonLink>
      </Box>
    </CustomerCenterLayout>
  );
}
