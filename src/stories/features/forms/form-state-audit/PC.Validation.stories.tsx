import type { Meta, StoryObj } from '@storybook/react';
import { auditMeta } from './shared';
import * as account from './account.scenarios';
import * as mypage from './mypage.scenarios';
import * as product from './product.scenarios';
import * as support from './support.scenarios';
import * as controls from './controls.scenarios';

const meta = {
  ...auditMeta,
  title: 'Development/FormStateAudit/PC/Validation',
  tags: ['form-audit', 'form-audit-new', 'form-audit-pc', 'form-audit-validation'],
  parameters: { ...auditMeta.parameters, platform: 'web' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FindAccount: Story = { ...account.FindAccount };

export const Phone: Story = { ...account.Phone };

export const PhoneUnlock: Story = { ...account.PhoneUnlock };

export const Registration: Story = { ...account.Registration };

export const SignupTerms: Story = { ...account.SignupTerms };

export const SignupDetails: Story = { ...account.SignupDetails };

export const Addresses: Story = { ...mypage.Addresses };

export const Profile: Story = { ...mypage.Profile };

export const Reviews: Story = { ...mypage.Reviews };

export const Coupon: Story = { ...mypage.Coupon };

export const Product: Story = { ...product.Product };

export const Inquiry: Story = { ...support.Inquiry };

export const FooterEmail: Story = { ...controls.FooterEmail };
