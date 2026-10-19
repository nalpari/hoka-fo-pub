import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { ProfileQuestionGroup } from '@/shared/Mockup/running-profile/ProfileQuestionGroup';
import { PlatformProvider } from '@/shared/context/platform';
import { profileQuestions } from '@/shared/Mockup/running-profile/running-profile.data';

function InteractiveQuestion(props: ComponentProps<typeof ProfileQuestionGroup>) {
  const [value, setValue] = useState(props.value);

  return (
    <ProfileQuestionGroup
      {...props}
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        props.onChange(nextValue);
      }}
    />
  );
}

const meta = {
  title: 'Mockup/RunningProfile/ProfileQuestionGroup',
  component: ProfileQuestionGroup,
  tags: ['autodocs'],
  args: { question: profileQuestions[0], number: 1, onChange: fn() },
  argTypes: {
    value: { control: 'select', options: [undefined, ...profileQuestions[0].options] },
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, { parameters }) => {
      const mobile = parameters.platform === 'mobile';

      return (
        <PlatformProvider platform={mobile ? 'mobile' : 'web'}>
          <div
            className={mobile ? 'platform-mobile' : 'platform-web'}
            style={{
              width: mobile ? 375 : 960,
              maxWidth: '100%',
              padding: 24,
              boxSizing: 'border-box',
            }}
          >
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
  render: (args) => (
    <InteractiveQuestion key={`${args.question.id}:${args.value ?? ''}`} {...args} />
  ),
} satisfies Meta<typeof ProfileQuestionGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PCDefault: Story = { name: 'PC / 미선택' };

export const PCSelected: Story = {
  name: 'PC / 선택',
  args: { value: profileQuestions[0].options[1] },
};

export const MobileDefault: Story = {
  name: 'MO / 미선택',
  parameters: { layout: 'fullscreen', platform: 'mobile' },
  globals: { viewport: { value: 'hoka375', isRotated: false } },
};

export const MobileSelected: Story = {
  parameters: { layout: 'fullscreen' },
  ...MobileDefault,
  name: 'MO / 선택',
  args: { value: profileQuestions[0].options[1] },
};
