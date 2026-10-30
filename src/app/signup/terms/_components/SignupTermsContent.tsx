'use client';

import { useRouter } from 'next/navigation';

import { useContext } from 'react';
import { type ReactNode, useState } from 'react';
import { AccountServicesContext } from '@/context/AccountFlowContext';
import { useAccountFlow } from '@/context/AccountFlowContext';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Divider } from '@/components/common/atoms/Divider';
import { Radio } from '@/components/common/atoms/Radio';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

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
  fixedErrors?: boolean;
  agreements: boolean[];
  notice: string;
  onAllChange: (checked: boolean) => void;
  onChange: (index: number, checked: boolean) => void;
  onDetail: (index: number | null) => void;
};

function SignupTermsAgreementList(props: SignupTermsAgreementListProps) {
  const terms = useContext(AccountServicesContext)?.signupTerms ?? signupTerms;
  return (
    <Stack gap="4">
      <Checkbox
        variant="consent"
        checked={terms.length > 0 && terms.every((_, index) => !!props.agreements[index])}
        onCheckedChange={props.onAllChange}
        label={
          <>
            <Typography variant="body4">모든 약관을 확인하고 전체동의 합니다</Typography>
          </>
        }
      />
      <Divider variant="strong" w="full" />
      <Stack gap="4" pb="6" borderBottom="1px solid var(--color-black-20)">
        {terms.map((term, index) => (
          <HStack key={index} gap="2" justify="space-between" alignItems="center">
            <Checkbox
              variant="consent"
              checked={!!props.agreements[index]}
              onCheckedChange={(checked) => props.onChange(index, checked)}
              required={term.required}
              invalid={Boolean(
                props.notice && term.required && (props.fixedErrors || !props.agreements[index]),
              )}
              label={
                <>
                  <Typography variant="body4">
                    ({term.required ? '필수' : '선택'}) {term.label}
                  </Typography>
                </>
              }
            />
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
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      closeLabel="약관 닫기"
      mobilePresentation="fullscreen"
      scrollFade
      actions={{ kind: 'single', onConfirm: () => onOpenChange(false) }}
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
    </ModalDialog>
  );
}

type Props = {
  selected: {
    label: string;
    required: boolean;
    body?: ReactNode;
    dates?: string;
    previousVersions?: readonly { id: string; label: string; body: ReactNode; dates?: string }[];
  } | null;
  previousVersionId?: string;
  previous: boolean;
  onClose: () => void;
  onPrevious: () => void;
};

function SignupTermsDetail({ selected, previous, previousVersionId, onClose, onPrevious }: Props) {
  const services = useContext(AccountServicesContext);
  const archived = selected?.previousVersions?.find((version) => version.id === previousVersionId);
  return (
    <TermsDialog
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="HOKA Korea 이용약관"
      label={`(${selected?.required ? '필수' : '선택'}) ${selected?.label ?? ''}`}
      version={{ previous, onChange: onPrevious }}
      dates={
        services
          ? previous
            ? archived?.dates
            : selected?.dates
          : '공고일자 : 2025년 08월 25일 / 시행일자 : 2025년 09월 01일'
      }
    >
      {services ? (
        previous ? (
          (archived?.body ?? '이전 약관이 없습니다.')
        ) : (
          selected?.body
        )
      ) : previous ? (
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
  versions,
}: {
  versions?: readonly { id: string; label: string }[];
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
              <button
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
                  _focusVisible: { outline: '2px solid var(--colors-black-100)' },
                })}
              >
                <Typography variant="body3">{label(date)}</Typography>
              </button>
            </Box>
          ))}
        </Stack>
      </Box>
    </ModalDialog>
  );
}

type SignupTermsContentProps = {
  fixedErrors?: boolean;
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
  previousVersionId?: string;
  onPreviousVersionSelect: (id?: string) => void;
  onCancel: () => void;
  onNext: () => void;
};

