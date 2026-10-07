import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-system/css';
import { Grid, HStack, Stack } from 'styled-system/jsx';
import { Icon } from './Icon';
import {
  faCakeCandles,
  faCheck,
  faChevronRight,
  faComment,
  faEye,
  faEyeSlash,
  faGift,
  faHeartRegular,
  faHeartSolid,
  faIdCard,
  faMedal,
  faMobileScreenButton,
  faShieldHalved,
  faStarRegular,
  faStarSolid,
  faUser,
} from '@/shared/icons/fontAwesome';

const catalogGrid = css({
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '3',
  w: 'full',
});

const catalogItem = css({
  gridTemplateColumns: '24px minmax(0, 1fr)',
  alignItems: 'center',
  gap: '2',
  minH: '12',
  p: '2',
  borderWidth: '1px',
  borderColor: 'border.default',
  borderRadius: 'sm',
  color: 'icon.default',
});

const catalogLabel = css({
  overflow: 'hidden',
  color: 'text.secondary',
  fontSize: 'xs',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const svgIconGroups = [
  {
    label: 'UI SVG',
    names: [
      'breadcrumb',
      'chevron-down-small',
      'chevron-right',
      'close',
      'filter',
      'filter-collapsed',
      'filter-expanded',
      'gift',
      'ipin-verification',
      'medal',
      'party-horn',
      'phone-verification',
      'radio-checked',
      'radio-unchecked',
      'tag-delete',
    ],
  },
  {
    label: 'Form SVG',
    names: [
      'form/checkbox-checked',
      'form/checkbox-disabled',
      'form/checkbox-disabled-checked',
      'form/checkbox-unchecked',
      'form/sort-down',
    ],
  },
  {
    label: 'Notification SVG',
    names: ['notification/notification-bag', 'notification/notification-basket'],
  },
  {
    label: 'Navigation SVG',
    names: ['navigation/chevron-right'],
  },
  {
    label: 'Rating SVG',
    names: ['rating/rating-star-half'],
  },
  {
    label: 'Social SVG',
    names: [
      'social/facebook',
      'social/instagram',
      'social/level-access',
      'social/pinterest',
      'social/strava',
      'social/tiktok',
      'social/truefit',
      'social/x',
      'social/youtube',
    ],
  },
  {
    label: 'Brand feature SVG',
    names: [
      'brand/all-terrain',
      'brand/breathable',
      'brand/carbon-fiber-plate',
      'brand/circularity',
      'brand/cold-weather-rated',
      'brand/downfill',
      'brand/ethically-sourced',
      'brand/insulated-fill',
      'brand/natural-materials',
      'brand/odor-resistant',
      'brand/organic',
      'brand/pfc-free',
      'brand/pockets',
      'brand/propulsive-plate',
      'brand/recycled-materials',
      'brand/resoleable',
      'brand/slip-resistant',
      'brand/snow',
      'brand/sun-protection',
      'brand/suspension-plate',
      'brand/track',
      'brand/trail-traction',
      'brand/vegan',
      'brand/warming',
      'brand/water-resistant',
      'brand/waterproof',
      'brand/wickable',
      'brand/wind-proof',
      'brand/wind-resistant',
    ],
  },
] as const;

const fontAwesomeIcons = [
  ['cake-candles', faCakeCandles],
  ['check', faCheck],
  ['chevron-right', faChevronRight],
  ['comment', faComment],
  ['eye', faEye],
  ['eye-slash', faEyeSlash],
  ['gift', faGift],
  ['heart-regular', faHeartRegular],
  ['heart-solid', faHeartSolid],
  ['id-card', faIdCard],
  ['medal', faMedal],
  ['mobile-screen-button', faMobileScreenButton],
  ['shield-halved', faShieldHalved],
  ['star-regular', faStarRegular],
  ['star-solid', faStarSolid],
  ['user', faUser],
] as const;

function SvgIconGroup({ label, names }: { label: string; names: readonly string[] }) {
  return (
    <Stack gap="2">
      <strong>{label}</strong>
      <Grid className={catalogGrid}>
        {names.map((name) => (
          <Grid className={catalogItem} key={name}>
            <Icon aria-hidden="true" name={name} size="24px" />
            <span className={catalogLabel}>{name}</span>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CarouselArrows: Story = {
  args: { name: 'carousel-arrow' },
  render: () => (
    <HStack gap="2.5">
      <Icon name="carousel-arrow" size="48px" />
      <Icon
        name="carousel-arrow"
        direction="next"
        size="48px"
        style={
          {
            '--icon-carousel-circle-color': '#000',
            '--icon-carousel-path-color': '#F7F7F9',
          } as CSSProperties
        }
      />
    </HStack>
  ),
};

export const FontAwesome: Story = {
  args: { fontAwesomeIcon: faGift, size: '24px' },
  render: () => (
    <Stack gap="2">
      <strong>Font Awesome Free</strong>
      <Grid className={catalogGrid}>
        {fontAwesomeIcons.map(([name, icon]) => (
          <Grid className={catalogItem} key={name}>
            <Icon aria-hidden="true" fontAwesomeIcon={icon} size="24px" />
            <span className={catalogLabel}>{name}</span>
          </Grid>
        ))}
      </Grid>
    </Stack>
  ),
};

/** Every SVG currently addressable with the `Icon` component. */
export const AllAvailableIcons: Story = {
  args: { name: 'carousel-arrow', size: '24px' },
  render: () => (
    <Stack gap="8">
      <SvgIconGroup label="Built-in SVG" names={['carousel-arrow']} />
      {svgIconGroups.map((group) => (
        <SvgIconGroup key={group.label} {...group} />
      ))}
    </Stack>
  ),
};
