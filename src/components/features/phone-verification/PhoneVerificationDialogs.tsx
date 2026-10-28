import { ModalDialog } from '@/components/common/molecules/ModalDialog/ModalDialog';
import { PhoneVerificationDetailDialog } from './PhoneVerificationDetailDialog';
import type { PhoneVerificationContentProps } from './phone-verification.types';

type Props = Pick<PhoneVerificationContentProps, 'detail' | 'onDetail'>;

export function PhoneVerificationDialogs({ detail, onDetail }: Props) {
  const onOpenChange = (open: boolean) => {
    if (!open) onDetail(null);
  };

  if (detail === '알뜰폰 사업자') {
    return <PhoneVerificationDetailDialog open onOpenChange={onOpenChange} />;
  }

  return (
    <ModalDialog
      open={detail !== null}
      onOpenChange={onOpenChange}
      title={detail ?? ''}
      closeLabel="안내 닫기"
      size="md"
      mobilePresentation="fullscreen"
    >
      {null}
    </ModalDialog>
  );
}
