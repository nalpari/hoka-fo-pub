'use client';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 콘텐츠 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import { useParams } from 'next/navigation';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { SystemStatusPage } from '@/components/common/organisms/SystemStatusPage';

import { notices } from '@/app/support/notices/notices.data';
import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';
/** 경로에 해당하는 공지 상세 내용을 표시합니다. (Displays notice details for the current route.) */
export default function Page() {
  const { id } = useParams<{
    id?: string;
  }>();
  const noticeIndex = Number(id ?? 1) - 1;
  const notice = notices[noticeIndex];
  if (!notice) return <SystemStatusPage status="not-found" />;
  return (
    <CustomerCenterLayout
      className={css({ _mobile: { pb: '72px!' } })}
      title="공지사항"
      mobileTitleVariant="heading5"
      activePath="/support/notices"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '공지사항', href: '/support/notices' },
      ]}
      groups={supportNavigation}
      footerAction={{
        kind: 'link',
        label: '목록보기',
        href: '/support/notices',
        size: 'tall',
        width: 'compact',
        containerProps: css.raw({ pt: '6' }),
      }}
    >
      <Box
        mt={{ base: '10', _mobile: '8' }}
        borderTop="2px solid"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="black.20"
        borderTopColor="black.100"
        py="6"
        _mobile={{ py: '4', borderTopWidth: '1px' }}
      >
        <ContentHeader
          title={notice.title}
          titleAs="h2"
          titleProps={{ variant: 'heading9' }}
          gap="2"
          description={notice.date}
          descriptionAs="time"
          descriptionProps={{
            variant: 'body4',
            language: 'en',
            dateTime: notice.date,
            className: css({ color: 'black.50' }),
          }}
        />
      </Box>
      <Stack
        gap="4"
        px="2"
        py="6"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="black.20"
        _mobile={{ minH: '354px' }}
      >
        {notice === notices[0] ? (
          <>
            <Typography as="p" variant="body4">
              안녕하세요, HOKA 코리아입니다.
            </Typography>
            <Typography as="p" variant="body4">
              네이버페이 9월 프로모션을 안내드립니다.
            </Typography>
            <Typography as="p" variant="body4">
              1. 이벤트 진행기간: 9월 1일 00:00 ~ 9월 14일 09:59
            </Typography>
            <Typography as="p" variant="body4">
              2. 네이버페이로 10만원 이상 결제 시 7천원 즉시할인
            </Typography>
            <Typography as="p" variant="body4">
              3. 대상 상품: 호카 공식 홈페이지 내 전 상품
            </Typography>
            <Typography as="p" variant="body4">
              이용해 주셔서 감사합니다.
            </Typography>
          </>
        ) : (
          <Typography as="p" variant="body4">
            {notice.title} 상세 안내입니다.
          </Typography>
        )}
      </Stack>
    </CustomerCenterLayout>
  );
}
