import Link from 'next/link';
import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';

const membershipLink = css({
  color: 'inherit',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
});

export function MyPageMembership() {
  return (
    <Box bg="black.10" px="4" py="5">
      <Stack gap="1">
        <HStack justifyContent="space-between">
          <HStack gap="2">
            <HStack
              as="span"
              justifyContent="center"
              gap="0"
              w="8"
              h="8"
              borderRadius="full"
              bg="black.100"
              color="offWhite.100"
            >
              <Typography variant="heading6" language="en" weight="black">
                R
              </Typography>
            </HStack>
            <Typography web="heading8" mo="heading5" language="en">
              RUNNER
            </Typography>
          </HStack>
          <Link className={membershipLink} href="/mypage/rewards">
            <Typography variant="body5">등급안내</Typography>
          </Link>
        </HStack>
        <Box w="full" pl="10" boxSizing="border-box">
          <Typography variant="body5">다음 등급까지 300,000원 구매시 등급 업 혜택 제공</Typography>
        </Box>
      </Stack>
    </Box>
  );
}
