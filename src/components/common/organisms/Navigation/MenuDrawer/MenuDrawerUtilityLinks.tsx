import Link from 'next/link';
import { Box, Flex, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { faBox, faComments, faLocationDot, faUserSolid } from '@/icons/fontAwesome';

const utilityItems = [
  { label: '마이페이지', to: '/mypage', icon: faUserSolid },
  { label: 'HOKA 멤버십', to: '/support/member-benefits', icon: null },
  { label: '주문/배송 조회', to: '/mypage/orders', icon: faBox },
  { label: '매장 찾기', to: '/support/store', icon: faLocationDot },
  { label: '고객센터', to: '/support', icon: faComments },
] as const;

export function MenuDrawerUtilityLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Box
      as="nav"
      aria-label="고객 지원 메뉴"
      flexShrink="0"
      px="4"
      pt="8"
      pb="calc(32px + env(safe-area-inset-bottom))"
      bg="var(--color-black-100)"
      color="var(--color-text-inverse)"
    >
      <Stack as="ul" gap="1" listStyleType="none" p="0" m="0">
        {utilityItems.map((item) => (
          <li key={item.to}>
            <Link
              href={item.to}
              onClick={onNavigate}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                minH: '9',
                color: 'inherit',
                textDecoration: 'none',
              })}
            >
              <Flex
                as="span"
                w="24px"
                h="24px"
                flexShrink="0"
                alignItems="center"
                justifyContent="flex-start"
              >
                {item.icon ? (
                  <Icon fontAwesomeIcon={item.icon} size="16px" aria-hidden="true" />
                ) : (
                  <Icon name="navigation/membership" size="16px" alt="" />
                )}
              </Flex>
              <Typography variant="heading9">{item.label}</Typography>
            </Link>
          </li>
        ))}
      </Stack>
    </Box>
  );
}
