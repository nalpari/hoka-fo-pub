import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { IaStructurePage } from '@/shared/features/screen-index/IaStructurePage';

const meta = {
  title: 'DEVELOPMENT/IA 구조도',
  component: IaStructurePage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/screen-index']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  globals: { viewport: 'responsive' },
} satisfies Meta<typeof IaStructurePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
