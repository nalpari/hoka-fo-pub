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

const previewPageCounter = { current: 1, total: 10 };

/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 기본 목록의 1/10은 시안 표기이며 더보기는 비활성입니다. 마이페이지 연동 소유자는 AddressList에 현재 배송지 모델과 ID, 다음 페이지가 있을 때만 실제 페이지 카운터와 more.onLoadMore를 전달합니다. 소유자가 요청 중 중복 호출 방지, 실패 시 기존 목록 유지와 재시도, 성공 시 최신 응답 반영과 오래된 응답 폐기를 담당합니다. 저장·삭제의 payload와 요청 상태도 연동 소유자가 관리합니다. */
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
    <MyPageFrame activePath="/mypage/addresses" breadcrumbs={[{ label: '배송지 관리' }]}>
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
          more={
            state === 'list' && items === undefined ? { counter: previewPageCounter } : undefined
          }
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
