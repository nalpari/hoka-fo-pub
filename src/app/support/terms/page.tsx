'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Popover } from '@base-ui/react/popover';
import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';

import { Icon } from '@/components/common/atoms/Icon';
import { Radio, type RadioProps } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { SupportTabs } from '@/components/common/molecules/SupportTabs';

import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout';

import { supportNavigation } from '@/app/support/support.navigation';

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
        <Typography variant="body3" weight="medium">
          {value.replaceAll('.', '. ')}
        </Typography>
        <Icon src="/images/icon/chevron-down-small.svg" size="14px" aria-hidden="true" />
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

function TermsDocument({ privacy }: { privacy: boolean }) {
  const [date, setDate] = useState<string>(dates[0].value);

  return (
    <Stack gap="4" pt="4" px={{ base: '4', _mobile: '0' }}>
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
        <Typography variant="body5" tone="inverse">
          약관내용
        </Typography>
      </Grid>
      {privacy && (
        <Stack gap="0">
          <Typography variant="body5" tone="tertiary">
            - 개인정보 처리방침 버전번호 : v.1.79
          </Typography>
          <Typography variant="body5" tone="tertiary">
            - 개인정보 처리방침 시행일자 : 2026.09.02
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
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
      title="약관"
      mobileTitleVariant="heading5"
      activePath="/support/terms"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '약관' },
      ]}
      groups={supportNavigation}
    >
      <Stack mt="6">
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
