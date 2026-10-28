'use client';

import { useContext, useState } from 'react';
import { MyPageInitialStateContext } from '@/context/MyPageInitialState';

import { Box, HStack, Stack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge/Badge';
import { Button } from '@/components/common/atoms/Button/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox/Checkbox';
import { EmptyState } from '@/components/common/atoms/EmptyState/EmptyState';
import { Typography } from '@/components/common/atoms/Typography/Typography';

import { ConfirmDialog } from '@/components/common/molecules/ConfirmDialog/ConfirmDialog';
import { FormActionGroup } from '@/components/common/molecules/FormActionGroup/FormActionGroup';
import { NameField } from '@/components/common/molecules/FormFields/NameField';
import { PhoneNumberField } from '@/components/common/molecules/FormFields/PhoneNumberField';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { AddressFields } from '@/components/common/organisms/Address/AddressFields';

import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';

import { type Address } from '@/components/mypage/mypage-address.types';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';

function AddressEditor({
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

function AddressList({
  addresses,
  onEdit,
  onDelete,
  onAdd,
}: {
  addresses: readonly Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}) {
  return (
    <Stack gap="6" px="4" pt="6" pb="16">
      {addresses.length ? (
        <Stack gap="0">
          {addresses.map((address) => (
            <Stack
              as="article"
              key={address.id}
              gap="2"
              py="5"
              borderBottom="1px solid var(--colors-black-20)"
            >
              <HStack alignItems="center" gap="2">
                <Typography as="h2" variant="heading6">
                  {address.name}
                </Typography>
                {address.isDefault ? (
                  <Badge shape="round" variant="filled" tone="tertiary">
                    기본 배송지
                  </Badge>
                ) : null}
              </HStack>
              <Typography variant="body4" language="en" tone="tertiary">
                {address.phone}
              </Typography>
              <Typography variant="body4" language="en" tone="tertiary">
                {address.zip}
              </Typography>
              <Typography variant="body4" tone="tertiary">
                {address.address} {address.detail}
              </Typography>
              <HStack gap="4" pt="2">
                <Button size="sm" variant="link" onClick={() => onEdit(address)}>
                  수정
                </Button>
                {!address.isDefault ? (
                  <Button size="sm" variant="link" onClick={() => onDelete(address.id)}>
                    삭제
                  </Button>
                ) : null}
              </HStack>
            </Stack>
          ))}
        </Stack>
      ) : (
        <EmptyState title="자주 쓰는 배송지 주소를 설정해주세요." variant="minimal" />
      )}
      <Button fullWidth size="tall" variant="primary" onClick={onAdd}>
        배송지 추가
      </Button>
    </Stack>
  );
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

function MyPageAddressDeleteDialog({ open, onOpenChange, onConfirm }: Props) {
  return (
    <ConfirmDialog
      onConfirm={onConfirm}
      closeLabel="배송지 삭제 확인창 닫기"
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="배송지 관리"
    >
      <Typography as="p" variant="body3">
        배송지를 삭제 하시겠습니까?
      </Typography>
    </ConfirmDialog>
  );
}

const initialAddresses: Address[] = [
  {
    id: 1,
    recipient: '홍길동',
    name: '우리집',
    phone: '010-8005-6605',
    alternatePhone: '',
    zip: '02157',
    address: '서울시 성북구 테헤란로 27길 54',
    detail: '테헤란 아파트 701호',
    isDefault: true,
  },
  {
    id: 2,
    recipient: '홍길동',
    name: '직장',
    phone: '010-8005-6605',
    alternatePhone: '',
    zip: '02157',
    address: '서울시 성북구 테헤란로 27길 54',
    detail: '테헤란 아파트 701호',
    isDefault: false,
  },
];

const emptyAddress: Address = {
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

/** 배송지 목록의 추가와 수정 및 삭제 상태를 관리합니다. (Manages adding, editing, and deleting shipping addresses.) */
export default function Page() {
  const { addresses: initialItems = initialAddresses } = useContext(MyPageInitialStateContext);
  const [addresses, setAddresses] = useState<Address[]>(initialItems);
  const [editingId, setEditingId] = useState<number | 'new' | null>(null);
  const [draft, setDraft] = useState<Address>(emptyAddress);
  const [addressOpen, setAddressOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fieldError = (key: 'recipient' | 'name' | 'phone' | 'zip' | 'address' | 'detail') =>
    submitted && !draft[key].trim() ? '필수 항목을 입력해 주세요.' : undefined;

  const [deleteId, setDeleteId] = useState<number | null>(null);

  function startNew() {
    setSubmitted(false);
    setDraft({ ...emptyAddress, isDefault: addresses.length === 0 });
    setEditingId('new');
  }

  function startEdit(address: Address) {
    setSubmitted(false);
    setDraft({ ...address });
    setEditingId(address.id);
  }

  function update<K extends keyof Address>(key: K, value: Address[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function save() {
    setSubmitted(true);
    if (
      !draft.recipient.trim() ||
      !draft.name.trim() ||
      !draft.phone.trim() ||
      !draft.zip.trim() ||
      !draft.address.trim() ||
      !draft.detail.trim()
    )
      return;
    const saved = { ...draft, id: editingId === 'new' ? Date.now() : draft.id };
    setAddresses((current) => {
      const next =
        editingId === 'new'
          ? [...current, saved]
          : current.map((item) => (item.id === saved.id ? saved : item));
      return saved.isDefault
        ? next.map((item) => ({ ...item, isDefault: item.id === saved.id }))
        : next;
    });
    setEditingId(null);
  }

  return (
    <MyPageFrame
      activePath="/mypage/addresses"
      breadcrumbs={[
        { label: '계정관리', href: '/mypage' },
        {
          label:
            editingId === null
              ? '배송지 관리'
              : editingId === 'new'
                ? '배송지 추가'
                : '배송지 수정',
        },
      ]}
    >
      {editingId === null ? (
        <AddressList
          addresses={addresses}
          onEdit={startEdit}
          onDelete={setDeleteId}
          onAdd={startNew}
        />
      ) : (
        <AddressEditor
          editingId={editingId}
          draft={draft}
          fieldError={fieldError}
          update={update}
          save={save}
          onCancel={() => setEditingId(null)}
          addressOpen={addressOpen}
          onAddressOpenChange={setAddressOpen}
        />
      )}
      <MyPageAddressDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        onConfirm={() => {
          setAddresses((current) => current.filter((address) => address.id !== deleteId));
          setDeleteId(null);
        }}
      />
    </MyPageFrame>
  );
}
