import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { PlatformProvider } from '@/shared/context/platform';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Select } from '@/shared/components/atoms/Select/Select';
import { Dropdown } from '@/shared/components/atoms/Dropdown/Dropdown';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { RatingInput } from '@/shared/components/atoms/RatingInput/RatingInput';
import { RangeInput } from '@/shared/components/atoms/RangeInput/RangeInput';
import { NumberStepper } from '@/shared/components/atoms/NumberStepper/NumberStepper';
import { EmailSignupField } from '@/shared/components/atoms/EmailSignupField/EmailSignupField';
import { Terms } from '@/shared/components/molecules/Terms/Terms';
import { SizeSelector } from '@/shared/components/molecules/SizeSelector/SizeSelector';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { Button } from '@/shared/components/atoms/Button/Button';
import { FindAccountPage } from '@/shared/features/find-account/FindAccountPage';
import { PhoneVerificationPage } from '@/shared/features/phone-verification/PhoneVerificationPage';
import { PhoneVerificationContent } from '@/shared/features/phone-verification/PhoneVerificationContent';
import { RegistrationPage } from '@/shared/features/signup-registration/RegistrationPage';
import { SignupPage } from '@/shared/features/signup/SignupPage';
import { SignupTermsPage } from '@/shared/features/signup-terms/SignupTermsPage';
import { MyPageAddresses } from '@/shared/features/mypage/MyPageAddresses';
import { MyPageProfile } from '@/shared/features/mypage/MyPageProfile';
import { MyPageReviews } from '@/shared/features/mypage/MyPageReviews';
import { InquiryNewPage } from '@/shared/features/support/InquiryNewPage';
import { CouponManager } from '@/shared/components/organisms/MyPage/CouponManager';
import { ProductDetailPage } from '@/shared/features/product/ProductDetailPage';

