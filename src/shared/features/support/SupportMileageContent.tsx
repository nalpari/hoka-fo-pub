import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Box } from 'styled-system/jsx';

export function SupportMileageContent({ title }: { title: string }) {
  return (
    <Box as="article" py="7" minH="280px" lineHeight="var(--line-heights-body)">
      <Typography as="h2">{title}</Typography>
      <Typography as="p">
        온라인과 오프라인에서 적립 및 사용할 수 있는 통합 마일리지 정책을 안내합니다. 정책별 적용
        기준과 소멸 조건은 주문 시점에 따라 달라질 수 있습니다.
      </Typography>
    </Box>
  );
}
