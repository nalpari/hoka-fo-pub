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
    slides: [
      {
        content: {
          title: 'TECTON X 4',
          description: '새롭게 선보이는 초고속 ProFly X 기술로 당신의 최고 기록에 도전하세요.',
        },
        desktopImage: '/images/temp/MainBannerWeb.png',
        mobileImage: '/images/temp/MainBannerMobile.png',
        actions: [
          { label: '남성 바로가기', to: '/products' },
          { label: '여성 바로가기', to: '/products' },
        ],
      },
    ],
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: 'hokaMobile', isRotated: false } } };
export const BackgroundCarousel: Story = {
  args: {
    slides: [
      {
        content: { title: 'TECTON X 4', description: '당신의 최고 기록에 도전하세요.' },
        desktopImage: '/images/temp/MainBannerWeb.png',
        mobileImage: '/images/temp/MainBannerMobile.png',
        actions: [{ label: '상품 보러가기', to: '/products' }],
      },
      {
        content: { title: 'TRAIL READY', description: '다음 모험을 향해 달려보세요.' },
        desktopImage: '/images/temp/home-hero-trail-desktop.png',
        mobileImage: '/images/temp/home-hero-trail-mobile.png',
        actions: [{ label: '트레일 러닝 보러가기', to: '/products' }],
      },
    ],
  },
};
