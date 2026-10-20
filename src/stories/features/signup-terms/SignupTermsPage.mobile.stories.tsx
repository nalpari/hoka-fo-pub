import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SignupTermsPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/AUTH/SignupTerms/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const Detail: Story = { ...scenarios.MobileDetail, name: 'Detail' };

export const PreviousPicker: Story = { ...scenarios.MobilePreviousPicker, name: 'Previous Picker' };

export const DetailInteraction: Story = {
  ...scenarios.MobileDetailInteraction,
  name: 'Detail Interaction',
};
