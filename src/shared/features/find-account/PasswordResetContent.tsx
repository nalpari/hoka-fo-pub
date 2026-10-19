import type { FormEventHandler, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { PasswordResetField } from '@/shared/features/find-account/PasswordResetField';
import type { Errors, FieldName } from '@/shared/features/find-account/passwordValidation';

const styles = {
  title: css({ mb: '2.5' }),
  description: css({ m: '0', mb: '10', color: 'var(--color-text-tertiary)' }),
  form: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  button: css({
    mt: '2',
    '--button-radius': '999px',
    '--button-height': '48px!',
    '--button-border-width': '0px!',
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
    <Box
      as="main"
      pt="24"
      px="4"
      pb="8"
      minH="calc(100svh - var(--layout-site-header-height))"
      _mobile={{ pt: '10' }}
    >
      <Stack as="section" maxW="500px" mx="auto" gap="0" aria-labelledby="password-reset-title">
        <Typography as="h1" variant="headingKr6" className={styles.title} id="password-reset-title">
          비밀번호 재설정
        </Typography>
        <Typography as="p" variant="body3" tone="subtle" className={styles.description}>
          새로운 비밀번호를 사용하여 로그인을 진행합니다. 새로운 비밀번호를 설정해주세요.
        </Typography>
        <form noValidate className={styles.form} onSubmit={onSubmit}>
          <PasswordResetField
            name="password"
            label="새로운 비밀번호"
            placeholder="새로운 비밀번호를 입력해주세요"
            value={password}
            error={errors.password}
            onChange={(value) => onFieldChange('password', value)}
          />
          <PasswordResetField
            name="confirmation"
            label="비밀번호 재입력"
            placeholder="비밀번호를 다시 입력해주세요"
            value={confirmation}
            error={errors.confirmation}
            onChange={(value) => onFieldChange('confirmation', value)}
          />
          <Button type="submit" variant="primary" fullWidth className={styles.button}>
            비밀번호 변경
          </Button>
        </form>
      </Stack>
      {completion}
    </Box>
  );
}
