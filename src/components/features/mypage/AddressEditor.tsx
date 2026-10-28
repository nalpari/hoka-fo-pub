import { Button } from '@/components/common/atoms/Button/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox/Checkbox';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { FormActionGroup } from '@/components/common/molecules/FormActionGroup/FormActionGroup';
import { NameField } from '@/components/common/molecules/FormFields/NameField';
import { PhoneNumberField } from '@/components/common/molecules/FormFields/PhoneNumberField';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { AddressFields } from '@/components/common/organisms/Address/AddressFields';
import { Box, Stack } from 'styled-system/jsx';
import type { Address } from './mypage-address.types';

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
  save: () => void;
  onCancel: () => void;
  addressOpen: boolean;
  onAddressOpenChange: (open: boolean) => void;
}) {
  return (
    <ContentSection
      gap="5"
      px="4"
      pt="6"
      pb="16"
      title={<>{editingId === 'new' ? '배송지 추가' : '배송지 수정'}</>}
      headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
      >
        <Stack gap="2">
          <NameField
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
          <PhoneNumberField
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
          <PhoneNumberField
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
            variant="separated"
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
                field === 'postalCode' ? 'zip' : field === 'addressDetail' ? 'detail' : 'address',
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
          <Box py="3">
            <Checkbox
              checked={draft.isDefault}
              label="기본 배송지로 저장"
              onCheckedChange={(checked) => update('isDefault', checked)}
            />
          </Box>
          {editingId === 'new' ? (
            <Button fullWidth size="tall" variant="primary" type="submit">
              저장
            </Button>
          ) : (
            <FormActionGroup onCancel={onCancel} submitLabel="변경사항 저장" size="short" />
          )}
        </Stack>
      </form>
    </ContentSection>
  );
}
