import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './RunningSessionDetail.scenarios';

const meta = {
  ...base,
  title: 'PAGES/탐색/1. 러닝세션 상세/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = { ...scenarios.Open, name: '신청 가능' };

export const Closed: Story = { ...scenarios.Closed, name: '모집 마감' };

export const Upcoming: Story = { ...scenarios.Upcoming, name: '신청 예정' };

export const DetailWidth1200: Story = { ...scenarios.DetailWidth1200, name: '상세 1200px' };

export const DetailWidth1920: Story = { ...scenarios.DetailWidth1920, name: '상세 1920px' };

export const DetailWidth2560: Story = { ...scenarios.DetailWidth2560, name: '상세 2560px' };

export const DetailWidth3840: Story = { ...scenarios.DetailWidth3840, name: '상세 3840px' };
