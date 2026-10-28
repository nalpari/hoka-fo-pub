import type { StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/고객센터/0. 고객센터 메인/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...scenarios.Mobile375,
  name: 'Default',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const support = within(canvas.getByRole('region', { name: '고객센터 연락처' }));
    const customerService = support.getByRole('region', { name: '고객상담실' });
    const onlineStore = support.getByRole('region', { name: '온라인 스토어' });

    await expect(customerService).toHaveTextContent('09:00~18:00');
    await expect(customerService).toHaveTextContent('080-665-5552');
    await expect(onlineStore).toHaveTextContent('10:00~17:00');
    await expect(onlineStore).toHaveTextContent('080-2225-6660');
    await expect(canvas.queryByRole('heading', { name: '공지사항' })).not.toBeInTheDocument();
    await expect(canvas.queryByRole('heading', { name: 'FAQs' })).not.toBeInTheDocument();
  },
};
