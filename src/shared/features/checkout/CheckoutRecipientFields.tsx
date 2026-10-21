import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import type { ShippingErrors } from './CheckoutShipping';

export function CheckoutRecipientFields({ errors }: { errors?: ShippingErrors }) {
  return (
    <>
      {(
        [
          {
            name: 'name',
            label: '받는 분',
            placeholder: '받으실 분의 이름을 입력해주세요',
            autoComplete: 'name',
          },
          {
            name: 'phone',
            label: '연락처',
            placeholder: '받으실 분의 연락처를 입력해주세요 (숫자만 가능)',
            autoComplete: 'tel',
          },
        ] as const
      ).map((input) => (
        <Stack key={input.name} gap="1" border="1px solid var(--colors-black-40)" p="3">
          <Typography as="label" htmlFor={`shipping-${input.name}`} variant="body5">
            * {input.label}
          </Typography>
          <TextInput
            appearance="compact"
            id={`shipping-${input.name}`}
            name={input.name}
            autoComplete={input.autoComplete}
            placeholder={input.placeholder}
            aria-invalid={Boolean(errors?.[input.name])}
            aria-describedby={errors?.[input.name] ? `shipping-${input.name}-error` : undefined}
          />
          {errors?.[input.name] ? (
            <Typography
              as="p"
              id={`shipping-${input.name}-error`}
              variant="body5"

              className={css({ color: 'red.100' })}
            >
              {errors[input.name]}
            </Typography>
          ) : null}
        </Stack>
      ))}
    </>
  );
}
