/**
 * [개발팀 바인딩]
 * inputProps.value/onChange에 부모의 입력 초안을 연결하고 fieldProps.error/invalid에 서버 또는 입력 검증 오류를 전달합니다.
 * 실제 제출은 부모 form에서 처리합니다. Base UI 선택기 등은 name만 보고 FormData 수집을 가정하지 말고 해당 제어값을 제출 payload에 명시합니다.
 */

import type { ReactNode } from 'react';

import { FormField, type FormFieldProps } from '@/components/common/atoms/FormField';
import { TextInput, type TextInputProps } from '@/components/common/atoms/TextInput';

export type TextFormFieldProps = Omit<FormFieldProps, 'htmlFor' | 'children'> & {
  id: string;
  inputProps: TextInputProps;
  renderControl?: (control: ReactNode) => ReactNode;
};

export type SingleLineFormFieldProps = Omit<TextFormFieldProps, 'inputProps'> & {
  inputProps: Extract<TextInputProps, { multiline?: false }>;
};

export type MultilineFormFieldProps = Omit<TextFormFieldProps, 'inputProps'> & {
  inputProps: Extract<TextInputProps, { multiline: true }>;
};

/** 부모 입력 상태와 오류를 제목이 연결된 필드로 표시합니다. (Displays parent-owned input state and errors in a labelled field.) */
export function TextFormField({
  id,
  inputProps,
  renderControl,
  ...fieldProps
}: TextFormFieldProps) {
  const control = <TextInput {...inputProps} id={id} />;

  return (
    <FormField {...fieldProps} htmlFor={id}>
      {renderControl ? renderControl(control) : control}
    </FormField>
  );
}
