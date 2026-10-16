'use client';

import { useState } from 'react';
import { Box, Divider, HStack, Stack, styled } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { usePlatform } from '@/shared/context/platform';

const notices = [
  { title: '[공통] 네이버페이 9월 프로모션 안내', date: '2026-08-13' },
  { title: '[공통] 2026 광복절 고객센터 운영 안내', date: '2026-08-13' },
  { title: '[공통] 네이버페이 8월 프로모션 안내', date: '2026-08-07' },
  { title: '[공통] 호카 서비스 전환 안내', date: '2026-07-31' },
  { title: '[호카] 테크 콤포 디자인 상품 관련 공식 입장', date: '2026-07-24' },
  { title: '[호카] 신발 가격 상승관련 안내', date: '2026-07-23' },
  { title: '[공통] 호카 멤버십 혜택 변경 안내', date: '2026-07-10' },
  { title: '[공통] 호카 멤버십 혜택 수정 예정 안내', date: '2026-07-01' },
  { title: '[호카 키즈] 920 프리들 발매 일정 변경 안내', date: '2026-05-15' },
  { title: '[호카 키즈] 래플 접수 및 결제 가이드', date: '2026-03-23' },
  { title: '[공통] 교환 정책 안내', date: '2026-01-26' },
];

export function NoticesPage() {
  const platform = usePlatform();
  const [openIndex, setOpenIndex] = useState<number | null>(platform === 'web' ? 0 : null);
  const [shown, setShown] = useState(10);

  return (
    <CustomerCenterLayout
      activePath="/support/notices"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '공지사항' },
      ]}
      groups={supportNavigation}
      hideIntroMobile
    >
      <Box mb={{ base: '9', _mobile: '6' }}>
        <Typography as="h2" web="heading6" mo="heading7">
          공지사항
        </Typography>
      </Box>
      <Divider
        aria-hidden="true"
        orientation="horizontal"
        h="2px"
        bg="black.100"
        _mobile={{ display: 'none' }}
      />
      <Stack as="section" aria-label="공지사항 목록" gap="0">
        <Divider
          aria-hidden="true"
          orientation="horizontal"
          h="1px"
          bg="black.20"
          mt={{ base: '3', _mobile: '0' }}
        />
        {notices.slice(0, shown).map((notice, index) => (
          <Box key={notice.title}>
            <styled.button
              type="button"
              aria-expanded={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              w="100%"
              h={{ base: '59px', _mobile: '55px' }}
              px={{ base: '4', _mobile: '0' }}
              py="0"
              bg="white.0"
              border="0"
              textAlign="left"
              cursor="pointer"
            >
              <HStack justifyContent="space-between" gap="4" alignItems="center">
                <Box
                  minW="0"
                  flex="1"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  <Typography web="heading9" mo="body3">
                    {notice.title}
                  </Typography>
                </Box>
                <Typography
                  as="time"
                  web="body4"
                  mo="body4"
                  tone={platform === 'web' ? 'subtle' : 'tertiary'}
                >
                  {notice.date}
                </Typography>
              </HStack>
            </styled.button>
            {openIndex === index ? (
              <>
                <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
                <Stack px="6" py="8" gap="3" bg="black.10" _mobile={{ px: '4', py: '6' }}>
                  {index === 0 ? (
                    <>
                      <Typography as="p" web="body4" mo="body4">
                        1. 이벤트 진행기간: 9월 1일 00:00 ~ 9월 14일 09:59
                      </Typography>
                      <Typography as="p" web="body4" mo="body4">
                        2. 네이버페이로 10만원 이상 결제 시 7천원 즉시할인
                      </Typography>
                      <Typography as="p" web="body4" mo="body4">
                        3. 대상 상품: 호카 공식 홈페이지 내 전 상품
                      </Typography>
                      <Typography as="p" web="body4" mo="body4">
                        4. 이벤트 기간 내 1회 한정으로 진행되며, 운영 상황에 따라 조기 종료될 수
                        있습니다.
                      </Typography>
                    </>
                  ) : (
                    <Typography as="p" web="body4" mo="body4">
                      {notice.title} 상세 안내입니다.
                    </Typography>
                  )}
                </Stack>
              </>
            ) : null}
            <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
          </Box>
        ))}
      </Stack>
      {shown < notices.length ? (
        <Box pt="9" maxW="500px" mx="auto" _mobile={{ pt: '6' }}>
          <Button
            fullWidth
            density="compact"
            variant="secondary"
            onClick={() => setShown((count) => count + 10)}
          >
            <HStack gap="1" justifyContent="center">
              <Typography web="cta2" mo="cta2" weight="semibold">
                더보기
              </Typography>
              <Typography web="body5" mo="body5" tone="tertiary">
                ({Math.ceil(shown / 10)}/{Math.ceil(notices.length / 10)})
              </Typography>
            </HStack>
          </Button>
        </Box>
      ) : null}
    </CustomerCenterLayout>
  );
}
