import { Grid, HStack, Stack, VStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';

export function SupportHours() {
  return (
    <Stack bg="black.10" p="8" gap="5" _mobile={{ px: '4', pt: '5', pb: '6' }}>
      <Typography as="h2" web="heading8" mo="heading9">
        운영시간
      </Typography>
      <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" gap="4">
        <VStack alignItems="start" gap="4">
          <Typography web="body3" mo="body4">
            평일
          </Typography>
          <HStack gap="1">
            <Icon fontAwesomeIcon={faClock} size="18px" />
            <Typography web="body1" mo="body4">
              10:00~17:00
            </Typography>
          </HStack>
        </VStack>
        <VStack alignItems="start" gap="4">
          <Typography web="body3" mo="body4">
            일반 유선상담
          </Typography>
          <HStack gap="1">
            <Icon fontAwesomeIcon={faClock} size="18px" />
            <Typography web="body1" mo="body4">
              10:00~17:00
            </Typography>
          </HStack>
        </VStack>
      </Grid>
      <Typography as="p" web="body4" mo="body5" tone="tertiary">
        *점심시간은 12:00~13:00이며 토,일, 공휴일은 휴무입니다.
      </Typography>
    </Stack>
  );
}
