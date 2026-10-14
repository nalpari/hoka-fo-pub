import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { PromotionCard } from '@/shared/components/molecules/PromotionCard/PromotionCard';

const meta = {
  title: 'Molecules/Promotion Card',
  component: PromotionCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: 320 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PromotionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  args: { variant: 'inline' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 160 }}>
        <Story />
      </div>
    ),
  ],
};

export const FullWidth: Story = {
  args: { variant: 'fullWidth' },
};
