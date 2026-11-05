'use client';

import { type Dispatch, type Ref, type SetStateAction, useContext, useRef, useState } from 'react';
import { CheckoutContext } from '@/context/CheckoutContext';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { Typography } from '@/components/common/atoms/Typography';

import { CharacterCount } from '@/components/common/molecules/FormFields/CharacterCount';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { AddressFields } from '@/components/common/organisms/Address/AddressFields';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

const fields = [
  {
    name: 'name',
    label: '받는 분',
    placeholder: '이름을 입력해주세요',
    autoComplete: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'email',
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
    autoComplete: 'email',
    type: 'email',
    required: false,
  },
  {
    name: 'phone',
    label: '휴대폰 번호',
    placeholder: '휴대폰 번호를 입력해주세요',
    autoComplete: 'tel',
    type: 'tel',
    required: true,
  },
  {
    name: 'otherPhone',
    label: '다른 전화번호',
    placeholder: '다른 전화번호를 입력해주세요',
    autoComplete: 'off',
    type: 'tel',
    required: false,
  },
] as const;

const emptyShippingDraft = {
  name: '',
  email: '',
  phone: '',
  otherPhone: '',
  postalCode: '',
  address: '',
  addressDetail: '',
  isDefault: false,
};

type ShippingDraft = typeof emptyShippingDraft;

