import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
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
    <ContentSection
      bg="black.10"
      minH="193px"
      p="8"
      gap="6"
      _mobile={{ minH: '0', px: '4', pt: '5', pb: '6', gap: '5' }}
      title={<>{title}</>}
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading7' } }}
    >
      <Stack gap="4" _mobile={{ gap: '3' }}>
        <Typography as="p" web="body3" mo="body4">
          {description}
        </Typography>
        <HStack gap="2" h="18px">
          <Icon name="phone-call" size="18px" color="black.100" />
          <Link className={phoneLink} href={phoneHref}>
            <Typography web="body2" mo="cta2">
              {phone}
            </Typography>
          </Link>
        </HStack>
      </Stack>
    </ContentSection>
  );
}
