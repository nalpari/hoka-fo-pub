import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './LocalesPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/공통/4. 국가 및 지역 선택/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };
