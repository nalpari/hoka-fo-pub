import type { Meta, StoryObj } from '@storybook/react';
import { DesignGuideColor } from '@/components/screen-index/DesignGuideColor';
import { DesignGuideTypography } from '@/components/screen-index/DesignGuideTypography';

const meta = {
  title: 'DEVELOPMENT/디자인 가이드',
  parameters: {
    nextjs: { navigation: { pathname: '/design-guide' } },
    layout: 'fullscreen',
    viewport: { disable: true },
  },
  globals: { viewport: { value: '100pct-100pct', isRotated: false } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typography: Story = { render: () => <DesignGuideTypography /> };

export const Color: Story = { render: () => <DesignGuideColor /> };
