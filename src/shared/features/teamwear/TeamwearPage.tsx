import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Flex, Grid, Box } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';

const styles = {
  page: css({ minH: '800px', '--support-padding-bottom': '130px', _mobile: { minH: '0' } }),

  label: css({
    minH: '218px',
    _mobile: { minH: '100px' },
    '& h2': {
      m: '0 0 var(--spacing-2)',
      fontFamily: 'var(--font-family-base)',
      fontSize: '32' /* 기존 34px */,
      fontWeight: 'var(--font-weights-normal)',
      letterSpacing: 'var(--letter-spacings-korean)',
      _mobile: { fontSize: '28' },
    },
    '& p': { m: '0', color: 'var(--color-black-40)' },
  }),
  note: css({
    m: '0',
    py: '6',
    borderTop: '1px solid var(--color-black-20)',
    _mobile: { mt: '4' },
  }),
};

export function TeamwearPage() {
  return (
    <SidebarNavigationLayout
      activePath="/support/teamwear"
      className={styles.page}
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <Box as="section" css={{ '--support-content-title-gap': '37px' }}>
        <PageHeader title="팀/단체복 주문 안내" />
        <Flex
          as="section"
          pos="relative"
          alignItems="center"
          justifyContent="center"
          h="300px"
          overflow="hidden"
          bg="linear-gradient(var(--color-black-20) 0 50%, var(--color-black-50) 51% 72%, var(--color-black-40) 73%)"
          _mobile={{ h: '215px' }}
          css={{
            '&::after': {
              position: 'absolute',
              inset: '0',
              bg: 'linear-gradient(90deg, color-mix(in srgb, var(--color-black-100) 20%, transparent), transparent 52%, color-mix(in srgb, var(--color-black-100) 15%, transparent))',
              content: "''",
            },
          }}
        >
          <Box
            position="absolute"
            bottom="-44px"
            left="40"
            w="185px"
            h="300px"
            borderRadius="48% 48% 10% 10%"
            bg="linear-gradient(90deg, var(--color-black-40) 0 28%, var(--color-black-60) 29% 75%, var(--color-black-40) 76%)"
            transform="rotate(7deg)"
            _mobile={{ left: '45px', transform: 'scale(0.72)', transformOrigin: 'bottom' }}
          />
          <Box
            position="absolute"
            bottom="-44px"
            right="55px"
            w="170px"
            h="300px"
            borderRadius="48% 48% 10% 10%"
            bg="linear-gradient(90deg, var(--color-black-60), var(--color-black-100) 55%, var(--color-black-50))"
            transform="rotate(-8deg)"
            _mobile={{ right: '-20px', transform: 'scale(0.72)', transformOrigin: 'bottom' }}
          />
          <Box
            pos="relative"
            zIndex="1"
            color="var(--color-text-inverse)"
            textAlign="center"
            textShadow="0 1px 2px var(--color-black-60)"
            css={{
              '& h2': {
                m: '0',
                fontSize: '24',
                fontWeight: 'var(--font-weights-normal)',
                _mobile: { fontSize: '20' /* 기존 19px */ },
              },
            }}
          >
            <Typography as="h2">TEAM WEAR ORDER</Typography>
            <Typography
              as="p"
              variant="body5"
              className={css({
                _mobile: { px: '4.5' },
              })}
            >
              호카와 하나가 되는 순간, 호카 팀/단체복으로 엑설런트를 함께 느껴 보세요!
            </Typography>
          </Box>
        </Flex>
        <Grid
          as="section"
          gridTemplateColumns="1fr 1.1fr"
          gap="0 10"
          pt="62px"
          _mobile={{ gridTemplateColumns: '1fr', gap: '0', pt: '38px' }}
          css={{
            '& article': {
              minH: '218px',
              py: '7',
              borderTop: '2px solid var(--color-black-60)',
              _mobile: { minH: '155px', py: '22px' },
            },
            '& p': { m: '6px 0' },
            '& hr': { m: '6 0 4.5', border: '0', borderTop: '1px solid var(--color-black-20)' },
          }}
        >
          <Box className={styles.label}>
            <Typography as="h2">ONLINE STORE</Typography>
            <Typography as="p" variant="body5">
              온라인 스토어
            </Typography>
          </Box>
          <article>
            <Typography as="strong" variant="body5" weight="bold">
              호카 온라인 스토어 고객센터
              <br />
              TEL. 1566-0086
            </Typography>
            <Typography as="p" variant="body5">
              * 아래 1:1 문의를 이용하시면 조금 더 빠르게 답변 받으실 수 있습니다.
            </Typography>
            <hr />
            <Typography
              as="b"
              variant="body5"
              weight="bold"
              className={css({ display: 'block', mb: '2' })}
            >
              운영시간
            </Typography>
            <Typography as="small" variant="body5" tone="tertiary">
              평일 10:00 ~ 17:00 (점심시간 12:00 ~ 13:00) / 토,일,공휴일 휴무
            </Typography>
          </article>
          <Box className={styles.label}>
            <Typography as="h2">OFFLINE STORE</Typography>
            <Typography as="p" variant="body5">
              오프라인 스토어
            </Typography>
          </Box>
          <article>
            <Typography as="strong" variant="body5" weight="bold">
              호카 명동직영점
              <br />
              TEL. 02-318-1906
            </Typography>
            <hr />
            <Typography as="small" variant="body5" tone="tertiary">
              연중무휴 11:00 ~ 22:00
            </Typography>
          </article>
        </Grid>
        <Typography as="p" variant="body5" tone="tertiary" className={styles.note}>
          ▸ 팀/단체복 주문 시 B2B, Team 제품 공급은 고객의 주문에 따라 납품가 납기의 변동 될 수
          있으니 담당자와 상담 후 주문 바랍니다.
        </Typography>
      </Box>
    </SidebarNavigationLayout>
  );
}