/** 회원가입 약관 목록과 상세 다이얼로그를 화면으로 구성합니다. (Composes the signup terms list and detail dialogs into the page content.) */
export function SignupTermsContent(props: SignupTermsContentProps) {
  const services = useContext(AccountServicesContext);
  const terms = services?.signupTerms ?? signupTerms;
  const selected = props.detail === null ? null : terms[props.detail];
  const versions =
    services && props.detail !== null
      ? (services.signupTerms[props.detail]?.previousVersions ?? [])
      : undefined;

  return (
    <AccountPageLayout
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
      outsideContent={
        <>
          <SignupTermsDetail
            selected={props.previousPickerOpen ? null : (selected ?? null)}
            previous={props.previous}
            previousVersionId={props.previousVersionId}
            onClose={() => props.onDetail(null)}
            onPrevious={props.onPrevious}
          />
          <PreviousTermsPicker
            key={props.detail}
            versions={versions}
            open={props.previousPickerOpen}
            onClose={props.onPreviousPickerClose}
            onSelect={props.onPreviousVersionSelect}
          />
        </>
      }
    >
      <Box>
        <SignupTermsAgreementList
          fixedErrors={props.fixedErrors}
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
    </AccountPageLayout>
  );
}

/** 약관 동의 상태와 다음 회원가입 단계로의 이동을 관리합니다. (Manages agreement state and navigation to the next signup step.) */
export function RouteContent() {
  const router = useRouter();
  const flow = useAccountFlow();
  const services = useContext(AccountServicesContext);
  const terms = services?.signupTerms ?? signupTerms;
  const termsKey = JSON.stringify(
    services
      ? services.signupTerms.map(({ id, version, required }) => [id, version, required])
      : 'demo',
  );
  const restoredAgreements = () =>
    terms.map((_, index) => {
      const term = services?.signupTerms[index];
      return (
        !!term &&
        !!flow?.consents.some(
          (consent) =>
            consent.id === term.id && consent.version === term.version && consent.accepted,
        )
      );
    });
  const [agreementDraft, setAgreementDraft] = useState(() => ({
    key: termsKey,
    values: restoredAgreements(),
  }));
  // BO의 약관 순서/버전이 바뀌면 이전 인덱스의 동의를 새 약관에 적용하지 않습니다.
  const agreements = agreementDraft.key === termsKey ? agreementDraft.values : restoredAgreements();
  const setAgreements = (values: boolean[]) => setAgreementDraft({ key: termsKey, values });
  const [previousVersionId, setPreviousVersionId] = useState<string>();
  const [detail, setDetail] = useState<number | null>(null);
  const [previous, setPrevious] = useState(false);
  const [previousPickerOpen, setPreviousPickerOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const next = () => {
    if (!terms.length || terms.some((term, index) => term.required && !agreements[index])) {
      setNotice('필수 약관에 모두 동의해 주세요.');
      return;
    }
    flow?.setConsents(
      terms.map((_, index) => ({
        id: services?.signupTerms[index].id ?? String(index),
        version: services?.signupTerms[index].version ?? 'publishing-preview',
        accepted: agreements[index],
      })),
    );
    router.push('/signup/information');
  };

  return (
    <SignupTermsContent
      agreements={agreements}
      detail={detail}
      previous={previous}
      previousVersionId={previousVersionId}
      previousPickerOpen={previousPickerOpen}
      notice={notice}
      onAllChange={(checked) => {
        setAgreements(terms.map(() => checked));
        setNotice('');
      }}
      onChange={(index, checked) => {
        const next = terms.map((_, position) =>
          position === index ? checked : !!agreements[position],
        );
        setAgreements(next);
        if (!terms.some((term, position) => term.required && !next[position])) setNotice('');
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
      onPreviousVersionSelect={(id) => {
        setPreviousVersionId(id);
        setPrevious(true);
        setPreviousPickerOpen(false);
      }}
      onCancel={() => router.push('/signup/verify')}
      onNext={next}
    />
  );
}

export const routePreviewComponents = { TermsDialog, SignupTermsContent } satisfies Pick<
  typeof import('@/types/component-contracts/app-signup-terms-page'),
  'TermsDialog' | 'SignupTermsContent'
>;