const meta = {
  title: 'Development/FormStateAudit',
  tags: ['form-audit', 'form-audit-new'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, { parameters }) => {
      const mobile = parameters.platform === 'mobile';
      return (
        <PlatformProvider platform={mobile ? 'mobile' : 'web'}>
          <div
            className={mobile ? 'platform-mobile' : 'platform-web'}
            style={{ width: mobile ? 375 : undefined }}
          >
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

async function enterAddress(canvasElement: HTMLElement) {
  const c = within(canvasElement);
  await userEvent.click(c.getByRole('button', { name: '우편번호 찾기' }));
  const dialog = await within(canvasElement.ownerDocument.body).findByRole('dialog');
  const fields = within(dialog);
  await userEvent.click(fields.getByRole('button', { name: '확인' }));
  await expect(fields.getByRole('textbox', { name: /우편번호/ })).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await userEvent.type(fields.getByRole('textbox', { name: /우편번호/ }), '12345');
  await userEvent.type(fields.getByRole('textbox', { name: /주소/ }), '서울시 예시 주소');
  await userEvent.click(fields.getByRole('button', { name: '확인' }));
  await waitFor(() => expect(dialog).not.toBeInTheDocument());
}

function InheritanceExample() {
  const [invalid, setInvalid] = useState(true);
  const controls = [
    <TextInput key="text" placeholder="텍스트" />,
    <TextInput key="multiline" multiline placeholder="여러 줄" />,
    <Select key="select">
      <option>선택</option>
    </Select>,
    <Dropdown key="dropdown" ariaLabel="드롭다운" options={[{ value: 'a', label: 'A' }]} />,
    <Checkbox key="checkbox" label="체크박스" checked={false} />,
    <Radio
      key="radio"
      ariaLabel="라디오"
      options={[{ value: 'a', label: '라디오 A' }]}
      value=""
      onValueChange={() => {}}
    />,
    <RatingInput key="rating" ariaLabel="별점" value={0} onValueChange={() => {}} />,
    <RangeInput key="range" aria-label="범위" value={10} onValueChange={() => {}} />,
    <NumberStepper key="number" ariaLabel="수량" value={1} onChange={() => {}} />,
    <Terms key="terms" checked={false} onCheckedChange={() => {}}>
      동의
    </Terms>,
    <SizeSelector
      key="size"
      mode="single"
      ariaLabel="사이즈"
      value=""
      onValueChange={() => {}}
      options={[{ value: '250' }]}
    />,
  ];
  return (
    <div style={{ padding: 24, display: 'grid', gap: 24 }}>
      {controls.map((control, index) => (
        <div key={control.key} data-testid={`control-${index}`}>
          <FormField
            htmlFor={`audit-${index}`}
            label={index < 3 ? `필드 ${index}` : undefined}
            error={invalid ? `오류 ${index}` : undefined}
          >
            {control}
          </FormField>
        </div>
      ))}
      <Button onClick={() => setInvalid(false)}>오류 해제</Button>
      <StatusMessage tone="success">성공 안내</StatusMessage>
    </div>
  );
}

export const Inheritance: Story = {
  render: () => <InheritanceExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const roles = [
      'textbox',
      'textbox',
      'combobox',
      'combobox',
      'checkbox',
      'radiogroup',
      'radiogroup',
      'group',
      'textbox',
      'checkbox',
      'radiogroup',
    ];
    for (const [index, role] of roles.entries()) {
      const control = within(canvas.getByTestId(`control-${index}`)).getByRole(role);
      await expect(control).toHaveAttribute('aria-invalid', 'true');
      await expect(control).toHaveAccessibleDescription(`오류 ${index}`);
      await expect(within(canvas.getByTestId(`control-${index}`)).getByRole('alert')).toHaveStyle({
        color: 'rgb(166, 0, 0)',
      });
      const visual =
        index === 5 || index === 10
          ? within(canvas.getByTestId(`control-${index}`)).getByRole('radio')
          : index === 8
            ? control.parentElement!
            : control;
      const computed = canvasElement.ownerDocument.defaultView!.getComputedStyle(visual);
      await expect(
        [computed.borderTopColor, computed.outlineColor, computed.boxShadow].some((value) =>
          value.includes('166, 0, 0'),
        ),
      ).toBe(true);
    }
    await expect(canvas.getByRole('status')).toHaveStyle({ color: 'rgb(22, 121, 75)' });
    await userEvent.click(canvas.getByRole('button', { name: '오류 해제' }));
    for (const [index, role] of roles.entries()) {
      await expect(
        within(canvas.getByTestId(`control-${index}`)).getByRole(role),
      ).not.toHaveAttribute('aria-invalid', 'true');
    }
  },
};

export const FindAccount: Story = {
  render: () => <FindAccountPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '인증번호 요청' }));
    await expect(c.getByLabelText(/이름/)).toHaveAttribute('aria-invalid', 'true');
    await expect(c.getByLabelText(/휴대폰번호/)).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(c.getByLabelText(/이름/), '홍길동');
    await userEvent.type(c.getByLabelText(/휴대폰번호/), '01012345678');
    await userEvent.click(c.getByRole('button', { name: '인증번호 요청' }));
    await userEvent.click(c.getByRole('button', { name: '인증번호 확인' }));
    await expect(c.getByLabelText('인증번호', { exact: true })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await userEvent.type(c.getByLabelText('인증번호', { exact: true }), '123456');
    await userEvent.click(c.getByRole('button', { name: '인증번호 확인' }));
    await expect(c.getByRole('status')).toHaveTextContent('실제 검증은 서비스 연결 후 가능합니다.');
    await expect(c.getByLabelText('인증번호', { exact: true })).not.toHaveAttribute('aria-invalid');
  },
};

export const Phone: Story = {
  render: () => <PhoneVerificationPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '인증번호 요청' }));
    for (const name of [/이름/, /생년월일/, /휴대폰 번호/])
      await expect(c.getByLabelText(name)).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(c.getByLabelText(/이름/), '홍길동');
    await userEvent.type(c.getByLabelText(/생년월일/), '19900522');
    await userEvent.type(c.getByLabelText(/휴대폰 번호/), '01012345678');
    await userEvent.click(c.getByRole('checkbox', { name: '모두동의' }));
    await userEvent.click(c.getByRole('button', { name: '인증번호 요청' }));
    await expect(c.getByRole('status')).toHaveAttribute('data-tone', 'info');
    await userEvent.click(c.getByRole('button', { name: '인증번호 확인' }));
    await expect(c.getByLabelText(/인증번호/)).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(c.getByLabelText(/인증번호/), '123456');
    await expect(c.getByLabelText(/인증번호/)).not.toHaveAttribute('aria-invalid');
  },
};

