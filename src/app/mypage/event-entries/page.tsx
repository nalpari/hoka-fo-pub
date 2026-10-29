'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useContext, useState } from 'react';
import { RunClubDataContext, type RunClubEntry } from '@/context/RunClubDataContext';
import { useBindingQuery } from '@/hooks/useBindingQuery';
import { useRequestAction } from '@/hooks/useRequestAction';

import { Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { runClubImage, runClubSessions } from '@/components/run-club/runClub.data';

const previewEntries: readonly RunClubEntry[] = runClubSessions
  .slice(0, 3)
  .map((session, index) => ({
    id: `preview-entry-${index}`,
    session,
    status: index === 2 ? '취소' : '신청완료',
  }));

/** 신청내역과 상태별 조회·취소 확인을 표시합니다. (Displays session entry history, status filters and cancellation confirmation.)
 * [ 개발팀 바인딩 ] entries는 서버 필터 결과이므로 재필터하지 않습니다. category에는 전체/신청완료/취소를 전달합니다. 취소는 cancelEntry가 목록 갱신까지 마친 뒤 resolve하며 실패 시 확인창을 유지합니다. 기본 목록은 명시적 미리보기입니다.
 */
export default function Page() {
  const { entries: binding, cancelEntry } = useContext(RunClubDataContext);
  const [category, setCategory] = useState('전체');
  const [demo, setDemo] = useState(previewEntries);
  const [selected, setSelected] = useState<string | null>(null);
  const request = useRequestAction();
  useBindingQuery(binding?.onQueryChange, { category });
  const items = binding
    ? binding.items
    : demo.filter((item) => category === '전체' || item.status === category);
  return (
    <MyPageFrame activePath="/mypage/event-entries" breadcrumbs={[{ label: '러닝세션 신청내역' }]}>
      <ContentSection
        px={{ base: '0', _mobile: '4' }}
        pb="12"
        title="러닝세션 신청내역"
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
        gap="6"
      >
        <SegmentedControl
          ariaLabel="신청 상태"
          variant="underline"
          value={category}
          onValueChange={setCategory}
          options={['전체', '신청완료', '취소'].map((value) => ({ value, label: value }))}
        />
        <BindingFeedback {...binding} />
        <HStack justifyContent="space-between">
          <Typography variant="body4">총 {binding?.totalCount ?? items.length}건</Typography>
          <Typography variant="body4">최근순</Typography>
        </HStack>
        {items.length ? (
          <Stack gap="0">
            {items.map((entry) => (
              <Grid
                key={entry.id}
                gridTemplateColumns={{
                  base: '120px minmax(0, 1fr) 120px',
                  _mobile: '80px minmax(0, 1fr)',
                }}
                gap="4"
                py="6"
                borderBottom="1px solid var(--colors-black-20)"
                alignItems="center"
              >
                <Image src={runClubImage(entry.session.image)} alt="" width={120} height={100} />
                <Stack gap="2">
                  <Link href={`/running/run-club/${entry.session.id}`}>
                    <Typography web="body2" mo="body3" weight="medium">
                      {entry.session.title}
                    </Typography>
                  </Link>
                  <Typography variant="body4">{entry.session.schedule}</Typography>
                  <Typography variant="body5">
                    {entry.session.location} · {entry.session.distance}
                  </Typography>
                  <Typography variant="body5">{entry.status}</Typography>
                </Stack>
                {entry.status !== '취소' ? (
                  <Button
                    variant="secondary"
                    size="short"
                    onClick={() => setSelected(entry.id)}
                    disabled={Boolean(binding && !cancelEntry)}
                  >
                    신청 취소
                  </Button>
                ) : null}
              </Grid>
            ))}
          </Stack>
        ) : !binding?.pending && !binding?.error ? (
          <EmptyState title="신청한 러닝세션이 없습니다." />
        ) : null}
        {binding?.hasMore ? (
          <Button
            variant="secondary"
            disabled={request.pending}
            onClick={() => {
              void request.run(binding.onLoadMore);
            }}
          >
            더 보기
          </Button>
        ) : null}
      </ContentSection>
      <ModalDialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open && !request.pending) setSelected(null);
        }}
        title="신청 취소"
        closeLabel="신청 취소 닫기"
        size="sm"
        actions={{
          kind: 'confirm',
          confirmDisabled: request.pending,
          onConfirm: () => {
            if (!selected) return;
            const id = selected;
            void request.run(async () => {
              if (binding) {
                if (!cancelEntry) throw new Error('신청 취소 서비스가 연결되지 않았습니다.');
                await cancelEntry(id);
              } else
                setDemo((previous) =>
                  previous.map((item) => (item.id === id ? { ...item, status: '취소' } : item)),
                );
              setSelected(null);
            });
          },
        }}
      >
        <Stack gap="4">
          <Typography variant="body3">러닝세션 신청을 취소하시겠습니까?</Typography>
          <BindingFeedback pending={request.pending} error={request.error} />
        </Stack>
      </ModalDialog>
    </MyPageFrame>
  );
}
