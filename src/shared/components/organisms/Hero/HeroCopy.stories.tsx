import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { HeroCopy } from './HeroCopy';

const meta = {
  title: 'Organisms/Hero/HeroCopy',
  component: HeroCopy,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ position: 'relative', minHeight: 500, background: '#425d62', color: '#fff' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  args: {
    content: {
      title: 'TECTON X 4',
      description: (
        <>
          새롭게 선보이는 초고속 ProFly X 기술로
          <br />
          당신의 최고 기록에 도전하세요.
        </>
      ),
    },
    actions: [
      { label: '남성 바로가기', to: '/products' },
      { label: '여성 바로가기', to: '/products' },
    ],
  },
} satisfies Meta<typeof HeroCopy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: 'hokaMobile', isRotated: false } } };
