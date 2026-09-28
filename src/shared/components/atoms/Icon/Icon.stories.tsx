import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HStack } from 'styled-system/jsx';
import { Icon } from './Icon';

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
    <HStack gap="10px">
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
