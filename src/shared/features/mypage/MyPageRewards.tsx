import { cva } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { MyPageFrame } from './MyPageFrame';

const tiers = [
  {
    initial: 'E',
    name: 'ELITE',
    benefits: [
      {
        title: 'TIER 1. 10% 할인 쿠폰 (*월 1회 지급)',
        details: [
          '최대 구매 가능 금액 : 700,000원',
          '3개월 운영 후 5% 하향 조정 (정책 변경일 D-30 공지 필요)',
        ],
      },
      { title: '무료 반품 쿠폰 3장 (*연 3회 지급)', details: [] },
      { title: '스페셜 래플 응모 기회 제공 (이벤트, 상품 etc)', details: [] },
    ],
  },
  {
    initial: 'A',
    name: 'ADVANCED',
    benefits: [
      { title: 'TIER 2. 7% 할인 쿠폰 (월 1회 지급)', details: ['최대 구매 가능 금액 : 500,000원'] },
      { title: '무료 반품 쿠폰 2장 (연 2회 지급)', details: [] },
    ],
  },
  {
    initial: 'R',
    name: 'RUNNER',
    benefits: [
      { title: 'TIER 3. 5% 할인 쿠폰 (월 1회 지급)', details: ['최대 구매 가능 금액 : 300,000원'] },
      { title: '무료 반품 쿠폰 1장 (연 1회 지급)', details: [] },
    ],
  },
] as const;

const tierCard = cva({
  base: { bg: 'var(--tier-color)' },
  variants: {
    tier: {
      ELITE: { '--tier-color': 'var(--colors-blue-100)' },
      ADVANCED: { '--tier-color': 'var(--colors-citrus-100)' },
      RUNNER: { '--tier-color': 'var(--colors-off-white-100)' },
    },
  },
});

const commonBenefits = [
  {
    title: '멤버 ‘신규 가입’ 유도',
    items: [
      { text: '멤버 전용 상품(에너지 스타일 비회원 구매x)', details: [] },
      { text: '무료배송', details: [] },
      {
        text: '신규 가입 쿠폰 (10%쿠폰, *최초 1회 지급)',
        details: [
          '최대 구매 가능 금액 : 500,000원',
          '3개월 운영 후 5% 하향 조정(정책 변경일 D-30 공지 필요)',
        ],
      },
    ],
  },
  {
    title: '멤버 ‘첫 구매’ 유도',
    items: [
      { text: '첫 구매 감사 쿠폰(100,000원, *최초 1회 지급)', details: ['최소 주문 가능 금액 : 100,000원'] },
    ],
  },
  {
    title: '멤버 ‘재구매’ 유도',
    items: [
      { text: '생일 축하 쿠폰(10,000원, *연 1회 지급)', details: ['최소 주문 가능 금액 : 50,000원'] },
    ],
  },
  {
    title: '멤버 ‘CRM 채널’ 유입',
    items: [
      { text: 'HOKA 카플친 추가 시 5,000원 쿠폰(*최초 1회 지급)', details: [] },
    ],
  },
] as const;

export function MyPageRewards() {
  return (
    <MyPageFrame activePath="/mypage/rewards" breadcrumbs={[{ label: '회원등급' }]}>
      <Stack gap="10" px="4" pt="6" pb="16">
        <Stack gap="4">
          <Box as="h1">
            <HStack gap="0.5" alignItems="baseline">
              <Typography mo="heading5">박*진</Typography>
              <Typography mo="body2">님의 회원등급은</Typography>
            </HStack>
            <HStack gap="0.5" alignItems="baseline">
              <Typography mo="heading5">RUNNER</Typography>
              <Typography mo="body2">입니다.</Typography>
            </HStack>
          </Box>
          <Stack bg="black.10" px="4" py="5" gap="3">
            <HStack justifyContent="space-between" alignItems="center">
              <Typography mo="body4" weight="medium">
                구매금액
              </Typography>
              <HStack gap="0.5" alignItems="baseline">
                <Typography mo="heading7">182,500</Typography>
                <Typography mo="body3">원</Typography>
              </HStack>
            </HStack>
            <Box mt="2">
              <Typography as="p" mo="body5" tone="tertiary">
                * 매월 1일, 최근 1년간의 구매 금액을 기준으로 산정됩니다.
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Stack gap="4">
          {tiers.map((tier) => (
            <Stack key={tier.name} className={tierCard({ tier: tier.name })} gap="4" px="4" py="6">
              <HStack alignItems="center" gap="2">
                <Box
                  w="12"
                  h="12"
                  bg="black.100"
                  color="var(--tier-color)"
                  borderRadius="full"
                  display="grid"
                  placeItems="center"
                >
                  <Typography mo="heading5" weight="black">
                    {tier.initial}
                  </Typography>
                </Box>
                <Typography mo="heading5">{tier.name}</Typography>
              </HStack>
              <Stack as="ol" gap="2" listStyleType="none">
                {tier.benefits.map((benefit, index) => (
                  <HStack as="li" key={benefit.title} alignItems="flex-start" gap="1">
                    <Typography as="span" mo="body4">
                      {index + 1}.
                    </Typography>
                    <Stack flex="1" minW="0" gap="2">
                      <Typography as="p" mo="body4">
                        {benefit.title}
                      </Typography>
                      {benefit.details.length > 0 ? (
                        <Stack as="ul" gap="1" listStyleType="none">
                          {benefit.details.map((detail) => (
                            <Typography as="li" key={detail} mo="body5">
                              • &nbsp;{detail}
                            </Typography>
                          ))}
                        </Stack>
                      ) : null}
                    </Stack>
                  </HStack>
                ))}
              </Stack>
            </Stack>
          ))}
          <Stack gap="5" px="4" py="6" border="1px solid var(--colors-black-20)">
            <Typography as="h2" mo="heading6">
              HOKA 회원 공통 혜택
            </Typography>
            <Stack gap="5">
              {commonBenefits.map((benefit) => (
                <Stack as="section" key={benefit.title} gap="3">
                  <Typography as="h3" mo="heading7">
                    {benefit.title}
                  </Typography>
                  <Stack as="ol" gap="2" listStyleType="none">
                    {benefit.items.map((item, index) => (
                      <HStack as="li" key={item.text} alignItems="flex-start" gap="1">
                        <Typography as="span" mo="body4">
                          {index + 1}.
                        </Typography>
                        <Stack flex="1" minW="0" gap="2">
                          <Typography as="span" mo="body4">
                            {item.text}
                          </Typography>
                          {item.details.length > 0 ? (
                            <Stack as="ul" gap="1" listStyleType="none">
                              {item.details.map((detail) => (
                                <Typography as="li" key={detail} mo="body5">
                                  • &nbsp;{detail}
                                </Typography>
                              ))}
                            </Stack>
                          ) : null}
                        </Stack>
                      </HStack>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </MyPageFrame>
  );
}
