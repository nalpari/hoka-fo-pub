import { expect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { HStack } from 'styled-system/jsx';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };

export const Secondary: Story = {};

export const SecondaryInverse: Story = { args: { variant: 'secondaryInverse' } };

export const BottomSheetPrimary: Story = {
  args: { children: '적용하기', height: 'tall', variant: 'bottomSheetPrimary' },
};

export const Disabled: Story = { args: { disabled: true } };

export const WithIcon: Story = {
  render: () => (
    <HStack gap="3">
      <Button icon={<Icon name="filter" />}>필터</Button>
      <Button icon={<Icon name="filter" />} variant="primary">
        필터
      </Button>
    </HStack>
  ),
};

export const OutlinePill: Story = {
  args: { children: '필터', icon: <Icon name="filter" />, variant: 'filterTrigger' },
};

export const HeaderSearch: Story = {
  args: {
    children: '검색하기',
    icon: <Icon src="/images/header/search.svg" size="16px" />,
    variant: 'headerSearch',
  },
};

export const TallPrimary: Story = {
  args: {
    children: 'Shop Women’s',
    height: 'tall',
    icon: <Icon name="filter" />,
    variant: 'primary',
  },
};

export const Loading: Story = {
  args: { children: '처리 중', loading: true, variant: 'primary' },
};

export const SecondaryLink: Story = {
  render: () => (
    <MemoryRouter>
      <ButtonLink to="/products" variant="secondary">
        바로가기
      </ButtonLink>
    </MemoryRouter>
  ),
};

export const TextLink: Story = {
  render: () => (
    <MemoryRouter>
      <ButtonLink to="/products" variant="link">
        바로가기
      </ButtonLink>
    </MemoryRouter>
  ),
};

export const ApprovedVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {[false, true].map((mobile) => (
        <div key={String(mobile)} className={mobile ? 'platform-mobile' : undefined}>
          <h2>{mobile ? 'Compact' : 'Wide'}</h2>
          {(['primary', 'secondary'] as const).map((variant) =>
            (['black', 'white'] as const).map((colorway) => (
              <div
                key={variant + colorway}
                style={{
                  display: 'flex',
                  gap: 24,
                  padding: 16,
                  background: colorway === 'white' ? '#777777' : '#ffffff',
                }}
              >
                <Button variant={variant} colorway={colorway}>
                  버튼명 텍스트
                </Button>
                <Button variant={variant} colorway={colorway} disabled>
                  버튼명 텍스트
                </Button>
                <Button variant={variant} colorway={colorway} loading>
                  처리 중
                </Button>
              </div>
            )),
          )}
        </div>
      ))}
    </div>
  ),
};

export const Hover: Story = {
  args: { variant: 'primary' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await userEvent.hover(button);
    await expect(button).toBeEnabled();
  },
};

export const Focus: Story = {
  args: { variant: 'secondary', colorway: 'white' },
  decorators: [
    (Story) => (
      <div style={{ background: '#777777', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    button.focus();
    await expect(button).toHaveFocus();
  },
};

export const Compact: Story = { args: { variant: 'primary', density: 'compact' } };

export const Wide: Story = { args: { variant: 'primary', density: 'wide' } };

export const PrimaryWhiteHover: Story = {
  ...Hover,
  args: { variant: 'primary', colorway: 'white' },
};

export const SecondaryBlackHover: Story = {
  ...Hover,
  args: { variant: 'secondary', colorway: 'black' },
};

export const SecondaryWhiteHover: Story = {
  ...Hover,
  args: { variant: 'secondary', colorway: 'white' },
  decorators: Focus.decorators,
};

export const PrimaryBlackFocus: Story = {
  ...Focus,
  args: { variant: 'primary', colorway: 'black' },
};

export const PrimaryWhiteFocus: Story = {
  ...Focus,
  args: { variant: 'primary', colorway: 'white' },
};

export const SecondaryBlackFocus: Story = {
  ...Focus,
  args: { variant: 'secondary', colorway: 'black' },
};

export const English: Story = {
  args: { children: 'Shop Women’s', language: 'en', variant: 'primary' },
};

export const Active: Story = {
  args: { variant: 'primary', colorway: 'black' },
  play: async ({ canvasElement }) => {
    await userEvent.pointer({
      target: within(canvasElement).getByRole('button'),
      keys: '[MouseLeft>]',
    });
  },
};

export const PrimaryWhiteActive: Story = {
  ...Active,
  args: { variant: 'primary', colorway: 'white' },
  decorators: Focus.decorators,
};

export const SecondaryBlackActive: Story = {
  ...Active,
  args: { variant: 'secondary', colorway: 'black' },
};

export const SecondaryWhiteActive: Story = {
  ...Active,
  args: { variant: 'secondary', colorway: 'white' },
  decorators: Focus.decorators,
};
