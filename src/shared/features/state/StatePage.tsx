import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/atoms/Button/Button';
import { StatePanel } from '@/shared/components/molecules/StatePanel/StatePanel';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';

export type StatePageVariant = 'empty' | 'error' | 'success';

export type StatePageProps = {
  variant?: StatePageVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

const variantMeta: Record<
  StatePageVariant,
  { tone: 'error' | 'success' | 'info'; headline: string; body: string; cta: string }
> = {
  empty: {
    tone: 'info',
    headline: '조건에 맞는 결과가 없습니다',
    body: '필터를 다시 설정하거나 다른 추천 경로를 선택해 보세요.',
    cta: '필터 초기화',
  },
  error: {
    tone: 'error',
    headline: '잠시 문제가 발생했습니다',
    body: '네트워크 상태를 확인한 뒤 다시 시도해 주세요.',
    cta: '다시 시도',
  },
  success: {
    tone: 'success',
    headline: '요청 처리가 완료되었습니다',
    body: '상태 변경이 반영되었으며 관련 화면에서 확인할 수 있습니다.',
    cta: '계속 쇼핑하기',
  },
};

export function StatePage({
  variant = 'empty',
  title,
  description,
  actionLabel,
  actionHref = '/',
}: StatePageProps) {
  const meta = variantMeta[variant];
  const resolvedTitle = title ?? meta.headline;
  const resolvedDescription = description ?? meta.body;

  return (
    <ContentLayout
      className="state-page"
      breadcrumbItems={[{ label: 'HOME', href: '/' }, { label: '상태 화면' }]}
      title={resolvedTitle}
      description={resolvedDescription}
    >
      <StatePanel
        action={
          <Link to={actionHref}>
            <Button variant={variant === 'error' ? 'secondary' : 'primary'}>
              {actionLabel ?? meta.cta}
            </Button>
          </Link>
        }
        description={resolvedDescription}
        title={resolvedTitle}
        variant={variant}
      />
    </ContentLayout>
  );
}
