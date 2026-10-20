import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { HStack, Stack } from 'styled-system/jsx';
import { faCircleCheck } from '@/shared/icons/fontAwesome';

const employeeCouponTypes = ['50% 쿠폰 발급', '30% 쿠폰 발급'] as const;

export function EmployeeCoupons() {
  return (
    <Stack as="section" gap="4" aria-label="임직원 쿠폰">
      <Typography as="h2" web="heading8" mo="heading5">
        임직원 쿠폰
      </Typography>
      <HStack gap="2">
        {employeeCouponTypes.map((label) => (
          <HStack key={label} flex="1" minW="0" justifyContent="space-between" p="4" bg="black.10">
            <Typography variant="body3" weight="medium">
              {label}
            </Typography>
            <Icon fontAwesomeIcon={faCircleCheck} size="18px" />
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
}
