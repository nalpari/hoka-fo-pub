import type { Meta, StoryObj } from '@storybook/react';

import * as account from './account.scenarios';
import { auditMeta } from './shared';

const meta = {
  ...auditMeta,
  title: 'Development/FormStateAudit/PC/Expired',
  tags: ['form-audit', 'form-audit-new', 'form-audit-pc', 'form-audit-expired'],
  parameters: { ...auditMeta.parameters, platform: 'web' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const PhoneExpired: Story = { ...account.PhoneExpired };
