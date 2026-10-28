import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './SystemStatusPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/공통/3. 기타에러페이지/Mobile',
  globals: { viewport: 'hoka375' },
  parameters: { ...base.parameters, platform: 'mobile' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Unavailable: Story = { ...scenarios.Unavailable, name: 'Default' };
