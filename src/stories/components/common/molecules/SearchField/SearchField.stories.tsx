import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import {
  SearchField,
  type SearchFieldProps,
} from '@/components/common/molecules/SearchField/SearchField';
import { PlatformProvider } from '@/context/platform';

function ControlledSearchField(args: SearchFieldProps) {
  const [value, setValue] = useState(args.value);

  return (
    <SearchField
      {...args}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        args.onValueChange(next);
      }}
    />
  );
}

const meta = {
  title: 'Molecules/SearchField',
  component: SearchField,
  args: {
    label: '질문 또는 답변 검색',
    placeholder: '검색어를 입력해주세요',
    value: '',
    onValueChange: fn(),
    onSearch: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 590 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <ControlledSearchField {...args} />,
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ canvasElement, args }) => {
    const searchbox = within(canvasElement).getByRole('textbox', { name: '질문 또는 답변 검색' });
    await userEvent.type(searchbox, '배송');
    await expect(searchbox).toHaveValue('배송');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('배송');
    await userEvent.keyboard('{Enter}');
    await expect(args.onSearch).toHaveBeenCalled();
    await userEvent.click(within(canvasElement).getByRole('button', { name: '검색 실행' }));
    await expect(args.onSearch).toHaveBeenCalledTimes(2);
  },
};

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
