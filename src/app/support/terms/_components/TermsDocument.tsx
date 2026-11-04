'use client';
import { useState } from 'react';

import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';

import { Dropdown } from '@/components/common/atoms/Dropdown';
import { Typography } from '@/components/common/atoms/Typography';

const dates = [
  { value: '2026.05.22', label: '2026. 05. 22' },
  { value: '2026.02.01', label: '2026. 02. 01' },
  { value: '2025.06.02', label: '2025. 06. 02' },
] as const;

/** 선택한 약관 문서를 표시합니다. (Displays the selected terms document.) */
export function TermsDocument({ privacy }: { privacy: boolean }) {
  // [ 개발팀 바인딩 ] dates와 약관 본문은 현재 표시 fixture입니다. 시행일 선택은 selectedDate를 로컬로 갱신하며 서버 문서를 조회하지 않습니다. 실제 연결 시 약관 화면 소유자가 버전 ID별 본문·조회 상태와 안전한 HTML 변환을 연결해야 합니다. 모바일 선택은 공통 Dropdown에서 확인할 때 반영하고 닫으면 유지합니다.
  const [selectedDate, setDate] = useState<string | null>(null);
  const date = selectedDate ?? dates[0].value;
  return (
    <Stack gap="4" pt={{ base: '10', _mobile: '6' }}>
      <Dropdown
        variant="sort"
        popupAlign="start"
        ariaLabel="약관 시행일 선택"
        className={css({ alignSelf: 'flex-start' })}
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
