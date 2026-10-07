import type { Meta, StoryObj } from '@storybook/react';
import { HStack, Stack } from 'styled-system/jsx';
import { PaymentLogo } from './PaymentLogo';

const meta = {
  title: 'Atoms/PaymentLogo',
  component: PaymentLogo,
  tags: ['autodocs'],
  args: {
    provider: 'visa',
  },
} satisfies Meta<typeof PaymentLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Stack gap="6">
      <HStack gap="6">
        <PaymentLogo provider="visa" variant="black" size="72px" />
        <PaymentLogo provider="visa" variant="colored" size="72px" />
      </HStack>
      <HStack gap="6">
        <PaymentLogo provider="klarna" variant="old" size="72px" />
        <PaymentLogo provider="klarna" variant="colored" size="72px" />
        <PaymentLogo provider="klarna" variant="noBackground" size="72px" />
      </HStack>
      <HStack gap="6">
        <PaymentLogo provider="clearpay" variant="black" size="72px" />
        <PaymentLogo provider="clearpay" variant="blackMint" size="72px" />
      </HStack>
    </Stack>
  ),
};

export const Providers: Story = {
  render: () => (
    <HStack gap="6" flexWrap="wrap">
      <PaymentLogo provider="americanExpress" size="72px" />
      <PaymentLogo provider="applePay" size="72px" />
      <PaymentLogo provider="afterpay" size="72px" />
      <PaymentLogo provider="googlePay" size="72px" />
      <PaymentLogo provider="mastercard" size="72px" />
      <PaymentLogo provider="payNow" size="72px" />
      <PaymentLogo provider="paypal" size="72px" />
      <PaymentLogo provider="strutfit" size="72px" />
    </HStack>
  ),
};
