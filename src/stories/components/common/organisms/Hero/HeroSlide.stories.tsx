import type { Meta, StoryObj } from '@storybook/react';
import { HeroSlide } from '@/components/common/organisms/Hero/HeroSlide';

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

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  globals: { viewport: { value: 'hokaMobile', isRotated: false } },
};
