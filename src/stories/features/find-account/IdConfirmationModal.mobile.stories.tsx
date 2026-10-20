import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './IdConfirmationModal.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Login/FindAccount/IdConfirmationModal/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };
