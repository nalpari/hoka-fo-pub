'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.addresses에 현재 목록과 save/remove를 연결합니다. 신규 save는 id 없이, 수정 save는 원래 id로 전달됩니다.
 * 저장/삭제 후 목록 갱신까지 어댑터가 처리하며 실패는 reject합니다. 주소 검색 UI는 AddressFields에 있고 실제 우편번호 제공자는 별도 연동 영역입니다.
 */

import { useContext, useState } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';
import { MyPageInitialStateContext } from '@/context/MyPageInitialState';
import { useRequestAction } from '@/hooks/useRequestAction';

import { Typography } from '@/components/common/atoms/Typography';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { type Address } from '@/types/mypage-address.types';

import {
  AddressEditor,
  AddressList,
  emptyAddress,
  initialAddresses,
  MyPageAddressDeleteDialog,
} from './_components/AddressManagement';

/** 배송지 목록의 추가와 수정 및 삭제 상태를 관리합니다. (Manages adding, editing, and deleting shipping addresses.) */
export default function Page() {
  const { addresses: initialItems = initialAddresses } = useContext(MyPageInitialStateContext);
  const { addresses: binding } = useContext(MyPageDataContext);
  const request = useRequestAction();
  const [demoAddresses, setAddresses] = useState<Address[]>(initialItems);
  const addresses = binding?.items ?? demoAddresses;
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
    if (binding) {
      void request.run(async () => {
        await binding.save({ ...draft, id: editingId === 'new' ? undefined : draft.id });
        setEditingId(null);
      });
      return;
    }
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
      {(request.error || binding?.error) && (
        <Typography role="alert">{request.error || binding?.error}</Typography>
      )}
      {(request.pending || binding?.pending) && (
        <Typography role="status">배송지를 처리하고 있습니다.</Typography>
      )}
      <fieldset disabled={request.pending || binding?.pending}>
        {editingId === null &&
        addresses.length === 0 &&
        (binding?.pending || binding?.error) ? null : editingId === null ? (
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
      </fieldset>
      <MyPageAddressDeleteDialog
        pending={request.pending || binding?.pending}
        error={request.error || binding?.error}
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open && !request.pending) setDeleteId(null);
        }}
        onConfirm={() => {
          if (binding && deleteId !== null) {
            void request.run(async () => {
              await binding.remove(deleteId);
              setDeleteId(null);
            });
            return;
          }
          setAddresses((current) => current.filter((address) => address.id !== deleteId));
          setDeleteId(null);
        }}
      />
    </MyPageFrame>
  );
}
