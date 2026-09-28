import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Link: Story = {
  render: () => (
    <MemoryRouter>
      <ButtonLink to="/products" variant="link">
        바로가기
      </ButtonLink>
    </MemoryRouter>
  ),
};
