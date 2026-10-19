import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/shared/context/platform';

export type AuditStory = StoryObj<Meta>;

export const auditMeta = {
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, { parameters }) => {
      const mobile = parameters.platform === 'mobile';
      return (
        <PlatformProvider platform={mobile ? 'mobile' : 'web'}>
          <div
            className={mobile ? 'platform-mobile' : 'platform-web'}
            style={{ width: mobile ? 375 : undefined }}
          >
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta;
