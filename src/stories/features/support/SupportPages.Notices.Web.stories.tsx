import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/고객센터/2. 공지사항/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.NoticesDesktop, name: 'Default' };

export const Detail: Story = { ...scenarios.NoticeDetailDesktop, name: '상세' };
