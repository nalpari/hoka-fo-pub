import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SystemStatusPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/공통/2. 시스템점검페이지/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Maintenance: Story = { ...scenarios.Maintenance, name: 'Default' };
