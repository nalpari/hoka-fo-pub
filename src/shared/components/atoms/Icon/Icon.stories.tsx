import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HStack } from 'styled-system/jsx';
import { Icon } from './Icon';
import { faGift } from '@/shared/icons/fontAwesome';

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
};

export const RegisteredSvg: Story = {
  args: { name: 'partyHorn', size: '18px' },
  render: () => (
    <HStack gap="4">
      <Icon name="gift" size="18px" />
      <Icon name="partyHorn" size="18px" />
      <Icon name="medal" size="18px" />
    </HStack>
  ),
};
