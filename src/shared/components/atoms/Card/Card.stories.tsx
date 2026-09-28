import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@/shared/components/atoms/Card/Card';
import { Button } from '@/shared/components/atoms/Button/Button';

const meta = { title: 'Atoms/Card', component: Card, tags: ['autodocs'] } satisfies Meta<
  typeof Card
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { children: <div style={{ padding: 20 }}>Card content</div> },
};

export const WithSections: Story = {
  render: () => (
    <Card style={{ maxWidth: 360, padding: 20, border: '1px solid #ddd' }}>
      <Card.Header style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <Card.Title>배송지</Card.Title>
          <Card.Description>주문 상품을 받을 주소를 선택하세요.</Card.Description>
        </div>
        <Card.Action>
          <Button size="sm">변경</Button>
        </Card.Action>
      </Card.Header>
      <Card.Content>
        <p>서울특별시 강남구 테헤란로 123</p>
      </Card.Content>
      <Card.Footer>
        <Button variant="primary">이 주소로 배송</Button>
      </Card.Footer>
    </Card>
  ),
};
