'use client';
import Image from 'next/image';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 런클럽 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import { useParams } from 'next/navigation';

import { useContext, useEffect, useState } from 'react';
import { type ReactNode } from 'react';
import { type Platform, usePlatform } from '@/context/platform';
import { RunningSessionSessionContext } from '@/context/RunningSessionSessionContext';

import { css, cva } from 'styled-system/css';
import { Box, Center, Grid, HStack, Stack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button } from '@/components/common/atoms/Button';
import { DescriptionList } from '@/components/common/atoms/DescriptionList';
import { Typography } from '@/components/common/atoms/Typography';

import { CarouselSection } from '@/components/common/molecules/CarouselSection';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { SystemStatusPage } from '@/components/common/organisms/SystemStatusPage';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';
import { OrderActionBar } from '@/components/common/layouts/OrderActionBar';

import {
  runningSessionAddress,
  runningSessionSessions,
  runningSessionVenue,
} from '@/components/running-session/runningSession.data';
import {
  categoryBadgeColors,
  runningSessionImage,
  type RunningSessionSession,
  sessionNotices,
  sessionPrecautions,
} from '@/components/running-session/runningSession.data';
import { products } from '@/mocks/products';
import { type Product } from '@/mocks/products';
const applyButton = css({
  w: '260px',
  '--button-height': '48px!',
  '& > span': { w: '100%' },
  _mobile: {
    w: '100%',
    '--button-height': '48px!',
    '--button-label-size': '16px!',
    '--button-disabled-bg': 'var(--color-black-20)!',
    '--button-disabled-color': 'var(--color-black-40)!',
  },
});
type RunningSessionApplyButtonProps = {
  status: RunningSessionSession['status'];
  onApply?: () => void;
  pending?: boolean;
  registered?: boolean;
};
function RunningSessionApplyButton({
  status,
  onApply,
  pending,
  registered = false,
}: RunningSessionApplyButtonProps) {
  return (
    <Button
      variant="primary"
      className={applyButton}
      disabled={registered || pending || status !== 'open'}
      onClick={onApply}
    >
      <Typography web="b4S" mo="b5S" language="ko">
        {registered
          ? '신청완료'
          : status === 'closed'
            ? '모집 마감'
            : status === 'upcoming'
              ? '신청이 곧 시작됩니다.'
              : '신청하기'}
      </Typography>
    </Button>
  );
}
/** 세션 안내 또는 주의 사항 목록을 표시합니다. (Displays a session notice or precaution list.) */
function RunningSessionSessionNotes({ precautions = false }: { precautions?: boolean }) {
  return (
    <Stack
      as="aside"
      gap="16px"
      m="0"
      color="var(--color-text-tertiary)"
      aria-label={precautions ? '주의 사항' : '안내 사항'}
    >
      <Typography as="p" variant="b6B" language="ko" className={css({ m: '0' })}>
        {precautions ? '주의 사항' : '안내 사항'} ⓘ
      </Typography>
      <Box as="ul" listStyle="none" p="0" m="0">
        {(precautions ? sessionPrecautions : sessionNotices).map((notice) => (
          <Typography
            as="li"
            web="b6"
            mo="b7"
            language="ko"
            key={notice}
            className={css({ _before: { content: '"- "' } })}
          >
            {notice}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
}
export type RunningSessionFact = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  mobileOnly?: boolean;
};
const facts = cva({
  base: {
    m: '0',
  },
  variants: {
    variant: {
      hero: {
        py: '32px',
        display: 'grid',
        rowGap: '24px',
        borderBlock: '1px solid var(--color-border-default)',
        _mobile: {
          py: '32px',
        },
      },
      guide: {},
    },
  },
});
/** 런클럽 세션 정보를 요약 행으로 표시합니다. (Displays run club session facts as summary rows.) */
function RunningSessionFacts({
  rows,
  variant,
}: {
  rows: RunningSessionFact[];
  variant: 'hero' | 'guide';
}) {
  return (
    <DescriptionList
      items={rows.map(({ label, value, detail, mobileOnly }) => ({
        term: label,
        description: (
          <>
            {value}
            {detail ? (
              <Typography as="span" variant="b6" tone="tertiary" className={detailText}>
                {detail}
              </Typography>
            ) : null}
          </>
        ),
        rowClassName: mobileOnly
          ? css({ display: 'none!', _mobile: { display: 'grid!' } })
          : undefined,
      }))}
      termProps={{
        web: 'b4B',
        mo: 'b5B',
        language: 'ko',
      }}
      descriptionProps={{
        web: 'b4',
        mo: 'b5',
        language: 'ko',
        tone: undefined,
      }}
      slotStyles={{
        root: css.raw(facts.raw({ variant }), {
          display: variant === 'hero' ? 'grid' : 'block',
          gridTemplateColumns: 'none',
          gap: variant === 'hero' ? '24px normal' : 'normal',
        }),
        row: css.raw({
          display: 'grid',
          gridTemplateColumns: variant === 'hero' ? '58px minmax(0, 1fr)' : '60px minmax(0, 1fr)',
          gap: '16px',
          py: variant === 'hero' ? '0' : '24px',
          borderTop: variant === 'guide' ? '1px solid var(--color-border-default)' : undefined,
          _last:
            variant === 'guide'
              ? { borderBottom: '1px solid var(--color-border-default)' }
              : undefined,
          _mobile: { py: variant === 'hero' ? '0' : '24px' },
        }),
        description: css.raw({ m: '0' }),
      }}
    />
  );
}
const detailText = css({ display: 'block', mt: '4px' });
const styles = {
  image: css({ w: '100%', h: 'auto', aspectRatio: '1', objectFit: 'cover', display: 'block' }),
  opening: css({ color: 'accent', mb: '24px' }),
  recommendations: css({ _mobile: { '& > div': { gap: '16px' } } }),
  recommendationRail: css({ _mobile: { px: '11px!' } }),
};
type RunningSessionSessionHeroProps = {
  session: RunningSessionSession;
  rows: RunningSessionFact[];
  onApply?: () => void;
  pending?: boolean;
  registered?: boolean;
};
/** 세션 대표 이미지와 일정·신청 정보를 표시합니다. (Displays a session hero image, schedule, and application details.) */
export function RunningSessionSessionHero({
  session,
  rows,
  onApply,
  pending,
  registered,
}: RunningSessionSessionHeroProps) {
  const upcoming = session.status === 'upcoming';
  const mobile = usePlatform() === 'mobile';
  return (
    <Grid
      as="section"
      gridTemplateColumns="1fr 1fr"
      gap="60px"
      w="min(calc(100% - 110px), 1340px)"
      mx="auto"
      py="96px"
      alignItems="start"
      _mobile={{ w: '100%', gridTemplateColumns: '1fr', gap: '0', py: '0' }}
    >
      <Image
        className={styles.image}
        src={runningSessionImage(session.detailImage)}
        alt={`${session.title} 러닝 현장`}
        width={544}
        height={544}
        sizes={
          mobile
            ? '100vw'
            : '(max-width: 1199px) 515px, (max-width: 1450px) calc((100vw - 170px) / 2), 640px'
        }
      />
      <Stack gap="32px" _mobile={{ px: '4', pt: '4', pb: '72px' }}>
        <Stack gap="12px" _mobile={{ gap: '18px' }}>
          <HStack>
            <Badge visual="square" {...categoryBadgeColors[session.category]} web="b6B" mo="b9B">
              {session.category}
            </Badge>
          </HStack>
          <ContentHeader
            gap="16px"
            _mobile={{ gap: '8px' }}
            title={session.title}
            titleAs="h1"
            titleProps={{ web: 'h5B', mo: 'h6B', language: 'ko' }}
            description={
              <>
                {session.schedule} | {session.location} {session.distance}
              </>
            }
            descriptionProps={{ web: 'h10', mo: 'h8', language: 'ko' }}
          />
        </Stack>
        {upcoming && session.applicationOpeningLabel ? (
          <Typography as="p" variant="b6B" className={styles.opening}>
            ⓘ {session.applicationOpeningLabel}
          </Typography>
        ) : null}
        <RunningSessionFacts variant="hero" rows={rows} />
        <RunningSessionSessionNotes />
        <Box mt="8px" _mobile={{ display: 'none' }}>
          <RunningSessionApplyButton
            status={session.status}
            onApply={onApply}
            pending={pending}
            registered={registered}
          />
        </Box>
      </Stack>
    </Grid>
  );
}
type Props = {
  session: Pick<RunningSessionSession, 'category' | 'overlayDate'>;
};
/** 세션 카테고리에 맞는 홍보 제목과 날짜를 표시합니다. (Displays a promotional title and date for the session category.) */
function RunningSessionSessionPoster({ session }: Props) {
  return (
    <ContentSection
      color="var(--color-blue-100)"
      gap="56px"
      _mobile={{ gap: '24px' }}
      title={
        <>
          {session.category === 'Trail'
            ? 'Bugaksan Uphill Interval Session'
            : 'HOKA Night City Run'}
        </>
      }
      headerProps={{
        gap: '40px',
        _mobile: { gap: '20px' },
        eyebrow: <>Hoka Run Club</>,
        eyebrowProps: { variant: 'b1E', language: 'en' },
        titleAs: 'h2',
        titleProps: {
          web: 'd1',
          mo: 'd2',
          language: 'en',
          className: css({ overflowWrap: 'anywhere' }),
        },
      }}
    >
      <Typography as="span" web="b1M" mo="b4M" language="en">
        {session.overlayDate}
        <br />
        @hoka_kr
      </Typography>
    </ContentSection>
  );
}
type RunningSessionSessionGuideContentProps = {
  title: string;
  rows: RunningSessionGuideRow[];
};
/** 런클럽 세션 안내와 정보 행을 구성합니다. (Composes run club session guidance and fact rows.) */
function RunningSessionSessionGuideContent({
  title,
  rows,
}: RunningSessionSessionGuideContentProps) {
  return (
    <Stack maxW="640px" gap="32px" _mobile={{ maxW: 'none' }}>
      <ContentSection
        gap="32px"
        title="세션 안내"
        headerProps={{
          gap: '4',
          titleProps: { variant: 'h8B', language: 'ko' },
          description: (
            <>
              호카 런 클럽 {title}에서
              <br />
              러너들과 함께 달리며 그룹 러닝의 즐거움을 느껴보세요!
            </>
          ),
          descriptionProps: { variant: 'b4', language: 'ko' },
        }}
      >
        <RunningSessionFacts variant="guide" rows={rows} />
      </ContentSection>
      <RunningSessionSessionNotes precautions />
    </Stack>
  );
}
export type RunningSessionGuideRow = {
  label: string;
  value: string;
};
type RunningSessionSessionGuideProps = {
  session: RunningSessionSession;
  rows: RunningSessionGuideRow[];
};
/** 런클럽 세션 안내를 구성합니다. (Composes the run club session guide.) */
export function RunningSessionSessionGuide({ session, rows }: RunningSessionSessionGuideProps) {
  return (
    <Box
      as="section"
      bg="var(--color-black-10)"
      py="96px"
      _mobile={{ pt: '48px', pb: '72px' }}
      aria-label="세션 안내"
    >
      <Grid
        w="min(calc(100% - 144px), 1558px)"
        ml="max(72px, calc((100% - 1776px) / 2))"
        gridTemplateColumns="minmax(0, 858fr) minmax(0, 640fr)"
        gap="60px"
        _mobile={{
          w: '100%',
          ml: '0',
          px: 'var(--layout-mobile-inline-gutter)',
          gridTemplateColumns: '1fr',
          gap: '64px',
        }}
      >
        <RunningSessionSessionPoster session={session} />
        <RunningSessionSessionGuideContent title={session.title} rows={rows} />
      </Grid>
    </Box>
  );
}
/** 런클럽 세션 대표 이미지 영역을 표시합니다. (Displays the run club session hero image area.) */
export function RunningSessionSessionImage() {
  return (
    <Center
      w="min(calc(100% - 110px), 1776px)"
      mx="auto"
      my="96px"
      aspectRatio="2.6667"
      bg="var(--color-black-40)"
      _mobile={{
        w: '100%',
        mx: '0',
        my: '0',
        aspectRatio: '1',
      }}
    >
      <Typography
        web="h5"
        mo="h7"
      >
        이미지 영역
      </Typography>
    </Center>
  );
}
const mobileSlide = css({
  w: '160px!',
  '& > *': { w: '100%' },
});
type RunningSessionRecommendationsProps = {
  products: Product[];
  platform: Platform;
};
/** 추천 런클럽 세션을 표시합니다. (Displays recommended run club sessions.) */
export function RunningSessionRecommendations({
  products,
  platform,
}: RunningSessionRecommendationsProps) {
  return (
    <Box
      as="section"
      pb="192px"
      overflow="hidden"
      _mobile={{ py: '72px' }}
      css={{
        '--layout-web-content-max-width': '1776px',
        '--layout-web-content-inline-space': '144px',
      }}
    >
      <CarouselSection
        className={styles.recommendations}
        title="로드 러닝 Essential"
        titleVariant="h4B"
        mobileTitleVariant="h8"
        itemCount={products.length}
        platform={platform}
        slideClassName={platform === 'mobile' ? mobileSlide : undefined}
        desktopCenteredItemCount={5}
        desktopItemGutter={8}
        mobileItemGutter={5}
        railClassName={styles.recommendationRail}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="showcase" />
        ))}
      </CarouselSection>
    </Box>
  );
}
type RunningSessionApplicationState = 'confirm' | 'complete' | 'underage' | 'closed' | 'registered';

