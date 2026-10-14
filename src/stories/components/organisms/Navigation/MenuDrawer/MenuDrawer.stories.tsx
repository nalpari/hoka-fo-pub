import type { Meta, StoryObj } from '@storybook/react';
import { MenuDrawer } from '@/shared/components/organisms/Navigation/MenuDrawer/MenuDrawer';

const meta = {
  title: 'Organisms/Navigation/MenuDrawer',
  component: MenuDrawer,
} satisfies Meta<typeof MenuDrawer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { close: () => undefined } };
