import { expect, userEvent, within, waitFor } from 'storybook/test';

export async function enterAddress(canvasElement: HTMLElement) {
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
