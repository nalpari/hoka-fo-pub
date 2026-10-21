import { FormActionGroup } from '@/shared/components/molecules/FormActionGroup/FormActionGroup';

type Props = { onCancel: () => void };

export function InquiryFormActions({ onCancel }: Props) {
  return (
    <FormActionGroup
      onCancel={onCancel}
      submitLabel="문의 등록"
      size="short"
      justifyContent="center"
      pt="6"
      maxW="368px"
      w="100%"
      mx="auto"
      _mobile={{ pt: '0', maxW: 'none' }}
    />
  );
}
