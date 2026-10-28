import { type Meta, type StoryObj } from '@storybook/react';
import { MegaMenuAD } from '@/context/ShopShell';
import { megaMenus } from '@/components/common/organisms/Layout/SiteHeader/megaMenu';

const meta = {
  title: 'Organisms/Layout/SiteHeader/MegaMenuAD',
  component: MegaMenuAD,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <div style={{ maxWidth: 358 }}>
          <Story />
        </div>
      </>
    ),
  ],
  args: megaMenus[2].promo,
} satisfies Meta<typeof MegaMenuAD>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  args: { presentation: 'mobile' },
  globals: { viewport: 'hoka375' },
};