type RunningSessionApplicant = {
  name: string;
  phone: string;
};

const applicationConfirmPreviewSession = {
  title: '북악산 트레일 세션',
  schedule: '10월 30일 (금) 19:30-21:30',
};

const applicationNoticeStyles = {
  popup: css({ '&&': { _mobile: { borderRadius: '8px' } } }),
  confirmHeader: css({ '& > button': { _mobile: { display: 'none' } } }),
  footer: css({
    '&& button': {
      h: '42px',
      minH: '42px',
      '--button-height': '42px',
      _mobile: { h: '42px', minH: '42px' },
    },
    '&& button > span > span': { fontSize: 'body.15' },
  }),
  confirmFooter: css({ '&&': { mt: '32px', _mobile: { mt: '24px' } } }),
  confirmContent: css({ scrollbarWidth: 'none' }),
  summaryList: css({
    '&&': { rowGap: '16px', _mobile: { rowGap: '8px' } },
    '& :is(dt, dd)': { fontFamily: 'ko', fontSize: 'body.14', lineHeight: 'body' },
  }),
  prompt: css({
    fontFamily: 'ko',
    letterSpacing: 'korean',
    textAlign: 'center',
    '&&': { lineHeight: 'body' },
  }),
  summaryTitle: css({
    fontFamily: 'ko',
    fontSize: 'body.20',
    letterSpacing: 'korean',
    _mobile: { fontSize: 'body.16' },
    '&&': { lineHeight: 'body' },
  }),
  address: css({
    display: 'block',
    mt: '4px',
    fontFamily: 'ko',
    fontSize: 'body.14',
    lineHeight: 'body',
  }),
  alertContent: css({
    '& > h3': {
      fontSize: 'heading.22',
      fontWeight: '500',
      lineHeight: 'koreanHeading',
      _mobile: { fontSize: 'heading.20' },
    },
  }),
};

