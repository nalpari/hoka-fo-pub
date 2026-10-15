import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import type { AccordionProps } from '@/shared/components/atoms/Accordion/Accordion';

function ControlledAccordion(args: AccordionProps) {
  const [value, setValue] = useState(['shipping']);

  return (
    <div data-open>
      <button type="button" onClick={() => setValue([])}>
        모두 접기
      </button>
      <Accordion {...args} value={value} onValueChange={setValue} />
    </div>
  );
}

const meta = {
  title: 'Atoms/Accordion',
  component: Accordion,
  args: {
    items: [
      { value: 'shipping', title: '배송 안내', content: '영업일 기준 3일 이내에 배송됩니다.' },
      { value: 'returns', title: '반품 안내', content: '수령 후 30일 이내 반품할 수 있습니다.' },
    ],
    indicator: '⌄',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InitiallyOpen: Story = { args: { defaultValue: ['shipping'] } };

export const Controlled: Story = {
  args: { multiple: false, indicator: undefined },
  render: (args) => <ControlledAccordion {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shipping = canvas.getByRole('button', { name: '배송 안내' });
    const returns = canvas.getByRole('button', { name: '반품 안내' });
    await expect(shipping).toHaveAttribute('aria-expanded', 'true');
    await expect(returns).toHaveAttribute('aria-expanded', 'false');
    await expect(returns.querySelector('[aria-hidden]')).toHaveStyle({ transform: 'none' });
    await userEvent.click(returns);
    await expect(returns).toHaveAttribute('aria-expanded', 'true');
    await expect(shipping).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(canvas.getByRole('button', { name: '모두 접기' }));
    await expect(returns).toHaveAttribute('aria-expanded', 'false');
  },
};
