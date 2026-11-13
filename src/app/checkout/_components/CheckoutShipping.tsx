'use client';

import {
  type Dispatch,
  type Ref,
  type SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { AddressList } from '@/components/common/organisms/Address/AddressList';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import {
  checkoutAddressPagePreview,
  checkoutAddressPreview,
} from '@/app/checkout/checkout-address-preview';
import type { Address } from '@/types/mypage-address.types';

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
  addressName: '',
  phone: '',
  otherPhone: '',
  postalCode: '',
  address: '',
  addressDetail: '',
  isDefault: false,
};

type ShippingDraft = typeof emptyShippingDraft;

export type AddressEditorPreview = { kind: 'edit'; address: Address } | { kind: 'new' };

function shippingDraftFromAddress(address: Address): ShippingDraft {
  return {
    name: address.recipient,
    email: '',
    addressName: address.name,
    phone: address.phone,
    otherPhone: address.alternatePhone,
    postalCode: address.zip,
    address: address.address,
    addressDetail: address.detail,
    isDefault: address.isDefault,
  };
}

function CheckoutShippingForm({
  draft,
  onDraftChange,
  errors,
  dialog = false,
}: {
  dialog?: boolean;
  draft: ShippingDraft;
  onDraftChange: Dispatch<SetStateAction<ShippingDraft>>;
  errors?: ShippingErrors;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { postalCode, address, addressDetail } = draft;
  const addressDetailDisabled = !postalCode.trim() || !address.trim();

  return (
    <Stack gap="4">
      {(dialog
        ? [
            { ...fields[0], label: '이름', placeholder: '이름을 입력해 주세요' },
            {
              ...fields[0],
              name: 'addressName' as const,
              label: '배송지명',
              placeholder: '배송지명을 입력해 주세요',
              autoComplete: 'off',
            },
            { ...fields[2], placeholder: '‘-’없이 입력해 주세요' },
            { ...fields[3], placeholder: '‘-’없이 입력해 주세요', required: true },
          ]
        : fields
      ).map((field) => (
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
        searchLabel={dialog ? '우편번호 찾기' : undefined}
        fieldOptions={{
          postalCode: { disabled: true, inputProps: { name: 'postalCode', readOnly: true } },
          address: { disabled: !dialog, inputProps: { name: 'address', readOnly: !dialog } },
          addressDetail: {
            disabled: addressDetailDisabled,
            required: dialog,
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
        label={dialog ? '기본 배송지로 저장' : '기본배송지로 등록'}
        className={
          dialog
            ? css({ mt: '2', lineHeight: '21px', '& > span:last-child': { lineHeight: '21px' } })
            : undefined
        }
        checked={draft.isDefault}
        onCheckedChange={(isDefault) => onDraftChange({ ...draft, isDefault })}
      />
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
<Typography variant="body3Medium">
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
<Typography variant="body4Medium">
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
 * [ 개발팀 바인딩 ] initialEditing·initialAddressChangeOpen·initialAddressEditor·initialDeliveryRequest는 고정 preview seed입니다.
 * 배송지변경은 마이페이지와 공유하는 목록을 먼저 표시하고 수정·추가를 누를 때만 입력 화면으로 전환합니다.
 * 미연결 preview 목록은 checkoutAddressPreview의 네 행과 고정 더보기 카운터이며 연결된 현재 목록은 CheckoutContext.addresses에서 매 렌더 읽습니다.
 * 주문서 연동 소유자는 Address.id(현재 number)와 수령인·배송지명·연락처·주소·기본배송지 여부를 전달해야 합니다.
 * 저장·삭제 요청은 미연결입니다. 향후 소유자가 전체 입력 payload와 ID로 요청하고 pending 중 중복 제출 방지,
 * 실패 시 draft 유지·재시도, 성공 시 목록/savedAddress 갱신 및 닫기, 오래된 조회 응답 폐기를 담당합니다.
 * 현재 입력·닫기는 로컬 UI입니다. 저장·삭제·더보기는 표시만 제공하고 요청 handler를 연결하지 않습니다. 주소명(addressName)을 포함한 draft는 로컬 입력이며 실제 저장을 실행하지 않습니다. 배송 요청 전송도 연결하지 않습니다.
 */
/** 주문자와 배송지 입력 및 배송 요청을 표시합니다. (Displays checkout shipping details and delivery requests.) */
export function CheckoutShipping({
  errors,
  initialEditing = false,
  initialAddressChangeOpen = false,
  initialAddressEditor,
  initialDeliveryRequest,
}: {
  errors?: ShippingErrors;
  initialEditing?: boolean;
  initialAddressChangeOpen?: boolean;
  initialAddressEditor?: AddressEditorPreview;
  initialDeliveryRequest?: string;
}) {
  const binding = useContext(CheckoutContext);
  const hasSavedAddress = !binding || binding.savedAddress !== null;
  const [addressChangeOpen, setAddressChangeOpen] = useState(initialAddressChangeOpen);
  const [addressView, setAddressView] = useState<'list' | 'edit' | 'new'>(
    initialAddressEditor?.kind ?? 'list',
  );
  const addressTitleRef = useRef<HTMLSpanElement>(null);
  const addresses = binding ? (binding.addresses ?? []) : checkoutAddressPreview;
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const [draft, setDraft] = useState(() =>
    initialAddressEditor?.kind === 'edit'
      ? shippingDraftFromAddress(initialAddressEditor.address)
      : emptyShippingDraft,
  );
  const showInlineForm = initialEditing || !hasSavedAddress;

  function closeAddressChange() {
    setAddressChangeOpen(false);
    setAddressView('list');
    setDraft(emptyShippingDraft);
  }

  useEffect(() => {
    if (addressChangeOpen) addressTitleRef.current?.focus();
  }, [addressChangeOpen, addressView]);

  function editAddress(address: Address) {
    setDraft(shippingDraftFromAddress(address));
    setAddressView('edit');
  }

  return (
    <ContentSection
      as="section"
      gap="4"
      title="주문자 및 배송지 정보"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading7', mo: 'heading6' } }}
    >
      {showInlineForm ? (
        <CheckoutShippingForm draft={draft} onDraftChange={setDraft} errors={errors} />
      ) : (
        <>
          <CheckoutSavedAddress
            errors={errors}
            editButtonRef={editButtonRef}
            onEdit={() => setAddressChangeOpen(true)}
          />
          <ModalDialog
            title={
              <span ref={addressTitleRef} tabIndex={-1}>
                {addressView === 'list'
                  ? '배송지 관리'
                  : addressView === 'edit'
                    ? '배송지 수정'
                    : '배송지 추가'}
              </span>
            }
            variant="address"
            mobilePresentation="fullscreen"
            closeLabel="배송지 변경 닫기"
            open={addressChangeOpen}
            onOpenChange={(open) => {
              if (!open) closeAddressChange();
            }}
            finalFocus={editButtonRef}
            footer={
              addressView === 'list' ? (
                <Button
                  variant="primary"
                  size="tall"
                  onClick={() => {
                    setDraft(emptyShippingDraft);
                    setAddressView('new');
                  }}
                >
                  배송지 추가
                </Button>
              ) : (
                <>
                  <Button variant="secondary" size="tall" onClick={() => setAddressView('list')}>
                    취소
                  </Button>
                  <Button variant="primary" size="tall">
                    저장
                  </Button>
                </>
              )
            }
          >
            {addressView === 'list' ? (
              <AddressList
                embedded
                addresses={addresses}
                more={!binding ? { counter: checkoutAddressPagePreview } : undefined}
                onEdit={editAddress}
                onAdd={() => {
                  setDraft(emptyShippingDraft);
                  setAddressView('new');
                }}
              />
            ) : (
              <CheckoutShippingForm
                dialog
                key={addressView}
                draft={draft}
                onDraftChange={setDraft}
              />
            )}
          </ModalDialog>
        </>
      )}
      <CheckoutDeliveryRequest initialRequest={initialDeliveryRequest} />
    </ContentSection>
  );
}
