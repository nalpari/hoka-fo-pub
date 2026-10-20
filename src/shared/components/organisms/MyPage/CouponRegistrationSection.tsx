import { Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { TextFormField } from '@/shared/components/molecules/FormFields/TextFormField';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';

type CouponRegistrationSectionProps = {
  code: string;
  error: string;
  onCodeChange: (code: string) => void;
  onRegister: () => void;
};

export function CouponRegistrationSection({
  code,
  error,
  onCodeChange,
  onRegister,
}: CouponRegistrationSectionProps) {
  return (
    <ContentSection
      as="section"
      gap="4"
      aria-label="쿠폰 등록"
      title="쿠폰 등록"
      headerProps={{
        gap: '4',
        titleAs: 'h1',
        titleProps: { web: 'heading8', mo: 'heading5' },
        description: (
          <>
            이벤트를 통해 발급 받은 쿠폰의 일련번호를 입력하십시오. 발급 받으신 쿠폰 일련번호를
            등록기간 내에 등록 하셔야 사용 가능합니다.
          </>
        ),
        descriptionProps: { variant: 'body3', tone: 'subtle' },
      }}
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onRegister();
        }}
      >
        <TextFormField
          id="coupon-code"
          label="일련번호"
          required
          variant="boxed"
          invalid={Boolean(error)}
          error={error || undefined}
          inputProps={{
            'aria-label': '쿠폰 일련번호',
            placeholder: '일련 번호를 입력해 주세요',
            value: code,
            onChange: (event) => {
              onCodeChange(event.target.value);
            },
          }}
        />
        {code ? (
          <Box mt="3">
            <Button fullWidth type="submit" size="short" variant="primary">
              쿠폰 등록
            </Button>
          </Box>
        ) : null}
      </form>
    </ContentSection>
  );
}