const runningSessionAlertContent = {
  complete: {
    title: '러닝세션 신청 완료',
    message: '러닝세션 신청이 완료되었습니다.',
  },
  underage: {
    title: '러닝세션 신청 안내',
    message: '러닝세션은 만 18세 미만의 미성년자는',
    continuation: '신청할 수 없습니다.',
  },
  closed: {
    title: '러닝세션 신청 안내',
    message: '해당 러닝세션은 모집이 마감되어',
    continuation: '신청할 수 없습니다.',
  },
};

type RunningSessionApplicationNoticeProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  state: Exclude<RunningSessionApplicationState, 'registered'>;
  applicant: RunningSessionApplicant;
  session: Pick<RunningSessionSession, 'title' | 'schedule'>;
};

/** 신청 확인 정보 또는 고정 결과 안내를 표시합니다. (Displays application confirmation details or a fixed result notice.) */
export function RunningSessionApplicationNotice({
  open,
  onOpenChange,
  state,
  applicant,
  session,
}: RunningSessionApplicationNoticeProps) {
  const close = () => onOpenChange(false);
  if (state === 'confirm') {
    return (
      <ModalDialog
        variant="selection"
        open={open}
        onOpenChange={onOpenChange}
        title="러닝세션 신청 확인"
        closeLabel="러닝세션 신청 확인 닫기"
        popupClassName={applicationNoticeStyles.popup}
        contentClassName={applicationNoticeStyles.confirmContent}
        headerProps={{ className: applicationNoticeStyles.confirmHeader }}
        footerProps={{
          className: `${applicationNoticeStyles.footer} ${applicationNoticeStyles.confirmFooter}`,
        }}
        actions={{ kind: 'confirm', onConfirm: close }}
      >
        <Stack gap="32px" _mobile={{ gap: '24px' }}>
          <Stack
            gap="24px"
            py="16px"
            borderBlock="1px solid"
            borderColor="black.20"
            _mobile={{ gap: '16px' }}
          >
            <Typography
              as="h3"
              variant="b2B"

              className={applicationNoticeStyles.summaryTitle}
            >
              신청정보
            </Typography>
            <DescriptionList
              labelWidth="60px"
              className={applicationNoticeStyles.summaryList}
              termProps={{ tone: 'tertiary' }}
              descriptionProps={{ weight: 'medium' }}
              items={[
                { term: '이름', description: applicant.name },
                { term: '휴대폰번호', description: applicant.phone },
                { term: '세션명', description: session.title },
                { term: '일시', description: session.schedule },
                {
                  term: '장소',
                  description: (
                    <>
                      {runningSessionVenue}
                      <Typography
                        as="span"
                        variant="b6"
                        tone="tertiary"
                        className={applicationNoticeStyles.address}
                      >
                        {runningSessionAddress}
                      </Typography>
                    </>
                  ),
                },
              ]}
            />
          </Stack>
          <Typography
            as="p"
            variant="b4M"

            className={applicationNoticeStyles.prompt}
          >
            위 정보로 러닝세션을 신청하시겠습니까?
          </Typography>
        </Stack>
      </ModalDialog>
    );
  }
  const notice = runningSessionAlertContent[state];
  return (
    <ModalDialog
      variant="alert"
      open={open}
      onOpenChange={onOpenChange}
      title={notice.title}
      closeLabel={state === 'complete' ? '러닝세션 신청 완료 닫기' : '러닝세션 신청 안내 닫기'}
      popupClassName={applicationNoticeStyles.popup}
      contentClassName={applicationNoticeStyles.alertContent}
      footerProps={{ className: applicationNoticeStyles.footer }}
      actions={{ kind: 'single', onConfirm: close }}
      message={
        <>
          {notice.message}
          {'continuation' in notice && (
            <>
              {' '}
              <Box as="br" display="none" _mobile={{ display: 'initial' }} />
              {notice.continuation}
            </>
          )}
        </>
      }
    />
  );
}

