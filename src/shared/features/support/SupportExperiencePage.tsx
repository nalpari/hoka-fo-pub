'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Disclosure } from '@/shared/components/molecules/Disclosure/Disclosure';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { Box, Flex, Grid } from 'styled-system/jsx';

export type SupportExperienceKind = 'member-benefits' | 'mileage';

const activeTab = css({
  borderBottomColor: 'var(--color-black-100) !important',
  fontWeight: 'var(--font-weights-extrabold)',
});

const tooltip = css({
  mt: '2',
  p: '3.5',
  borderRadius: 'full',
  bg: 'var(--color-black-100)',
});

function SupportFrame({ activePath, children }: { activePath: string; children: React.ReactNode }) {
  return (
    <SidebarNavigationLayout
      activePath={activePath}
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <Box as="section" maxW="760px" css={{ '& h2': { fontSize: '20' } }}>
        {children}
      </Box>
    </SidebarNavigationLayout>
  );
}

function SupportNotice({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Disclosure title="유의 사항" open={open} onOpenChange={setOpen}>
      {children}
    </Disclosure>
  );
}

function PolicyPage({ kind }: { kind: 'member-benefits' | 'mileage' }) {
  const [active, setActive] = useState(kind === 'mileage' ? '마일리지 적립/사용' : '공통 혜택');
  const [tip, setTip] = useState<string | null>(null);
  const mileageTabs = ['마일리지 적립/사용', '온라인 통합 마일리지', '마일리지 소멸', '기타 안내'];
  const tiers = [
    ['VIP', '구매금액 100만원 이상 & 5회 이상 구매', '분기별 15% 할인 쿠폰 4장'],
    ['MANIA', '구매금액 30만원 이상 & 2회 이상 구매', '분기별 10% 할인 쿠폰 4장'],
    ['FAMILY', '회원가입 시 기본 설정 등급', '분기별 5% 할인 쿠폰 4장'],
  ];
  return (
    <SupportFrame activePath={kind === 'mileage' ? '/support/mileage' : '/support/member-benefits'}>
      <PageHeader title={kind === 'mileage' ? '통합 마일리지 안내' : '온라인 회원 등급 안내'} />
      {kind === 'mileage' ? (
        <>
          <Flex
            as="nav"
            overflowX="auto"
            borderBottom="1px solid var(--color-border-subtle)"
            css={{
              '& button': {
                flex: '0 0 auto',
                minH: '11',
                border: '0',
                borderBottom: '2px solid transparent',
                bg: 'transparent',
                px: '3.5',
              },
            }}
          >
            {mileageTabs.map((item) => (
              <Button
                key={item}
                className={active === item ? activeTab : ''}
                onClick={() => setActive(item)}
              >
                {item}
              </Button>
            ))}
          </Flex>
          <Box as="article" py="7" minH="280px" lineHeight="var(--line-heights-body)">
            <Typography as="h2">{active}</Typography>
            <Typography as="p">
              온라인과 오프라인에서 적립 및 사용할 수 있는 통합 마일리지 정책을 안내합니다. 정책별
              적용 기준과 소멸 조건은 주문 시점에 따라 달라질 수 있습니다.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography as="h2" className={css({ mt: '30px' })}>
            공통 혜택
          </Typography>
          <Grid
            gridTemplateColumns="repeat(2, 1fr)"
            gap="3"
            mt="3.5"
            css={{ '.platform-mobile &': { gridTemplateColumns: '1fr' } }}
          >
            {[
              '신규 가입 5천원 할인쿠폰',
              '첫 구매 감사 1만원 할인쿠폰',
              '기념일 축하 1만원 할인쿠폰',
              'MY HOKA 이벤트쿠폰',
            ].map((item) => (
              <Button
                key={item}
                className={css({
                  minH: '110px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: '18px',
                  textAlign: 'left',
                })}
                onClick={() => setTip(tip === item ? null : item)}
              >
                <b>{item}</b>
                <small>자세히 보기 ⓘ</small>
                {tip === item ? (
                  <Typography variant="body5" tone="inverse" className={tooltip}>
                    쿠폰은 발급 후 한 달 동안 사용할 수 있으며, 적용 조건은 쿠폰 상세에서 확인할 수
                    있습니다.
                  </Typography>
                ) : null}
              </Button>
            ))}
          </Grid>
          <Typography as="h2" className={css({ mt: '38px' })}>
            온라인 회원등급 및 혜택 안내
          </Typography>
          {tiers.map(([tier, criteria, benefit]) => (
            <Grid
              as="article"
              gridTemplateColumns="92px 1fr"
              gap="4"
              p="5"
              mt="4"
              borderRadius="full"
              bg="var(--color-black-10)"
              css={{
                '& p': {
                  m: '0',
                  color: 'var(--color-text-subtle)',
                },
              }}
              key={tier}
            >
              <Typography
                as="b"
                variant="heading9"
                className={css({
                  display: 'grid',
                  placeItems: 'center',
                  minH: '18',
                  bg: 'var(--color-white-000)',
                })}
              >
                {tier}
              </Typography>
              <div>
                <Typography as="h3" className={css({ mb: '1.5' })}>
                  {criteria}
                </Typography>
                <Typography as="p" variant="body4">
                  {benefit}
                  <br />
                  온라인과 오프라인 혜택은 중복 적용되지 않을 수 있습니다.
                </Typography>
              </div>
            </Grid>
          ))}
        </>
      )}
      <SupportNotice>
        <Typography as="p">
          등급은 최근 구매 실적을 기준으로 산정되며, 쿠폰·마일리지 정책은 운영 상황에 따라 변경될 수
          있습니다.
        </Typography>
      </SupportNotice>
    </SupportFrame>
  );
}

export function SupportExperiencePage({ kind }: { kind: SupportExperienceKind }) {
  return <PolicyPage kind={kind} />;
}
