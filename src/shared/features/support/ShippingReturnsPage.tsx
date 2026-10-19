'use client';

import { Tabs } from '@base-ui/react/tabs';
import { css } from 'styled-system/css';
import { Box, Divider, HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';

const shippingItems = [
  <>
    현재 HOKA는 고객님들의 편의를 위해 전상품을 무료로 배송해드리고 있습니다.
    <br />
    (단, 반품 시 최초 구매건에 대한 배송비 포함하여 반품 배송비 차감)
  </>,
  '배송은 본사 물류센터(HOKA 지정업체) 또는 매장에서 발송(HOKA 지정업체) 됩니다.',
  '배송은 본사 물류센터(HOKA 지정업체) 또는 매장에서 발송(HOKA 지정업체) 됩니다.',
  '“마이페이지 > 구매내역 > 주문/배송 조회” 에서 구매하신 상품의 배송 상태를 확인하실 수 있습니다.',
] as const;

const sections = [
  { value: 'shipping', title: '배송 안내' },
  { value: 'return-cautions', title: '반품 주의사항' },
  { value: 'product-returns', title: '상품 반품 안내' },
] as const;

const tabList = css({
  display: 'flex',
  w: '100%',
  borderBottom: '1px solid token(colors.black.40)',
});

const tab = css({
  flex: '1',
  minW: '0',
  minH: '32px',
  p: '0',
  border: '0',
  borderBottom: '2px solid transparent',
  bg: 'transparent',
  cursor: 'pointer',
  '&:disabled': { cursor: 'default', opacity: '1' },
  '&[data-active]': { borderBottomColor: 'black.100' },
  _focusVisible: { outline: '2px solid token(colors.black.100)', outlineOffset: '2px' },
});

export function ShippingReturnsPage() {
  return (
    <CustomerCenterLayout
      activePath="/support/after-sales"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '배송 및 반품안내' },
      ]}
      groups={supportNavigation}
      hideIntroMobile
    >
      <Stack gap={{ base: '6', _mobile: '6' }}>
        <Stack gap="6">
          <Typography as="h2" web="heading6" mo="heading5">
            배송 및 반품안내
          </Typography>
          <Divider
            aria-hidden="true"
            orientation="horizontal"
            h="2px"
            bg="black.100"
            display={{ base: 'block', _mobile: 'none' }}
          />
        </Stack>
        <Tabs.Root defaultValue="shipping">
          <Tabs.List aria-label="배송 및 반품 안내 항목" className={tabList}>
            {sections.map((section) => (
              <Tabs.Tab
                className={tab}
                disabled={section.value !== 'shipping'}
                key={section.value}
                value={section.value}
              >
                <Typography variant="body3" weight="medium">
                  {section.title}
                </Typography>
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panel value="shipping">
            <Stack
              as="section"
              aria-label="배송 안내"
              gap="4"
              px={{ base: '4', _mobile: '2' }}
              pt={{ base: '3', _mobile: '4' }}
            >
              <Typography as="h3" variant="heading9" weight="semibold">
                배송 안내
              </Typography>
              <Stack as="ol" gap="4" listStyleType="none" p="0" m="0">
                {shippingItems.map((item, index) => (
                  <HStack as="li" key={index} alignItems="flex-start" gap="2">
                    <Box flexShrink="0">
                      <Typography variant="body4">{index + 1}.</Typography>
                    </Box>
                    <Typography variant="body4">{item}</Typography>
                  </HStack>
                ))}
              </Stack>
            </Stack>
          </Tabs.Panel>
        </Tabs.Root>
      </Stack>
    </CustomerCenterLayout>
  );
}
