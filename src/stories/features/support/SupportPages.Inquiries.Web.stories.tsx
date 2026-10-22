import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/고객센터/3. 1:1문의/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.InquiriesDesktop, name: 'Default' };

export const Pending: Story = { ...scenarios.InquiryPendingDesktop, name: 'Pending' };

export const Answered: Story = { ...scenarios.InquiryAnsweredDesktop, name: 'Answered' };

export const New: Story = { ...scenarios.InquiryNewDesktop, name: '문의 작성' };
