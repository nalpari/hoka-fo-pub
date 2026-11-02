'use client';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

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
  _mobile: {
    '&&': { w: '100vw!', maxW: 'none', borderRadius: '20px 20px 0 0' },
    '& > header': { bg: 'white.0' },
    '& > header + div': { pb: '4' },
    '& > footer': { display: 'none' },
  },
});

const desktopOptions = css({ _mobile: { display: 'none' } });

const mobilePicker = css({ display: 'none', _mobile: { display: 'block' } });

/** 약관 시행일을 PC 목록과 모바일 시트에서 선택합니다. (Selects a terms version in a desktop list or mobile sheet.) */
export function PreviousTermsPicker({
  open,
  onClose,
  onSelect,
  versions,
}: {
  versions?: readonly {
    id: string;
    label: string;
  }[];
  open: boolean;
  onClose: () => void;
  onSelect: (id?: string) => void;
}) {
  const dates = versions ? versions.map((version) => version.id) : previousTerms;
  const label = (id: string) => versions?.find((version) => version.id === id)?.label ?? id;
  const [selectedDate, setSelectedDate] = useState<string>(dates[0] ?? '');
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
      actions={{
        kind: 'single',
        onConfirm: () => onSelect(selectedDate),
        buttonProps: { disabled: dates.length === 0 },
      }}
    >
      <Stack className={desktopOptions} gap="4">
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

      <Box
        className={mobilePicker}
        maxH="240px"
        overflowY="auto"
        css={{ scrollSnapType: 'y mandatory' }}
      >
        <Stack as="ul" gap="0" m="0" p="0" listStyleType="none" textAlign="center">
          {dates.map((date) => (
            <Box as="li" key={date} style={{ scrollSnapAlign: 'center' }}>
              <Button
                variant="unstyled"
                type="button"
                aria-pressed={selectedDate === date}
                aria-label={`${label(date)} 이전 약관 선택`}
                onClick={() => setSelectedDate(date)}
                className={css({
                  w: '100%',
                  h: '10',
                  border: 0,
                  bg: 'transparent',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  _pressed: { bg: 'black.10', fontWeight: 'bold' },
                  _focusVisible: {
                    outline: '2px solid var(--colors-black-100)',
                  },
                })}
              >
                <Typography variant="body3">{label(date)}</Typography>
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </ModalDialog>
  );
}
