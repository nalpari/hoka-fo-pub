import type { Meta, StoryObj } from '@storybook/react';

import * as controls from './controls.scenarios';
import { auditMeta } from './shared';

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
