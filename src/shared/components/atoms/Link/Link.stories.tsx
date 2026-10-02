import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@/shared/components/atoms/Link/Link';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  args: { children: '자세히 보기', to: '/' },
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
