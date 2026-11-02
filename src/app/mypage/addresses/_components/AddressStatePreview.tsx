'use client';
import { useState } from 'react';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { type Address } from '@/types/mypage-address.types';

import {
  AddressEditor,
  AddressList,
  emptyAddress,
  initialAddresses,
  MyPageAddressDeleteDialog,
} from './AddressManagement';
const editPreviewAddress: Address = {
  ...initialAddresses[1],
  phone: '01066040606',
  zip: '052266',
  isDefault: true,
};
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 마이페이지 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
/** 배송지 빈 목록과 추가·수정 및 고정 오류를 표시합니다. (Displays empty, create, edit, and fixed error address previews.) */
export function AddressStatePreview({
  state,
  items,
}: {
  items?: readonly Address[];
  state: 'list' | 'empty' | 'new' | 'edit' | 'error' | 'delete';
}) {
  const [editing, setEditing] = useState(
    state !== 'delete' && state !== 'empty' && state !== 'list',
  );
  const [draft, setDraft] = useState(state === 'edit' ? editPreviewAddress : emptyAddress);
  const [deleteOpen, setDeleteOpen] = useState(state === 'delete');
  const [editingId, setEditingId] = useState<number | 'new'>(
    state === 'edit' ? editPreviewAddress.id : 'new',
  );
  const [addressOpen, setAddressOpen] = useState(false);
  return (
    <MyPageFrame
      activePath="/mypage/addresses"
      breadcrumbs={[
        { label: '계정관리', href: '/mypage' },
        { label: editing ? (state === 'edit' ? '배송지 수정' : '배송지 추가') : '배송지 관리' },
      ]}
    >
      {editing ? (
        <AddressEditor
          editingId={editingId}
          draft={draft}
          fieldError={() => (state === 'error' ? '필수 항목을 입력해 주세요.' : undefined)}
          update={(key, value) => setDraft((previous) => ({ ...previous, [key]: value }))}
          onCancel={() => setEditing(false)}
          addressOpen={addressOpen}
          onAddressOpenChange={setAddressOpen}
        />
      ) : (
        <AddressList
          addresses={state === 'list' || state === 'delete' ? (items ?? initialAddresses) : []}
          onAdd={() => {
            setDraft(emptyAddress);
            setEditingId('new');
            setEditing(true);
          }}
          onEdit={(address) => {
            setDraft(address);
            setEditingId(address.id);
            setEditing(true);
          }}
          onDelete={() => setDeleteOpen(true)}
        />
      )}
      <MyPageAddressDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => setDeleteOpen(false)}
      />
    </MyPageFrame>
  );
}
