import type { Meta, StoryObj } from '@storybook/react';
import { type FormEvent, useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button/Button';

import { CharacterCount } from '@/components/common/molecules/FormFields/CharacterCount';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { VerificationCountdown } from '@/components/common/molecules/FormFields/VerificationCountdown';

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
        <TextFormField
          label="이름"
          id="example-name"
          variant="boxed"
          required
          error={submitted && !name ? '이름을 입력해 주세요.' : undefined}
          inputProps={{
            placeholder: '이름을 입력해 주세요',
            name: 'name',
            value: name,
            onChange: (event) => setName(event.target.value),
          }}
        />
        <TextFormField
          label="휴대폰 번호"
          id="example-phone"
          variant="boxed"
          inputProps={{
            placeholder: '휴대폰 번호를 입력해 주세요',
            name: 'phone',
            type: 'tel',
            value: phone,
            onChange: (event) => setPhone(event.target.value),
          }}
        />
        <TextFormField
          label="비밀번호"
          id="example-password"
          variant="boxed"
          inputProps={{
            placeholder: '비밀번호를 입력해 주세요',
            type: 'password',
            name: 'password',
            value: password,
            autoComplete: 'new-password',
            onChange: (event) => setPassword(event.target.value),
          }}
        />
        <TextFormField
          label="인증번호"
          id="example-code"
          variant="boxed"
          inputProps={{
            placeholder: '인증번호 6자리를 입력해 주세요',
            inputMode: 'numeric',
            autoComplete: 'one-time-code',
            maxLength: 6,
            name: 'code',
            value: code,
            onChange: (event) => setCode(event.target.value),
          }}
        />
        <VerificationCountdown secondsLeft={180} />
        <TextFormField
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
