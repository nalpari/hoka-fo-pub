'use client';

/**
 * [ 개발팀 바인딩 ]
 * SupportContentContext.notices에 안정적인 id/title/date/body와 서버 목록 상태를 전달합니다.
 * Empty는 조회 중·실패와 구분합니다. previewEmpty는 조회하지 않는 고정 fixture이며 운영 응답 갱신·오래된 응답 폐기는 context 소유자 책임입니다.
 * 상세 링크는 배열 순번이 아닌 id입니다. 더보기는 다음 응답을 누적한 뒤 resolve하고 실패하면 reject합니다.
 * Button.loadMore에는 현재 표시한 목록을 제외한 건수만 전달하며, 중복 실행 방지와 실패 표시는 기존 request 상태를 따릅니다.
 */

import { useContext } from 'react';
import { useState } from 'react';
import { usePlatform } from '@/context/platform';
import { SupportContentContext } from '@/context/SupportContentContext';
import { useBindingQuery } from '@/hooks/useBindingQuery';
import { useRequestAction } from '@/hooks/useRequestAction';

import { css } from 'styled-system/css';
import { Box, Center, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { notices } from '@/app/support/notices/notices.data';
import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { NoticesList } from './NoticesList';

/** 공지 목록과 화면별 상세 탐색을 구성합니다. (Composes notices and platform-specific detail navigation.) */
export function NoticesContent({ previewEmpty = false }: { previewEmpty?: boolean }) {
  const { notices: contextBinding } = useContext(SupportContentContext);
  const binding = previewEmpty ? undefined : contextBinding;
  const request = useRequestAction();
  useBindingQuery(binding?.onQueryChange, {});
  const items = previewEmpty ? [] : binding ? [...binding.items] : notices;
  const total = previewEmpty ? 0 : (binding?.totalCount ?? notices.length);
  const platform = usePlatform();
  const [shown, setShown] = useState(10);

  return (
    <CustomerCenterLayout
      className={css({ _mobile: { pb: '72px!' } })}
      title="공지사항"
      mobileTitleVariant="heading5"
      activePath="/support/notices"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '공지사항' },
      ]}
      groups={supportNavigation}
      footer={
        (binding ? binding.hasMore : shown < items.length) ? (
          <Box pt={{ base: '9', _mobile: '6' }} mx="auto">
            <Button
              variant="plain"
              className={css({ p: '0', minH: '0' })}
              disabled={binding?.pending || request.pending}
              loadMore={{
                appearance: 'text',
                label: '더 보기',
                count: Math.max(0, total - (binding ? items.length : shown)),
                countPlacement: 'inline',
                labelProps: { variant: 'body4' },
                indicator: (
                  <Center w="5" h="5">
                    <Icon src="/images/icon/chevron-down-small.svg" size="13px" />
                  </Center>
                ),
              }}
              onClick={() => {
                if (binding) void request.run(binding.onLoadMore);
                else setShown((count) => count + 10);
              }}
            />
          </Box>
        ) : null
      }
    >
      <Stack gap="0" pt={{ base: '10', _mobile: '6' }}>
        <BindingFeedback
          {...binding}
          pending={binding?.pending || request.pending}
          error={binding?.error || request.error}
        />
        <NoticesList
          notices={items}
          shown={binding ? items.length : shown}
          platform={platform}
          pending={binding?.pending || request.pending}
          error={Boolean(binding?.error || request.error)}
        />
      </Stack>
    </CustomerCenterLayout>
  );
}
