import type { DropdownProps } from '@/shared/components/atoms/Dropdown/Dropdown';
import { Dropdown } from '@/shared/components/atoms/Dropdown/Dropdown';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { TextFormField } from '@/shared/components/molecules/FormFields/TextFormField';

type Props = {
  idPrefix: string;
  local: string;
  domain: string;
  domainChoice: string;
  errors: { local?: string; domain?: string };
  options: DropdownProps['options'];
  onLocalChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  onDomainChoice: (value: string) => void;
};

export function EmailAddressFields({
  idPrefix,
  local,
  domain,
  domainChoice,
  errors,
  options,
  onLocalChange,
  onDomainChange,
  onDomainChoice,
}: Props) {
  const disabled = domainChoice !== 'direct';

  return (
    <>
      <TextFormField
        id={`${idPrefix}-email`}
        variant="boxed"
        error={errors.local || undefined}
        invalid={Boolean(errors.local)}
        disabled={false}
        label={<Typography variant="body5">* {'이메일 주소'}</Typography>}
        inputProps={{
          type: 'text',
          disabled: false,
          value: local,
          placeholder: '이메일 주소를 입력해주세요.',
          autoComplete: 'off',
          onChange: (event) => onLocalChange(event.target.value),
        }}
      />
      <TextFormField
        id={`${idPrefix}-domain`}
        variant="boxed"
        error={errors.domain || undefined}
        invalid={Boolean(errors.domain)}
        disabled={disabled}
        label={<Typography variant="body5">* {'도메인'}</Typography>}
        inputProps={{
          type: 'text',
          disabled,
          disabledAppearance: disabled ? 'muted' : 'default',
          value: domain,
          placeholder: '도메인을 입력해주세요',
          autoComplete: 'off',
          onChange: (event) => onDomainChange(event.target.value),
        }}
      />
      <Dropdown
        ariaLabel="이메일 도메인 선택"
        label="직접입력"
        required
        value={domainChoice}
        onValueChange={onDomainChoice}
        options={options}
      />
    </>
  );
}
