import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

const benefit = css({
  border: '1px solid var(--color-black-20)',
  borderRadius: '8px',
  color: 'var(--color-text-primary)',
  textAlign: 'center',
  '& svg': { w: '20px', h: '20px' },
});

const mobileBreak = css({ display: 'none', _mobile: { display: 'inline' } });

type Props = {
  iconName: string;
  title: string;
  description: string;
};

export function SignupBenefit({ iconName, title, description }: Props) {
  return (
    <Grid
      alignContent="center"
      justifyItems="center"
      gap="3"
      minH="108px"
      py="3"
      px="1"
      className={benefit}
    >
      <Icon name={iconName} size="18px" />
      <Typography as="span" variant="body4">
        {title} <br className={mobileBreak} />
        {description}
      </Typography>
    </Grid>
  );
}
