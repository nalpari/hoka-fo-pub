import type { Meta, StoryObj } from '@storybook/react';

import { IaStructurePage } from '@/app/screen-index/_components/IaStructurePage';

const meta = {
  title: 'DEVELOPMENT/IA 구조도',
  component: IaStructurePage,
  args: { previewEnvironment: 'storybook' },
  parameters: {
    layout: 'fullscreen',
    nextjs: { navigation: { pathname: '/screen-index' } },
    viewport: { disable: true },
  },
} satisfies Meta<typeof IaStructurePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
