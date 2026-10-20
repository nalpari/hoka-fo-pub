import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { AccountFormHeader } from '@/shared/components/molecules/AccountFormHeader/AccountFormHeader';
import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { AccountPageLayout } from '@/shared/components/layouts/AccountPageLayout/AccountPageLayout';
import { Button } from '@/shared/components/atoms/Button/Button';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { FindAccountIdentityFields } from './FindAccountIdentityFields';
import { FindAccountCodeFields } from './FindAccountCodeFields';

export type FindAccountNotice = { tone: 'error' | 'info'; message: string };

type FindAccountContentProps = {
  name: string;
  phone: string;
  code: string;
  requested: boolean;
  secondsLeft: number;
  nameError: string;
  phoneError: string;
  codeError?: string;
  notice: FindAccountNotice | null;
  result?: ReactNode;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onConfirmCode: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function FindAccountContent({
  name,
  phone,
  code,
  requested,
  secondsLeft,
  nameError,
  phoneError,
  codeError,
  notice,
  result,
  onNameChange,
  onPhoneChange,
  onCodeChange,
  onConfirmCode,
  onSubmit,
}: FindAccountContentProps) {
  return (
    <AccountPageLayout
      contentAs="section"
      contentLabelledBy="find-account-title"
      pageCss={css.raw({
        px: '4',
        pb: '124px',
        minH: '600px',
        _mobile: { minH: 'calc(100svh - var(--layout-site-header-height))' },
      })}
      contentCss={css.raw({ display: 'flex', flexDirection: 'column', gap: '0' })}
      outsideContent={result}
    >
      <ContentSection
        gap={{ base: '10', _mobile: '8' }}
        header={
          <AccountFormHeader
            title="아이디 / 비밀번호 찾기"
            titleId="find-account-title"
            description="회원 가입 시 사용하신 휴대폰 번호를 통해 아이디 / 비밀번호를 찾으실 수 있습니다."
            spacingCss={css.raw({
              gap: { base: '10px', _mobile: '3' },
            })}
          />
        }
      >
        <form noValidate onSubmit={onSubmit} aria-labelledby="find-account-title">
          <Stack gap="6">
            <FindAccountIdentityFields
              name={name}
              phone={phone}
              nameError={nameError}
              phoneError={phoneError}
              onNameChange={onNameChange}
              onPhoneChange={onPhoneChange}
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={requested && secondsLeft > 0}
            >
              {requested ? '인증번호 재요청' : '인증번호 요청'}
            </Button>
            {requested ? (
              <>
                <FindAccountCodeFields
                  code={code}
                  codeError={codeError}
                  secondsLeft={secondsLeft}
                  onCodeChange={onCodeChange}
                />
                <Button type="button" variant="primary" fullWidth onClick={onConfirmCode}>
                  인증번호 확인
                </Button>
              </>
            ) : null}
            {notice ? <StatusMessage tone={notice.tone}>{notice.message}</StatusMessage> : null}
          </Stack>
        </form>
      </ContentSection>
    </AccountPageLayout>
  );
}
