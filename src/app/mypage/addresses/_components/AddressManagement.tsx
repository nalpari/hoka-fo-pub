'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Typography } from '@/components/common/atoms/Typography';

import { FormActionGroup } from '@/components/common/molecules/FormActionGroup';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { AddressFields } from '@/components/common/organisms/Address/AddressFields';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { type Address } from '@/types/mypage-address.types';

/** 배송지 편집 입력과 저장 액션을 표시합니다. (Displays address editing fields and save actions.) */
export function AddressEditor({
  editingId,
  draft,
  fieldError,
  update,
  save,
  onCancel,
  addressOpen,
  onAddressOpenChange,
}: {
  editingId: number | 'new';
  draft: Address;
  fieldError: (
    key: 'recipient' | 'name' | 'phone' | 'zip' | 'address' | 'detail',
  ) => string | undefined;
  update: <K extends keyof Address>(key: K, value: Address[K]) => void;
  save?: () => void;
  onCancel: () => void;
  addressOpen: boolean;
  onAddressOpenChange: (open: boolean) => void;
}) {
  const mobile = usePlatform() === 'mobile';

  return (
    <ContentSection
      gap="32px"
      _mobile={{ gap: '24px', pt: '24px' }}
      title={<>{editingId === 'new' ? '배송지 추가' : '배송지 수정'}</>}
      headerProps={{
        titleAs: 'h1',
        titleProps: { web: 'headingKr6', mo: 'headingKr5' },
        pb: '40px',
        borderBottom: '2px solid black',
        _mobile: { pb: '16px' },
      }}
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          save?.();
        }}
      >
        <Stack gap="40px" _mobile={{ gap: '32px' }}>
          <Stack w="500px" maxW="100%" mx="auto" gap="24px">
            <Stack gap="16px">
              <TextFormField
                id="address-recipient"
                label="이름"
                required
                variant="boxed"
                error={fieldError('recipient')}
                inputProps={{
                  required: true,
                  placeholder: '이름을 입력해 주세요',
                  value: draft.recipient,
                  onChange: (event) => update('recipient', event.target.value),
                }}
              />
              <TextFormField
                id="address-name"
                label="배송지명"
                required
                variant="boxed"
                error={fieldError('name')}
                inputProps={{
                  required: true,
                  placeholder: '배송지명을 입력해 주세요',
                  value: draft.name,
                  onChange: (event) => update('name', event.target.value),
                }}
              />
              <TextFormField
                id="address-phone"
                label="휴대폰 번호"
                required
                variant="boxed"
                error={fieldError('phone')}
                inputProps={{
                  required: true,
                  type: 'tel',
                  placeholder: '- 없이 입력해 주세요',
                  value: draft.phone,
                  onChange: (event) => update('phone', event.target.value),
                }}
              />
              <TextFormField
                id="address-alternate-phone"
                label="다른 전화번호"
                variant="boxed"
                inputProps={{
                  type: 'tel',
                  placeholder: '- 없이 입력해 주세요',
                  value: draft.alternatePhone,
                  onChange: (event) => update('alternatePhone', event.target.value),
                }}
              />
              <AddressFields
                variant="boxed"
                idPrefix="mypage-address"
                searchLabel="우편번호 찾기"
                searchOpen={addressOpen}
                onSearchOpenChange={onAddressOpenChange}
                value={{
                  postalCode: draft.zip,
                  address: draft.address,
                  addressDetail: draft.detail,
                }}
                errors={{
                  postalCode: fieldError('zip'),
                  address: fieldError('address'),
                  addressDetail: fieldError('detail'),
                }}
                onValueChange={(field, value) =>
                  update(
                    field === 'postalCode'
                      ? 'zip'
                      : field === 'addressDetail'
                        ? 'detail'
                        : 'address',
                    value,
                  )
                }
                fieldOptions={{
                  postalCode: {
                    id: 'address-zip',
                    required: true,
                    disabled: false,
                    inputProps: {
                      required: true,
                      readOnly: true,
                      placeholder: '우편번호 찾기 버튼을 눌러주세요',
                    },
                  },
                  address: {
                    id: 'address-line',
                    required: true,
                    disabled: !draft.zip,
                    inputProps: {
                      required: true,
                      readOnly: true,
                      placeholder: '주소를 입력해 주세요',
                    },
                  },
                  addressDetail: {
                    id: 'address-detail',
                    required: true,
                    disabled: false,
                    inputProps: {
                      required: true,
                      placeholder: '상세주소를 입력해 주세요',
                      type: undefined,
                      autoComplete: undefined,
                    },
                  },
                }}
              />
            </Stack>
            <Box>
              <Checkbox
                checked={draft.isDefault}
                label="기본 배송지로 저장"
                onCheckedChange={(checked) => update('isDefault', checked)}
              />
            </Box>
          </Stack>
          {editingId === 'new' ? (
            <Box w="180px" mx="auto" _mobile={{ w: '100%' }}>
              <Button
                fullWidth
                size="tall"
                variant="primary"
                type="submit"
                className={css({ _mobile: { '--button-height': '44px' } })}
              >
                {mobile ? '저장' : '배송지 추가'}
              </Button>
            </Box>
          ) : (
            <FormActionGroup
              onCancel={onCancel}
              submitLabel="변경사항 저장"
              size="tall"
              w="368px"
              maxW="100%"
              mx="auto"
              _mobile={{ w: '100%' }}
              className={css({ _mobile: { '& button': { '--button-height': '44px!' } } })}
            />
          )}
        </Stack>
      </form>
    </ContentSection>
  );
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  pending?: boolean;
  error?: string;
};

/** 배송지 삭제 확인과 요청 상태를 표시합니다. (Displays address deletion confirmation and request status.) */
export function MyPageAddressDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  pending,
  error,
}: Props) {
  return (
    <ModalDialog
      closeLabel="배송지 삭제 확인창 닫기"
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="배송지 관리"
      actions={{ kind: 'confirm', onConfirm, confirmDisabled: pending }}
    >
      <Typography as="p" variant="body3">
        배송지를 삭제 하시겠습니까?
      </Typography>
      {error && <Typography role="alert">{error}</Typography>}
    </ModalDialog>
  );
}

export const emptyAddress: Address = {
  id: 0,
  recipient: '',
  name: '',
  phone: '',
  alternatePhone: '',
  zip: '',
  address: '',
  detail: '',
  isDefault: false,
};
