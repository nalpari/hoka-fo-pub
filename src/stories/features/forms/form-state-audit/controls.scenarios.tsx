import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '@/components/common/atoms/Button/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox/Checkbox';
import { Dropdown } from '@/components/common/atoms/Dropdown/Dropdown';
import { EmailSignupField } from '@/components/common/atoms/EmailSignupField/EmailSignupField';
import { FormField } from '@/components/common/atoms/FormField/FormField';
import { NumberStepper } from '@/components/common/atoms/NumberStepper/NumberStepper';
import { Radio } from '@/components/common/atoms/Radio/Radio';
import { RatingStars } from '@/components/common/atoms/RatingStars/RatingStars';
import { Select } from '@/components/common/atoms/Select/Select';
import { StatusMessage } from '@/components/common/atoms/StatusMessage/StatusMessage';
import { TextInput } from '@/components/common/atoms/TextInput/TextInput';

import { SizeSelector } from '@/components/common/molecules/SizeSelector/SizeSelector';

import { RangeInput } from '@/components/catalog/ProductListingPage';
import { type AuditStory as Story } from '@/stories/features/forms/form-state-audit/shared';

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
    <RatingStars key="rating" ariaLabel="별점" value={0} onValueChange={() => {}} />,
    <RangeInput key="range" aria-label="범위" value={10} onValueChange={() => {}} />,
    <NumberStepper key="number" ariaLabel="수량" value={1} onChange={() => {}} />,
    <Checkbox
      variant="consent"
      key="terms"
      checked={false}
      onCheckedChange={() => {}}
      label={<>동의</>}
    />,
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
