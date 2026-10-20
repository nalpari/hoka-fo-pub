import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { SupportTabs } from '@/shared/components/molecules/SupportTabs/SupportTabs';

const tabs = ['마일리지 적립/사용', '온라인 통합 마일리지', '마일리지 소멸', '기타 안내'].map(
  (label) => ({ value: label, label, content: <p>{label} 안내 내용</p> }),
);

const meta = {
  title: 'Molecules/SupportTabs',
  component: SupportTabs,
  args: { ariaLabel: '마일리지 정책', tabs, defaultValue: tabs[0].value },
} satisfies Meta<typeof SupportTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scrollable: Story = { args: { variant: 'scrollable' } };

export const Mobile: Story = { ...Scrollable, globals: { viewport: 'hoka375' } };

export const Controlled: Story = {
  render: function ControlledTabs(args) {
    const [value, setValue] = useState(args.defaultValue);
    return <SupportTabs {...args} variant="scrollable" value={value} onValueChange={setValue} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('tab', { name: tabs[0].label });
    await userEvent.click(first);
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', { name: tabs[1].label })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByRole('tab', { name: tabs[1].label })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent(`${tabs[1].label} 안내 내용`);
  },
};
