import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ButtonDocs, ButtonDocsContainer } from '@/shared/components/atoms/Button/ButtonDocs';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { page: ButtonDocs, container: ButtonDocsContainer },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <ButtonDocs />,
};

export const DefaultLink: Story = {
  args: { variant: 'link', children: '기본 링크' },
};
