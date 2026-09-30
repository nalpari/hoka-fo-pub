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
export const Disabled: Story = { args: { disabled: true } };
export const WithIcon: Story = {
  render: () => (
    <HStack gap="12px">
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
export const FillLink: Story = {
  render: () => (
    <MemoryRouter>
      <ButtonLink actionStyle="fill" to="/products" variant="secondary">
        바로가기
      </ButtonLink>
    </MemoryRouter>
  ),
};

export const UnderlineLink: Story = {
  render: () => (
    <MemoryRouter>
      <ButtonLink actionStyle="underline" to="/products" variant="primary">
        바로가기
      </ButtonLink>
    </MemoryRouter>
  ),
};
