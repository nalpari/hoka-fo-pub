import { Box, HStack, Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';

function ContactCard({ offline = false }: { offline?: boolean }) {
  return (
    <Stack bg="black.10" px="4" py="6" gap={offline ? '5' : '6'}>
      <Stack gap="4">
        <Typography as="h4" web="heading9" mo="heading9" weight="semibold">
          {offline ? 'HOKA OOOOO 직영점' : 'HOKA/HOKA 키즈 고객센터'}
        </Typography>
        <Stack gap="2">
          <HStack gap="1">
            <Typography web="body4" mo="body4">
              TEL.
            </Typography>
            <Typography web="body4" mo="body4">
              080-665-5552
            </Typography>
          </HStack>
          {!offline && (
            <>
              <Typography web="body5" mo="body5" tone="tertiary">
                *아래 1:1문의를 이용하시면 조금 더 빠르게 답변 받으실수 있습니다.
              </Typography>
              <Box>
                <ButtonLink href="/support/inquiries/new" variant="link" size="sm">
                  1:1 문의하기 &gt;
                </ButtonLink>
              </Box>
            </>
          )}
        </Stack>
      </Stack>
      <Stack gap="3">
        <Typography as="h4" web="heading9" mo="heading9" weight="semibold">
          운영시간
        </Typography>
        <Stack gap="2">
          <HStack gap="2">
            <Typography web="body4" mo="body4">
              {offline ? '연중무휴' : '평일'}
            </Typography>
            <Typography web="body4" mo="body4">
              {offline ? '11:00 ~ 22:00' : '09:00 ~ 18:00'}
            </Typography>
          </HStack>
          {!offline && (
            <Typography web="body5" mo="body5" tone="tertiary">
              *점심시간은 12:00~13:00이며 토,일, 공휴일은 휴무입니다.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export function TeamwearPage() {
  return (
    <CustomerCenterLayout
      title="팀/ 단체복 주문 안내"
      mobileTitleVariant="heading5"
      showHeadingDivider
      activePath="/support/teamwear"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '팀/ 단체복 주문 안내' },
      ]}
      groups={supportNavigation}
    >
      <Stack gap="6" pb={{ base: '16', _mobile: '6' }}>
        <Stack gap="6">
          <Stack gap="4">
            <Typography as="h3" web="heading8" mo="heading6">
              ONLINE STORE
            </Typography>
            <ContactCard />
          </Stack>
          <Stack gap="4">
            <Typography as="h3" web="heading8" mo="heading6">
              OFFLINE STORE
            </Typography>
            <ContactCard offline />
          </Stack>
          <Box as="ul" pl="4" listStyleType="none">
            <Typography as="li" web="body5" mo="body5" tone="tertiary">
              ・ &nbsp;팀/단체복 주문 시 B2B, Team 제품 공급은 고객의 주문에 따라 납품가, 납기일이
              변동 될 수 있으니 담당자와 상담 후 주문 바랍니다.
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </CustomerCenterLayout>
  );
}
