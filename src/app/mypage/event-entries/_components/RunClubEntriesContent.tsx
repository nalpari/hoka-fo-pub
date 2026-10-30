'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useContext, useState } from 'react';
import { RunClubDataContext, type RunClubEntry } from '@/context/RunClubDataContext';
import { useBindingQuery } from '@/hooks/useBindingQuery';
import { useRequestAction } from '@/hooks/useRequestAction';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Icon } from '@/components/common/atoms/Icon';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { eventEntryPreview } from '@/app/mypage/event-entries/eventEntries.data';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { runClubImage } from '@/components/run-club/runClub.data';
import { faChevronDown } from '@/icons/fontAwesome';

/** 신청내역과 상태별 조회·취소 확인을 표시합니다. (Displays session entry history, status filters and cancellation confirmation.)
 * [ 개발팀 바인딩 ] RunClubDataContext.entries의 현재 items/totalCount/hasMore/pageInfo와 조회 상태를 직접 표시하며 서버 결과를 재필터하지 않습니다.
 * category와 신청일 정렬 sort(latest/oldest)를 onQueryChange로 전달합니다. 연결 소유자가 조건 변경 시 페이지를 초기화하고 늦은 응답을 버리며 10건씩 누적합니다.
 * appliedAt은 신청일 표시값, session.schedule은 진행일시, canCancel은 운영 취소 가능 여부입니다. 미제공 시 기존 신청완료 상태를 기준으로 취소 버튼을 표시합니다.
 * cancelEntry에는 세션 ID가 아닌 신청 ID를 전달합니다. 소유자가 성공 후 목록·건수를 갱신한 뒤 resolve해야 하며 pending 중 중복 실행/닫기를 막고 실패 시 확인창과 재시도를 유지합니다.
 * 미연결 기본 화면의 3건·총 62건·1/10은 디자인 fixture입니다. 더보기는 연결 전 비활성이고 취소 확인은 창만 닫으며 운영 상태를 변경하지 않습니다.
 */
