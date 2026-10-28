'use client';

import { useContext, useState } from 'react';
import { MyPageInitialStateContext } from '@/context/MyPageInitialState';
import { AddressEditor } from '@/components/features/mypage/AddressEditor';
import { AddressList } from '@/components/features/mypage/AddressList';
import type { Address } from '@/components/features/mypage/mypage-address.types';

import { MyPageAddressDeleteDialog } from '@/components/features/mypage/MyPageAddressDeleteDialog';
import { MyPageFrame } from '@/components/features/mypage/MyPageFrame';

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
