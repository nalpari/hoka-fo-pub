import type { Meta, StoryObj } from '@storybook/react';
import { IaStructurePage } from '@/shared/features/screen-index/IaStructurePage';

const meta = {
  title: 'DEVELOPMENT/IA 구조도',
  component: IaStructurePage,
  parameters: {
    nextjs: { navigation: { pathname: '/screen-index' } },
    layout: 'fullscreen',
    controls: { disable: true },
  },
  globals: { viewport: 'responsive' },
} satisfies Meta<typeof IaStructurePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
