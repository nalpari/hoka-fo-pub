import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Box, HStack } from 'styled-system/jsx';

const meta = {
  title: 'Layouts/ContentSection',
  component: ContentSection,
  args: {
    as: 'section',
    'aria-labelledby': 'section-heading',
    title: '쿠폰 내역',
    headerProps: {
      titleProps: { variant: 'heading8', id: 'section-heading' },
      description: '쿠폰별 사용조건을 확인해 주세요.',
      descriptionProps: { variant: 'body3' },
    },
    children: (
      <>
        <Box bg="black.10" p="4">
          필터 그룹
        </Box>
        <Box bg="black.10" p="4">
          목록 그룹
        </Box>
      </>
    ),
    gap: { base: '6', _mobile: '4' },
  },
} satisfies Meta<typeof ContentSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByRole('region', { name: '쿠폰 내역' });
    await expect(region.children).toHaveLength(3);
  },
};

export const CustomHeader: Story = {
  render: () => (
    <ContentSection
      as="section"
      aria-labelledby="section-heading"
      header={
        <HStack justifyContent="space-between">
          <Typography as="h2" id="section-heading" variant="heading8">
            주문 배송 내역
          </Typography>
          <Typography variant="body5">전체보기</Typography>
        </HStack>
      }
    >
      <Box bg="black.10" p="4">
        목록 그룹
      </Box>
    </ContentSection>
  ),
};

export const TitleOnly: Story = {
  args: { headerProps: { titleProps: { variant: 'heading8', id: 'section-heading' } } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('heading', { name: '쿠폰 내역' })).toBeVisible();
    await expect(canvasElement.querySelector('p')).toBeNull();
  },
};
