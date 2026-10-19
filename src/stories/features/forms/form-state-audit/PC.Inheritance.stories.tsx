import type { Meta, StoryObj } from '@storybook/react';
import { auditMeta } from './shared';
import * as controls from './controls.scenarios';

const meta = {
  ...auditMeta,
  title: 'Development/FormStateAudit/PC/Inheritance',
  tags: ['form-audit', 'form-audit-new', 'form-audit-pc', 'form-audit-inheritance'],
  parameters: { ...auditMeta.parameters, platform: 'web' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inheritance: Story = { ...controls.Inheritance };
