import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  args: { children: 'HOKA Typography', variant: 'heading' },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Heading: Story = { args: { as: 'h2', variant: 'heading' } };

export const InverseBody: Story = {
  args: { children: 'Inverse body text', tone: 'inverse', variant: 'body' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};
