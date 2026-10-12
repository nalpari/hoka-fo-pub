import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@/shared/components/atoms/Button/Button';
import { SearchOverlay } from './SearchOverlay';

const meta = {
  title: 'Organisms/Search/SearchOverlay',
  component: SearchOverlay,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: { onClose: () => {} },
  render: function ControlledOverlay(args) {
    const [isOpen, setIsOpen] = useState(true);

    return isOpen ? (
      <SearchOverlay
        {...args}
        onClose={() => {
          args.onClose();
          setIsOpen(false);
        }}
      />
    ) : (
      <Button onClick={() => setIsOpen(true)}>검색 열기</Button>
    );
  },
} satisfies Meta<typeof SearchOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  globals: { viewport: { value: 'hoka375', isRotated: false } },
  beforeEach: () => {
    const wasMobile = document.body.classList.contains('platform-mobile');
    document.body.classList.add('platform-mobile');

    return () => {
      if (!wasMobile) document.body.classList.remove('platform-mobile');
    };
  },
};
