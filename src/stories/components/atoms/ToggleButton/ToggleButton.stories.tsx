import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  ToggleButton,
  type ToggleButtonProps,
} from '@/shared/components/atoms/ToggleButton/ToggleButton';

function ToggleButtonStory(props: ToggleButtonProps) {
  const [expanded, setExpanded] = useState(Boolean(props.expanded));

  return (
    <ToggleButton {...props} expanded={expanded} onClick={() => setExpanded((value) => !value)}>
      {props.children}
    </ToggleButton>
  );
}

const meta = {
  title: 'Atoms/ToggleButton',
  component: ToggleButtonStory,
  args: {
    expanded: false,
    children: '상세 정보',
    indicator: true,
    variant: 'ghost',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleButtonStory>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
