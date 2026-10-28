import { expect, userEvent, within, waitFor } from 'storybook/test';
import { MyPageAddresses } from '@/stories/features/mypage/MyPagePreview';
import MyPageProfile from '@/app/mypage/profile/page';
import { MyPageReviews } from '@/stories/features/mypage/MyPagePreview';
import { CouponManager } from '@/components/common/organisms/MyPage/CouponManager';
import type { AuditStory as Story } from './shared';
import { enterAddress } from './enterAddress';

export const Addresses: Story = {
  render: () => <MyPageAddresses initialItems={[]} />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '배송지 추가' }));
    await userEvent.click(c.getByRole('button', { name: /저장|등록/ }));
    for (const id of ['recipient', 'name', 'phone', 'zip', 'line', 'detail'])
      await expect(canvasElement.querySelector(`#address-${id}`)).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    await userEvent.type(c.getByLabelText(/이름/, { selector: 'input' }), '홍길동');
    await userEvent.type(c.getByLabelText(/배송지명/), '테스트 배송지');
    await userEvent.type(c.getByLabelText(/휴대폰 번호/), '01012345678');
    await enterAddress(canvasElement);
    await userEvent.type(c.getByLabelText(/상세주소/), '101호');
    await userEvent.click(c.getByRole('button', { name: '저장' }));
    await expect(c.getByRole('heading', { name: '테스트 배송지' })).toBeVisible();
  },
};

export const Profile: Story = {
  render: () => <MyPageProfile />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '회원정보 수정' }));
    await userEvent.clear(c.getByRole('textbox', { name: /이메일/ }));
    await userEvent.clear(c.getByLabelText(/휴대폰 번호/, { selector: 'input' }));
    await userEvent.click(c.getByRole('button', { name: '회원정보 저장' }));
    await expect(c.getByRole('textbox', { name: /이메일/ })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await expect(c.getByLabelText(/휴대폰 번호/, { selector: 'input' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await userEvent.type(c.getByRole('textbox', { name: /이메일/ }), 'demo@example.com');
    await userEvent.type(c.getByLabelText(/휴대폰 번호/, { selector: 'input' }), '01012345678');
    await userEvent.click(c.getByRole('button', { name: '회원정보 저장' }));
    await expect(c.getByRole('button', { name: '회원정보 수정' })).toBeVisible();
  },
};

export const Reviews: Story = {
  render: () => <MyPageReviews initialReadyCount={1} />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement.ownerDocument.body);
    await userEvent.click(c.getByRole('button', { name: '리뷰 작성' }));
    await userEvent.click(await c.findByRole('button', { name: '저장' }));
    await expect(c.getByRole('radiogroup', { name: '상품 만족도' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await expect(c.getByRole('textbox', { name: '리뷰 내용' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await userEvent.click(c.getByRole('radio', { name: '5점' }));
    await userEvent.type(c.getByRole('textbox', { name: '리뷰 내용' }), '편안합니다.');
    await userEvent.click(c.getByRole('button', { name: '저장' }));
    await waitFor(() => expect(c.queryByRole('dialog')).not.toBeInTheDocument());
  },
};

export const Coupon: Story = {
  render: () => <CouponManager coupons={[]} />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByRole('textbox', { name: '쿠폰 일련번호' });
    await userEvent.type(input, '123');
    await userEvent.click(c.getByRole('button', { name: '쿠폰 등록' }));
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription('쿠폰 일련번호를 확인해 주세요.');
    await userEvent.type(input, '456');
    await userEvent.click(c.getByRole('button', { name: '쿠폰 등록' }));
    await expect(
      await within(canvasElement.ownerDocument.body).findByRole('dialog'),
    ).toHaveTextContent('쿠폰이 등록되었습니다.');
    await userEvent.click(
      within(canvasElement.ownerDocument.body).getByRole('button', { name: '확인' }),
    );
    await waitFor(() =>
      expect(
        within(canvasElement.ownerDocument.body).queryByRole('dialog'),
      ).not.toBeInTheDocument(),
    );
  },
};
