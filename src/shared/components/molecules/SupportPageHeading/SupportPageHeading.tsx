import { Divider, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function SupportPageHeading({ title }: { title: string }) {
  return (
    <Stack gap="6">
      <Typography as="h2" web="heading6" mo="heading5">
        {title}
      </Typography>
      <Divider
        aria-hidden="true"
        orientation="horizontal"
        h="2px"
        bg="black.100"
        display={{ base: 'block', _mobile: 'none' }}
      />
    </Stack>
  );
}
