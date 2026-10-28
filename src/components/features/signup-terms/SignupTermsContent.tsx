import { Button } from '@/components/common/atoms/Button/Button';
import { StatusMessage } from '@/components/common/atoms/StatusMessage/StatusMessage';
import { AccountFormLayout } from '@/components/common/layouts/AccountFormLayout/AccountFormLayout';
import { SignupTermsDetail } from './SignupTermsDetail';
import { PreviousTermsPicker } from './PreviousTermsPicker';
import { SignupTermsAgreementList, signupTerms } from './SignupTermsAgreementList';
import { Box } from 'styled-system/jsx';

export { signupTerms } from './SignupTermsAgreementList';

type Props = {
  agreements: boolean[];
  detail: number | null;
  previous: boolean;
  previousPickerOpen: boolean;
  notice: string;
  onAllChange: (checked: boolean) => void;
  onChange: (index: number, checked: boolean) => void;
  onDetail: (index: number | null) => void;
  onPrevious: () => void;
  onPreviousPickerClose: () => void;
  onPreviousVersionSelect: () => void;
  onCancel: () => void;
  onNext: () => void;
};

/** 회원가입 약관 목록과 상세 다이얼로그를 화면으로 구성합니다. (Composes the signup terms list and detail dialogs into the page content.) */
export function SignupTermsContent(props: Props) {
  const selected = props.detail === null ? null : signupTerms[props.detail];

  return (
    <AccountFormLayout
      title="약관동의"
      fillMobileViewport
      actions={
        <>
          <Button variant="secondary" fullWidth onClick={props.onCancel}>
            취소
          </Button>
          <Button variant="primary" fullWidth onClick={props.onNext}>
            확인
          </Button>
        </>
      }
      dialogs={
        <>
          <SignupTermsDetail
            selected={props.previousPickerOpen ? null : (selected ?? null)}
            previous={props.previous}
            onClose={() => props.onDetail(null)}
            onPrevious={props.onPrevious}
          />
          <PreviousTermsPicker
            open={props.previousPickerOpen}
            onClose={props.onPreviousPickerClose}
            onSelect={props.onPreviousVersionSelect}
          />
        </>
      }
    >
      <Box>
        <SignupTermsAgreementList
          agreements={props.agreements}
          notice={props.notice}
          onAllChange={props.onAllChange}
          onChange={props.onChange}
          onDetail={props.onDetail}
        />
        <Box pt="2">
          {props.notice ? <StatusMessage tone="error">{props.notice}</StatusMessage> : null}
        </Box>
      </Box>
    </AccountFormLayout>
  );
}
