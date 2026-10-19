'use client';

import { useState } from 'react';
import { css } from 'styled-system/css';
import { Box, Stack, styled } from 'styled-system/jsx';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';

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
  border: '1px solid var(--color-border-subtle, #e9eaeb)',
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

/** Responsive previous-terms selection: desktop radio list and mobile wheel-style sheet. */
export function PreviousTermsPicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<string>(previousTerms[0]);

  return (
    <SingleActionDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      title="이전 약관 보기"
      closeLabel="이전 약관 보기 닫기"
      size="md"
      mobilePresentation="bottomSheet"
      popupClassName={popup}
      onConfirm={onSelect}
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
          options={previousTerms.map((date) => ({ value: date, label: date }))}
        />
      </Stack>

      <Box className={mobilePicker}>
        <Stack as="ul" gap="0" m="0" p="0" listStyleType="none" textAlign="center">
          {previousTerms.map((date, index) => (
            <Box
              as="li"
              key={date}
              h={index === 3 ? '34px' : '31px'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              opacity={index === 0 || index === previousTerms.length - 1 ? '0.5' : undefined}
            >
              {index === 3 ? (
                <styled.button
                  type="button"
                  onClick={onSelect}
                  w="100%"
                  h="34px"
                  border="0"
                  borderRadius="8px"
                  bg="black.10"
                  cursor="pointer"
                  _focusVisible={{ outline: '2px solid var(--color-black-100)' }}
                  aria-label={`${date} 이전 약관 선택`}
                >
                  <Typography as="span" variant="body2">
                    {date}
                  </Typography>
                </styled.button>
              ) : (
                <Typography as="span" variant="body3" tone="tertiary" aria-hidden="true">
                  {date}
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </SingleActionDialog>
  );
}