type RunningSessionDetailLayoutProps = {
  hero: ReactNode;
  guide: ReactNode;
  desktopContent: ReactNode;
  mobileAction: ReactNode;
  applicationNotice: ReactNode;
};
/** 런클럽 상세 화면의 골격을 구성합니다. (Composes the run club detail layout.) */
export function RunningSessionDetailLayout({
  hero,
  guide,
  desktopContent,
  mobileAction,
  applicationNotice,
}: RunningSessionDetailLayoutProps) {
  return (
    <Box as="main" _mobile={{ '& ~ footer': { mb: 'calc(96px + env(safe-area-inset-bottom))' } }}>
      {hero}
      {guide}
      {desktopContent}
      {mobileAction}
      {applicationNotice}
    </Box>
  );
}
type RunningSessionFixedActionBarProps = {
  status: RunningSessionSession['status'];
  onApply?: () => void;
  pending?: boolean;
  registered?: boolean;
};
/** 런클럽 상세의 고정 액션 영역을 표시합니다. (Displays the fixed run club detail action area.) */
export function RunningSessionFixedActionBar({
  status,
  onApply,
  pending,
  registered,
}: RunningSessionFixedActionBarProps) {
  return (
    <OrderActionBar variant="mobileOnly" as="section" ariaLabel="세션 신청">
      <RunningSessionApplyButton
        status={status}
        onApply={onApply}
        pending={pending}
        registered={registered}
      />
    </OrderActionBar>
  );
}
/** 세션 상세와 고정 신청 안내를 표시합니다. (Displays session details and a fixed application notice.) */
export function RunningSessionDetailContent({
  previewApplication,
  applicant = { name: '홍길동', phone: '010-1234-5678' },
}: {
  previewApplication?: RunningSessionApplicationState | 'unavailable';
  applicant?: RunningSessionApplicant;
} = {}) {
  const suppliedSession = useContext(RunningSessionSessionContext);
  const { sessionId } = useParams<{
    sessionId: string;
  }>();
  const platform = usePlatform();
  const [showApplicationNotice, setShowApplicationNotice] = useState(
    Boolean(previewApplication && previewApplication !== 'registered'),
  );
  const session =
    suppliedSession ??
    runningSessionSessions.find(
      (candidate) => candidate.id === (previewApplication ? 'yeouido-night' : sessionId),
    );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sessionId]);
  if (!session) return <SystemStatusPage status="not-found" />;
  // [ 개발팀 바인딩 ] applicant의 기본값과 신청 확인 preview의 세션명·일시는 고정 표시 예시입니다. 상세에서 열면 현재 session의 제목·일시를 읽습니다.
  // 확인은 팝업만 닫습니다. 통합 소유자가 회원 표시 정보와 회원·session.id를 연결하고 확인 시 요청, 중복 방지, 실패/재시도, 성공 후 상세·신청 내역 갱신을 맡습니다.
  // 모집·연령 제한과 완료는 고정 안내 상태입니다. 통합 소유자가 실제 상태와 요청 결과를 공급해야 합니다.
  const applicationState =
    previewApplication === 'unavailable' ||
    !previewApplication ||
    previewApplication === 'registered'
      ? 'confirm'
      : previewApplication;
  const registered = previewApplication === 'registered';
  const openApplication = () => setShowApplicationNotice(true);
  const recommendedProducts = products.slice(0, 6);
  const heroRows: readonly RunningSessionFact[] = [
    { label: '일시', value: session.schedule },
    { label: '장소', value: runningSessionVenue, detail: runningSessionAddress },
    { label: '정원', value: '20명' },
    {
      label: '예약금',
      value: '5,000원',
      detail: '노쇼 방지를 위해 예약금을 받고 있습니다. 현장 출석 확인 후 자동 취소 됩니다.',
    },
    { label: '신청 기간', value: '1월 23일 (토) - 1월 29일 (금)' },
  ];
  const guideRows: readonly RunningSessionGuideRow[] = [
    { label: '장소', value: `${runningSessionVenue} · ${runningSessionAddress}` },
    { label: '체크인', value: '세션 시작 20분 전부터' },
    { label: '소요시간', value: '약 1시간 30분 소요' },
    { label: '코스', value: session.location },
    { label: '페이스', value: '6′30″ / 7′00″ (중급 레벨)' },
    { label: '거리', value: session.distance },
    { label: '준비물', value: '러닝화, 편안한 복장, 헤드 랜턴' },
    { label: '혜택', value: '세션에서 제공되는 선물 & 트라이얼 서비스' },
  ];
  return (
    <RunningSessionDetailLayout
      hero={
        <>
          <RunningSessionSessionHero
            session={session}
            rows={[...heroRows]}
            onApply={openApplication}
            registered={registered}
          />
        </>
      }
      guide={<RunningSessionSessionGuide session={session} rows={[...guideRows]} />}
      desktopContent={
        <>
          {session.showSupplementalImagePlaceholder ? <RunningSessionSessionImage /> : null}
          <RunningSessionRecommendations products={recommendedProducts} platform={platform} />
        </>
      }
      mobileAction={
        <RunningSessionFixedActionBar
          status={session.status}
          onApply={openApplication}
          registered={registered}
        />
      }
      applicationNotice={
        <RunningSessionApplicationNotice
          state={applicationState}
          applicant={applicant}
          session={previewApplication === 'confirm' ? applicationConfirmPreviewSession : session}
          open={showApplicationNotice}
          onOpenChange={setShowApplicationNotice}
        />
      }
    />
  );
}
