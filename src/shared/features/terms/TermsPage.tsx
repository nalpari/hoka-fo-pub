'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { css } from 'styled-system/css';
import { Box, Stack, styled } from 'styled-system/jsx';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { SupportPageHeading } from '@/shared/components/molecules/SupportPageHeading/SupportPageHeading';
import { SupportTabs } from '@/shared/components/molecules/SupportTabs/SupportTabs';
import { supportNavigation } from '@/shared/features/support/support.navigation';

const dates = [
  { value: '2026.05.22', label: '2026.05.22' },
  { value: '2026.02.01', label: '2026.02.01' },
  { value: '2025.06.02', label: '2025.06.02' },
] as const;

const dateOptions = css({
  position: 'absolute',
  top: '100%',
  left: '0',
  zIndex: 2,
  w: 'max-content',
  mt: '2',
  p: '3',
  border: '1px solid token(colors.black.40)',
  borderRadius: '4px',
  bg: 'white.0',
  '& [role="radiogroup"]': { gap: '4' },
});

function TermsDocument({ privacy }: { privacy: boolean }) {
  const [date, setDate] = useState<string>(dates[0].value);
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <Stack gap="4" pt="4" px={{ base: '4', _mobile: '0' }}>
      <Box position="relative" alignSelf="flex-start">
        <styled.button
          type="button"
          aria-label="약관 시행일 선택"
          aria-expanded={dateOpen}
          onClick={() => setDateOpen((open) => !open)}
          display="flex"
          alignItems="center"
          gap="2"
          p="0"
          border="0"
          bg="transparent"
          cursor="pointer"
          _focusVisible={{ outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' }}
        >
          <Typography web="body3" mo="body3" weight="medium">
            {date.replaceAll('.', '. ')}
          </Typography>
          <Icon src="/images/icon/chevron-down-small.svg" size="14px" aria-hidden="true" />
        </styled.button>
        {dateOpen && (
          <Box className={dateOptions}>
            <Radio
              ariaLabel="약관 시행일"
              name={privacy ? 'privacy-date' : 'terms-date'}
              options={dates}
              value={date}
              onValueChange={(next) => {
                setDate(next);
                setDateOpen(false);
              }}
            />
          </Box>
        )}
      </Box>
      <Box
        display="grid"
        placeItems="center"
        w="100%"
        h={{ base: '407px', _mobile: '404px' }}
        bg="rgba(0, 0, 0, 0.5)"
        aria-label={privacy ? '개인정보 처리방침 내용' : '이용 약관 내용'}
      >
        <Typography web="body5" mo="body5" tone="inverse">
          약관내용
        </Typography>
      </Box>
      {privacy && (
        <Stack gap="0">
          <Typography web="body5" mo="body5" tone="tertiary">
            - 개인정보 처리방침 버전번호 : v.1.79
          </Typography>
          <Typography web="body5" mo="body5" tone="tertiary">
            - 개인정보 처리방침 시행일자 : 2026.09.02
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

export function TermsPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [tab, setTab] = useState(searchParams.get('tab') === 'privacy' ? 'privacy' : 'terms');

  const tabs = [
    { value: 'terms', label: '이용 약관', content: <TermsDocument privacy={false} /> },
    { value: 'privacy', label: '개인정보 처리방침', content: <TermsDocument privacy /> },
  ];

  return (
    <CustomerCenterLayout
      activePath="/support/terms"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '약관' },
      ]}
      groups={supportNavigation}
      hideIntroMobile
    >
      <Stack gap="6">
        <SupportPageHeading title="약관" />
        <SupportTabs
          ariaLabel="약관 종류"
          defaultValue="terms"
          value={tab}
          onValueChange={(value) => {
            setTab(value === 'privacy' ? 'privacy' : 'terms');
            const next = new URLSearchParams(searchParams.toString());
            if (value === 'privacy') next.set('tab', 'privacy');
            else next.delete('tab');
            router.push(`${pathname}${next.size ? `?${next.toString()}` : ''}`, { scroll: false });
          }}
          tabs={tabs}
        />
      </Stack>
    </CustomerCenterLayout>
  );
}
