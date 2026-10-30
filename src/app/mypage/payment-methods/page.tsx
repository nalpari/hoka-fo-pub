'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.paymentMethods에 마스킹 목록과 register를 연결합니다. 실제 결제사 등록 창/SDK는 어댑터가 엽니다.
 * register는 사용자 취소면 cancelled, 등록 및 목록 재조회 성공이면 registered를 반환합니다. 카드 원문/계좌정보를 화면 상태에 보관하지 않습니다.
 */

import { useContext, useState } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';
import { useRequestAction } from '@/hooks/useRequestAction';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { AccountDataList } from '@/components/common/organisms/Account/AccountDataList';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';

/** 결제수단 등록 현황을 표시합니다. (Displays the payment method registration status.) */
export default function Page() {
  const binding = useContext(MyPageDataContext).paymentMethods;
  const request = useRequestAction();
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  return (
    <MyPageFrame activePath="/mypage/payment-methods" breadcrumbs={[{ label: '결제수단 관리' }]}>
      <ContentSection
        gap="6"
        title={<>결제수단 관리</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
      >
        <BindingFeedback
          {...binding}
          pending={binding?.pending || request.pending}
          error={binding?.error || request.error}
        />
        <AccountDataList
          rows={
            binding
              ? binding.items.map((item) => ({ label: item.label, value: item.maskedNumber }))
              : [{ label: '기본 결제수단', value: '등록된 결제수단이 없습니다.' }]
          }
        />
        <Button onClick={() => setOpen(true)} disabled={binding?.pending || request.pending}>
          결제수단 등록
        </Button>
        {complete && <Typography role="status">결제수단이 등록되었습니다.</Typography>}
        <ModalDialog
          open={open}
          onOpenChange={(next) => {
            if (!request.pending) setOpen(next);
          }}
          title="결제수단 등록"
          closeLabel="결제수단 등록 닫기"
          actions={{
            kind: 'confirm',
            confirmDisabled: request.pending,
            onConfirm: () => {
              // 개발팀 적용: register는 결제사 등록 완료까지 대기하고 cancelled/registered를 반환합니다. 창을 열었다는 이유만으로 성공 처리하지 않습니다.
              void request.run(async () => {
                if (!binding) throw new Error('결제수단 등록 서비스가 연결되지 않았습니다.');
                const outcome = await binding.register();
                setOpen(false);
                setComplete(outcome === 'registered');
              });
            },
          }}
        >
          <Typography>결제사 화면에서 결제수단을 등록합니다.</Typography>
          <BindingFeedback pending={request.pending} error={request.error} />
        </ModalDialog>
      </ContentSection>
    </MyPageFrame>
  );
}
