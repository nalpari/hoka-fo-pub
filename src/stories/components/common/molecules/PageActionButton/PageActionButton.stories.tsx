import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { PageActionButton } from '@/components/common/molecules/PageActionButton/PageActionButton';

import { PlatformProvider } from '@/context/platform';

const meta = {
  title: 'Molecules/PageActionButton',
  component: PageActionButton,
  args: { children: '더보기', counter: { current: 1, total: 10 }, onClick: fn() },
} satisfies Meta<typeof PageActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadMore: Story = {};

export const NarrowLoadMore: Story = { args: { width: 'narrow' } };

export const CompactLink: Story = {
  args: { children: 'FAQs 바로가기', href: '/support/faq', width: 'compact', counter: undefined },
};

export const Link: Story = {
  args: { children: 'FAQs 바로가기', href: '/support/faq', size: 'tall', counter: undefined },
};

export const PrimaryLink: Story = {
  args: {
    children: '1:1 문의하기',
    href: '/support/inquiries/new',
    variant: 'primary',
    counter: undefined,
  },
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  args: { containerProps: { _mobile: { pt: '6' } } },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile" style={{ width: 375, maxWidth: '100%' }}>
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
  globals: { viewport: { value: 'hoka375', isRotated: false } },
};

export const CompactMobile: Story = {
  ...Mobile,
  args: { ...CompactLink.args },
};
