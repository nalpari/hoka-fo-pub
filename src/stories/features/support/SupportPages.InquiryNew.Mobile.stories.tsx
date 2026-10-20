import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/SUPPORT/InquiryNew/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.InquiryNewMobile375, name: 'Default' };
