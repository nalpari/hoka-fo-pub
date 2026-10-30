import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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
        pcDesign: 'revision-planned',
        moDesign: 'received',
        pcPublishing: 'revision',
        moPublishing: 'ready',
      },
    },
  },
};

function ProductProgressExample() {
  const [replaced, setReplaced] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setReplaced((current) => !current)}>
        상품 상태 props 교체
      </button>
      <IaStructurePage
        previewEnvironment="storybook"
        progressOverrides={
          replaced
            ? {
                3: {
                  pcDesign: 'received',
                  moDesign: 'received',
                  pcPublishing: 'ready',
                  moPublishing: 'ready',
                },
              }
            : {
                3: {
                  pcDesign: 'missing',
                  moDesign: null,
                  pcPublishing: 'pending',
                  moPublishing: 'revision',
                },
                4: { pcDesign: 'revision-planned', pcPublishing: 'revision' },
              }
        }
      />
    </>
  );
}

// 실제 현황이 아닌 상품 요약·혼합 상태와 늦게 교체되는 props 검증용 fixture입니다.
export const ProductProgress: Story = {
  render: () => <ProductProgressExample />,
};
