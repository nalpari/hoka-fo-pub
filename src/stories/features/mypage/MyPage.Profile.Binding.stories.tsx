import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { MyPageDataContext, type ProfileRecord } from '@/context/MyPageDataContext';
import { PlatformProvider } from '@/context/platform';

import { ProfileContent } from '@/app/mypage/profile/_components/ProfileContent';

const record: ProfileRecord = {
  id: 'member-api-827',
  name: '김러너',
  birthDate: '1996.03.12',
  address: { postalCode: '03000', address: '서울시 종로구', addressDetail: '102호' },
  email: 'runner@example.com',
  phone: '01012345678',
  emailPreference: '수신',
  smsPreference: '수신안함',
  kakaoPreference: '수신',
};

const save = fn<(input: unknown) => Promise<void>>();

const changePassword = fn<(password: string) => Promise<void>>();

function BindingFixture() {
  const [item, setItem] = useState<ProfileRecord | null>(null);
  return (
    <PlatformProvider platform="web">
      <div className="platform-web">
        <button onClick={() => setItem(record)}>회원 응답 적용</button>
        <MyPageDataContext.Provider
          value={{
            profile: {
              item,
              save,
              changePassword,
              withdraw: async () => {},
              requestPhone: async () => ({ requestId: 'phone-api-827', expiresInSeconds: 180 }),
              verifyPhone: async () => 'proof-api-827',
            },
          }}
        >
          <ProfileContent />
        </MyPageDataContext.Provider>
      </div>
    </PlatformProvider>
  );
}

const meta = {
  title: 'Integration/Profile design',
  component: BindingFixture,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BindingFixture>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SaveFailureAndRetry: Story = {
  play: async ({ canvasElement }) => {
    save.mockReset();
    changePassword.mockReset();
    changePassword.mockResolvedValue(undefined);
    let rejectSave: (reason: Error) => void = () => {};
    save
      .mockImplementationOnce(
        () =>
          new Promise<void>((_, reject) => {
            rejectSave = reject;
          }),
      )
      .mockResolvedValue(undefined);
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '회원 응답 적용' }));
    await expect(canvas.getByText('member-api-827')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: '회원정보 수정' }));
    await userEvent.type(canvas.getByLabelText('* 비밀번호', { selector: 'input' }), 'Runner!2026');
    await userEvent.type(
      canvas.getByLabelText('* 비밀번호 재입력', { selector: 'input' }),
      'Runner!2026',
    );
    await userEvent.click(canvas.getByRole('button', { name: '변경사항 저장' }));
    const dialog = await page.findByRole('dialog', { name: '회원정보 수정 확인' });
    await userEvent.click(within(dialog).getByRole('button', { name: '확인' }));
    await waitFor(() => expect(save).toHaveBeenCalledTimes(1));
    await expect(
      canvas.getByRole('button', { name: '변경사항 저장', hidden: true }),
    ).toBeDisabled();
    rejectSave(new Error('프로필 저장 실패'));
    await page.findAllByText('프로필 저장 실패');
    await expect(canvas.getByLabelText('* 이메일 주소')).toHaveValue('runner');
    await userEvent.click(within(dialog).getByRole('button', { name: '확인' }));
    await waitFor(() => expect(save).toHaveBeenCalledTimes(2));
    await expect(changePassword).toHaveBeenCalledTimes(1);
    await expect(changePassword).toHaveBeenCalledWith('Runner!2026');
    await expect(save).toHaveBeenLastCalledWith({
      email: 'runner@example.com',
      phone: '01012345678',
      address: record.address,
      emailPreference: '수신',
      smsPreference: '수신안함',
      kakaoPreference: '수신',
      phoneProof: null,
    });
    await expect(await page.findByRole('dialog', { name: '회원정보 수정 완료' })).toBeVisible();
  },
};
