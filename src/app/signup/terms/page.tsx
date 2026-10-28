'use client';

import { useRouter } from 'next/navigation';

import { type ReactNode, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, HStack, Stack, styled } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button/Button';
import { Divider } from '@/components/common/atoms/Divider/Divider';
import { Radio } from '@/components/common/atoms/Radio/Radio';
import { StatusMessage } from '@/components/common/atoms/StatusMessage/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';
import { Terms } from '@/components/common/molecules/Terms/Terms';

import { AccountFormLayout } from '@/components/common/layouts/AccountFormLayout/AccountFormLayout';

import { useRoutePreview } from '@/context/RoutePreview';

const signupTerms = [
  { label: 'HOKA Korea 이용약관 동의', required: true },
  { label: '개인정보 수집 동의', required: true },
  { label: '개인정보 수집 동의', required: false },
  { label: '개인정보 제3자 (제휴사) 제공 동의', required: true },
] as const;

const styles = {
  detail: css({ flexShrink: '0', '--button-padding-x': '0px' }),
};

type SignupTermsAgreementListProps = {
  agreements: boolean[];
  notice: string;
  onAllChange: (checked: boolean) => void;
  onChange: (index: number, checked: boolean) => void;
  onDetail: (index: number | null) => void;
};

function SignupTermsAgreementList(props: SignupTermsAgreementListProps) {
  return (
    <Stack gap="4">
      <Terms checked={props.agreements.every(Boolean)} onCheckedChange={props.onAllChange}>
        <Typography variant="body4">모든 약관을 확인하고 전체동의 합니다</Typography>
      </Terms>
      <Divider variant="strong" w="full" />
      <Stack gap="4" pb="6" borderBottom="1px solid var(--color-black-20)">
        {signupTerms.map((term, index) => (
          <HStack key={index} gap="2" justify="space-between" alignItems="center">
            <Terms
              checked={props.agreements[index]}
              onCheckedChange={(checked) => props.onChange(index, checked)}
              required={term.required}
              invalid={Boolean(props.notice && term.required && !props.agreements[index])}
            >
              <Typography variant="body4">
                ({term.required ? '필수' : '선택'}) {term.label}
              </Typography>
            </Terms>
            <Button
              variant="link"
              size="md"
              className={styles.detail}
              onClick={() => props.onDetail(index)}
              aria-label={`${term.required ? '필수' : '선택'} ${term.label} 자세히 보기`}
            >
              자세히 보기
            </Button>
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
}

type TermsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  label: ReactNode;
  children: ReactNode;
  dates?: ReactNode;
  version?: { previous: boolean; onChange: () => void };
};

const versionButton = css({ flexShrink: '0', '--button-padding-x': '0px' });

function TermsDialog({
  open,
  onOpenChange,
  title,
  label,
  children,
  dates,
  version,
}: TermsDialogProps) {
  return (
    <SingleActionDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      closeLabel="약관 닫기"
      mobilePresentation="fullscreen"
      scrollFade
      onConfirm={() => onOpenChange(false)}
    >
      <Stack gap="0" minH="0" flex="1" pb="20">
        <HStack justify="space-between" gap="2" mb="4">
          <Typography variant="body3">{label}</Typography>
          {version ? (
            <Button variant="link" size="sm" className={versionButton} onClick={version.onChange}>
              <Typography variant="body5">
                {version.previous ? '현재 약관 보기' : '이전 약관 보기'}
              </Typography>
            </Button>
          ) : null}
        </HStack>
        <Box
          as="article"
          p="4"
          border="1px solid var(--color-black-20)"
          tabIndex={0}
          aria-label="약관 내용"
        >
          {children}
        </Box>
        {dates ? (
          <Box mt="2">
            <Typography as="p" variant="body5" tone="subtle">
              {dates}
            </Typography>
          </Box>
        ) : null}
      </Stack>
    </SingleActionDialog>
  );
}

type Props = {
  selected: { label: string; required: boolean } | null;
  previous: boolean;
  onClose: () => void;
  onPrevious: () => void;
};

function SignupTermsDetail({ selected, previous, onClose, onPrevious }: Props) {
  return (
    <TermsDialog
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="HOKA Korea 이용약관"
      label={`(${selected?.required ? '필수' : '선택'}) ${selected?.label ?? ''}`}
      version={{ previous, onChange: onPrevious }}
      dates="공고일자 : 2025년 08월 25일 / 시행일자 : 2025년 09월 01일"
    >
      {previous ? (
        <Box mb="4">
          <Typography as="p" variant="body5">
            이전 약관은 등록 준비 중입니다.
          </Typography>
        </Box>
      ) : (
        [1, 2].map((number) => (
          <ContentHeader
            key={number}
            gap="4"
            mb="4"
            titleAs="h2"
            title={<>약관 타이틀{number}</>}
            titleProps={{ variant: 'body4' }}
            description={<>{'약관내용'.repeat(155)}</>}
            descriptionProps={{ variant: 'body4' }}
          />
        ))
      )}
    </TermsDialog>
  );
}

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
function PreviousTermsPicker({
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

type SignupTermsContentProps = {
  agreements: boolean[];
  detail: number | null;
  previous: boolean;
  previousPickerOpen: boolean;
  notice: string;
  onAllChange: (checked: boolean) => void;
  onChange: (index: number, checked: boolean) => void;
  onDetail: (index: number | null) => void;
  onPrevious: () => void;
  onPreviousPickerClose: () => void;
  onPreviousVersionSelect: () => void;
  onCancel: () => void;
  onNext: () => void;
};

/** 회원가입 약관 목록과 상세 다이얼로그를 화면으로 구성합니다. (Composes the signup terms list and detail dialogs into the page content.) */
function SignupTermsContent(props: SignupTermsContentProps) {
  const selected = props.detail === null ? null : signupTerms[props.detail];

  return (
    <AccountFormLayout
      title="약관동의"
      fillMobileViewport
      actions={
        <>
          <Button variant="secondary" fullWidth onClick={props.onCancel}>
            취소
          </Button>
          <Button variant="primary" fullWidth onClick={props.onNext}>
            확인
          </Button>
        </>
      }
      dialogs={
        <>
          <SignupTermsDetail
            selected={props.previousPickerOpen ? null : (selected ?? null)}
            previous={props.previous}
            onClose={() => props.onDetail(null)}
            onPrevious={props.onPrevious}
          />
          <PreviousTermsPicker
            open={props.previousPickerOpen}
            onClose={props.onPreviousPickerClose}
            onSelect={props.onPreviousVersionSelect}
          />
        </>
      }
    >
      <Box>
        <SignupTermsAgreementList
          agreements={props.agreements}
          notice={props.notice}
          onAllChange={props.onAllChange}
          onChange={props.onChange}
          onDetail={props.onDetail}
        />
        <Box pt="2">
          {props.notice ? <StatusMessage tone="error">{props.notice}</StatusMessage> : null}
        </Box>
      </Box>
    </AccountFormLayout>
  );
}

/** 약관 동의 상태와 다음 회원가입 단계로의 이동을 관리합니다. (Manages agreement state and navigation to the next signup step.) */
function RouteContent() {
  const router = useRouter();
  const [agreements, setAgreements] = useState([false, false, false, false]);
  const [detail, setDetail] = useState<number | null>(null);
  const [previous, setPrevious] = useState(false);
  const [previousPickerOpen, setPreviousPickerOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const next = () => {
    if (signupTerms.some((term, index) => term.required && !agreements[index])) {
      setNotice('필수 약관에 모두 동의해 주세요.');
      return;
    }
    router.push('/signup/information');
  };

  return (
    <SignupTermsContent
      agreements={agreements}
      detail={detail}
      previous={previous}
      previousPickerOpen={previousPickerOpen}
      notice={notice}
      onAllChange={(checked) => {
        setAgreements(agreements.map(() => checked));
        setNotice('');
      }}
      onChange={(index, checked) => {
        const next = agreements.map((value, position) => (position === index ? checked : value));
        setAgreements(next);
        if (!signupTerms.some((term, position) => term.required && !next[position])) setNotice('');
      }}
      onDetail={(index) => {
        setDetail(index);
        setPrevious(false);
        setPreviousPickerOpen(false);
      }}
      onPrevious={() => {
        if (previous) setPrevious(false);
        else setPreviousPickerOpen(true);
      }}
      onPreviousPickerClose={() => setPreviousPickerOpen(false)}
      onPreviousVersionSelect={() => {
        setPrevious(true);
        setPreviousPickerOpen(false);
      }}
      onCancel={() => router.push('/signup/verify')}
      onNext={next}
    />
  );
}

const routePreviewComponents = { TermsDialog, SignupTermsContent } satisfies Pick<
  typeof import('@/types/component-contracts/app-signup-terms-page'),
  'TermsDialog' | 'SignupTermsContent'
>;

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
