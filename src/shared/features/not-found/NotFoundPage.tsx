import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';

const root = css({
  maxW: 'var(--layout-content-max-width)',
  minH: '54vh',
  mx: 'auto',
  py: { base: '64px', _mobile: '40px' },
  px: { base: '0', _mobile: '16px' },
});

/** Fallback page rendered for paths that are not registered in the app router. */
export function NotFoundPage() {
  return (
    <ContentLayout className={root} title="404" description="요청하신 페이지를 찾을 수 없습니다.">
      <Stack justifyItems="start" gap="24px" py="32px" borderTop="1px solid #111">
        <p className={css({ m: '0', color: 'var(--color-text-muted)' })}>
          주소가 잘못 입력되었거나 페이지가 이동 또는 삭제되었을 수 있습니다.
        </p>
        <ButtonLink to="/" variant="primary">
          홈으로 돌아가기
        </ButtonLink>
      </Stack>
    </ContentLayout>
  );
}
