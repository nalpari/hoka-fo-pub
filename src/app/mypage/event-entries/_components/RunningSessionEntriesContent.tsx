'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack, VStack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button } from '@/components/common/atoms/Button';
import { Divider } from '@/components/common/atoms/Divider';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { eventEntryPreview } from '@/app/mypage/event-entries/eventEntries.data';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { type RunningSessionEntry } from '@/components/running-session/runningSession.data';
import { runningSessionImage } from '@/components/running-session/runningSession.data';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 마이페이지 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
/** 신청내역과 상태별 조회·취소 확인을 표시합니다. (Displays session entry history, status filters and cancellation confirmation.) */
export function RunningSessionEntriesContent({
  previewEmpty = false,
  preview,
  more,
}: { more?: { counter: { current: number; total: number }; onLoadMore?: () => void } } & (
  | {
      previewEmpty?: boolean;
      preview?: never;
    }
  | {
      previewEmpty?: never;
      preview: 'cancel';
    }
)) {
  const [category, setCategory] = useState('전체');
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
  const [selected, setSelected] = useState<string | null>(() =>
    preview === 'cancel'
      ? (eventEntryPreview.items.find((entry) => entry.canCancel)?.id ?? null)
      : null,
  );
  const items: readonly RunningSessionEntry[] = previewEmpty
    ? []
    : eventEntryPreview.items.filter((item) => category === '전체' || item.status === category);
  const totalCount = previewEmpty
    ? 0
    : category === '전체'
      ? eventEntryPreview.totalCount
      : items.length;
  return (
    <MyPageFrame activePath="/mypage/event-entries" breadcrumbs={[{ label: '러닝세션 신청내역' }]}>
      <Stack gap="0" minW="0">
        <ContentHeader
          title="러닝세션 신청내역"
          titleAs="h1"
          titleProps={{ web: 'headingKr6', mo: 'headingKr5' }}
          mb="10"
          _mobile={{ mb: '8' }}
          gap="0"
        />
        <SegmentedControl
          ariaLabel="신청 상태"
          variant="underline"
          value={category}
          onValueChange={setCategory}
          className={css({
            mb: '10',
            _mobile: { mb: '6' },
            '& > button': { minH: '40px', _mobile: { minH: '32px', fontSize: '14px' } },
          })}
          options={['전체', '신청완료', '취소'].map((value) => ({ value, label: value }))}
        />
        <HStack
          justifyContent="space-between"
          pb="4"
          borderBottom="1px solid var(--color-black-100)"
        >
          <Dropdown
            ariaLabel="신청일 정렬"
            value={sort}
            onValueChange={(value) => setSort(value as 'latest' | 'oldest')}
            options={[
              { value: 'latest', label: '최신순' },
              { value: 'oldest', label: '과거순' },
            ]}
            variant="sort"
            popupAlign="start"
          />
          <Typography variant="body4">총 {totalCount}건</Typography>
        </HStack>

        <Stack as="ul" gap="0" aria-label="러닝세션 신청 목록">
          {items.map((entry) => (
            <Stack
              as="li"
              key={entry.id}
              gap="4"
              py="8"
              borderBottom="1px solid var(--color-black-20)"
              _mobile={{ py: '6' }}
            >
              <HStack justifyContent="space-between" h="7" gap="3">
                <Link
                  href={`/running/running-session/${entry.session.id}`}
                  className={css({ minW: '0', flex: '1' })}
                >
                  <ContentHeader
                    title={entry.session.title}
                    titleAs="h2"
                    titleProps={{
                      web: 'headingKr8',
                      mo: 'headingKr6',
                      className: css({
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }),
                    }}
                    gap="0"
                  />
                </Link>
                <Badge
                  className={css({ flexShrink: '0' })}
                  textProps={{
                    variant: 'body5',
                    tone: entry.status === '신청완료' ? 'primary' : 'tertiary',
                  }}
                >
                  {entry.status === '취소' ? '신청취소' : entry.status}
                </Badge>
              </HStack>
              <Grid
                gridTemplateColumns="minmax(0, 1fr) auto"
                gap="3"
                alignItems="end"
                _mobile={{ gridTemplateColumns: 'minmax(0, 1fr)' }}
              >
                <HStack alignItems="stretch" gap="4" minW="0">
                  <Box position="relative" w="96px" h="96px" flexShrink="0">
                    <Image
                      src={runningSessionImage(entry.session.image)}
                      alt=""
                      fill
                      sizes="96px"
                      className={css({ objectFit: 'cover' })}
                    />
                  </Box>
                  <Stack gap="3" minW="0" flex="1" _mobile={{ gap: '2' }}>
                    <HStack gap="6px" flexWrap="wrap">
                      <Typography web="body3" mo="body4">
                        {entry.session.location}
                      </Typography>
                      <Divider orientation="vertical" length="10px" color="black.40" />
                      <Typography web="body3" mo="body4">
                        {entry.session.distance}
                      </Typography>
                    </HStack>
                    <Stack gap="1">
                      {entry.appliedAt ? (
                        <Typography web="body3" mo="body4" tone="subtle">
                          신청일 : {entry.appliedAt}
                        </Typography>
                      ) : null}
                      <Typography web="body3" mo="body4" tone="subtle">
                        진행일시 : {entry.session.schedule}
                      </Typography>
                    </Stack>
                  </Stack>
                </HStack>
                {(entry.canCancel ?? entry.status === '신청완료') ? (
                  <Box justifySelf="end">
                    <Button
                      variant="link"
                      size="md"
                      onClick={() => setSelected(entry.id)}
                      disabled={Boolean(undefined)}
                    >
                      신청 취소
                    </Button>
                  </Box>
                ) : null}
              </Grid>
            </Stack>
          ))}
        </Stack>
        {!items.length ? <EmptyState title="신청한 러닝세션이 없습니다." /> : null}

        {items.length > 0 && more ? (
          <VStack mt="24px">
            <Button
              variant="plain"
              size="lg"
              loadMore={{ counter: more.counter }}
              onClick={more.onLoadMore}
              disabled={!more.onLoadMore}
            />
          </VStack>
        ) : null}
      </Stack>
      <ModalDialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        title="러닝세션 신청 취소"
        closeLabel="신청 취소 닫기"
        size="sm"
        headerProps={{ css: { bg: 'white', borderBottom: '1px solid var(--color-black-20)' } }}
        popupClassName={css({
          '& > header h2': { h: 'auto' },
          '& > div': { p: '6', _mobile: { px: '4' } },
        })}
        actions={{
          kind: 'confirm',
          confirmDisabled: false,
          onConfirm: () => setSelected(null),
        }}
      >
        <Stack gap="4">
          <Typography variant="body3">신청을 취소 하시겠습니까?</Typography>
        </Stack>
      </ModalDialog>
    </MyPageFrame>
  );
}
