import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import type { FormEventHandler, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout/AccountPageLayout';
import { AccountFormHeader } from '@/components/common/molecules/AccountFormHeader/AccountFormHeader';

import { Button } from '@/components/common/atoms/Button/Button';
import { PasswordResetField } from '@/components/features/find-account/PasswordResetField';
import type { Errors, FieldName } from '@/components/features/find-account/passwordValidation';

const styles = {
  form: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  button: css({
    mt: '2',
  }),
};

type Props = {
  password: string;
  confirmation: string;
  errors: Errors;
  completion: ReactNode;
  onFieldChange: (field: FieldName, value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function PasswordResetContent({
  password,
  confirmation,
  errors,
  completion,
  onFieldChange,
  onSubmit,
}: Props) {
  return (
    <AccountPageLayout
      contentAs="section"
      contentLabelledBy="password-reset-title"
      pageCss={css.raw({
        px: '4',
        pb: '124px',
        _mobile: { minH: 'calc(100svh - var(--layout-site-header-height))' },
      })}
      contentCss={css.raw({ display: 'flex', flexDirection: 'column', gap: '0' })}
      outsideContent={completion}
    >
      <ContentSection
        gap={{ base: '10', _mobile: '8' }}
        header={
          <AccountFormHeader
            title="비밀번호 재설정"
            titleId="password-reset-title"
            description="새로운 비밀번호를 사용하여 로그인을 진행합니다. 새로운 비밀번호를 설정해주세요."
            spacingCss={css.raw({ gap: '10px' })}
          />
        }
      >
        <form
          noValidate
          className={styles.form}
          onSubmit={onSubmit}
          aria-labelledby="password-reset-title"
        >
          <PasswordResetField
            name="password"
            label="새로운 비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            error={errors.password}
            onChange={(value) => onFieldChange('password', value)}
          />
          <PasswordResetField
            name="confirmation"
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            value={confirmation}
            error={errors.confirmation}
            onChange={(value) => onFieldChange('confirmation', value)}
          />
          <Button type="submit" variant="primary" fullWidth className={styles.button}>
            비밀번호 변경
          </Button>
        </form>
      </ContentSection>
    </AccountPageLayout>
  );
}
