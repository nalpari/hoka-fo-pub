import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { ProductDetailPage } from '@/shared/features/product/ProductDetailPage';
import type { AuditStory as Story } from './shared';

function ProductExample() {
  const [added, setAdded] = useState(false);
  return (
    <>
      <ProductDetailPage onAddToCart={() => setAdded(true)} />
      <output aria-label="담기 결과">{added ? '완료' : '대기'}</output>
    </>
  );
}

export const Product: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/products/shoe-1', segments: [['id', 'shoe-1']] } },
  },
  render: () => <ProductExample />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '장바구니' }));
    const sizes = c.getByRole('radiogroup', { name: '사이즈 선택' });
    await expect(sizes).toHaveAttribute('aria-invalid', 'true');
    await expect(sizes).toHaveAccessibleDescription('사이즈를 선택해 주세요.');
    const enabled = within(sizes)
      .getAllByRole('radio')
      .find((option) => option.getAttribute('aria-disabled') !== 'true');
    await expect(enabled).toBeDefined();
    await userEvent.click(enabled!);
    await expect(sizes).not.toHaveAttribute('aria-invalid', 'true');
    await userEvent.click(c.getByRole('button', { name: '장바구니' }));
    await expect(c.getByLabelText('담기 결과')).toHaveTextContent('완료');
  },
};
