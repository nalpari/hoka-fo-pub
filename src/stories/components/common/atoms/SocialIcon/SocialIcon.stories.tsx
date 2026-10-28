import { type Meta, type StoryObj } from '@storybook/react';
import { SocialIconLink } from '@/context/ShopShell';

const meta = {
  title: 'Atoms/SocialIconLink',
  component: SocialIconLink,
  args: { file: 'instagram.svg', href: '#instagram', label: 'Instagram' },
} satisfies Meta<typeof SocialIconLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
