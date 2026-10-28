// Type-only contracts for moved local components; never import these declarations as runtime values.
type Props = {
  method: {
    id: VerificationMethod;
    label: string;
    iconName: string;
  };
  onSelect: (method: VerificationMethod) => void;
};
declare function VerificationMethodCard({ method, onSelect }: Props): import('react').JSX.Element;
type VerificationMethod = 'phone' | 'ipin';
type IdentityVerificationContentProps = {
  onSelect: (method: VerificationMethod) => void;
};
declare function IdentityVerificationContent({
  onSelect,
}: IdentityVerificationContentProps): import('react').JSX.Element;
/** 회원가입 본인확인 방법을 선택하는 화면을 표시합니다. (Displays identity verification method selection for signup.) */
export default function Page(): import('react').JSX.Element;
export { VerificationMethodCard, IdentityVerificationContent, type VerificationMethod };
