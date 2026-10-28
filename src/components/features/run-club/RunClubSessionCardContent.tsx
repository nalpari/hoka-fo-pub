import { css } from 'styled-system/css';
import { Stack, Flex } from 'styled-system/jsx';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { ButtonLink } from '@/components/common/atoms/Button/Button';
import type { RunClubSession } from './runClub.data';
import { RunClubBadge } from './RunClubBadge';

export function RunClubSessionCardContent({ session }: { session: RunClubSession }) {
  return (
    <ContentSection
      gap="6"
      _mobile={{ px: '4' }}
      header={
        <Stack gap="3.5" _mobile={{ gap: '2' }}>
          <Flex justifyContent="flex-start">
            <RunClubBadge category={session.category} />
          </Flex>
          <ContentHeader
            gap="2"
            _mobile={{ gap: '2' }}
            titleAs="h2"
            title={<>{session.title}</>}
            titleProps={{ variant: 'heading7', mo: 'body1', weight: 'black' }}
            description={
              <>
                {session.schedule} | {session.location} {session.distance}
              </>
            }
            descriptionProps={{ variant: 'body3', mo: 'body4' }}
          />
        </Stack>
      }
      footer={
        <ButtonLink
          href={`/running/run-club/${session.id}`}
          variant="primary"
          className={css({ _mobile: { display: 'none' } })}
        >
          자세히 보기
        </ButtonLink>
      }
    />
  );
}
