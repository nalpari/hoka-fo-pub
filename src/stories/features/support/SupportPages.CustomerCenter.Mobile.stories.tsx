import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/SUPPORT/Customer Center/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile375, name: 'Default' };
