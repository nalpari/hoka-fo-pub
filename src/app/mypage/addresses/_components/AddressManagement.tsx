'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { FormActionGroup } from '@/components/common/molecules/FormActionGroup';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { AddressFields } from '@/components/common/organisms/Address/AddressFields';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { type Address } from '@/types/mypage-address.types';

/** 배송지 편집 입력과 저장 액션을 표시합니다. (Displays address editing fields and save actions.) */
export function AddressEditor({
  editingId,
  draft,
  fieldError,
  update,
  save,
  onCancel,
  addressOpen,
  onAddressOpenChange,
}: {
  editingId: number | 'new';
  draft: Address;
  fieldError: (
    key: 'recipient' | 'name' | 'phone' | 'zip' | 'address' | 'detail',
  ) => string | undefined;
  update: <K extends keyof Address>(key: K, value: Address[K]) => void;
  save?: () => void;
  onCancel: () => void;
  addressOpen: boolean;
  onAddressOpenChange: (open: boolean) => void;
}) {
  const mobile = usePlatform() === 'mobile';

  return (
    <ContentSection
      gap="8"
      _mobile={{ gap: '6', pt: '6' }}
      title={<>{editingId === 'new' ? '배송지 추가' : '배송지 수정'}</>}
      headerProps={{
        titleAs: 'h1',
        titleProps: { web: 'headingKr6', mo: 'headingKr5' },
        pb: '10',
        borderBottom: '2px solid black',
        _mobile: { pb: '0', borderBottom: '0' },
      }}
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          save?.();
        }}
      >
        <Stack gap="12" _mobile={{ gap: '6' }}>
          <Stack w="500px" maxW="100%" mx="auto" gap="6">
            <Stack gap="4">
              <TextFormField
                id="address-recipient"
                label="이름"
                required
                variant="boxed"
                error={fieldError('recipient')}
                inputProps={{
                  required: true,
                  placeholder: '이름을 입력해 주세요',
                  value: draft.recipient,
                  onChange: (event) => update('recipient', event.target.value),
                }}
              />
              <TextFormField
                id="address-name"
                label="배송지명"
                required
                variant="boxed"
                error={fieldError('name')}
                inputProps={{
                  required: true,
                  placeholder: '배송지명을 입력해 주세요',
                  value: draft.name,
                  onChange: (event) => update('name', event.target.value),
                }}
              />
              <TextFormField
                id="address-phone"
                label="휴대폰 번호"
                required
                variant="boxed"
                error={fieldError('phone')}
                inputProps={{
                  required: true,
                  type: 'tel',
                  placeholder: '- 없이 입력해 주세요',
                  value: draft.phone,
                  onChange: (event) => update('phone', event.target.value),
                }}
              />
              <TextFormField
                id="address-alternate-phone"
                label="다른 전화번호"
                variant="boxed"
                inputProps={{
                  type: 'tel',
                  placeholder: '- 없이 입력해 주세요',
                  value: draft.alternatePhone,
                  onChange: (event) => update('alternatePhone', event.target.value),
                }}
              />
              <AddressFields
                variant="boxed"
                idPrefix="mypage-address"
                searchLabel="우편번호 찾기"
                searchOpen={addressOpen}
                onSearchOpenChange={onAddressOpenChange}
                value={{
                  postalCode: draft.zip,
                  address: draft.address,
                  addressDetail: draft.detail,
                }}
                errors={{
                  postalCode: fieldError('zip'),
                  address: fieldError('address'),
                  addressDetail: fieldError('detail'),
                }}
                onValueChange={(field, value) =>
                  update(
                    field === 'postalCode'
                      ? 'zip'
                      : field === 'addressDetail'
                        ? 'detail'
                        : 'address',
                    value,
                  )
                }
                fieldOptions={{
                  postalCode: {
                    id: 'address-zip',
                    required: true,
                    disabled: false,
                    inputProps: {
                      required: true,
                      readOnly: true,
                      placeholder: '우편번호 찾기 버튼을 눌러주세요',
                    },
                  },
                  address: {
                    id: 'address-line',
                    required: true,
                    disabled: !draft.zip,
                    inputProps: {
                      required: true,
                      readOnly: true,
                      placeholder: '주소를 입력해 주세요',
                    },
                  },
                  addressDetail: {
                    id: 'address-detail',
                    required: true,
                    disabled: false,
                    inputProps: {
                      required: true,
                      placeholder: '상세주소를 입력해 주세요',
                      type: undefined,
                      autoComplete: undefined,
                    },
                  },
                }}
              />
            </Stack>
            <Box>
              <Checkbox
                checked={draft.isDefault}
                label="기본 배송지로 저장"
                onCheckedChange={(checked) => update('isDefault', checked)}
              />
            </Box>
          </Stack>
          {editingId === 'new' ? (
            <Box w="180px" mx="auto" _mobile={{ w: '100%' }}>
              <Button fullWidth size="tall" variant="primary" type="submit">
                {mobile ? '저장' : '배송지 추가'}
              </Button>
            </Box>
          ) : (
            <FormActionGroup
              onCancel={onCancel}
              submitLabel="변경사항 저장"
              size="tall"
              w="368px"
              maxW="100%"
              mx="auto"
              _mobile={{ w: '100%' }}
            />
          )}
        </Stack>
      </form>
    </ContentSection>
  );
}

