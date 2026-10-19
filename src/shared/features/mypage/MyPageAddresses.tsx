'use client';

import { useState } from 'react';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Badge } from '@/shared/components/atoms/Badge/Badge';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { MyPageAddressDeleteDialog } from '@/shared/features/mypage/MyPageAddressDeleteDialog';
import { AddressSearchModal } from '@/shared/components/organisms/Address/AddressSearchModal';
import { MyPageFrame } from './MyPageFrame';

type Address = {
  id: number;
  recipient: string;
  name: string;
  phone: string;
  alternatePhone: string;
  zip: string;
  address: string;
  detail: string;
  isDefault: boolean;
};

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

export function MyPageAddresses({ initialItems = initialAddresses }: { initialItems?: Address[] }) {
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
                    {address.isDefault ? <Badge tone="subtle">기본 배송지</Badge> : null}
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
                    <Button size="sm" variant="link" onClick={() => startEdit(address)}>
                      수정
                    </Button>
                    {!address.isDefault ? (
                      <Button size="sm" variant="link" onClick={() => setDeleteId(address.id)}>
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
          <Button fullWidth size="tall" variant="primary" onClick={startNew}>
            배송지 추가
          </Button>
        </Stack>
      ) : (
        <Stack gap="5" px="4" pt="6" pb="16">
          <Typography as="h1" web="heading8" mo="heading5">
            {editingId === 'new' ? '배송지 추가' : '배송지 수정'}
          </Typography>
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              save();
            }}
          >
            <Stack gap="2">
              <FormField
                htmlFor="address-recipient"
                label="이름"
                required
                variant="boxed"
                error={fieldError('recipient')}
              >
                <TextInput
                  id="address-recipient"
                  required
                  placeholder="이름을 입력해 주세요"
                  value={draft.recipient}
                  onChange={(event) => update('recipient', event.target.value)}
                />
              </FormField>
              <FormField
                htmlFor="address-name"
                label="배송지명"
                required
                variant="boxed"
                error={fieldError('name')}
              >
                <TextInput
                  id="address-name"
                  required
                  placeholder="배송지명을 입력해 주세요"
                  value={draft.name}
                  onChange={(event) => update('name', event.target.value)}
                />
              </FormField>
              <FormField
                htmlFor="address-phone"
                label="휴대폰 번호"
                required
                variant="boxed"
                error={fieldError('phone')}
              >
                <TextInput
                  id="address-phone"
                  required
                  type="tel"
                  placeholder="- 없이 입력해 주세요"
                  value={draft.phone}
                  onChange={(event) => update('phone', event.target.value)}
                />
              </FormField>
              <FormField htmlFor="address-alternate-phone" label="다른 전화번호" variant="boxed">
                <TextInput
                  id="address-alternate-phone"
                  type="tel"
                  placeholder="- 없이 입력해 주세요"
                  value={draft.alternatePhone}
                  onChange={(event) => update('alternatePhone', event.target.value)}
                />
              </FormField>
              <HStack alignItems="end" gap="2">
                <Box flex="1">
                  <FormField
                    htmlFor="address-zip"
                    label="우편번호"
                    required
                    variant="boxed"
                    error={fieldError('zip')}
                  >
                    <TextInput
                      id="address-zip"
                      required
                      readOnly
                      placeholder="우편번호 찾기 버튼을 눌러주세요"
                      value={draft.zip}
                    />
                  </FormField>
                </Box>
                <Button size="sm" variant="link" type="button" onClick={() => setAddressOpen(true)}>
                  우편번호 찾기
                </Button>
              </HStack>
              <FormField
                htmlFor="address-line"
                label="주소"
                required
                disabled={!draft.zip}
                variant="boxed"
                error={fieldError('address')}
              >
                <TextInput
                  id="address-line"
                  disabled={!draft.zip}
                  required
                  placeholder="주소를 입력해 주세요"
                  value={draft.address}
                  readOnly
                />
              </FormField>
              <FormField
                htmlFor="address-detail"
                label="상세주소"
                required
                variant="boxed"
                error={fieldError('detail')}
              >
                <TextInput
                  id="address-detail"
                  required
                  placeholder="상세주소를 입력해 주세요"
                  value={draft.detail}
                  onChange={(event) => update('detail', event.target.value)}
                />
              </FormField>
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
                <HStack gap="2">
                  <Button
                    fullWidth
                    size="short"
                    variant="secondary"
                    type="button"
                    onClick={() => setEditingId(null)}
                  >
                    취소
                  </Button>
                  <Button fullWidth size="short" variant="primary" type="submit">
                    변경사항 저장
                  </Button>
                </HStack>
              )}
            </Stack>
          </form>
        </Stack>
      )}
      <AddressSearchModal
        open={addressOpen}
        onOpenChange={setAddressOpen}
        postalCode={draft.zip}
        address={draft.address}
        onPostalCodeChange={(value) => update('zip', value)}
        onAddressChange={(value) => update('address', value)}
        idPrefix="mypage-address"
      />
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
