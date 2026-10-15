import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  MenuDrawer,
  type MenuDrawerProps,
} from '@/shared/components/organisms/Navigation/MenuDrawer/MenuDrawer';
import { PlatformProvider } from '@/shared/context/platform';

function MenuPreview(args: MenuDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <PlatformProvider platform="mobile">
      <div className="platform-mobile">
        <button type="button" onClick={() => setOpen(true)}>
          전체 메뉴 열기
        </button>
        {open && <MenuDrawer {...args} close={() => setOpen(false)} />}
      </div>
    </PlatformProvider>
  );
}

const meta = {
  title: 'Organisms/Navigation/MenuDrawer',
  component: MenuDrawer,
  globals: { viewport: 'hoka375' },
  render: (args) => <MenuPreview {...args} />,
} satisfies Meta<typeof MenuDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

const openMenu: NonNullable<Story['play']> = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByRole('button', { name: '전체 메뉴 열기' }));
  await expect(
    await within(canvasElement.ownerDocument.body).findByRole('dialog', { name: '전체 메뉴' }),
  ).toBeVisible();
  await waitFor(() =>
    expect(
      within(canvasElement.ownerDocument.body).getByRole('button', { name: '메뉴 닫기' }),
    ).toHaveFocus(),
  );
};

export const Default: Story = { args: { close: () => undefined }, play: openMenu };

export const LoggedIn: Story = {
  args: { close: () => undefined, isLoggedIn: true },
  play: openMenu,
};

export const Men: Story = {
  ...Default,
  play: async (context) => {
    await openMenu(context);
    const body = within(context.canvasElement.ownerDocument.body);
    await userEvent.click(body.getByRole('button', { name: 'Men' }));
    await waitFor(() =>
      expect(body.getByRole('button', { name: 'Men, 전체 메뉴로 돌아가기' })).toHaveFocus(),
    );
    await expect(body.getByRole('button', { name: 'Featured' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await expect(body.getByRole('link', { name: 'Sale' })).toBeVisible();
    await expect(
      body.queryByRole('link', { name: 'Clifton UTL 자세히 보기' }),
    ).not.toBeInTheDocument();
  },
};

export const Navigation: Story = {
  ...Default,
  play: async (context) => {
    await Men.play!(context);
    const body = within(context.canvasElement.ownerDocument.body);
    await userEvent.click(body.getByRole('button', { name: '액티비티' }));
    await expect(body.getByRole('button', { name: '액티비티' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await expect(body.getByRole('button', { name: 'Featured' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    await userEvent.click(body.getByRole('button', { name: 'Featured' }));
    await expect(body.getByRole('button', { name: 'Featured' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await expect(body.getByRole('button', { name: '액티비티' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    await userEvent.click(body.getByRole('button', { name: 'Featured' }));
    await expect(body.getByRole('button', { name: 'Featured' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    await userEvent.click(body.getByRole('button', { name: 'Men, 전체 메뉴로 돌아가기' }));
    await waitFor(() => expect(body.getByRole('button', { name: 'Men' })).toHaveFocus());
    await userEvent.keyboard('{Escape}');
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
    await waitFor(() => expect(body.getByRole('button', { name: '전체 메뉴 열기' })).toHaveFocus());
    await userEvent.click(body.getByRole('button', { name: '전체 메뉴 열기' }));
    await expect(body.getByRole('button', { name: 'Men' })).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: '메뉴 닫기' }));
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
  },
};
