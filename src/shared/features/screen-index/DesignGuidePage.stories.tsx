import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { DesignGuidePage } from '@/shared/features/screen-index/DesignGuidePage';

const meta = {
  title: 'DEVELOPMENT/디자인 가이드',
  component: DesignGuidePage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/design-guide']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'responsive' },
} satisfies Meta<typeof DesignGuidePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
