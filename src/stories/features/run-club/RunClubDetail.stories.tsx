import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './RunClubDetail.scenarios';

const meta = {
  ...base,
  title: 'PAGES/MYPAGE/RunClub/Detail/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = { ...scenarios.Open, name: 'Open' };

export const Closed: Story = { ...scenarios.Closed, name: 'Closed' };

export const Upcoming: Story = { ...scenarios.Upcoming, name: 'Upcoming' };

export const DetailWidth1200: Story = { ...scenarios.DetailWidth1200, name: 'Detail Width 1200' };

export const DetailWidth1920: Story = { ...scenarios.DetailWidth1920, name: 'Detail Width 1920' };

export const DetailWidth2560: Story = { ...scenarios.DetailWidth2560, name: 'Detail Width 2560' };

export const DetailWidth3840: Story = { ...scenarios.DetailWidth3840, name: 'Detail Width 3840' };
