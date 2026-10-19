import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { FaqList, type FaqListProps } from '@/shared/components/organisms/Faq/FaqList';
import { PlatformProvider } from '@/shared/context/platform';

function ControlledFaq(args: FaqListProps) {
  const [openQuestion, setOpenQuestion] = useState(args.openQuestion);

  return (
    <FaqList
      {...args}
      openQuestion={openQuestion}
      onToggle={(question) => {
        args.onToggle(question);
        setOpenQuestion((current) => (current === question ? null : question));
      }}
    />
  );
}

const meta = {
  title: 'Organisms/Faq/FaqList',
  component: FaqList,
  args: {
    entries: [
      { question: '배송 기간은 얼마나 걸리나요?', answer: '영업일 기준 3일 이내에 배송됩니다.' },
      { question: '반품은 어떻게 하나요?', answer: '마이페이지에서 반품을 신청해 주세요.' },
    ],
    openQuestion: null,
    onToggle: fn(),
  },
  render: (args) => <ControlledFaq {...args} />,
} satisfies Meta<typeof FaqList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'hoka375' },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile">
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};

export const Empty: Story = { args: { entries: [] } };

export const ControlledDisclosure: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const shipping = canvas.getByRole('button', { name: 'Q 배송 기간은 얼마나 걸리나요?' });
    const returns = canvas.getByRole('button', { name: 'Q 반품은 어떻게 하나요?' });
    shipping.focus();
    await userEvent.keyboard('{Enter}');
    await expect(shipping).toHaveAttribute('aria-expanded', 'true');
    const panelId = shipping.getAttribute('aria-controls');
    await expect(panelId).toBeTruthy();
    await expect(canvasElement.ownerDocument.getElementById(panelId!)).toBeVisible();
    await expect(args.onToggle).toHaveBeenLastCalledWith(args.entries[0].question);
    await userEvent.click(returns);
    await expect(shipping).toHaveAttribute('aria-expanded', 'false');
    await expect(returns).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard(' ');
    await expect(returns).toHaveAttribute('aria-expanded', 'false');
  },
};
