import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ButtonDocs, ButtonDocsContainer } from '@/shared/components/atoms/Button/ButtonDocs';

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
