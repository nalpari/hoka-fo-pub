import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Hero } from './Hero';

const meta = {
  title: 'Organisms/Hero',
  component: Hero,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  args: {
    content: {
      title: 'TECTON X 4',
      description: (
        <>
          새롭게 선보이는 초고속 ProFly X 기술로
          <br />
          당신의 최고 기록에 도전하세요.
        </>
      ),
    },
    desktop: {
      image: '/images/temp/MainBannerWeb.png',
    },
    mobile: {
      image: '/images/temp/MainBannerMobile.png',
    },
    actions: [
      { label: '남성 바로가기', to: '/products' },
      { label: '여성 바로가기', to: '/products' },
    ],
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: 'hokaMobile', isRotated: false } } };
export const BackgroundCarousel: Story = {
  args: {
    backgroundSlides: [
      {
        desktopImage: '/images/temp/MainBannerWeb.png',
        mobileImage: '/images/temp/MainBannerMobile.png',
      },
      {
        desktopImage: '/images/temp/MainBannerMobile.png',
        mobileImage: '/images/temp/MainBannerWeb.png',
      },
    ],
  },
};
