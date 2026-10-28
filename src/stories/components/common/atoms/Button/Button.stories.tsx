import type { Meta, StoryObj } from '@storybook/react';

import { HStack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import {
  ButtonDocs,
  ButtonDocsContainer,
} from '@/stories/components/common/atoms/Button/ButtonDocs';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { page: ButtonDocs, container: ButtonDocsContainer },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <ButtonDocs />,
};

export const DefaultLink: Story = {
  args: { variant: 'link', children: '기본 링크' },
};

export const PlainButtonLink: Story = {
  render: () => (
    <ButtonLink href="/support/faq" variant="plain" size="lg">
      밑줄 없는 텍스트 링크
    </ButtonLink>
  ),
};

export const Chip: Story = {
  args: {
    variant: 'chip',
    children: '스피드고트',
  },
};

export const FilterTriggerSizes: Story = {
  render: () => (
    <HStack gap="4">
      <Button variant="filterTrigger" icon={<Icon name="filter" />}>
        <Typography variant="body4">필터</Typography>
      </Button>
      <Button variant="filterTrigger" size="regular" icon={<Icon name="filter" size={20} />}>
        <Typography variant="cta1">Filter &amp; Sort</Typography>
      </Button>
    </HStack>
  ),
};

const secondaryContent = (
  <>
    <Typography variant="cta2">더보기 </Typography>
    <Typography variant="body5" tone="tertiary">
      (1/10)
    </Typography>
  </>
);

export const SecondaryContentTone: Story = {
  args: { variant: 'secondary', size: 'short', children: secondaryContent },
};

export const DisabledSecondaryContentTone: Story = {
  args: { ...SecondaryContentTone.args, disabled: true },
};

export const SecondaryLinkContentTone: Story = {
  render: () => (
    <ButtonLink href="/support/faq" variant="secondary" size="short">
      {secondaryContent}
    </ButtonLink>
  ),
};