function CheckoutShippingForm({
  draft,
  onDraftChange,
  errors,
  onUseSavedAddress,
}: {
  draft: ShippingDraft;
  onDraftChange: Dispatch<SetStateAction<ShippingDraft>>;
  errors?: ShippingErrors;
  onUseSavedAddress?: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { postalCode, address, addressDetail } = draft;
  const addressDetailDisabled = !postalCode.trim() || !address.trim();

  return (
    <Stack gap="4">
      {fields.map((field) => (
        <TextFormField
          key={field.name}
          id={`shipping-${field.name}`}
          label={field.label}
          variant="boxed"
          required={field.required}
          error={field.name === 'name' || field.name === 'phone' ? errors?.[field.name] : undefined}
          inputProps={{
            name: field.name,
            placeholder: field.placeholder,
            autoComplete: field.autoComplete,
            type: field.type,
            value: draft[field.name],
            onChange: (event) => onDraftChange({ ...draft, [field.name]: event.target.value }),
          }}
        />
      ))}
      <AddressFields
        variant="boxed"
        fieldOptions={{
          postalCode: { disabled: true, inputProps: { name: 'postalCode', readOnly: true } },
          address: { disabled: true, inputProps: { name: 'address', readOnly: true } },
          addressDetail: {
            disabled: addressDetailDisabled,
            inputProps: { name: 'addressDetail' },
          },
        }}
        idPrefix="shipping"
        value={{ postalCode, address, addressDetail }}
        errors={errors}
        onValueChange={(field, next) => onDraftChange((current) => ({ ...current, [field]: next }))}
        searchOpen={searchOpen}
        onSearchOpenChange={setSearchOpen}
      />
      <Checkbox
        label="기본배송지로 등록"
        checked={draft.isDefault}
        onCheckedChange={(isDefault) => onDraftChange({ ...draft, isDefault })}
      />
      {onUseSavedAddress && (
        <Button variant="link" size="sm" onClick={onUseSavedAddress}>
          기존 배송지 사용
        </Button>
      )}
    </Stack>
  );
}

type CheckoutSavedAddressProps = {
  errors?: ShippingErrors;
  editButtonRef: Ref<HTMLButtonElement>;
  onEdit: () => void;
};

const demoSavedAddress = {
  id: 'demo',
  label: '홍길동집',
  name: '홍길동',
  phone: '010-1234-5678',
  otherPhone: '010-1234-5678',
  address: '서울시 강남구 역삼동 234-1',
  postalCode: '',
  addressDetail: '',
};

function CheckoutSavedAddress({ errors, editButtonRef, onEdit }: CheckoutSavedAddressProps) {
  const binding = useContext(CheckoutContext);
  const saved = binding ? binding.savedAddress : demoSavedAddress;
  if (!saved) return null;

  const infoItems = [
    { label: '받는분', value: saved.name },
    { label: '연락처', value: saved.phone },
    ...(saved.otherPhone ? [{ label: '다른연락처', value: saved.otherPhone }] : []),
    { label: '주소', value: saved.address },
  ];

  return (
    <Box key={JSON.stringify(saved)} border="1px solid var(--colors-black-20)">
      <HStack justifyContent="space-between" alignItems="center" bg="black.10" px="4" h="56px">
        <HStack gap="2">
          <Typography variant="body3" weight="medium">
            {saved.label}
          </Typography>
          <Box border="1px solid var(--colors-black-20)" px="1" py="0.5" borderRadius="2px">
            <Typography variant="body5">기본 배송지</Typography>
          </Box>
        </HStack>
        <Button
          ref={editButtonRef}
          variant="link"
          size="sm"
          aria-haspopup="dialog"
          onClick={onEdit}
        >
          배송지변경
        </Button>
      </HStack>
      <Stack gap="3" px="4" py="5" borderTop="1px solid var(--colors-black-20)">
        <Stack gap="3">
          {infoItems.map(({ label, value }) => (
            <HStack key={label} gap="2" alignItems="center">
              <Box w="82px" flexShrink="0">
                <Typography variant="body3" tone="subtle">
                  {label}
                </Typography>
              </Box>
              <Stack flex="1" gap="1" minW="0">
                <Typography variant="body4" weight="medium">
                  {value}
                </Typography>
                {label === '주소' && errors?.address ? (
                  <Typography variant="body5" tone="subtle">
                    {errors.address}
                  </Typography>
                ) : null}
              </Stack>
            </HStack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

/** 배송 요청 직접 입력과 글자 수 안내를 표시합니다. (Displays custom delivery instructions with a character count.) */
function CheckoutDeliveryMessageField({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <TextFormField
      id="delivery-message"
      label="요청사항"
      variant="boxed"
      inputProps={{
        multiline: true,
        name: 'deliveryMessage',
        value,
        onChange: (event) => onValueChange(event.target.value),
        maxLength: 250,
        rows: 5,
        placeholder: '내용을 입력해주세요.',
      }}
      renderControl={(control) => (
        <Stack gap="2" w="100%">
          {control}
          <CharacterCount
            length={value.length}
            limit={250}
            tone="subtle"
            className={css({ textAlign: 'right' })}
          />
        </Stack>
      )}
    />
  );
}

/** 배송 요청의 정해진 옵션을 표시합니다. (Displays preset delivery instruction options.) */
function CheckoutDeliveryRequestSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Dropdown
      ariaLabel="배송시 요청사항"
      label="배송시 요청사항"
      required
      name="deliveryRequest"
      placeholder="요청사항을 선택해주세요"
      value={value}
      onValueChange={onValueChange}
      options={[
        { value: 'door', label: '문 앞에 놓아주세요' },
        { value: 'call', label: '배송 전 연락주세요' },
        { value: 'security', label: '경비실에 맡겨주세요' },
        { value: 'custom', label: '직접 입력하기' },
      ]}
    />
  );
}

/** 배송 요청 선택과 직접 입력을 관리합니다. (Manages delivery instructions and custom text.) */
function CheckoutDeliveryRequest({ initialRequest = '' }: { initialRequest?: string }) {
  const [request, setRequest] = useState(initialRequest);
  const [message, setMessage] = useState('');
  return (
    <Stack gap="3">
      <CheckoutDeliveryRequestSelect value={request} onValueChange={setRequest} />
      {request === 'custom' ? (
        <CheckoutDeliveryMessageField value={message} onValueChange={setMessage} />
      ) : null}
    </Stack>
  );
}

export type ShippingErrors = Partial<Record<'name' | 'phone' | 'address', string>>;

/**
 * [ 개발팀 바인딩 ] initialEditing·initialAddressChangeOpen·initialDeliveryRequest는 고정 preview seed입니다.
 * 배송지 변경 모달은 기존 입력을 표시합니다. 주문서 연동 소유자가 수령인·연락처·주소·기본배송지 여부를 연결하고,
 * 변경 요청 중 중복 제출을 막으며 실패 시 입력을 유지합니다. 성공 시 savedAddress를 갱신한 뒤 모달을 닫습니다.
 * 현재 입력·닫기는 로컬 UI입니다. 저장 버튼은 연동 전까지 비활성이며 배송 요청 전송도 연결하지 않습니다.
 */
/** 주문자와 배송지 입력 및 배송 요청을 표시합니다. (Displays checkout shipping details and delivery requests.) */
export function CheckoutShipping({
  errors,
  initialEditing = false,
  initialAddressChangeOpen = false,
  initialDeliveryRequest,
}: {
  errors?: ShippingErrors;
  initialEditing?: boolean;
  initialAddressChangeOpen?: boolean;
  initialDeliveryRequest?: string;
}) {
  const binding = useContext(CheckoutContext);
  const hasSavedAddress = !binding || binding.savedAddress !== null;
  const [editing, setEditing] = useState(initialEditing);
  const [addressChangeOpen, setAddressChangeOpen] = useState(initialAddressChangeOpen);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const [draft, setDraft] = useState(emptyShippingDraft);
  const showInlineForm = editing || !hasSavedAddress;

  function closeAddressChange() {
    setAddressChangeOpen(false);
    setDraft(emptyShippingDraft);
  }

  return (
    <ContentSection
      as="section"
      gap="4"
      title="주문자 및 배송지 정보"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading7', mo: 'heading6' } }}
    >
      {showInlineForm ? (
        <CheckoutShippingForm
          draft={draft}
          onDraftChange={setDraft}
          errors={errors}
          onUseSavedAddress={() => {
            if (!hasSavedAddress) return;
            setEditing(false);
            setDraft(emptyShippingDraft);
          }}
        />
      ) : (
        <>
          <CheckoutSavedAddress
            errors={errors}
            editButtonRef={editButtonRef}
            onEdit={() => setAddressChangeOpen(true)}
          />
          <ModalDialog
            title="배송지 변경"
            mobilePresentation="fullscreen"
            closeLabel="배송지 변경 닫기"
            open={addressChangeOpen}
            onOpenChange={(open) => {
              if (!open) closeAddressChange();
            }}
            finalFocus={editButtonRef}
            actions={{
              kind: 'single',
              label: '저장',
              buttonProps: { disabled: true },
            }}
          >
            <CheckoutShippingForm draft={draft} onDraftChange={setDraft} />
          </ModalDialog>
        </>
      )}
      <CheckoutDeliveryRequest initialRequest={initialDeliveryRequest} />
    </ContentSection>
  );
}
