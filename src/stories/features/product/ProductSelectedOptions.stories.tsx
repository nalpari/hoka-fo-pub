import { useState } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ProductSelectedOptions } from '@/stories/route-previews/products-idPreview';
import { type CartItem } from '@/types/cart';

const initialItems: CartItem[] = [
  { id: 'example', color: '(19) Gray', size: '260', width: 'Regular', quantity: 1 },
  { id: 'example', color: '(17) Black', size: '275', width: 'Wide', quantity: 1 },
];

function Example() {
  const [items, setItems] = useState(initialItems);

  return (
    <ProductSelectedOptions
      items={items}
      unitPrice={175000}
      onQuantityChange={(index, quantity) =>
        setItems((current) =>
          current.map((item, i) => (i === index ? { ...item, quantity } : item)),
        )
      }
      onRemove={(index) => setItems((current) => current.filter((_, i) => i !== index))}
    />
  );
}

const meta = {
  title: 'FEATURES/상품/선택 옵션 목록',
  component: ProductSelectedOptions,
  args: { items: initialItems, unitPrice: 175000, onQuantityChange: fn(), onRemove: fn() },
  render: () => <Example />,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductSelectedOptions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MultipleOptions: Story = {
  name: '누적 옵션 · 수량 · 삭제 · 합계',
};

export const Interaction: Story = {
  name: '수량 변경과 전체 삭제 검증',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('350,000원')).toBeVisible();
    const first = within(canvas.getAllByRole('listitem')[0]);
    await expect(first.getByRole('button', { name: '감소' })).toBeDisabled();
    await userEvent.click(first.getByRole('button', { name: '증가' }));
    await expect(canvas.getByText('525,000원')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: '(17) Black, 275, Wide 삭제' }));
    await expect(canvas.getAllByRole('listitem')).toHaveLength(1);
    await expect(canvas.getAllByText('350,000원')).toHaveLength(2);
    await userEvent.click(canvas.getByRole('button', { name: '(19) Gray, 260, Regular 삭제' }));
    await expect(canvas.queryByLabelText('선택한 상품 옵션')).not.toBeInTheDocument();
  },
};

export const Mobile: Story = {
  ...MultipleOptions,
  name: '모바일 누적 옵션',
  globals: { viewport: 'hoka375' },
};
