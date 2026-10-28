import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { Button } from '@/components/common/atoms/Button';

import { AddressSearchModal } from '@/components/common/organisms/Address/AddressFields';

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div className={`platform-${platform}`}>
      <Story />
    </div>
  </PlatformProvider>
);

function AddressPreview() {
  const [open, setOpen] = useState(true);
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');

  return (
    <>
      <Button onClick={() => setOpen(true)}>주소 입력 열기</Button>
      <output aria-label="선택 주소">
        {postalCode} {address}
      </output>
      <AddressSearchModal
        open={open}
        onOpenChange={setOpen}
        postalCode={postalCode}
        address={address}
        onPostalCodeChange={setPostalCode}
        onAddressChange={setAddress}
      />
    </>
  );
}

const meta = {
  title: 'Organisms/Address/AddressSearchModal',
  component: AddressSearchModal,
  args: {
    open: true,
    postalCode: '',
    address: '',
    onOpenChange: () => {},
    onPostalCodeChange: () => {},
    onAddressChange: () => {},
  },
  decorators: [withPlatform('web')],
  render: () => <AddressPreview />,
} satisfies Meta<typeof AddressSearchModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const dialog = within(await body.findByRole('dialog'));
    await userEvent.type(dialog.getByRole('textbox', { name: /우편번호/ }), '12345');
    await userEvent.type(dialog.getByRole('textbox', { name: /^\* 주소$/ }), '서울시 예시 주소');
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(within(canvasElement).getByLabelText('선택 주소')).toHaveTextContent(
      '12345 서울시 예시 주소',
    );
    await userEvent.click(within(canvasElement).getByRole('button', { name: '주소 입력 열기' }));
    await expect(
      within(await body.findByRole('dialog')).getByRole('textbox', { name: /우편번호/ }),
    ).toHaveValue('12345');
  },
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  ...Default,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
