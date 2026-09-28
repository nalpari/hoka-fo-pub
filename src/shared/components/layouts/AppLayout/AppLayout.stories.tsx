import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { AppLayout } from '@/shared/components/layouts/AppLayout/AppLayout';

const meta = {
  title: 'Layouts/App Layout',
  component: AppLayout,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof AppLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { cart: 2, children: <main style={{ minHeight: 280, padding: 32 }}>페이지 콘텐츠</main> },
};

export const Mobile: Story = {
  args: { cart: 2, children: <main style={{ minHeight: 280, padding: 32 }}>페이지 콘텐츠</main> },
  parameters: { viewport: { defaultViewport: 'hokaMobile' } },
  render: (args) => (
    <div className="mobile">
      <AppLayout {...args} />
    </div>
  ),
};
