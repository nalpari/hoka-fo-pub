import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { ShopShell } from '@/shared/ShopShell';
import { OrdersPage } from '@/shared/features/orders/OrdersPage';
import { previewOrders } from '@/shared/features/orders/orders.data';

const meta = {
  title: 'PAGES/장바구니/1. 주문하기/주문내역/Mobile',
  component: OrdersPage,
  parameters: { layout: 'fullscreen', nextjs: { appDirectory: true } },
  globals: { viewport: 'hoka375' },
  decorators: [
    (Story, { parameters }) => (
      <ShopShell platform={parameters.platform === 'web' ? 'web' : 'mobile'}>
        <Story />
      </ShopShell>
    ),
  ],
} satisfies Meta<typeof OrdersPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { name: '주문 배송 조회' };

export const Empty: Story = { name: '빈 목록', args: { initialOrders: [] } };

export const Detail: Story = {
  name: '주문 상세',
  args: { initialOrders: [previewOrders[3]], initialView: 'detail' },
};

export const CancelDetail: Story = {
  name: '취소 상세',
  args: { initialOrders: [previewOrders[3]], initialView: 'claim' },
};

export const ReturnDetail: Story = {
  name: '반품 상세',
  args: {
    initialOrders: [{ ...previewOrders[3], claims: [...previewOrders[3].claims].reverse() }],
    initialView: 'claim',
  },
};

export const Cancel: Story = { name: '주문 취소 신청', args: { initialClaimKind: 'cancel' } };

export const Return: Story = {
  name: '환불 반품 신청',
  args: { initialOrders: [previewOrders[2]], initialClaimKind: 'return' },
};

export const Tracking: Story = {
  name: '배송 조회',
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getAllByRole('button', { name: '배송 조회' })[0]);
  },
};

export const ClaimSubmission: Story = {
  name: '부분 취소 신청 반영',
  args: { initialClaimKind: 'cancel' },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const dialog = within(await body.findByRole('dialog', { name: '주문 취소 신청' }));
    await userEvent.click(dialog.getByRole('button', { name: '신청하기' }));
    await expect(dialog.getByRole('alert')).toHaveTextContent('신청할 상품');
    await userEvent.click(dialog.getAllByRole('checkbox')[0]);
    await userEvent.selectOptions(dialog.getByLabelText(/사유/), 'damage');
    await userEvent.click(dialog.getByRole('button', { name: '신청하기' }));
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
    await expect(body.getByRole('status')).toHaveTextContent('주문 취소 신청이 접수되었습니다.');
    await expect(body.getAllByRole('button', { name: '취소상세보기' }).length).toBeGreaterThan(0);
  },
};
