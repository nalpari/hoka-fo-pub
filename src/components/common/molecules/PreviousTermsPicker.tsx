'use client';

import { type ComponentProps, useEffect, useRef, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { BottomSheet } from '@/components/common/layouts/BottomSheet';
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

const wheelRowHeight = 34;

/** 약관 시행일을 PC 라디오 목록과 모바일 휠 시트에서 표시·선택합니다. (Displays and selects terms versions in a desktop radio list or mobile wheel sheet.) */
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
  finalFocus?: ComponentProps<typeof BottomSheet>['finalFocus'];
}) {
  const platform = usePlatform();
  const wheel = useRef<HTMLDivElement>(null);
  const dates = versions ? versions.map((version) => version.id) : previousTerms;
  const label = (id: string) => versions?.find((version) => version.id === id)?.label ?? id;
  const [selectedDate, setSelectedDate] = useState<string>(dates[0] ?? '');
  // [ 개발팀 바인딩 ] versions의 id/label은 호출 화면이 제공하며 생략하면 표시 fixture를 사용합니다. 모바일 휠은 스크롤·방향키로 로컬 선택을 바꾸고 날짜 클릭·Enter·Space 시 onSelect(id)와 onClose를 호출합니다. PC는 확인 시 onSelect(id)를 호출합니다. 버전별 문서 조회는 미구현이며 호출 화면이 소유합니다.
  const selectedIndex = Math.max(
    0,
    dates.findIndex((date) => date === selectedDate),
  );

  useEffect(() => {
    if (open && platform === 'mobile' && wheel.current) {
      wheel.current.scrollTop = selectedIndex * wheelRowHeight;
    }
  }, [open, platform, selectedIndex]);

  if (platform === 'mobile') {
    if (!open) return null;
    return (
      <BottomSheet
        appearance="selection"
        title="이전 약관 보기"
        ariaLabel="이전 약관 보기"
        onClose={onClose}
        finalFocus={finalFocus}
      >
        <Box pos="relative" h="232px">
          <Box
            pos="absolute"
            top="99px"
            left="0"
            right="0"
            h="34px"
            bg="#E8EDF3"
            borderRadius="8px"
            pointerEvents="none"
          />
          <Box
            ref={wheel}
            pos="relative"
            h="232px"
            overflowY="auto"
            css={{
              scrollSnapType: 'y mandatory',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
            onScrollEnd={(event) => {
              const next = dates[Math.round(event.currentTarget.scrollTop / wheelRowHeight)];
              if (next) setSelectedDate(next);
            }}
          >
            <Radio
              ariaLabel="이전 약관 시행일"
              name="previous-terms-date-mobile"
              value={selectedDate}
              onValueChange={setSelectedDate}
              onOptionActivate={(id) => {
                setSelectedDate(id);
                onSelect(id);
                onClose();
              }}
              options={dates.map((date, index) => ({
                value: date,
                label: (
                  <Typography
                    variant="body3"
                    data-date-label
                    style={{
                      color:
                        index === selectedIndex
                          ? '#000000'
                          : Math.abs(index - selectedIndex) >= 3
                            ? '#B3B3B3'
                            : '#777777',
                    }}
                  >
                    {label(date)}
                  </Typography>
                ),
              }))}
              variant="custom"
              className={css({ gap: '0', py: '99px', textAlign: 'center' })}
              optionClassName={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                w: '100%',
                h: '34px',
                border: '0',
                bg: 'transparent',
                cursor: 'pointer',
                scrollSnapAlign: 'center',
                _focusVisible: {
                  outline: '2px solid var(--colors-black-100)',
                  outlineOffset: '-2px',
                },
              })}
              selectedOptionClassName={css({
                '& [data-date-label]': {
                  fontSize: '20px',
                  lineHeight: '26px',
                  fontWeight: 'normal',
                },
              })}
            />
          </Box>
        </Box>
      </BottomSheet>
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
        onConfirm: () => onSelect(selectedDate),
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
