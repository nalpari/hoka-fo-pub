'use client';

import { useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';

export type AddressSearchModalProps = {
  open: boolean;
  postalCode: string;
  address: string;
  idPrefix?: string;
  onOpenChange: (open: boolean) => void;
  onPostalCodeChange: (value: string) => void;
  onAddressChange: (value: string) => void;
};

export function AddressSearchModal({
  open,
  postalCode,
  address,
  idPrefix = 'address-search',
  onOpenChange,
  onPostalCodeChange,
  onAddressChange,
}: AddressSearchModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const postalCodeId = `${idPrefix}-postalCode-dialog`;

  const addressId = `${idPrefix}-address-dialog`;

  return (
    <SingleActionDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setSubmitted(false);
        onOpenChange(nextOpen);
      }}
      title="우편번호 찾기"
      closeLabel="우편번호 찾기 닫기"
      onConfirm={() => {
        setSubmitted(true);
        if (!postalCode.trim() || !address.trim()) return;
        setSubmitted(false);
        onOpenChange(false);
      }}
    >
      <Stack>
        <Typography as="p" variant="body4">
          주소 검색 서비스 연결 전입니다. 미리보기 우편번호와 주소를 직접 입력해주세요.
        </Typography>
        <FormField
          variant="boxed"
          htmlFor={postalCodeId}
          label="우편번호"
          required
          error={submitted && !postalCode.trim() ? '우편번호를 입력해 주세요.' : undefined}
        >
          <TextInput
            id={postalCodeId}
            type="text"
            value={postalCode}
            placeholder="우편번호를 입력해주세요"
            autoComplete="off"
            onChange={(event) => onPostalCodeChange(event.target.value)}
          />
        </FormField>
        <FormField
          variant="boxed"
          htmlFor={addressId}
          label="주소"
          required
          error={submitted && !address.trim() ? '주소를 입력해 주세요.' : undefined}
        >
          <TextInput
            id={addressId}
            type="text"
            value={address}
            placeholder="주소를 입력해주세요"
            autoComplete="off"
            onChange={(event) => onAddressChange(event.target.value)}
          />
        </FormField>
      </Stack>
    </SingleActionDialog>
  );
}