export const PhoneExpired: Story = {
  render: () => (
    <PhoneVerificationContent
      information={{
        name: '',
        birthDate: '',
        nationality: '내국인',
        gender: '남자',
        carrier: 'SKT',
        phone: '',
      }}
      agreements={[true, true, true, true]}
      requested
      code=""
      secondsLeft={0}
      resendWait={0}
      notice="인증 시간이 만료되었습니다."
      noticeTone="error"
      detail={null}
      onInformationChange={() => {}}
      onAgreementChange={() => {}}
      onAllAgree={() => {}}
      onCodeChange={() => {}}
      onRequest={() => {}}
      onConfirm={(e) => e.preventDefault()}
      onDetail={() => {}}
    />
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('alert')).toHaveStyle({ color: 'rgb(166, 0, 0)' });
  },
};

export const PhoneUnlock: Story = {
  render: () => <PhoneVerificationPage mode="account-unlock" />,
  play: Phone.play,
};

function ProductExample() {
  const [added, setAdded] = useState(false);
  return (
    <>
      <ProductDetailPage onAddToCart={() => setAdded(true)} />
      <output aria-label="담기 결과">{added ? '완료' : '대기'}</output>
    </>
  );
}

export const Product: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/products/shoe-1', segments: [['id', 'shoe-1']] } },
  },
  render: () => <ProductExample />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '장바구니' }));
    const sizes = c.getByRole('radiogroup', { name: '사이즈 선택' });
    await expect(sizes).toHaveAttribute('aria-invalid', 'true');
    await expect(sizes).toHaveAccessibleDescription('사이즈를 선택해 주세요.');
    const enabled = within(sizes)
      .getAllByRole('radio')
      .find((option) => option.getAttribute('aria-disabled') !== 'true');
    await expect(enabled).toBeDefined();
    await userEvent.click(enabled!);
    await expect(sizes).not.toHaveAttribute('aria-invalid', 'true');
    await userEvent.click(c.getByRole('button', { name: '장바구니' }));
    await expect(c.getByLabelText('담기 결과')).toHaveTextContent('완료');
  },
};

export const Registration: Story = {
  render: () => <RegistrationPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '다음' }));
    for (const id of [
      'email',
      'domain',
      'name',
      'password',
      'confirmation',
      'postalCode',
      'address',
      'addressDetail',
    ])
      await expect(canvasElement.querySelector(`#registration-${id}`)).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    await userEvent.type(c.getByLabelText(/이름/), '홍길동');
    await expect(c.getByLabelText(/이름/)).not.toHaveAttribute('aria-invalid');
    await userEvent.type(c.getByLabelText(/이메일 주소/), 'demo');
    await userEvent.type(c.getByLabelText(/도메인/, { selector: 'input' }), 'example.com');
    await userEvent.click(c.getByRole('button', { name: '이메일 중복확인' }));
    await expect(c.getByRole('status')).toHaveAttribute('data-tone', 'info');
    await userEvent.type(
      c.getByLabelText(/비밀번호/, { selector: '#registration-password' }),
      'Hoka12345!',
    );
    await userEvent.type(c.getByLabelText(/비밀번호 재입력/), 'Hoka12345!');
    await userEvent.click(c.getByRole('button', { name: '다음' }));
    await expect(c.getByRole('status')).toHaveAttribute('data-tone', 'info');
    await enterAddress(canvasElement);
    await userEvent.type(c.getByLabelText(/상세주소/), '101호');
    await userEvent.click(c.getByRole('button', { name: '다음' }));
    await expect(c.getByRole('heading', { name: '부가 정보' })).toBeVisible();
  },
};

