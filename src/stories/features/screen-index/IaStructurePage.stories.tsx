import type { Meta, StoryObj } from '@storybook/react';

import { IaStructurePage } from '@/app/screen-index/_components/IaStructurePage';

const meta = {
  title: 'DEVELOPMENT/IA 구조도',
  component: IaStructurePage,
  args: { previewEnvironment: 'storybook' },
  parameters: {
    layout: 'fullscreen',
    nextjs: { navigation: { pathname: '/screen-index' } },
    viewport: { disable: true },
  },
} satisfies Meta<typeof IaStructurePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// 화면별 실제 진행 현황이 아닌 PC/MO 독립 상태 표시 검증용 fixture입니다.
export const PlatformProgress: Story = {
  args: {
    progressOverrides: {
      233: {
        pcDesign: 'received',
        moDesign: 'missing',
        pcPublishing: 'ready',
        moPublishing: 'pending',
      },
      234: {
        pcDesign: 'missing',
        moDesign: 'received',
        pcPublishing: 'working',
        moPublishing: 'ready',
      },
    },
  },
};
