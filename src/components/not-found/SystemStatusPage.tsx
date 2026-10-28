import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Box, Grid } from 'styled-system/jsx';
import { ButtonLink } from '@/components/common/atoms/Button/Button';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';

const messages = {
  'not-found': {
    title: '요청하신 페이지를 찾을 수 없습니다.',
    description: (
      <>
        존재하지 않거나, 사용할 수 없는 페이지입니다.
        <br />
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

  return (
    <ContentSection
      as="main"
      gap="8"
      alignItems="center"
      pt="100px"
      pb="32"
      px="4"
      textAlign="center"
      color="black.100"
      _mobile={{ minH: 'calc(100svh - var(--layout-site-header-height))', pt: '24' }}
      header={
        <>
          <Icon fontAwesomeIcon={faTriangleExclamation} size={48} color="black.100" />
          <ContentHeader
            gap="4"
            titleAs="h1"
            title={message.title}
            titleProps={{ variant: 'bodyKr2', weight: 'semibold' }}
            description={message.description}
            descriptionProps={{ variant: 'bodyKr4' }}
          />
        </>
      }
      footer={
        status !== 'maintenance' ? (
          <Box w="180px" _mobile={{ w: '100%' }}>
            <ButtonLink href="/" variant="primary" size="short" fullWidth>
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
