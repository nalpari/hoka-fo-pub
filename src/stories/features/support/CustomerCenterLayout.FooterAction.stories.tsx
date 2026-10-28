import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

const meta = {
  title: 'Layouts/CustomerCenterLayout/FooterAction',
  component: CustomerCenterLayout,
  args: {
    title: '고객센터',
    activePath: '/support',
    groups: [],
    breadcrumbItems: [],
    children: null,
    footerAction: {
      kind: 'loadMore',
      label: '더보기',
      counter: { current: 1, total: 10 },
      onClick: fn(),
    },
  },
} satisfies Meta<typeof CustomerCenterLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadMore: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: '더보기 (1/10)' }));
    if (args.footerAction && args.footerAction.kind === 'loadMore')
      await expect(args.footerAction.onClick).toHaveBeenCalledOnce();
  },
};

export const NarrowLoadMore: Story = {
  args: { footerAction: { ...meta.args.footerAction, width: 'narrow' } },
};

export const CompactLink: Story = {
  args: {
    footerAction: { kind: 'link', label: 'FAQs 바로가기', href: '/support/faq', width: 'compact' },
  },
};

export const Link: Story = {
  args: {
    footerAction: { kind: 'link', label: 'FAQs 바로가기', href: '/support/faq', size: 'tall' },
  },
};

export const PrimaryLink: Story = {
  args: {
    footerAction: {
      kind: 'link',
      label: '1:1 문의하기',
      href: '/support/inquiries/new',
      variant: 'primary',
    },
  },
};

export const Button: Story = {
  args: { footerAction: { kind: 'button', label: '확인', onClick: fn() } },
};

export const NoFooter: Story = { args: { footerAction: undefined } };

export const CustomFooter: Story = {
  args: { footerAction: undefined, footer: <p>사용자 지정 푸터</p> },
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  args: { footerAction: { ...meta.args.footerAction, containerProps: { _mobile: { pt: '6' } } } },
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

export const CompactMobile: Story = { ...Mobile, args: { ...CompactLink.args } };
