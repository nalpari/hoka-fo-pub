import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SystemStatusPage.scenarios';

const meta = { ...base, title: 'PAGES/ERROR/Web', globals: { viewport: 'hoka1600' } };

export default meta;

type Story = StoryObj<typeof meta>;

export const Maintenance: Story = { ...scenarios.Maintenance };

export const Unavailable: Story = { ...scenarios.Unavailable };
