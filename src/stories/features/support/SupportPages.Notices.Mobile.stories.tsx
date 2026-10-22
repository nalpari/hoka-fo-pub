import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/고객센터/2. 공지사항/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.NoticesMobile375, name: 'Default' };

export const Detail: Story = { ...scenarios.NoticeDetailMobile375, name: '상세' };
