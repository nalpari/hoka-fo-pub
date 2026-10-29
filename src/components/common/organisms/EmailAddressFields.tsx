/**
 * [개발팀 바인딩]
 * local/domain/domainChoice와 각 변경 콜백은 부모의 이메일 초안입니다. 제출 시 부모가 local@domain으로 조합하고 서버에서 최종 검증합니다.
 * 직접 입력과 도메인 선택을 전환할 때 domainChoice뿐 아니라 실제 domain 값도 함께 갱신합니다. 이 필드는 저장 요청을 하지 않습니다.
 */

import type { DropdownProps } from '@/components/common/atoms/Dropdown';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { Typography } from '@/components/common/atoms/Typography';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

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

/** 이메일 아이디와 도메인의 제어형 입력을 표시합니다. (Displays controlled email local-part and domain inputs.) */
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
