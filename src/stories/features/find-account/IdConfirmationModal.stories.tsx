import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './IdConfirmationModal.scenarios';

const meta = {
  ...base,
  title: 'PAGES/AUTH/FindAccount/IdConfirmationModal/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };
