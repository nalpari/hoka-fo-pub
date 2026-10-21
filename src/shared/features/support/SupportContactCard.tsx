import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = {
  headingId: string;
  title: string;
  description: string;
  phone: string;
  phoneHref: string;
  operatingHoursTitle: string;
  operatingHours: string;
  lunchBreak: string;
};

const phoneLink = css({ _mobile: { textDecoration: 'underline', textUnderlineOffset: '2px' } });

export function SupportContactCard({
  headingId,
  title,
  description,
  phone,
  phoneHref,
  operatingHoursTitle,
  operatingHours,
  lunchBreak,
}: Props) {
  return (
    <Stack
      as="section"
      aria-labelledby={headingId}
      bg="black.10"
      direction={{ base: 'row', _mobile: 'column' }}
      alignItems="flex-start"
      justifyContent="space-between"
      gap={{ base: '40', _mobile: '12' }}
      px="8"
      py="10"
      _mobile={{ px: '4', pt: '6', pb: '8' }}
    >
      <Stack gap="3" w={{ base: '280px', _mobile: 'full' }} flexShrink="0">
        <Typography as="h2" id={headingId} web="heading8" mo="heading5">
          {title}
        </Typography>
        <Typography as="p" web="body4" mo="body4" tone="subtle">
          {description}
        </Typography>
      </Stack>

      <Stack gap="13" flex="1" minW="0">
        <Stack gap="3">
          <Typography web="body3" mo="body3" weight="medium">
            호카/호카 키즈
          </Typography>
          <HStack gap="1" alignItems="baseline">
            <Typography as="span" web="body3" mo="body3" weight="medium">
              TEL.
            </Typography>
            <Link className={phoneLink} href={phoneHref}>
              <Typography as="span" web="body2" mo="body3" weight="medium">
                {phone}
              </Typography>
            </Link>
          </HStack>
        </Stack>

        <Stack gap="3">
          <Typography web="body3" mo="body3" weight="medium">
            {operatingHoursTitle}
          </Typography>
          <Stack gap="2">
            <HStack gap="1" alignItems="baseline" flexWrap="wrap">
              <Typography as="span" web="body2" mo="body3" weight="medium">
                {operatingHours}
              </Typography>
              <Typography as="span" web="body3" mo="body4">
                ({lunchBreak})
              </Typography>
            </HStack>
            <Typography as="p" web="body4" mo="body5" tone="tertiary">
              * 토,일,공휴일 휴무
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
