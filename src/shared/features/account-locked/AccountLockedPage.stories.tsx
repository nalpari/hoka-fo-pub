import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { PlatformProvider } from '@/shared/context/platform';
import { AccountLockedPage } from './AccountLockedPage';

const meta = {
  title: 'Pages/AUTH/AccountLocked',
  component: AccountLockedPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <PlatformProvider platform="mobile">
          <div className="platform-mobile" style={{ width: 375, minHeight: 812 }}>
            <Story />
          </div>
        </PlatformProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof AccountLockedPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
