import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type MyPageBenefitItemProps = {
  href: string;
  label: string;
  count: number;
  unit: string;
};

const benefitLink = css({
  minW: '0',
  bg: 'black.10',
  p: '5',
  color: 'inherit',
  textDecoration: 'none',
});

export function MyPageBenefitItem({ href, label, count, unit }: MyPageBenefitItemProps) {
  return (
    <Link className={benefitLink} href={href}>
      <Stack h="14" justifyContent="space-between">
        <Typography variant="body4">{label}</Typography>
        <HStack gap="0.5" justifyContent="flex-end" alignItems="baseline">
          <Typography web="heading8" mo="heading5">
            {count}
          </Typography>
          <Typography variant="body3">{unit}</Typography>
        </HStack>
      </Stack>
    </Link>
  );
}
