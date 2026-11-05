'use client';

import { type ComponentProps, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

const previousTerms = [
  '2025-07-01',
  '2024-06-22',
  '2023-02-01',
  '2022-03-16',
  '2021-09-19',
  '2020-01-12',
  '2019-07-23',
] as const;

const popup = css({
  border: '1px solid var(--color-border-subtle, var(--colors-black-20))',
  '& > header + div': { pb: '0' },
  '& > footer': { px: '6', pt: '4' },
});

/** 약관 시행일을 PC 라디오 목록과 모바일 선택 시트에서 표시·선택합니다. (Displays and selects terms versions in a desktop radio list or mobile selection sheet.) */
export function PreviousTermsPicker({
  open,
  onClose,
  onSelect,
  versions,
  finalFocus,
}: {
  versions?: readonly {
    id: string;
    label: string;
  }[];
  open: boolean;
  onClose: () => void;
  onSelect: (id?: string) => void;
  finalFocus?: ComponentProps<typeof ModalDialog>['finalFocus'];
}) {
  const platform = usePlatform();
  const dates = versions ? versions.map((version) => version.id) : previousTerms;
  const label = (id: string) => versions?.find((version) => version.id === id)?.label ?? id;
  const [selectedDate, setSelectedDate] = useState<string>(dates[0] ?? '');
  const [confirmedDate, setConfirmedDate] = useState(selectedDate);
  // [ 개발팀 바인딩 ] versions의 id/label은 호출 화면이 제공하며 생략하면 표시 fixture를 사용합니다. PC/모바일 모두 라디오 선택은 초안만 바꾸고 확인 시 onSelect(id)를 전달합니다. 모바일 확인은 onClose도 호출하며 닫기/Escape는 확정값으로 초안을 복원합니다. 버전별 문서 조회는 미구현이며 호출 화면이 소유합니다. 공통 Dropdown의 즉시 선택 계약과는 별개입니다.

  if (platform === 'mobile') {
    if (!open) return null;
    return (
      <ModalDialog
        open
        mobilePresentation="bottomSheet"
        closeLabel="닫기"
        title="이전 약관 보기"
        onOpenChange={(open) => {
          if (open) return;
          setSelectedDate(confirmedDate);
          onClose();
        }}
        finalFocus={finalFocus}
        contentClassName={css({ h: '334px' })}
        footer={
          <Button
            variant="primary"
            disabled={!dates.some((date) => date === selectedDate)}
            onClick={() => {
              setConfirmedDate(selectedDate);
              onSelect(selectedDate);
              onClose();
            }}
          >
            확인
          </Button>
        }
      >
        <Stack gap="16px">
          <Typography as="p" variant="body3">
            약관 시행일을 선택해주세요
          </Typography>
          <Radio
            ariaLabel="이전 약관 시행일"
            name="previous-terms-date-mobile"
            value={selectedDate}
            onValueChange={setSelectedDate}
            options={dates.map((date) => ({ value: date, label: label(date) }))}
            className={css({ gap: '16px' })}
          />
        </Stack>
      </ModalDialog>
    );
  }
  return (
    <ModalDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      title="이전 약관 보기"
      closeLabel="이전 약관 보기 닫기"
      size="md"
      mobilePresentation="bottomSheet"
      popupClassName={popup}
      finalFocus={finalFocus}
      actions={{
        kind: 'single',
        onConfirm: () => {
          setConfirmedDate(selectedDate);
          onSelect(selectedDate);
        },
        buttonProps: { disabled: dates.length === 0 },
      }}
    >
      <Stack gap="4">
        <Typography as="p" variant="body3">
          약관 시행일을 선택해주세요
        </Typography>
        <Radio
          ariaLabel="이전 약관 시행일"
          name="previous-terms-date"
          value={selectedDate}
          onValueChange={setSelectedDate}
          options={dates.map((date) => ({ value: date, label: label(date) }))}
        />
      </Stack>
    </ModalDialog>
  );
}
