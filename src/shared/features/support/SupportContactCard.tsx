import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = {
  title: string;
  description: string;
  phone: string;
  phoneHref: string;
};

const phoneLink = css({ _mobile: { textDecoration: 'underline', textUnderlineOffset: '2px' } });

export function SupportContactCard({ title, description, phone, phoneHref }: Props) {
  return (
    <Stack
      bg="black.10"
      minH="193px"
      p="8"
      gap="6"
      _mobile={{ minH: '0', px: '4', pt: '5', pb: '6', gap: '5' }}
    >
      <Typography as="h2" web="heading8" mo="heading9">
        {title}
      </Typography>
      <Stack gap="4" _mobile={{ gap: '3' }}>
        <Typography as="p" web="body3" mo="body4">
          {description}
        </Typography>
        <HStack gap="1">
          <Typography web="body1" mo="body4">
            TEL.
          </Typography>
          <Link className={phoneLink} href={phoneHref}>
            <Typography web="body1" mo="cta2">
              {phone}
            </Typography>
          </Link>
        </HStack>
      </Stack>
    </Stack>
  );
}
