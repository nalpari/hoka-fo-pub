import type { Meta, StoryObj } from '@storybook/react';

import * as account from './account.scenarios';
import { auditMeta } from './shared';

const meta = {
  ...auditMeta,
  title: 'Development/FormStateAudit/MO/Expired',
  tags: ['form-audit', 'form-audit-new', 'form-audit-mo', 'form-audit-expired'],
  parameters: { ...auditMeta.parameters, platform: 'mobile' },
  globals: { viewport: 'hoka375' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const PhoneExpired: Story = { ...account.PhoneExpired };
