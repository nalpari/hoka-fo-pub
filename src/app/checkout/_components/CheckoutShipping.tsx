'use client';

import { useContext, useState } from 'react';
import { CheckoutContext } from '@/context/CheckoutContext';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import { CharacterCount } from '@/components/common/molecules/FormFields/CharacterCount';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { AddressFields } from '@/components/common/organisms/Address/AddressFields';

import { ContentSection } from '@/components/common/layouts/ContentSection';

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

/** 주문 배송 연락처를 공통 필드로 표시합니다. (Displays shipping contact inputs using shared form fields.) */
function CheckoutRecipientFields({ errors }: { errors?: ShippingErrors }) {
  return fields.map((field) => (
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
      }}
    />
  ));
}

type Props = {
  errors?: ShippingErrors;
  postalCode: string;
  address: string;
  onPostalCodeChange: (postalCode: string) => void;
  onAddressChange: (address: string) => void;
  searchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
};

/** 배송지 주소 입력과 주소 검색을 연결합니다. (Connects shipping address fields and address search.) */
function CheckoutAddressFields({
  errors,
  postalCode,
  address,
  onPostalCodeChange,
  onAddressChange,
  searchOpen,
  onSearchOpenChange,
}: Props) {
  const addressDetailDisabled = !postalCode.trim() || !address.trim();

  return (
    <>
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
        value={{ postalCode, address }}
        errors={errors}
        onValueChange={(field, next) => {
          if (field === 'postalCode') onPostalCodeChange(next);
          if (field === 'address') onAddressChange(next);
        }}
        searchOpen={searchOpen}
        onSearchOpenChange={onSearchOpenChange}
      />
      <input type="hidden" name="postalCode" value={postalCode} />
      <input type="hidden" name="address" value={address} />
    </>
  );
}

type CheckoutShippingFormProps = {
  errors?: ShippingErrors;
  postalCode: string;
  address: string;
  onAddressChange: (address: string) => void;
  onPostalCodeChange: (postalCode: string) => void;
  searchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
  onUseSavedAddress: () => void;
};

function CheckoutShippingForm({
  errors,
  postalCode,
  address,
  onAddressChange,
  onPostalCodeChange,
  searchOpen,
  onSearchOpenChange,
  onUseSavedAddress,
}: CheckoutShippingFormProps) {
  return (
    <Stack gap="4">
      <CheckoutRecipientFields errors={errors} />
      <CheckoutAddressFields
        errors={errors}
        postalCode={postalCode}
        address={address}
        onAddressChange={onAddressChange}
        onPostalCodeChange={onPostalCodeChange}
        searchOpen={searchOpen}
        onSearchOpenChange={onSearchOpenChange}
      />
      <Checkbox name="saveAsDefaultAddress" label="기본배송지로 등록" />
      <Button variant="link" size="sm" onClick={onUseSavedAddress}>
        기존 배송지 사용
      </Button>
    </Stack>
  );
}

type CheckoutSavedAddressProps = {
  errors?: ShippingErrors;
  onEdit: () => void;
};

const demoSavedAddress = {
  id: 'demo',
  label: '홍길동집',
  name: '홍길동',
  phone: '010-1234-5678',
  address: '서울시 강남구 역삼동 234-1',
  postalCode: '',
  addressDetail: '',
};

function CheckoutSavedAddress({ errors, onEdit }: CheckoutSavedAddressProps) {
  const binding = useContext(CheckoutContext);
  const saved = binding ? binding.savedAddress : demoSavedAddress;
  if (!saved) return null;
  return (
    <Box key={JSON.stringify(saved)} border="1px solid var(--colors-black-20)">
      <input type="hidden" name="savedAddressId" value={saved.id} />
      <input type="hidden" name="postalCode" value={saved.postalCode} />
      <input type="hidden" name="addressDetail" value={saved.addressDetail} />
      <HStack justifyContent="space-between" alignItems="center" bg="black.10" px="4" h="56px">
        <HStack gap="2">
          <Typography variant="body3" weight="medium">
            {saved.label}
          </Typography>
          <Box border="1px solid var(--colors-black-20)" px="1" py="0.5" borderRadius="2px">
            <Typography variant="body5">기본 배송지</Typography>
          </Box>
        </HStack>
        <Button variant="link" size="sm" onClick={onEdit}>
          배송지변경
        </Button>
      </HStack>
      <Stack gap="3" px="4" py="5" borderTop="1px solid var(--colors-black-20)">
        <HStack gap="4" alignItems="flex-start">
          <Box minW="48px">
            <Typography variant="body4" tone="subtle">
              주소
            </Typography>
          </Box>
          <Stack flex="1" gap="1">
            <TextInput
              appearance="compact"
              aria-label="주소"
              name="address"
              autoComplete="street-address"
              defaultValue={saved.address}
            />
            {errors?.address ? (
              <Typography variant="body5" tone="subtle">
                {errors.address}
              </Typography>
            ) : null}
          </Stack>
        </HStack>
        <HStack gap="4">
          <Box minW="48px">
            <Typography variant="body4" tone="subtle">
              받는 분
            </Typography>
          </Box>
          <TextInput
            appearance="compact"
            aria-label="받는 분"
            name="name"
            autoComplete="name"
            defaultValue={saved.name}
          />
        </HStack>
        <HStack gap="4">
          <Box minW="48px">
            <Typography variant="body4" tone="subtle">
              연락처
            </Typography>
          </Box>
          <TextInput
            appearance="compact"
            aria-label="연락처"
            name="phone"
            autoComplete="tel"
            defaultValue={saved.phone}
          />
        </HStack>
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
function CheckoutDeliveryRequest() {
  const [request, setRequest] = useState('');
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

/** 주문자와 배송지 입력 및 배송 요청을 표시합니다. (Displays checkout shipping details and delivery requests.) */
export function CheckoutShipping({
  errors,
  initialEditing = false,
}: {
  errors?: ShippingErrors;
  initialEditing?: boolean;
}) {
  const binding = useContext(CheckoutContext);
  const hasSavedAddress = !binding || binding.savedAddress !== null;
  const [editing, setEditing] = useState(initialEditing);
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <ContentSection
      as="section"
      gap="4"
      title="주문자 및 배송지 정보"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading10', mo: 'heading7' } }}
    >
      {editing || !hasSavedAddress ? (
        <CheckoutShippingForm
          errors={errors}
          postalCode={postalCode}
          address={address}
          onAddressChange={setAddress}
          onPostalCodeChange={setPostalCode}
          searchOpen={searchOpen}
          onSearchOpenChange={setSearchOpen}
          onUseSavedAddress={() => setEditing(false)}
        />
      ) : (
        <CheckoutSavedAddress errors={errors} onEdit={() => setEditing(true)} />
      )}
      <CheckoutDeliveryRequest />
    </ContentSection>
  );
}