export function RunClubEntriesContent({ previewEmpty = false }: { previewEmpty?: boolean }) {
  const { entries: connected, cancelEntry } = useContext(RunClubDataContext);
  const binding = previewEmpty ? undefined : connected;
  const [category, setCategory] = useState('전체');
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
  const [selected, setSelected] = useState<string | null>(null);
  const request = useRequestAction();
  const loadMore = useRequestAction();
  useBindingQuery(binding?.onQueryChange, { category, sort });
  const items: readonly RunClubEntry[] = previewEmpty
    ? []
    : binding
      ? binding.items
      : eventEntryPreview.items.filter((item) => category === '전체' || item.status === category);
  const totalCount = previewEmpty
    ? 0
    : (binding?.totalCount ?? (category === '전체' ? eventEntryPreview.totalCount : items.length));
  const pageInfo =
    binding?.pageInfo ??
    (binding ? { current: items.length, total: totalCount } : eventEntryPreview.pageInfo);

  return (
    <MyPageFrame
      activePath="/mypage/event-entries"
      breadcrumbs={[{ label: 'MY HOKA', href: '/mypage' }, { label: '러닝세션 신청내역' }]}
    >
      <Stack gap="0" minW="0">
        <Box mb="10" _mobile={{ mb: '6' }}>
          <Typography as="h1" web="headingKr6" mo="headingKr5">
            러닝세션 신청내역
          </Typography>
        </Box>
        <SegmentedControl
          ariaLabel="신청 상태"
          variant="underline"
          value={category}
          onValueChange={setCategory}
          className={css({ '& > button': { minH: '48px', _mobile: { minH: '40px' } } })}
          options={['전체', '신청완료', '취소'].map((value) => ({ value, label: value }))}
        />
        <HStack
          justifyContent="space-between"
          minH="72px"
          borderBottom="1px solid var(--color-black-100)"
          _mobile={{ minH: '60px' }}
        >
          <Dropdown
            ariaLabel="신청일 정렬"
            value={sort}
            onValueChange={(value) => setSort(value as 'latest' | 'oldest')}
            options={[
              { value: 'latest', label: '최신순' },
              { value: 'oldest', label: '과거순' },
            ]}
            indicator={<Icon fontAwesomeIcon={faChevronDown} size="12px" />}
            className={css({
              '&&': { w: '88px', px: '0', boxShadow: 'none', whiteSpace: 'nowrap' },
              '&&[data-popup-open]': { boxShadow: 'none' },
            })}
          />
          <Typography variant="body4">총 {totalCount}건</Typography>
        </HStack>
        <BindingFeedback {...binding} />
        <Stack
          as="ul"
          gap="0"
          aria-label="러닝세션 신청 목록"
          aria-busy={binding?.pending || undefined}
        >
          {items.map((entry) => (
            <Stack
              as="li"
              key={entry.id}
              gap="4"
              py="8"
              borderBottom="1px solid var(--color-black-20)"
              _mobile={{ gap: '3', py: '6' }}
            >
              <HStack justifyContent="space-between" alignItems="flex-start" gap="3">
                <Link
                  href={`/running/run-club/${entry.session.id}`}
                  className={css({ minW: '0', flex: '1' })}
                >
                  <Typography
                    as="h2"
                    web="headingKr8"
                    mo="headingKr8"
                    className={css({
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    })}
                  >
                    {entry.session.title}
                  </Typography>
                </Link>
                <Box bg="black.20" borderRadius="full" px="2" py="1" flexShrink="0">
                  <Typography variant="body5" tone="tertiary">
                    {entry.status === '취소' ? '신청취소' : entry.status}
                  </Typography>
                </Box>
              </HStack>
              <HStack alignItems="stretch" gap="4">
                <Box position="relative" w="96px" h="96px" flexShrink="0">
                  <Image
                    src={runClubImage(entry.session.image)}
                    alt=""
                    fill
                    sizes="96px"
                    className={css({ objectFit: 'cover' })}
                  />
                </Box>
                <Stack gap="2" minW="0" flex="1">
                  <HStack gap="2" flexWrap="wrap">
                    <Typography variant="body4" weight="medium">
                      {entry.session.location}
                    </Typography>
                    <Box w="1px" h="12px" bg="black.40" aria-hidden="true" />
                    <Typography variant="body4" weight="medium">
                      {entry.session.distance}
                    </Typography>
                  </HStack>
                  <Stack gap="0">
                    {entry.appliedAt ? (
                      <Typography web="body4" mo="body5" tone="tertiary">
                        신청일 : {entry.appliedAt}
                      </Typography>
                    ) : null}
                    <Typography web="body4" mo="body5" tone="tertiary">
                      진행일시 : {entry.session.schedule}
                    </Typography>
                  </Stack>
                </Stack>
              </HStack>
              {(entry.canCancel ?? entry.status === '신청완료') ? (
                <Box alignSelf="flex-end">
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setSelected(entry.id)}
                    disabled={Boolean(binding && !cancelEntry)}
                  >
                    신청 취소
                  </Button>
                </Box>
              ) : null}
            </Stack>
          ))}
        </Stack>
        {!items.length && !binding?.pending && !binding?.error ? (
          <EmptyState title="신청한 러닝세션이 없습니다." />
        ) : null}
        <BindingFeedback
          pending={loadMore.pending}
          error={loadMore.error}
          onRetry={
            binding?.onLoadMore
              ? () => {
                  void loadMore.run(binding.onLoadMore);
                }
              : undefined
          }
        />
        {(binding ? binding.hasMore : items.length > 0) ? (
          <Box alignSelf="center" pt="6" w="160px" _mobile={{ w: '100%' }}>
            <Button
              variant="secondary"
              size="short"
              fullWidth
              loadMore={{ counter: pageInfo }}
              className={
                !binding
                  ? css({
                      '&&:disabled > span': {
                        bg: 'white!',
                        color: 'black.100!',
                        boxShadow: 'inset 0 0 0 1px var(--color-black-100)!',
                      },
                    })
                  : undefined
              }
              disabled={!binding || binding.pending || loadMore.pending}
              onClick={() => {
                if (binding) void loadMore.run(binding.onLoadMore);
              }}
            />
          </Box>
        ) : null}
      </Stack>
      <ModalDialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open && !request.pending) setSelected(null);
        }}
        title="러닝세션 신청 취소"
        closeLabel="신청 취소 닫기"
        size="sm"
        headerProps={{ css: { bg: 'white', borderBottom: '1px solid var(--color-black-20)' } }}
        actions={{
          kind: 'confirm',
          confirmDisabled: request.pending,
          onConfirm: () => {
            if (!selected) return;
            if (!binding) {
              setSelected(null);
              return;
            }
            const id = selected;
            void request.run(async () => {
              if (!cancelEntry) throw new Error('신청 취소 서비스가 연결되지 않았습니다.');
              await cancelEntry(id);
              setSelected(null);
            });
          },
        }}
      >
        <Stack gap="4">
          <Typography variant="body3">신청을 취소하시겠습니까?</Typography>
          <BindingFeedback pending={request.pending} error={request.error} />
        </Stack>
      </ModalDialog>
    </MyPageFrame>
  );
}
