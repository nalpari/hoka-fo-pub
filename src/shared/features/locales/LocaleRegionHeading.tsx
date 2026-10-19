import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = { id: string; name: string };

const heading = css({
  mb: '5',
  _mobile: { mb: '18px' },
});

export function LocaleRegionHeading({ id, name }: Props) {
  return (
    <Typography as="h2" variant="heading8" className={heading} id={id}>
      {name}
    </Typography>
  );
}
