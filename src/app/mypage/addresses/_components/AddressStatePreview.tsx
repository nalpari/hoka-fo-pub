'use client';

import { useState } from 'react';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';

import { AddressEditor, AddressList, emptyAddress, initialAddresses } from './AddressManagement';

/** [ 개발팀 바인딩 ] 고정 빈 목록/편집 오류의 확인 화면입니다. 입력·주소 검색만 로컬이며 save/remove는 실행하지 않습니다. 운영 ID·저장·삭제·조회 결과는 MyPageDataContext.addresses 연결 소유자가 관리합니다. */
/** 배송지의 빈 목록과 등록·수정 오류를 표시합니다. (Displays empty addresses and fixed create/edit errors.) */
export function AddressStatePreview({ state }: { state: 'empty' | 'new' | 'edit' | 'error' }) {
  const [editing, setEditing] = useState(state !== 'empty');
  const [draft, setDraft] = useState(state === 'edit' ? initialAddresses[0] : emptyAddress);
  const [addressOpen, setAddressOpen] = useState(false);
  return (
    <MyPageFrame
      activePath="/mypage/addresses"
      breadcrumbs={[
        { label: '계정관리', href: '/mypage' },
        { label: editing ? '배송지 추가/수정' : '배송지 관리' },
      ]}
    >
      {editing ? (
        <AddressEditor
          editingId={state === 'edit' ? draft.id : 'new'}
          draft={draft}
          fieldError={() => (state === 'error' ? '필수 항목을 입력해 주세요.' : undefined)}
          update={(key, value) => setDraft((previous) => ({ ...previous, [key]: value }))}
          save={() => {}}
          onCancel={() => setEditing(false)}
          addressOpen={addressOpen}
          onAddressOpenChange={setAddressOpen}
        />
      ) : (
        <AddressList
          addresses={[]}
          onAdd={() => setEditing(true)}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      )}
    </MyPageFrame>
  );
}
