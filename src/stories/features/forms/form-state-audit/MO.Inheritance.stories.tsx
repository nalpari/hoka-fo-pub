import type { Meta, StoryObj } from '@storybook/react';
import { auditMeta } from './shared';
import * as controls from './controls.scenarios';

const meta = {
  ...auditMeta,
  title: 'Development/FormStateAudit/MO/Inheritance',
  tags: ['form-audit', 'form-audit-new', 'form-audit-mo', 'form-audit-inheritance'],
  parameters: { ...auditMeta.parameters, platform: 'mobile' },
  globals: { viewport: 'hoka375' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inheritance: Story = { ...controls.Inheritance };
