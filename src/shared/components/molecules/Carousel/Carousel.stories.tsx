import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-system/css';
import { Carousel, CarouselControls, CarouselPagination, CarouselViewport } from './Carousel';

const bestSellerMobileRail = css({
  w: '375px',
  overflow: 'visible!',
  '& .swiper-wrapper': { px: '11px' },
});

const meta = {
  title: 'Molecules/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  args: {
    itemCount: 5,
    children: Array.from({ length: 5 }, (_, index) => (
      <article
        key={index}
        style={{ width: 240, height: 180, padding: 24, background: '#f4f4f4', fontSize: 24 }}
      >
        Slide {index + 1}
      </article>
    )),
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      <CarouselViewport>{args.children}</CarouselViewport>
      <CarouselPagination />
    </Carousel>
  ),
};

export const WithControls: Story = {
  render: (args) => (
    <Carousel {...args}>
      <CarouselControls />
      <CarouselViewport>{args.children}</CarouselViewport>
      <CarouselPagination />
    </Carousel>
  ),
};

export const CenteredFourOnDesktop: Story = {
  args: {
    itemCount: 7,
    children: Array.from({ length: 7 }, (_, index) => (
      <article
        key={index}
        style={{ width: 240, height: 180, padding: 24, background: '#f4f4f4', fontSize: 24 }}
      >
        Slide {index + 1}
      </article>
    )),
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselControls />
      <CarouselViewport desktopCenteredItemCount={4}>{args.children}</CarouselViewport>
    </Carousel>
  ),
};

export const MobilePeek: Story = {
  args: {
    itemCount: 5,
    children: Array.from({ length: 5 }, (_, index) => (
      <article
        key={index}
        style={{ width: '312px', height: 180, padding: 24, background: '#f4f4f4', fontSize: 24 }}
      >
        Slide {index + 1}
      </article>
    )),
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselViewport mobileItemGutter={8} mode="mobile">
        {args.children}
      </CarouselViewport>
      <CarouselPagination />
    </Carousel>
  ),
};

export const BestSellerMobilePeek: Story = {
  args: {
    itemCount: 6,
    children: Array.from({ length: 6 }, (_, index) => (
      <article
        key={index}
        style={{ width: '160px', height: 160, padding: 16, background: '#f4f4f4', fontSize: 20 }}
      >
        Product {index + 1}
      </article>
    )),
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselViewport
        className={bestSellerMobileRail}
        mobileItemGutter={5}
        mode="mobile"
        slideClassName={css({ w: '170px!' })}
      >
        {args.children}
      </CarouselViewport>
    </Carousel>
  ),
};
