import type { Meta, StoryObj } from '@storybook/react';

import * as controls from './controls.scenarios';
import { auditMeta } from './shared';

const meta = {
  ...auditMeta,
  title: 'Development/FormStateAudit/PC/Inheritance',
  tags: ['form-audit', 'form-audit-new', 'form-audit-pc', 'form-audit-inheritance'],
  parameters: { ...auditMeta.parameters, platform: 'web' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inheritance: Story = { ...controls.Inheritance };
