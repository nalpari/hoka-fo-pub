'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { NumberStepper } from '@/components/common/atoms/NumberStepper';
import { Typography } from '@/components/common/atoms/Typography';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { OrderHistoryProduct } from '@/components/orders/OrderHistoryProduct';
import type { OrderRecord } from '@/components/orders/orders.types';

/** [ 개발팀 바인딩 ] order는 현재 선택한 주문 표시 데이터다. 선택 상품 key·수량·사유·상세내용은 로컬 초안이며 금액은 고정 시안 값이다. 실제 취소·반품 API와 계산은 미연결이다. 연결 소유자는 order.id와 선택 상품 payload를 제출하고 pending/실패/재시도·성공 후 목록 갱신을 구현해야 한다. 신청 버튼은 요청이나 완료 이동을 실행하지 않는다. */
/** 선택한 주문의 취소·반품 신청 초안을 표시합니다. (Displays a markup-only cancellation or return request for the selected order.) */
export function OrderClaimRequest({
  order,
  kind = 'cancel',
  onClose,
}: {
  order: OrderRecord;
  kind?: 'cancel' | 'return';
  onClose: () => void;
}) {
  const returning = kind === 'return';
  const mobile = usePlatform() === 'mobile';
  const title = returning ? '환불(반품) 신청' : '주문 취소 신청';
  const name = returning ? '반품' : '취소';
  const [selected, setSelected] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [reason, setReason] = useState(returning ? 'damage' : 'mind');
  const [details, setDetails] = useState(
    returning ? '스크래치가 있어서 반품하고 환불 신청합니다.' : '',
  );

  const content = (
    <Stack gap="16px">
      <Typography variant="body4" tone="subtle">
        {returning ? '환불할 상품과 수량을 선택해주세요.' : '취소할 상품과 수량을 선택해주세요.'}
        <br />
        {returning
          ? '상품을 회수한 뒤 결제 금액이 환불됩니다. (반품 접수)'
          : '일부만 취소(부분취소)할 수 있으며, 배송비는 주문의 남은 상품이 모두 취소될 때 함께 환불됩니다.'}
      </Typography>
      <Stack gap="12px">
<Typography as="h2" variant="body3Semibold">
          상품 선택
        </Typography>
        <Stack gap="0" borderY="1px solid black">
          {order.items.map((line) => (
            <HStack
              key={line.key}
              gap="16px"
              py="16px"
              alignItems="flex-start"
              borderBottom="1px solid var(--colors-black-20)"
            >
              <Checkbox
                label=""
                aria-label={`${line.name} ${line.key} ${name} 선택`}
                checked={selected.includes(line.key)}
                onCheckedChange={(checked) =>
                  setSelected((previous) =>
                    checked ? [...previous, line.key] : previous.filter((key) => key !== line.key),
                  )
                }
              />
              <Stack flex="1" minW="0" gap="16px">
                <OrderHistoryProduct
                  line={line}
                  imageSize="claim"
                  showAmount={false}
                  showQuantity
                />
                {!returning ? (
                  <Box pl="112px" _mobile={{ pl: '0' }}>
                    <NumberStepper
                      value={quantities[line.key] ?? 1}
                      min={1}
                      max={line.quantity}
                      ariaLabel={`${line.name} ${line.key} ${name} 수량`}
                      onChange={(value) =>
                        setQuantities((previous) => ({ ...previous, [line.key]: value }))
                      }
                    />
                  </Box>
                ) : null}
              </Stack>
            </HStack>
          ))}
        </Stack>
      </Stack>
      <Stack gap="8px" py="8px">
        <Dropdown
          ariaLabel={`${name} 사유`}
          layer="modal"
          name={`${kind}Reason`}
          label="사유"
          required
          value={reason}
          onValueChange={setReason}
          options={[
            ...(returning
              ? [
                  { value: 'damage', label: '상품불량/파손' },
                  { value: 'wrong', label: '오배송' },
                  { value: 'missing', label: '구성품 누락' },
                ]
              : []),
            { value: 'mind', label: '상품이 마음에 들지 않음 (단순변심)' },
            { value: 'size', label: '사이즈가 맞지 않음' },
            { value: 'delay', label: '배송 지연' },
            { value: 'other', label: '기타' },
          ]}
        />
        <TextFormField
          id={`${kind}-details`}
          label="* 상세내용 (선택)"
          variant="boxed"
          renderControl={(control) => (
            <Stack w="100%" gap="8px">
              {control}
              <Typography variant="body5" tone="tertiary" className={css({ textAlign: 'right' })}>
                {details.length} / 250
              </Typography>
            </Stack>
          )}
          inputProps={{
            multiline: true,
            rows: 5,
            maxLength: 250,
            value: details,
            onChange: (event) => setDetails(event.target.value),
            placeholder: '자세한 내용을 적어주시면 처리에 도움이 됩니다.',
          }}
        />
        <Typography variant="body5" tone="tertiary">
          {returning
            ? '*단순 변심·주문 실수 등 고객님 사유의 반품는 반품비 5,000원을 부담하셔야 하며 환불 금액에서 차감됩니다. 상품 불량/파손·오배송·구성품 누락 등 회사 사유는 반품 비가 무료입니다. 상품 수령 후 7일 이내에 신청할 수 있으며, 접수 후 회수 일정은 안내해 드립니다. 착용하거나 세탁한 상품은 반품이 어렵습니다.'
            : '*단순 변심·주문 실수 등 고객님 사유의 취소는 반품비 5,000원을 부담하셔야 하며 환불 금액에서 차감됩니다. 배송 지연 등 회사 사유는 반품비가 무료입니다.'}
        </Typography>
      </Stack>
      <Stack gap="0" border="1px solid var(--colors-black-20)">
        <Stack gap="12px" px="16px" py="20px">
          {[
            ['상품금액', returning && mobile ? '0원' : '3,350,000원'],
            ['반품비', returning ? '사유 선택 후 확인' : '- 5,000원'],
          ].map(([label, value]) => (
            <HStack key={label} justifyContent="space-between">
              <Typography variant="body4">{label}</Typography>
<Typography
                variant="body4Medium"
                tone={returning && label === '반품비' ? 'subtle' : 'primary'}
              >
                {value}
              </Typography>
            </HStack>
          ))}
        </Stack>
        <HStack
          justifyContent="space-between"
          px="16px"
          py="20px"
          bg="black.10"
          borderTop="1px solid var(--colors-black-20)"
        >
<Typography variant="body4Medium">
            {returning ? '환불예정금액' : '취소예정금액'}
          </Typography>
          <HStack gap="2px" alignItems="baseline">
            <Typography web="heading10" mo="heading7" weight="semibold">
              {returning && mobile ? '0' : '3,300,000'}
            </Typography>
<Typography variant="body3Medium">
              원
            </Typography>
          </HStack>
        </HStack>
      </Stack>
    </Stack>
  );

  return (
    <ModalDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title={title}
      closeLabel={`${title} 닫기`}
      size="sm"
      mobilePresentation="bottomSheet"
      popupClassName={css({ '& > div': { p: '24px!' } })}
      headerProps={{
        css: css.raw({
          h: '56px',
          flexShrink: '0',
          bg: 'white.0',
          borderBottom: '1px solid var(--colors-black-20)',
        }),
      }}
      footerProps={{
        css: css.raw({
          '& > button': { w: '160px', '--button-height': '48px' },
          _mobile: {
            pt: '16px',
            pb: '32px',
            borderTop: '1px solid token(colors.black.20)',
            '& > button': { w: '100%' },
          },
        }),
      }}
      footer={
        <Button
          variant="primary"
          size="tall"
          fullWidth
          type="button"
          className={css({ w: '160px!', _mobile: { w: '100%!' } })}
        >
          신청하기
        </Button>
      }
    >
      {content}
    </ModalDialog>
  );
}
