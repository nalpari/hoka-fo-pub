// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type ReactNode } from 'react';
declare const signupTerms: readonly [
  {
    readonly label: 'HOKA Korea 이용약관 동의';
    readonly required: true;
  },
  {
    readonly label: '개인정보 수집 동의';
    readonly required: true;
  },
  {
    readonly label: '개인정보 수집 동의';
    readonly required: false;
  },
  {
    readonly label: '개인정보 제3자 (제휴사) 제공 동의';
    readonly required: true;
  },
];
type SignupTermsAgreementListProps = {
  agreements: boolean[];
  notice: string;
  onAllChange: (checked: boolean) => void;
  onChange: (index: number, checked: boolean) => void;
  onDetail: (index: number | null) => void;
};
declare function SignupTermsAgreementList(
  props: SignupTermsAgreementListProps,
): import('react').JSX.Element;
type TermsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  label: ReactNode;
  children: ReactNode;
  dates?: ReactNode;
  version?: {
    previous: boolean;
    onChange: () => void;
  };
};
declare function TermsDialog({
  open,
  onOpenChange,
  title,
  label,
  children,
  dates,
  version,
}: TermsDialogProps): import('react').JSX.Element;
type Props = {
  selected: {
    label: string;
    required: boolean;
  } | null;
  previous: boolean;
  onClose: () => void;
  onPrevious: () => void;
};
declare function SignupTermsDetail({
  selected,
  previous,
  onClose,
  onPrevious,
}: Props): import('react').JSX.Element;
/** Responsive previous-terms selection: desktop radio list and mobile wheel-style sheet. */
declare function PreviousTermsPicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: () => void;
}): import('react').JSX.Element;
type SignupTermsContentProps = {
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
declare function SignupTermsContent(props: SignupTermsContentProps): import('react').JSX.Element;
/** 약관 동의 상태와 다음 회원가입 단계로의 이동을 관리합니다. (Manages agreement state and navigation to the next signup step.) */
export default function Page(): import('react').JSX.Element;
export {
  SignupTermsAgreementList,
  signupTerms,
  TermsDialog,
  type TermsDialogProps,
  SignupTermsDetail,
  PreviousTermsPicker,
  SignupTermsContent,
};
