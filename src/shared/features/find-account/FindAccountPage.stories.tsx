import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { PlatformProvider } from '@/shared/context/platform';
import { FindAccountPage } from './FindAccountPage';

const meta = {
  title: 'Pages/Auth/FindAccount',
  component: FindAccountPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <PlatformProvider platform="mobile">
          <div className="platform-mobile" style={{ width: 375, minHeight: 904 }}>
            <Story />
          </div>
        </PlatformProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof FindAccountPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
