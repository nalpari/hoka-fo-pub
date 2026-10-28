'use client';

import { useParams } from 'next/navigation';
import { ButtonLink } from '@/components/common/atoms/Button/Button';
import { ContentLayout } from '@/components/common/layouts/ContentLayout/ContentLayout';

const collectionNames: Record<string, string> = {
  '8386': '플라잉77 경량 다운',
  '8309': '26FW 브리즈 신규 발매',
  '8311': '호카 베스트 바람막이',
  '8300': '1906REH 재입고',
  '8002': '빈티지무드 베스트 반팔티',
};

/** 경로에 해당하는 컬렉션 상세 화면을 표시합니다. (Displays the collection details for the current route.) */
export default function Page() {
  const { id = '' } = useParams<{ id: string }>();
  const title = collectionNames[id] ?? 'HOKA 컬렉션';

  return (
    <ContentLayout description="선택한 테마의 상품과 이야기를 만나보세요." title={title}>
      <ButtonLink href="/products" variant="primary">
        상품 보러 가기
      </ButtonLink>
    </ContentLayout>
  );
}
