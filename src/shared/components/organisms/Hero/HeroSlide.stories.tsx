import type { Meta, StoryObj } from '@storybook/react';
import { HeroSlide } from './HeroSlide';

const meta = {
  title: 'Organisms/Hero/HeroSlide',
  component: HeroSlide,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: 500 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    desktopImage: '/images/temp/MainBannerWeb.png',
    mobileImage: '/images/temp/MainBannerMobile.png',
  },
} satisfies Meta<typeof HeroSlide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: 'hokaMobile', isRotated: false } } };
