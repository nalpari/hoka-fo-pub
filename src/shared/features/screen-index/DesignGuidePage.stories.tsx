import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { DesignGuideColor } from '@/shared/features/screen-index/DesignGuideColor';
import { DesignGuideTypography } from '@/shared/features/screen-index/DesignGuideTypography';

const meta = {
  title: 'DEVELOPMENT/디자인 가이드',
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/design-guide']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: { layout: 'fullscreen', viewport: { disable: true } },
  globals: { viewport: { value: '100pct-100pct', isRotated: false } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typography: Story = { render: () => <DesignGuideTypography /> };

export const Color: Story = { render: () => <DesignGuideColor /> };
