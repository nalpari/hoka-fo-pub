import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '@/shared/components/atoms/Button/Button';
import { OrderActionBar } from '@/shared/components/molecules/OrderActionBar/OrderActionBar';
import { PlatformProvider } from '@/shared/context/platform';

const onSubmit = fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());

const meta = {
  title: 'Molecules/OrderActionBar',
  component: OrderActionBar,
  parameters: { layout: 'fullscreen' },
  args: {
    children: (
      <Button variant="primary" fullWidth>
        주문하기
      </Button>
    ),
  },
  decorators: [
    (Story, context) => {
      const platform = context.parameters.platform === 'mobile' ? 'mobile' : 'web';
      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta<typeof OrderActionBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Web: Story = {};

export const Mobile: Story = {
  parameters: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const Disabled: Story = {
  args: {
    children: (
      <Button variant="primary" fullWidth disabled>
        주문하기
      </Button>
    ),
  },
};

export const Submit: Story = {
  render: () => (
    <form onSubmit={onSubmit}>
      <OrderActionBar>
        <Button type="submit" variant="primary" fullWidth>
          결제하기
        </Button>
      </OrderActionBar>
    </form>
  ),
  play: async ({ canvasElement }) => {
    onSubmit.mockClear();
    await userEvent.click(within(canvasElement).getByRole('button', { name: '결제하기' }));
    await expect(onSubmit).toHaveBeenCalledTimes(1);
  },
};
