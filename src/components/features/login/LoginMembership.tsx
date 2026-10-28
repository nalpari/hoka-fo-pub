import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { ButtonLink } from '@/components/common/atoms/Button/Button';

export function LoginMembership() {
  return (
    <ContentSection
      as="section"
      mt="6"
      pt="6"
      borderTop="1px solid token(colors.black.20)"
      gap="6"
      _mobile={{ mt: '8', pt: '8' }}
      aria-labelledby="membership-title"
      title="가입과 동시에 시작되는 혜택!"
      headerProps={{
        gap: '2',
        titleAs: 'h2',
        titleProps: { variant: 'body3', id: 'membership-title', weight: 'medium' },
        description: '신규가입 쿠폰과 기념일 축하쿠폰, 등급별 혜택을 받으세요.',
        descriptionProps: { variant: 'body4' },
      }}
      footer={
        <ButtonLink href="/signup" fullWidth variant="secondary">
          회원가입
        </ButtonLink>
      }
    />
  );
}
