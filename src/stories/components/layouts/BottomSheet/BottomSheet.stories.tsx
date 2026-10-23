import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BottomSheet } from '@/shared/components/layouts/BottomSheet/BottomSheet';
import { Button } from '@/shared/components/atoms/Button/Button';
import { PlatformProvider } from '@/shared/context/platform';
import { Box, Stack } from 'styled-system/jsx';

function SheetExample({ contentHeight = 280, withButton = false, resizable = false }) {
  const [open, setOpen] = useState(true);
  const [height, setHeight] = useState(contentHeight);

  return (
    <PlatformProvider platform="mobile">
      <Button onClick={() => setOpen(true)}>바텀시트 열기</Button>
      {open && (
        <BottomSheet
          title="바텀시트 타이틀"
          onClose={() => setOpen(false)}
          footer={withButton ? <Button onClick={() => setOpen(false)}>신청하기</Button> : undefined}
        >
          <Box style={{ height, background: '#FFCCCC' }}>
            {resizable && (
              <Stack gap="3" p="4">
                <Button onClick={() => setHeight((value) => value + 200)}>내용 늘리기</Button>
                <Button onClick={() => setHeight(180)}>내용 줄이기</Button>
              </Stack>
            )}
          </Box>
        </BottomSheet>
      )}
    </PlatformProvider>
  );
}

const meta = {
  title: 'Layouts/BottomSheet',
  component: SheetExample,
  parameters: { layout: 'fullscreen' },
  args: { contentHeight: 280, withButton: false, resizable: false },
} satisfies Meta<typeof SheetExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithButton: Story = { args: { withButton: true } };

export const Scrollable: Story = { args: { contentHeight: 1200 } };

export const ScrollableWithButton: Story = { args: { contentHeight: 1200, withButton: true } };

export const GrowingContent: Story = {
  args: { contentHeight: 180, withButton: true, resizable: true },
};
