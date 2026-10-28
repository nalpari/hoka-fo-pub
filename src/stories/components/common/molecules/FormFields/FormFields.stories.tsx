import { useState, type FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { NameField } from '@/components/common/molecules/FormFields/NameField';
import { PhoneNumberField } from '@/components/common/molecules/FormFields/PhoneNumberField';
import { PasswordField } from '@/components/common/molecules/FormFields/PasswordField';
import { VerificationCodeField } from '@/components/common/molecules/FormFields/VerificationCodeField';
import { VerificationCountdown } from '@/components/common/molecules/FormFields/VerificationCountdown';
import { TextareaField } from '@/components/common/molecules/FormFields/TextareaField';
import { CharacterCount } from '@/components/common/molecules/FormFields/CharacterCount';

function FieldExamples({
  onSave,
}: {
  onSave: (value: Record<string, FormDataEntryValue>) => void;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (name) onSave(Object.fromEntries(new FormData(event.currentTarget)));
  };

  return (
    <form noValidate onSubmit={submit}>
      <Stack gap="4" maxW="500px">
        <NameField
          id="example-name"
          variant="boxed"
          required
          error={submitted && !name ? '이름을 입력해 주세요.' : undefined}
          inputProps={{
            name: 'name',
            value: name,
            onChange: (event) => setName(event.target.value),
          }}
        />
        <PhoneNumberField
          id="example-phone"
          variant="boxed"
          inputProps={{
            name: 'phone',
            type: 'tel',
            value: phone,
            onChange: (event) => setPhone(event.target.value),
          }}
        />
        <PasswordField
          id="example-password"
          variant="boxed"
          inputProps={{
            name: 'password',
            value: password,
            autoComplete: 'new-password',
            onChange: (event) => setPassword(event.target.value),
          }}
        />
        <VerificationCodeField
          id="example-code"
          variant="boxed"
          inputProps={{
            name: 'code',
            value: code,
            onChange: (event) => setCode(event.target.value),
          }}
        />
        <VerificationCountdown secondsLeft={180} />
        <TextareaField
          id="example-body"
          label="문의 내용"
          variant="boxed"
          inputProps={{
            multiline: true,
            name: 'body',
            value: body,
            maxLength: 250,
            onChange: (event) => setBody(event.target.value),
          }}
        />
        <CharacterCount length={body.length} limit={250} />
        <Button type="submit">확인</Button>
      </Stack>
    </form>
  );
}

const meta = {
  title: 'Molecules/FormFields',
  component: FieldExamples,
  args: { onSave: fn() },
} satisfies Meta<typeof FieldExamples>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '확인' }));
    const name = canvas.getByLabelText('* 이름');
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await expect(name).toHaveAccessibleDescription('이름을 입력해 주세요.');
    await userEvent.type(name, '홍길동');
    await expect(name).not.toHaveAttribute('aria-invalid');
    await userEvent.type(canvas.getByLabelText('휴대폰 번호'), '010-1234-5678');
    await userEvent.type(canvas.getByLabelText('비밀번호', { selector: 'input' }), 'Hoka12345!');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 보기' }));
    await expect(canvas.getByLabelText('비밀번호', { selector: 'input' })).toHaveAttribute(
      'type',
      'text',
    );
    await userEvent.type(canvas.getByLabelText('인증번호'), '1234567');
    await expect(canvas.getByLabelText('인증번호')).toHaveValue('123456');
    await expect(canvas.getByText('남은 시간 03:00초')).toBeVisible();
    await userEvent.type(canvas.getByLabelText('문의 내용'), '내용');
    await expect(canvas.getByText('2/250')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: '확인' }));
    await expect(args.onSave).toHaveBeenCalledWith({
      name: '홍길동',
      phone: '010-1234-5678',
      password: 'Hoka12345!',
      code: '123456',
      body: '내용',
    });
  },
};
