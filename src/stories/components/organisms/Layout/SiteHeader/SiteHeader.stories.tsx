import type { Meta, StoryObj } from '@storybook/react';
import { SiteHeader } from '@/shared/components/organisms/Layout/SiteHeader/SiteHeader';
import { PlatformProvider } from '@/shared/context/platform';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { megaMenus } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';
import { headerPromotionItems } from '@/shared/components/organisms/Layout/SiteHeader/headerPromotionData';

const meta = {
  title: 'Organisms/Layout/SiteHeader',
  component: SiteHeader,
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Web: Story = {
  args: { cart: 2, onMenu: () => undefined },
  render: (args) => (
    <div className="platform-web">
      <PlatformProvider platform="web">
        <SiteHeader {...args} />
      </PlatformProvider>
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'hoka375' },
  args: { cart: 2, onMenu: () => undefined },
  render: (args) => (
    <div className="platform-mobile">
      <PlatformProvider platform="mobile">
        <SiteHeader {...args} />
      </PlatformProvider>
    </div>
  ),
};

export const PromotionNavigation: Story = {
  ...Web,
  play: async ({ canvasElement }) => {
    const banner = within(canvasElement).getByRole('complementary', { name: '홍보 배너' });
    const canvas = within(banner);

    if (headerPromotionItems.length < 2) {
      expect(canvas.queryByRole('button', { name: '다음 항목' })).not.toBeInTheDocument();
      expect(canvas.queryByRole('button', { name: '이전 항목' })).not.toBeInTheDocument();
      expect(banner.querySelector('.swiper')).toBeNull();
      if (headerPromotionItems.length === 1) {
        expect(canvas.getByText(headerPromotionItems[0].message)).toBeVisible();
      }
      return;
    }

    const expectSlide = async (index: number) => {
      await waitFor(
        () => {
          const slide = banner.querySelector('.swiper-slide-active');
          expect(slide).toHaveTextContent(headerPromotionItems[index].message);
          expect(getComputedStyle(slide!.firstElementChild!).flexDirection).toBe(
            headerPromotionItems[index].buttonType === 'memberBenefits' ? 'column' : 'row',
          );
          const viewport = banner.querySelector('.swiper')!;
          expect(viewport).toHaveClass('swiper-fade');
          expect(Number(getComputedStyle(slide!).opacity)).toBe(1);
          expect(
            (viewport as HTMLElement & { swiper: { animating: boolean } }).swiper.animating,
          ).toBe(false);
          expect(
            Math.abs(slide!.getBoundingClientRect().x - viewport.getBoundingClientRect().x),
          ).toBeLessThan(1);
        },
        { timeout: 5000 },
      );
    };

    await expectSlide(0);
    for (let step = 1; step <= headerPromotionItems.length; step += 1) {
      await userEvent.click(canvas.getByRole('button', { name: '다음 항목' }));
      await expectSlide(step % headerPromotionItems.length);
    }
    await userEvent.click(canvas.getByRole('button', { name: '이전 항목' }));
    await expectSlide(headerPromotionItems.length - 1);
  },
};

export const MenuComposition: Story = {
  ...Web,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: megaMenus[0].label });
    await userEvent.hover(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByRole('region', { name: `${megaMenus[0].label} 메뉴` })).toBeVisible();
    await userEvent.unhover(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    trigger.focus();
    await userEvent.tab();
    await expect(canvas.getByRole('link', { name: 'Best' })).toHaveFocus();
    await userEvent.tab({ shift: true });
    await expect(trigger).toHaveFocus();
  },
};
