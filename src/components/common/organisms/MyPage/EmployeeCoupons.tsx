import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { HStack } from 'styled-system/jsx';
import { faCircleCheck } from '@/icons/fontAwesome';

const employeeCouponTypes = ['50% 쿠폰 발급', '30% 쿠폰 발급'] as const;

export function EmployeeCoupons() {
  return (
    <ContentSection
      as="section"
      gap="4"
      aria-label="임직원 쿠폰"
      title="임직원 쿠폰"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading5' } }}
    >
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
    </ContentSection>
  );
}