export const SignupTerms: Story = {
  render: () => <SignupTermsPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '확인' }));
    await expect(c.getByRole('alert')).toHaveStyle({ color: 'rgb(166, 0, 0)' });
    const required = c.getAllByRole('checkbox', { name: /필수/ });
    await userEvent.click(required[0]);
    await expect(required[0]).not.toHaveAttribute('aria-invalid', 'true');
    for (const input of required.slice(1)) {
      await expect(input).toHaveAttribute('aria-invalid', 'true');
      await userEvent.click(input);
    }
    await expect(c.queryByRole('alert')).not.toBeInTheDocument();
  },
};

export const SignupDetails: Story = {
  parameters: { nextjs: { navigation: { query: { step: 'details' } } } },
  render: () => <SignupPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '가입 완료' }));
    for (const name of [/이름/, /이메일/, /아이디/, /비밀번호/])
      await expect(c.getByLabelText(name, { selector: 'input' })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    await userEvent.type(c.getByLabelText(/이름/, { selector: 'input' }), '홍길동');
    await userEvent.type(c.getByLabelText(/이메일/, { selector: 'input' }), 'demo@example.com');
    await userEvent.type(c.getByLabelText(/아이디/, { selector: 'input' }), 'demouser');
    await userEvent.type(c.getByLabelText(/비밀번호/, { selector: 'input' }), 'Hoka12345!');
    await userEvent.click(c.getByRole('button', { name: '가입 완료' }));
    await expect(c.getByRole('heading', { name: '회원가입이 완료되었습니다.' })).toBeVisible();
  },
};

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

export const Inquiry: Story = {
  render: () => <InquiryNewPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: /등록/ }));
    await expect(c.getByLabelText('제목')).toHaveAttribute('aria-invalid', 'true');
    await expect(c.getByLabelText('내용')).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(c.getByLabelText('제목'), '문의 제목');
    await userEvent.type(c.getByLabelText('내용'), '문의 내용');
    await expect(c.getByLabelText('제목')).not.toHaveAttribute('aria-invalid');
    await expect(c.getByLabelText('내용')).not.toHaveAttribute('aria-invalid');
  },
};

export const FooterEmail: Story = {
  render: () => <EmailSignupField label="이메일 구독" />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const input = c.getByRole('textbox', { name: '이메일 구독' });
    await userEvent.type(input, 'invalid');
    await userEvent.click(c.getByRole('button', { name: 'Submit email' }));
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(c.getByRole('alert')).toHaveStyle({ color: 'rgb(166, 0, 0)' });
    await userEvent.clear(input);
    await userEvent.type(input, 'demo@example.com');
    await expect(input).not.toHaveAttribute('aria-invalid');
  },
};

const mobile = { parameters: { platform: 'mobile' }, globals: { viewport: 'hoka375' } };

export const MobileInheritance: Story = { ...Inheritance, ...mobile, play: Inheritance.play };

export const MobileFindAccount: Story = { ...FindAccount, ...mobile, play: FindAccount.play };

export const MobilePhone: Story = { ...Phone, ...mobile, play: Phone.play };

export const MobilePhoneExpired: Story = { ...PhoneExpired, ...mobile, play: PhoneExpired.play };

export const MobilePhoneUnlock: Story = { ...PhoneUnlock, ...mobile, play: PhoneUnlock.play };

export const MobileProduct: Story = {
  ...Product,
  ...mobile,
  parameters: { ...Product.parameters, ...mobile.parameters },
  play: Product.play,
};

export const MobileRegistration: Story = { ...Registration, ...mobile, play: Registration.play };

export const MobileSignupDetails: Story = {
  ...SignupDetails,
  ...mobile,
  parameters: { ...SignupDetails.parameters, ...mobile.parameters },
  play: SignupDetails.play,
};

export const MobileSignupTerms: Story = { ...SignupTerms, ...mobile, play: SignupTerms.play };

export const MobileAddresses: Story = { ...Addresses, ...mobile, play: Addresses.play };

export const MobileProfile: Story = { ...Profile, ...mobile, play: Profile.play };

export const MobileReviews: Story = { ...Reviews, ...mobile, play: Reviews.play };

export const MobileCoupon: Story = { ...Coupon, ...mobile, play: Coupon.play };

export const MobileInquiry: Story = { ...Inquiry, ...mobile, play: Inquiry.play };

export const MobileFooterEmail: Story = { ...FooterEmail, ...mobile, play: FooterEmail.play };
