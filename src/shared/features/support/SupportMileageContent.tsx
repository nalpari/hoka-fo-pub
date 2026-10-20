import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';

export function SupportMileageContent({ title }: { title: string }) {
  return (
    <ContentHeader
      as="article"
      py="7"
      minH="280px"
      lineHeight="var(--line-heights-body)"
      gap="0"
      titleAs="h2"
      title={<>{title}</>}
      titleProps={{}}
      description="온라인과 오프라인에서 적립 및 사용할 수 있는 통합 마일리지 정책을 안내합니다. 정책별 적용 기준과 소멸 조건은 주문 시점에 따라 달라질 수 있습니다."
      descriptionProps={{}}
    />
  );
}
