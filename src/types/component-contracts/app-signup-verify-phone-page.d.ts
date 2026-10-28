// Type-only contracts for moved local components; never import these declarations as runtime values.
type AlreadyRegisteredModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};
declare function AlreadyRegisteredModal({
  onOpenChange,
  onConfirm,
}: AlreadyRegisteredModalProps): import('react').JSX.Element;
/** 가입 휴대폰 인증 화면과 기존 가입 안내를 구성합니다. (Composes signup phone verification and the existing-account notice.) */
export default function Page(): import('react').JSX.Element;
export { AlreadyRegisteredModal, type AlreadyRegisteredModalProps };
