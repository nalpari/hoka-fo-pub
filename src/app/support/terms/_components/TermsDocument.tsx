'use client';
import { Popover } from '@base-ui/react/popover';
import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';

import { Icon } from '@/components/common/atoms/Icon';
import { Radio, type RadioProps } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';
type TermsDateSelectProps = Pick<RadioProps, 'name' | 'options' | 'value' | 'onValueChange'>;
const dateOptions = css({
  w: 'max-content',
  p: '3',
  border: '1px solid token(colors.black.40)',
  borderRadius: '4px',
  bg: 'white.0',
  '& [role="radiogroup"]': { gap: '4' },
});
function TermsDateSelect({ name, options, value, onValueChange }: TermsDateSelectProps) {
  const platform = usePlatform();
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        type="button"
        aria-label="약관 시행일 선택"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          p: '0',
          border: '0',
          bg: 'transparent',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
        })}
      >
        <Typography variant="body3" language="ko" weight="regular">
          {value.replaceAll('.', '. ')}
        </Typography>
        <Icon name="chevron-down-regular" size="14px" aria-hidden="true" />
      </Popover.Trigger>
      <Popover.Portal>
        <div className={`platform-${platform}`}>
          <Popover.Positioner
            side="bottom"
            align="start"
            sideOffset={8}
            className={css({ zIndex: 2 })}
          >
            <Popover.Popup aria-label="약관 시행일 선택" className={dateOptions}>
              <Radio
                ariaLabel="약관 시행일"
                name={name}
                options={options}
                value={value}
                onValueChange={(next) => {
                  onValueChange(next);
                  setOpen(false);
                }}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </div>
      </Popover.Portal>
    </Popover.Root>
  );
}
const dates = [
  { value: '2026.05.22', label: '2026.05.22' },
  { value: '2026.02.01', label: '2026.02.01' },
  { value: '2025.06.02', label: '2025.06.02' },
] as const;
/** 선택한 약관 문서를 표시합니다. (Displays the selected terms document.) */
export function TermsDocument({ privacy }: { privacy: boolean }) {
  // 개발팀 적용: BO 문서를 body 슬롯으로 전달합니다. HTML의 안전한 변환은 어댑터에서 처리합니다.
  const [selectedDate, setDate] = useState<string | null>(null);
  const date = selectedDate ?? dates[0].value;
  return (
    <Stack gap="4" pt={{ base: '10', _mobile: '6' }}>
      <TermsDateSelect
        name={privacy ? 'privacy-date' : 'terms-date'}
        options={dates}
        value={date}
        onValueChange={setDate}
      />

      <Grid
        gap="normal"
        placeItems="center"
        w="100%"
        h={{ base: '407px', _mobile: '404px' }}
        bg="rgba(0, 0, 0, 0.5)"
        aria-label={privacy ? '개인정보 처리방침 내용' : '이용 약관 내용'}
      >
        {
          <Typography variant="body5" tone="inverse">
            약관내용
          </Typography>
        }
      </Grid>
      {privacy && (
        <Stack gap="0" mt={{ base: '0', _mobile: '-1' }}>
          <Typography variant="body5" tone="tertiary">
            - 개인정보 처리방침 버전번호 : {'v.1.79'}
          </Typography>
          <Typography variant="body5" tone="tertiary">
            - 개인정보 처리방침 시행일자 : {'2026.09.02'}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
