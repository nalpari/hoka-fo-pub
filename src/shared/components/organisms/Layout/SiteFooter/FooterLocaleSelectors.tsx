import { Dropdown } from '@/shared/components/atoms/Dropdown/Dropdown';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

export function FooterLocaleSelectors() {
  return (
    <Grid gap="2" w="100%">
      <Dropdown
        ariaLabel="국가 또는 지역"
        defaultValue="us"
        indicatorWidth="12px"
        indicatorHeight="18px"
        options={[
          {
            value: 'us',
            label: 'United States',
            prefix: <img className={flag} src="/images/flag/us.svg" alt="" />,
          },
        ]}
      />
      <Dropdown
        ariaLabel="언어"
        defaultValue="en"
        disabled
        indicatorWidth="12px"
        indicatorHeight="18px"
        options={[{ value: 'en', label: 'English' }]}
      />
    </Grid>
  );
}
const flag = css({ w: '3', h: '18px', objectFit: 'cover' });
