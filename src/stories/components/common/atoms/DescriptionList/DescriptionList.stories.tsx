import type { Meta, StoryObj } from '@storybook/react';

import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

import { DescriptionList } from '@/components/common/atoms/DescriptionList/DescriptionList';

import { PlatformProvider } from '@/context/platform';

const meta = {
  title: 'Atoms/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  args: {
    labelWidth: '80px',
    items: [
      { term: '배송비', description: '무료' },
      { term: '도착 예정', description: '평균 3일 이내' },
    ],
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StyledRows: Story = {
  args: {
    items: [
      { term: '배송비', description: '무료' },
      {
        term: '배송 안내',
        description: '배송 지역과 상품 준비 상황에 따라 일정이 달라질 수 있습니다.',
      },
    ],
    termProps: { variant: 'body4', weight: 'bold' },
    descriptionProps: { variant: 'body4', tone: 'inherit' },
    slotStyles: {
      root: css.raw({ gap: '0', gridTemplateColumns: 'none', bg: 'black.10' }),
      row: css.raw({
        display: 'grid',
        gridTemplateColumns: '28.5% minmax(0, 1fr)',
        minH: '60px',
        borderBottom: '1px solid token(colors.black.20)',
        _last: { borderBottom: 'none' },
      }),
      term: css.raw({ px: '6', py: '5' }),
      description: css.raw({ px: '6', py: '5', minW: '0', overflowWrap: 'anywhere' }),
    },
  },
};

export const MobileStyledRows: Story = {
  ...StyledRows,
  globals: { viewport: 'hoka375' },
  render: (args) => (
    <PlatformProvider platform="mobile">
      <Box className="platform-mobile">
        <DescriptionList {...args} />
      </Box>
    </PlatformProvider>
  ),
};
