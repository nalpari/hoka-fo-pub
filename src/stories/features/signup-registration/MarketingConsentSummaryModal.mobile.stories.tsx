import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './MarketingConsentSummaryModal.scenarios';

const meta = {
  ...base,
  title: 'PAGES/회원가입/5. 마케팅 정보 수신동의 안내/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };
