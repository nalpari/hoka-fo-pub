import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SignupTermsPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Signup/Terms/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const RequiredNotice: Story = { ...scenarios.RequiredNotice, name: 'Required Notice' };

export const Detail: Story = { ...scenarios.Detail, name: 'Detail' };

export const PreviousPicker: Story = { ...scenarios.PreviousPicker, name: 'Previous Picker' };

export const Interactive: Story = { ...scenarios.Interactive, name: 'Interactive' };

export const DetailInteraction: Story = {
  ...scenarios.DetailInteraction,
  name: 'Detail Interaction',
};
