import type { Meta, StoryObj } from '@storybook/react';

import { MainSection } from '@/components/common/layouts/MainSection';

const meta = {
  title: 'Layouts/MainSection',
  component: MainSection,
  args: {
    title: 'Section title',
    actionSlot: <button type="button">Next</button>,
    children: <div style={{ width: '100%', minHeight: 120, background: '#ffffff' }}>Content</div>,
  },
} satisfies Meta<typeof MainSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CompactDesktop: Story = { args: { spacing: 'compact' } };

export const FullBleedContent: Story = { args: { contentWidth: 'fullBleed' } };

export const ExtendedContent: Story = {
  args: { contentWidth: 'extended' },
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'hoka2560' },
};
