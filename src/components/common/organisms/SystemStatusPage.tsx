import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

const messages = {
  'not-found': {
    title: '요청하신 페이지를 찾을 수 없습니다.',
    description: (
      <>
        존재하지 않거나, 사용할 수 없는 페이지입니다.{' '}
        <br className={css({ display: 'none', _mobile: { display: 'initial' } })} />
        주소가 정확한지 다시 확인해 주세요.
      </>
    ),
  },
  maintenance: {
    title: '시스템 점검중입니다.',
    description: (
      <>
        더 나은 서비스 제공을 위해 시스템 점검을 진행하고 있습니다.
        <br />
        작업 시간 동안 서비스 이용이 일시 중단될 수 있으니, 이용에 불편을 드려 죄송합니다.
      </>
    ),
  },
  unavailable: {
    title: '현재 서비스 제공 상태가 원활하지 않습니다.',
    description: <>이용에 불편을 드려 죄송합니다. 잠시 후 다시 이용해 주세요.</>,
  },
} as const;

export type SystemStatusPageProps = {
  status: keyof typeof messages;
  maintenance?: { schedule: string; reason: string };
};

/** 서비스 오류와 점검 안내를 표시합니다 (Shared error presentation. Maintenance schedule data belongs to the caller). */
export function SystemStatusPage({ status, maintenance }: SystemStatusPageProps) {
  const message = messages[status];
  const notFound = status === 'not-found';

  return (
    <ContentSection
      as="main"
      gap={notFound ? { base: '8', _mobile: '6' } : '8'}
      css={notFound ? { '--line-heights-body': '1.5' } : undefined}
      alignItems="center"
      minH="412px"
      justifyContent="center"
      py="16"
      px={notFound ? '4' : '3'}
      textAlign="center"
      color="black.100"
      // The existing promotion banner occupies 50px above the site header.
      _mobile={{ minH: 'calc(100svh - var(--layout-site-header-height) - 50px)', py: '8' }}
      header={
        <Stack alignItems="center" gap={notFound ? { base: '6', _mobile: '8' } : '8'} w="100%">
          <Icon name="triangle-exclamation-solid" size={48} color="black.100" />
          <ContentHeader
            gap={notFound ? { base: '3', _mobile: '4' } : '4'}
            titleAs="h1"
            title={message.title}
            titleProps={{ variant: 'bodyKr2', weight: 'semibold' }}
            description={message.description}
            descriptionProps={{ variant: 'bodyKr4' }}
            w="100%"
            maxW="520px"
          />
        </Stack>
      }
      footer={
        status !== 'maintenance' ? (
          <Box w="100%" maxW="180px" _mobile={notFound ? { maxW: 'none' } : undefined}>
            <ButtonLink href="/" variant="primary" size={notFound ? 'tall' : 'short'} fullWidth>
              홈으로
            </ButtonLink>
          </Box>
        ) : undefined
      }
    >
      {status === 'maintenance' && maintenance && (
        <Grid
          as="dl"
          gridTemplateColumns="auto minmax(0, 1fr)"
          columnGap="4"
          rowGap="3"
          w="500px"
          maxW="100%"
          p="6"
          bg="black.10"
          textAlign="left"
        >
          <Typography as="dt" variant="bodyKr4" weight="semibold">
            일시
          </Typography>
          <Typography as="dd" variant="bodyKr4">
            {maintenance.schedule}
          </Typography>
          <Typography as="dt" variant="bodyKr4" weight="semibold">
            내용
          </Typography>
          <Typography as="dd" variant="bodyKr4">
            {maintenance.reason}
          </Typography>
        </Grid>
      )}
    </ContentSection>
  );
}
