import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { Swiper as SwiperInstance } from 'swiper';
import { PlatformProvider } from '@/context/platform';

import { css } from 'styled-system/css';

import { HomeCarouselSection } from '@/components/common/molecules/HomeCarouselSection/HomeCarouselSection';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { products } from '@/mocks/products';

const meta = {
  title: 'Molecules/HomeCarouselSection',
  component: HomeCarouselSection,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Extended product rail',
    platform: 'web',
    itemCount: 12,
    desktopCenteredItemCount: 5,
    desktopItemGutter: 8,
    mobileItemGutter: 5,
    children: products
      .slice(0, 12)
      .map((product) => <ProductCard key={product.id} product={product} variant="showcase" />),
  },
  decorators: [
    (Story, { args }) => (
      <PlatformProvider platform={args.platform}>
        <div className={`platform-${args.platform}`}>
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
} satisfies Meta<typeof HomeCarouselSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { globals: { viewport: 'hoka1920' } };

export const FourCards: Story = {
  args: { desktopCenteredItemCount: 4, desktopItemGutter: 5 },
};

export const Wide: Story = { globals: { viewport: 'hoka2560' } };

export const UltraWide: Story = { globals: { viewport: 'hoka3840' } };

export const EndAlignedToGrid: Story = {
  globals: { viewport: 'hoka2560' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', { name: args.title });
    const frame = heading.parentElement!;
    const viewport = canvasElement.querySelector<HTMLElement>('.swiper') as HTMLElement & {
      swiper: SwiperInstance;
    };
    const cards = canvasElement.querySelectorAll<HTMLElement>('.swiper-slide > *');
    const next = canvas.getByRole('button', { name: '다음 항목' });
    const previous = canvas.getByRole('button', { name: '이전 항목' });

    await waitFor(() => expect(viewport.swiper).toBeDefined());
    expect(
      Math.abs(cards[0].getBoundingClientRect().left - frame.getBoundingClientRect().left),
    ).toBeLessThan(1);

    const visibleCount = Number(
      getComputedStyle(viewport.parentElement!).getPropertyValue('--carousel-visible-count'),
    );
    const steps = args.itemCount - visibleCount;

    for (let index = 0; index < steps; index++) {
      expect(next).toBeEnabled();
      await userEvent.click(next);
      await waitFor(() => expect(viewport.swiper.animating).toBe(false));
    }

    await waitFor(() => expect(next).toBeDisabled());
    expect(
      Math.abs(
        cards[cards.length - 1].getBoundingClientRect().right - frame.getBoundingClientRect().right,
      ),
    ).toBeLessThan(1);

    for (let index = 0; index < steps; index++) {
      expect(previous).toBeEnabled();
      await userEvent.click(previous);
      await waitFor(() => expect(viewport.swiper.animating).toBe(false));
    }

    await waitFor(() => expect(previous).toBeDisabled());
    expect(
      Math.abs(cards[0].getBoundingClientRect().left - frame.getBoundingClientRect().left),
    ).toBeLessThan(1);
  },
};

export const SingleCard: Story = {
  args: { itemCount: 1, children: <ProductCard product={products[0]} variant="showcase" /> },
};

export const Empty: Story = { args: { itemCount: 0, children: null } };

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  args: {
    platform: 'mobile',
    slideClassName: css({ w: '170px!', '& > *': { w: '100%' } }),
  },
  globals: { viewport: 'hoka375' },
};
