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

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { eventEntryPreview } from '@/app/mypage/event-entries/eventEntries.data';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { runningSessionImage } from '@/components/running-session/runningSession.data';
/** [ 개발팀 바인딩 ] 탭별 목록·건수와 더보기는 고정 표시 데이터이며, 정렬 선택과 취소 모달 열기/닫기만 동작합니다. 조회·더보기·취소 요청은 실행하지 않습니다. 마이페이지 연동 소유자가 실제 목록·건수·다음 페이지 여부와 신청 ID, 정렬·취소 요청 및 대기·실패·재시도·성공 후 목록 갱신을 연결합니다. */
/** 신청내역과 상태별 조회·취소 확인을 표시합니다. (Displays session entry history, status filters and cancellation confirmation.) */
export function RunningSessionEntriesContent({
  previewEmpty = false,
  preview,
}:
  | {
      previewEmpty?: boolean;
      preview?: never;
    }
  | {
      previewEmpty?: never;
      preview: 'cancel';
    }) {
  const [tab, setTab] = useState<'전체' | '신청완료' | '취소'>('전체');
  const [sort, setSort] = useState('recent');
  const [open, setOpen] = useState(preview === 'cancel');
  const { items, totalCount, more } = previewEmpty
    ? eventEntryPreview.empty
    : eventEntryPreview[tab];
  return (
    <MyPageFrame activePath="/mypage/event-entries" breadcrumbs={[{ label: '러닝세션 신청내역' }]}>
      <ContentSection
        title="러닝세션 신청내역"
        headerProps={{ titleAs: 'h1', titleProps: { web: 'headingKr6', mo: 'headingKr5' } }}
        gap="40px"
        _mobile={{ gap: '24px', pt: '24px' }}
      >
        <Box>
          <SegmentedControl
            ariaLabel="신청 상태"
            variant="underline"
            className={css({ _mobile: { w: 'calc(100% + 32px)', mx: '-16px' } })}
            value={tab}
            onValueChange={setTab}
            options={[
              { value: '전체', label: '전체' },
              { value: '신청완료', label: '신청완료' },
              { value: '취소', label: '취소' },
            ]}
          />

          {items.length > 0 ? (
            <>
              <HStack
                justifyContent="space-between"
                pt="40px"
                pb="16px"
                _mobile={{ pt: '32px' }}
                borderBottom="1px solid var(--color-black-100)"
              >
                <Dropdown
                  ariaLabel="신청일 정렬"
                  variant="sort"
                  popupAlign="start"
                  value={sort}
                  onValueChange={setSort}
                  options={[
                    { value: 'recent', label: '최신순' },
                    { value: 'oldest', label: '과거순' },
                  ]}
                />
                <HStack gap="2px">
                  <Typography variant="body4">총</Typography>
                  <Typography variant="body4Medium">
                    {totalCount}
                    <Typography variant="bodyKr4">건</Typography>
                  </Typography>
                </HStack>
              </HStack>
              <Stack as="ul" gap="0" aria-label="러닝세션 신청 목록">
                {items.map((entry) => (
                  <Stack
                    as="li"
                    key={entry.id}
                    gap="16px"
                    py="32px"
                    borderBottom="1px solid var(--color-black-20)"
                    _mobile={{ py: '24px' }}
                  >
                    <HStack justifyContent="space-between" h="28px" gap="12px">
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
                      gap="12px"
                      alignItems="end"
                      _mobile={{ gridTemplateColumns: 'minmax(0, 1fr)' }}
                    >
                      <HStack alignItems="stretch" gap="16px" minW="0">
                        <Box position="relative" w="96px" h="96px" flexShrink="0">
                          <Image
                            src={runningSessionImage(entry.session.image)}
                            alt=""
                            fill
                            sizes="96px"
                            className={css({ objectFit: 'cover' })}
                          />
                        </Box>
                        <Stack gap="12px" minW="0" flex="1" _mobile={{ gap: '8px' }}>
                          <HStack gap="6px" flexWrap="wrap">
                            <Typography web="body3" mo="body4">
                              {entry.session.location}
                            </Typography>
                            <Divider orientation="vertical" length="10px" color="black.40" />
                            <Typography web="body3" mo="body4">
                              {entry.session.distance}
                            </Typography>
                          </HStack>
                          <Stack gap="4px">
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
                      {entry.canCancel ? (
                        <Box justifySelf="end">
                          <Button variant="link" size="md" onClick={() => setOpen(true)}>
                            신청 취소
                          </Button>
                        </Box>
                      ) : null}
                    </Grid>
                  </Stack>
                ))}
              </Stack>
              <VStack mt="24px">
                <Button
                  variant="plain"
                  size="lg"
                  onClick={more.onLoadMore}
                  disabled={!more.onLoadMore}
                  loadMore={{ counter: more.counter }}
                />
              </VStack>
            </>
          ) : (
            <EmptyState title="신청한 러닝세션이 없습니다." />
          )}
        </Box>
      </ContentSection>
      <ModalDialog
        variant="confirm"
        open={open}
        onOpenChange={setOpen}
        title="러닝세션 신청 취소"
        closeLabel="신청 취소 닫기"

        actions={{
          kind: 'confirm',
          onConfirm: () => setOpen(false),
        }}
        message="신청을 취소 하시겠습니까?"
      />
    </MyPageFrame>
  );
}
