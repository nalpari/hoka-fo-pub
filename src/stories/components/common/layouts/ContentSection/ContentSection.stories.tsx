import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { Button } from '@/components/common/atoms/Button/Button';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { Typography } from '@/components/common/atoms/Typography/Typography';
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

export const FooterActions: Story = {
  args: {
    footer: (
      <HStack gap="2">
        <Button variant="secondary">취소</Button>
        <Button variant="primary">저장</Button>
      </HStack>
    ),
  },
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByRole('region', { name: '쿠폰 내역' });
    await expect(region.children).toHaveLength(4);
    await expect(
      within(region.lastElementChild as HTMLElement).getAllByRole('button'),
    ).toHaveLength(2);
  },
};

export const FooterWithoutBody: Story = {
  args: { children: undefined, footer: <Button variant="primary">확인</Button> },
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByRole('region', { name: '쿠폰 내역' });
    await expect(region.children).toHaveLength(2);
    await expect(region.lastElementChild).toBe(
      within(region).getByRole('button', { name: '확인' }),
    );
  },
};

function ConditionalFooterExample() {
  const [hasMore, setHasMore] = useState(true);

  return (
    <ContentSection
      as="section"
      aria-label="조건부 액션"
      title="쿠폰 내역"
      footer={hasMore ? <Button onClick={() => setHasMore(false)}>더보기</Button> : null}
    >
      <Box>목록</Box>
    </ContentSection>
  );
}

export const ConditionalFooter: Story = {
  render: () => <ConditionalFooterExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole('region', { name: '조건부 액션' });
    await userEvent.click(canvas.getByRole('button', { name: '더보기' }));
    await expect(region.children).toHaveLength(2);
    await expect(canvas.queryByRole('button')).toBeNull();
  },
};

function FormFooterExample() {
  const [saved, setSaved] = useState(false);

  return (
    <ContentSection
      title="폼 액션"
      footer={
        <Button type="submit" form="section-example-form">
          저장
        </Button>
      }
    >
      <form
        id="section-example-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <label>
          이름
          <input name="name" required />
        </label>
      </form>
      {saved ? <Typography role="status">저장 완료</Typography> : null}
    </ContentSection>
  );
}

export const FormFooter: Story = {
  render: () => <FormFooterExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: '이름' });
    const button = canvas.getByRole('button', { name: '저장' }) as HTMLButtonElement;
    await expect(button.form).toBe(input.closest('form'));
    await userEvent.click(button);
    await expect(canvas.queryByRole('status')).toBeNull();
    await userEvent.type(input, '홍길동{Enter}');
    await expect(canvas.getByRole('status')).toHaveTextContent('저장 완료');
  },
};
