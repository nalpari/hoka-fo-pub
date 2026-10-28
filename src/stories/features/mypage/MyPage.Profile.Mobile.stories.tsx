import type { StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import base, * as scenarios from './MyPageDesign.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/7. 회원정보확인 및 수정/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Profile: Story = { ...scenarios.Profile, name: 'Default' };

export const CancelConfirmation: Story = {
  ...scenarios.Profile,
  name: '회원정보 수정 취소 확인',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '회원정보 수정' }));
    await userEvent.click(canvas.getByRole('button', { name: '취소' }));
    const dialog = await page.findByRole('dialog', { name: '회원정보 수정 취소 확인' });
    await expect(dialog).toHaveTextContent('입력한 변경사항을 취소하시겠습니까?');
    await userEvent.click(within(dialog).getByRole('button', { name: '취소' }));
    await expect(canvas.getByRole('button', { name: '변경사항 저장' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: '취소' }));
    await userEvent.click(
      within(await page.findByRole('dialog')).getByRole('button', { name: '확인' }),
    );
    await expect(canvas.getByRole('button', { name: '회원정보 수정' })).toBeVisible();
  },
};

export const AddressAndEmail: Story = {
  ...scenarios.Profile,
  name: '주소 및 이메일 수정',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '회원정보 수정' }));
    await expect(canvas.getByRole('button', { name: '우편번호 찾기' })).toBeVisible();
    await expect(canvas.getByLabelText('* 이메일 주소')).toBeVisible();
    await expect(canvas.getByLabelText('* 도메인')).toBeDisabled();
    await expect(canvas.queryByText('결혼유무')).not.toBeInTheDocument();
    await expect(canvas.queryByRole('heading', { name: '부가정보' })).not.toBeInTheDocument();
  },
};

export const PhoneVerification: Story = {
  ...scenarios.Profile,
  name: '휴대폰 인증',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '회원정보 수정' }));
    await expect(canvas.getByLabelText('* 휴대폰 번호')).toBeVisible();
    await expect(canvas.getByRole('button', { name: '인증번호 요청' })).toBeVisible();
  },
};

export const PasswordSettingsFlow: Story = {
  ...scenarios.Profile,
  name: '비밀번호 설정 흐름',
  play: async ({ canvasElement }) => {
    const user = userEvent.setup({ document: canvasElement.ownerDocument, delay: 10 });
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await user.click(canvas.getByRole('button', { name: '회원정보 수정' }));
    await user.click(canvas.getByRole('button', { name: '비밀번호 설정' }));

    await expect(page.getByRole('dialog', { name: '비밀번호 설정' })).toBeVisible();
  },
};