/** 등록 배송지 목록과 관리 액션을 표시합니다. (Displays saved addresses and management actions.) */
export function AddressList({
  addresses,
  onEdit,
  onDelete,
  onAdd,
  more,
}: {
  addresses: readonly Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  more?: { counter: { current: number; total: number }; onLoadMore?: () => void };
}) {
  const mobile = usePlatform() === 'mobile';

  return (
    <Stack gap="6">
      <ContentSection
        title="배송지 관리"
        gap={addresses.length ? '8' : '0'}
        _mobile={{ gap: addresses.length ? '6' : '0' }}
        headerProps={{
          titleAs: 'h1',
          titleProps: { web: 'headingKr6', mo: 'headingKr5' },
          orientation: 'horizontal',
          alignItems: 'end',
          pb: '10',
          borderBottom: '2px solid black',
          _mobile: addresses.length ? { pb: '0', borderBottom: '0' } : { display: 'none' },
          action: addresses.length ? (
            <Button
              {...(mobile
                ? ({ size: 'md', variant: 'link' } as const)
                : ({ size: 'short', variant: 'secondary' } as const))}
              className={css({ flexShrink: '0' })}
              onClick={onAdd}
            >
              배송지 추가
            </Button>
          ) : null,
        }}
      >
        {addresses.length ? (
          <Stack
            gap="8"
            _mobile={{ gap: '6', pt: '6', borderTop: '1px solid var(--colors-black-20)' }}
          >
            {addresses.map((address) => (
              <Stack
                as="article"
                key={address.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap="6"
                pb="6"
                borderBottom="1px solid var(--colors-black-20)"
                _mobile={{ flexDirection: 'column', alignItems: 'stretch' }}
              >
                <Stack gap="8" minW="0" _mobile={{ gap: '3' }}>
                  <ContentHeader
                    title={address.name}
                    titleAs="h2"
                    titleProps={{ web: 'headingKr8', mo: 'headingKr6' }}
                    orientation="horizontal"
                    justifyContent="flex-start"
                    gap="3"
                    _mobile={{ gap: '2' }}
                    action={
                      address.isDefault ? (
                        <Badge
                          variant="line"
                          tone="primary"
                          className={css({
                            borderRadius: '2px',
                            px: '1',
                            py: '3px',
                            '& > span': {
                              fontSize: '14px',
                              lineHeight: '1.3!',
                              _mobile: { fontSize: '12px' },
                            },
                          })}
                        >
                          기본 배송지
                        </Badge>
                      ) : null
                    }
                  />
                  <Stack gap="3" _mobile={{ gap: '4' }}>
                    <Typography web="body3" mo="body4" language="en" tone="tertiary">
                      {address.phone}
                    </Typography>
                    <Stack direction="row" gap="1" _mobile={{ flexDirection: 'column' }}>
                      <Typography web="body3" mo="body4" language="en" tone="tertiary">
                        {address.zip}
                      </Typography>
                      <Typography web="body3" mo="body4" tone="tertiary">
                        {address.address} {address.detail}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  gap="2"
                  alignItems="end"
                  flexShrink="0"
                  _mobile={{ flexDirection: 'row', gap: '4', alignItems: 'start' }}
                >
                  <Button
                    {...(mobile
                      ? ({ size: 'md', variant: 'link' } as const)
                      : ({ size: 'short', variant: 'primary' } as const))}
                    onClick={() => onEdit(address)}
                  >
                    {mobile ? '수정' : '수정하기'}
                  </Button>
                  {!address.isDefault ? (
                    <Button
                      {...(mobile
                        ? ({ size: 'md', variant: 'link' } as const)
                        : ({ size: 'short', variant: 'secondary' } as const))}
                      onClick={() => onDelete(address.id)}
                    >
                      {mobile ? '삭제' : '삭제하기'}
                    </Button>
                  ) : null}
                </Stack>
              </Stack>
            ))}
          </Stack>
        ) : (
          <EmptyState
            variant="page"
            layoutProps={css.raw({
              minH: '795px',
              pt: '160px',
              pb: '0',
              justifyContent: 'flex-start',
              _mobile: {
                mt: '-24px',
                py: '0',
                minH: 'calc(100svh - var(--layout-site-header-height) - 106px)',
                justifyContent: 'center',
              },
            })}
            titleProps={{ as: 'p', web: 'headingKr7', mo: 'headingKr5' }}
            title="자주 쓰는 배송지 주소를 설정해주세요."
            description={
              mobile
                ? '자주 쓰는 배송지 주소를 저장하시면 보다 편리하게 이용이 가능합니다.'
                : '자주 쓰는 배송지 주소를 설정해주세요. 자주 쓰는 배송지 주소를 저장하시면 보다 편리하게 이용이 가능합니다.'
            }
            descriptionProps={{ web: 'body3', mo: 'body4' }}
            action={
              <Box w="180px" _mobile={{ w: '322px', maxW: '100%' }}>
                <Button fullWidth size="tall" variant="primary" onClick={onAdd}>
                  배송지 추가
                </Button>
              </Box>
            }
          />
        )}
      </ContentSection>
      {addresses.length > 0 && more ? (
        <Button
          fullWidth
          variant="secondary"
          size="short"
          className={css({
            alignSelf: 'center',
            w: '160px',
            _mobile: { w: '100%' },
            '&&:disabled > span': {
              bg: 'white!',
              color: 'black.100!',
              boxShadow: 'inset 0 0 0 1px var(--color-black-100)!',
            },
          })}
          loadMore={{ counter: more.counter, labelProps: { variant: 'ctaKr2' } }}
          onClick={more.onLoadMore}
          disabled={!more.onLoadMore}
        />
      ) : null}
    </Stack>
  );
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  pending?: boolean;
  error?: string;
};

/** 배송지 삭제 확인과 요청 상태를 표시합니다. (Displays address deletion confirmation and request status.) */
export function MyPageAddressDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  pending,
  error,
}: Props) {
  return (
    <ModalDialog
      closeLabel="배송지 삭제 확인창 닫기"
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="배송지 관리"
      actions={{ kind: 'confirm', onConfirm, confirmDisabled: pending }}
    >
      <Typography as="p" variant="body3">
        배송지를 삭제 하시겠습니까?
      </Typography>
      {error && <Typography role="alert">{error}</Typography>}
    </ModalDialog>
  );
}

export const initialAddresses: Address[] = [
  {
    id: 1,
    recipient: '홍길동',
    name: '우리집',
    phone: '010-8005-6605',
    alternatePhone: '',
    zip: '02157',
    address: '서울시 성북구 테헤란로 27길 54',
    detail: '테헤란 아파트 701호',
    isDefault: true,
  },
  {
    id: 2,
    recipient: '홍길동',
    name: '직장',
    phone: '010-8005-6605',
    alternatePhone: '',
    zip: '02157',
    address: '서울시 성북구 테헤란로 27길 54',
    detail: '테헤란 아파트 701호',
    isDefault: false,
  },
];

export const emptyAddress: Address = {
  id: 0,
  recipient: '',
  name: '',
  phone: '',
  alternatePhone: '',
  zip: '',
  address: '',
  detail: '',
  isDefault: false,
};
