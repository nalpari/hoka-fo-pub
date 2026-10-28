import type { Meta, StoryObj } from '@storybook/react';

import * as account from './account.scenarios';
import * as mypage from './mypage.scenarios';
import * as product from './product.scenarios';
import { auditMeta } from './shared';
import * as support from './support.scenarios';

const meta = {
  ...auditMeta,
  title: 'Development/FormStateAudit/MO/Validation',
  tags: ['form-audit', 'form-audit-new', 'form-audit-mo', 'form-audit-validation'],
  parameters: { ...auditMeta.parameters, platform: 'mobile' },
  globals: { viewport: 'hoka375' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FindAccount: Story = { ...account.FindAccount };

export const Phone: Story = { ...account.Phone };

export const PhoneUnlock: Story = { ...account.PhoneUnlock };

export const Registration: Story = { ...account.Registration };

export const SignupTerms: Story = { ...account.SignupTerms };

export const Addresses: Story = { ...mypage.Addresses };

export const Profile: Story = { ...mypage.Profile };

export const Reviews: Story = { ...mypage.Reviews };

export const Coupon: Story = { ...mypage.Coupon };

export const Product: Story = { ...product.Product };

export const Inquiry: Story = { ...support.Inquiry };
