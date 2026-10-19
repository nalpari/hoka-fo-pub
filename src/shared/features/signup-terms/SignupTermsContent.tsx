import { Button } from '@/shared/components/atoms/Button/Button';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { AccountFormLayout } from '@/shared/components/layouts/AccountFormLayout/AccountFormLayout';
import { SignupTermsDetail } from './SignupTermsDetail';
import { PreviousTermsPicker } from './PreviousTermsPicker';
import { SignupTermsAgreementList, signupTerms } from './SignupTermsAgreementList';

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
      <SignupTermsAgreementList
        agreements={props.agreements}
        notice={props.notice}
        onAllChange={props.onAllChange}
        onChange={props.onChange}
        onDetail={props.onDetail}
      />
      {props.notice ? <StatusMessage tone="error">{props.notice}</StatusMessage> : null}
    </AccountFormLayout>
  );
}
