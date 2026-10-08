'use client';

import {
  useRef,
  useState,
  type CSSProperties,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { css } from 'styled-system/css';
import { useFormFieldContext } from '@/shared/components/atoms/FormField/FormField';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faEye, faEyeSlash, faXmark } from '@/shared/icons/fontAwesome';

const textInput = css({
  minH: 'var(--field-height, 42px)',
  border:
    'var(--field-border-width, 1px) solid var(--field-border-color, var(--color-field-border))',
  borderRadius: 'var(--field-radius, var(--radius-sm))',
  px: 'var(--field-padding-x, 12px)',
  bg: 'var(--field-bg, var(--color-field-bg))',
  color: 'var(--field-color, var(--color-field-text))',
  width: '100%',
  _focusVisible: {
    outline: '2px solid var(--color-focus-ring, var(--focus-ring))',
    outlineOffset: '2px',
  },
  _disabled: { opacity: '0.6', cursor: 'not-allowed' },
});

const boxedControl = css({
  '&&': {
    border: '0',
    borderRadius: '0',
    p: '0',
    minH: '21px',
    h: '21px',
    minW: '0',
    flex: '1',
    bg: 'transparent',
    fontFamily: 'korean',
    fontSize: '16',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'korean',
    color: 'black.100',
    outline: 'none',
    _placeholder: { color: 'black.50' },
    _disabled: { opacity: '1', color: 'black.40' },
  },
});

const textareaControl = css({ '&&': { h: 'auto', minH: '84px', resize: 'vertical' } });

const row = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  minW: '0',
  flex: '1',
  w: '100%',
});

const icon = css({ display: 'block', flexShrink: '0', w: '16px', h: '16px' });

const action = css({
  display: 'flex',
  alignItems: 'center',
  flexShrink: '0',
  border: '0',
  p: '0',
  bg: 'transparent',
  color: 'black.60',
  cursor: 'pointer',
  _focusVisible: { outline: '2px solid black', outlineOffset: '2px' },
  _disabled: { cursor: 'not-allowed' },
});

type ControlProps = {
  invalid?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
};

export type TextInputProps = ControlProps &
  (
    | (InputHTMLAttributes<HTMLInputElement> & { multiline?: false; ref?: Ref<HTMLInputElement> })
    | (TextareaHTMLAttributes<HTMLTextAreaElement> & {
        multiline: true;
        ref?: Ref<HTMLTextAreaElement>;
      })
  );

/** Native text control; FormField owns labels, hints, validation, and boxed presentation. */
export function TextInput({
  className,
  style,
  invalid = false,
  fullWidth = false,
  startIcon,
  endIcon,
  clearable = false,
  onClear,
  ref: forwardedRef,
  multiline,
  ...props
}: TextInputProps) {
  const field = useFormFieldContext();
  const controlRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [visible, setVisible] = useState(false);
  const hasError = invalid || Boolean(field?.invalid);
  const disabled = props.disabled || field?.disabled;
  const password =
    !multiline && (props as InputHTMLAttributes<HTMLInputElement>).type === 'password';
  const describedBy =
    [props['aria-describedby'], field?.describedBy].filter(Boolean).join(' ') || undefined;
  const setRef = (element: HTMLInputElement | HTMLTextAreaElement | null) => {
    controlRef.current = element;
    const ref = forwardedRef as Ref<HTMLInputElement | HTMLTextAreaElement>;
    if (typeof ref === 'function') ref(element);
    else if (ref) ref.current = element;
  };
  const clear = () => {
    const element = controlRef.current;
    if (!element) return;
    const prototype = multiline ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value')?.set?.call(element, '');
    element.dispatchEvent(new Event('input', { bubbles: true }));
    onClear?.();
    element.focus();
  };
  const commonProps = {
    id: props.id ?? field?.htmlFor,
    required: props.required ?? field?.required,
    disabled,
    'aria-invalid': hasError || props['aria-invalid'] || undefined,
    'aria-describedby': describedBy,
    'data-invalid': hasError ? 'true' : undefined,
    style: {
      '--field-height': '42px',
      '--field-border-width': '1px',
      '--field-border-color': hasError
        ? 'var(--color-danger-border, var(--color-error))'
        : 'var(--color-field-border)',
      '--field-radius': 'var(--radius-sm)',
      '--field-bg': 'var(--color-field-bg)',
      '--field-color': 'var(--color-field-text)',
      width: fullWidth ? '100%' : undefined,
      ...style,
    } as CSSProperties,
    className: [
      textInput,
      field?.boxed ? boxedControl : '',
      multiline ? textareaControl : '',
      className,
    ]
      .filter(Boolean)
      .join(' '),
  };
  const control = multiline ? (
    <textarea
      {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      {...commonProps}
      ref={setRef}
    />
  ) : (
    <input
      {...(props as InputHTMLAttributes<HTMLInputElement>)}
      {...commonProps}
      ref={setRef}
      type={password && visible ? 'text' : (props as InputHTMLAttributes<HTMLInputElement>).type}
    />
  );

  if (!startIcon && !endIcon && !password && !clearable) return control;

  return (
    <div className={row}>
      {startIcon ? <span className={icon}>{startIcon}</span> : null}
      {control}
      {password ? (
        <button
          type="button"
          disabled={disabled}
          aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
          aria-pressed={visible}
          className={action}
          onClick={() => setVisible(!visible)}
        >
          <Icon fontAwesomeIcon={visible ? faEyeSlash : faEye} size="16px" />
        </button>
      ) : clearable ? (
        <button
          type="button"
          disabled={disabled || props.readOnly}
          aria-label="입력 지우기"
          className={action}
          onClick={clear}
        >
          <Icon fontAwesomeIcon={faXmark} size="16px" />
        </button>
      ) : null}
      {endIcon}
    </div>
  );
}
