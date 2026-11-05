'use client';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 문의 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Flex, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { Icon } from '@/components/common/atoms/Icon';
import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { type InquiryOrder, inquiryOrders } from '@/app/support/inquiries/new/inquiryOrders.data';
import { type InquiryOrderSelection } from '@/app/support/inquiries/new/inquiryOrders.data';
import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';
const periodOptions = [
  { value: '1y', label: '1년' },
  { value: '6m', label: '6개월' },
  { value: '3m', label: '3개월' },
  { value: '1m', label: '1개월' },
  { value: 'custom', label: '직접설정' },
] as const;
const orderHeading = css({
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '2',
  p: '0',
  border: '0',
  bg: 'transparent',
  textAlign: 'left',
  cursor: 'pointer',
  minW: '0',
});
const visuallyHidden = css({ srOnly: true });
/** 문의 대상 주문을 조회하고 상품을 선택하는 전용 페이지입니다. (Provides the dedicated order and product selection page for inquiries.) */
export function InquiryOrderLookup({
  previewEmpty = false,
  preview,
}: {
  previewEmpty?: boolean;
  preview?: {
    period: '1y' | 'custom';
  };
}) {
  const platform = usePlatform();
  const [selection, setSelection] = useState<InquiryOrderSelection>(null);
  const [open, setOpen] = useState(true);
  const [period, setPeriod] = useState<(typeof periodOptions)[number]['value']>(
    preview?.period ?? '1y',
  );
  const [expandedOrder, setExpandedOrder] = useState<string | null>(inquiryOrders[0]?.id ?? null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-08-30');
  const filteredOrders = previewEmpty
    ? []
    : inquiryOrders.map((order, index) =>
        index === 0 ? { ...order, products: order.products.slice(0, 4) } : order,
      );
  const selectOrder = (order: InquiryOrder) => {
    if (selection?.order.id === order.id) {
      setSelection(null);
      return;
    }
    setSelection({ order, products: order.products });
    setExpandedOrder(order.id);
  };
  const toggleProduct = (order: InquiryOrder, productId: string, checked: boolean) => {
    setSelection((current) => {
      const products = current?.order.id === order.id ? current.products : [];
      const nextProducts = checked
        ? [...products, order.products.find((item) => item.id === productId)!]
        : products.filter((item) => item.id !== productId);
      return nextProducts.length > 0 ? { order, products: nextProducts } : null;
    });
  };
  const returnToInquiry = () => setOpen(false);
  const submitSelection = () => setOpen(false);
  const invalid = false;
  const loaded = true;
  const content = (
    <Stack gap={{ base: '6', _mobile: '4' }} pt={{ base: '10', _mobile: '6' }}>
      {platform === 'mobile' && (
        <Stack gap="2">
          <Typography variant="body4">
            1:1 문의를 원하시는 주문번호 및 상품명을 선택해 주세요.
          </Typography>
          <Typography variant="body5" tone="tertiary">
            *문의 접수 시 한 건의 문의에는 하나의 주문번호만 선택하실 수 있습니다. 하나의 주문번호
            안에서는 여러 상품을 함께 선택하실 수 있습니다.
          </Typography>
        </Stack>
      )}

      <Stack gap={{ base: '6', _mobile: '0' }}>
        <FilterTabs
          ariaLabel="주문 조회 기간"
          value={period}
          onValueChange={setPeriod}
          options={periodOptions}
          variant="fill"
          railClassName={css({ gap: '4px!' })}
          itemClassName={() => css({ px: '4!', '& span': { fontSize: '14px!' } })}
        />
        {period === 'custom' && (
          <Flex alignItems="center" gap="2" flexWrap={{ _mobile: 'wrap' }}>
            <input
              aria-label="조회 시작일"
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              className={css({ h: '10', border: '1px solid token(colors.black.40)', px: '2' })}
            />
            <span>~</span>
            <input
              aria-label="조회 종료일"
              type="date"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              className={css({ h: '10', border: '1px solid token(colors.black.40)', px: '2' })}
            />
            <Button size="short" variant="secondary">
              조회
            </Button>
          </Flex>
        )}
        <Flex justifyContent="flex-end">
          <Typography variant="body4">총 {filteredOrders.length}건</Typography>
        </Flex>
        <Stack gap="0" borderTop="1px solid token(colors.black.100)">
          {filteredOrders.slice(0, visibleCount).map((order) => {
            const isExpanded = expandedOrder === order.id;
            const isSelected = selection?.order.id === order.id;
            return (
              <Box key={order.id} borderBottom="1px solid token(colors.black.20)">
                <Flex alignItems="center" gap="4" p={{ base: '4', _mobile: '16px 8px 16px 0' }}>
                  <Radio
                    ariaLabel="주문번호"
                    value={selection?.order.id ?? ''}
                    onValueChange={() => selectOrder(order)}
                    options={[
                      {
                        value: order.id,
                        label: <span className={visuallyHidden}>{order.id}</span>,
                      },
                    ]}
                  />
                  <button
                    type="button"
                    aria-label={`${order.id} 상품 목록 ${isExpanded ? '접기' : '펼치기'}`}
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    className={orderHeading}
                  >
                    <Stack gap="2" alignItems="flex-start" minW="0" flex="1">
                      <Typography variant="body4" language="en">
                        {order.date}
                      </Typography>
                      <Typography variant="body5" tone="tertiary">
                        주문번호 {order.id}
                      </Typography>
                    </Stack>
                    <Icon
                      name={isExpanded ? 'hoka-action-minus-regular' : 'hoka-action-plus-regular'}
                      size={24}
                    />
                  </button>
                </Flex>
                {isExpanded && (
                  <Stack
                    gap={{ base: '0', _mobile: '4' }}
                    py={{ _mobile: '6' }}
                    borderTop="1px solid token(colors.black.20)"
                  >
                    <Typography variant="body5">{order.products.length}개 상품</Typography>
                    {order.products.map((item) => (
                      <Flex
                        key={item.id}
                        alignItems={{ base: 'center', _mobile: 'flex-start' }}
                        gap="3"
                        p={{ base: '4', _mobile: '0' }}
                        borderBottom="1px solid token(colors.black.20)"
                        _mobile={{ borderBottomWidth: '0' }}
                      >
                        <Checkbox
                          label={
                            <span className={visuallyHidden}>
                              {item.code} {item.name} 선택
                            </span>
                          }
                          disabled={!isSelected}
                          checked={Boolean(
                            selection?.products.some((product) => product.id === item.id),
                          )}
                          onCheckedChange={(checked) => toggleProduct(order, item.id, checked)}
                        />
                        <Box flex="1" minW="0">
                          <OrderProductSummary
                            variant="cart"
                            image={item.image}
                            name={item.name}
                            imageSize={{ web: 76, mobile: 64 }}
                            optionText={`${item.color} / ${item.size}, ${item.quantity}개`}
                            hideAmount
                          />
                        </Box>
                      </Flex>
                    ))}
                  </Stack>
                )}
              </Box>
            );
          })}
        </Stack>
        {filteredOrders.length === 0 && (
          <Flex justifyContent="center" py="10">
            <Typography variant="body4" tone="tertiary">
              조회된 주문 내역이 없습니다.
            </Typography>
          </Flex>
        )}
        {visibleCount < filteredOrders.length && (
          <Flex justifyContent="center">
            <Button
              variant="secondary"
              size="short"
              density="compact"
              loadMore={{
                counter: {
                  current: Math.min(visibleCount, filteredOrders.length),
                  total: filteredOrders.length,
                },
              }}
              disabled={false}
              onClick={() => setVisibleCount(filteredOrders.length)}
            />
          </Flex>
        )}
      </Stack>
      <Stack gap="4">
        <Typography
          variant="body5"
          tone={invalid ? 'error' : 'tertiary'}
          className={css({ _mobile: { display: invalid ? 'block' : 'none' } })}
        >
          {invalid
            ? '문의하실 주문 상품을 선택해주세요.'
            : '*문의 접수 시 한 건의 문의에는 하나의 주문번호만 선택하실 수 있습니다. 하나의 주문번호 안에서는 여러 상품을 함께 선택하실 수 있습니다.'}
        </Typography>
        <Flex justifyContent="center" gap="2">
          <Box w={{ base: '180px', _mobile: '50%' }}>
            <Button
              size="tall"
              variant="secondary"
              fullWidth
              disabled={!loaded}
              onClick={() => returnToInquiry()}
            >
              취소
            </Button>
          </Box>
          <Box w={{ base: '180px', _mobile: '50%' }}>
            <Button
              size="tall"
              variant="primary"
              fullWidth
              disabled={!loaded}
              onClick={submitSelection}
            >
              문의 등록
            </Button>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
  if (platform === 'mobile')
    return (
      <ModalDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
        }}
        title="주문상품 조회"
        closeLabel="주문상품 조회 닫기"
        mobilePresentation="fullscreen"
        headerProps={{
          css: css.raw({
            bg: 'white.0',
            borderBottom: '1px solid token(colors.black.20)',
            '& h2': { textAlign: 'center', flex: '1' },
          }),
        }}
        popupClassName={css({
          '&&': { borderRadius: '0', boxShadow: 'none' },
          '& > div:nth-child(2)': { p: '0px 16px 64px' },
        })}
      >
        {content}
      </ModalDialog>
    );
  return (
    <CustomerCenterLayout
      header={
        <ContentHeader
          gap="3"
          title="주문 상품 조회"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading5' }}
          description="1:1문의를 원하시는 주문번호 및 상품명을 선택해 주세요."
          descriptionProps={{ variant: 'body3' }}
        />
      }
      activePath="/support/inquiries"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '1:1 문의하기', href: '/support/inquiries' },
        { label: '1:1 문의등록', href: '/support/inquiries/new' },
        { label: '주문 상품 조회' },
      ]}
      groups={supportNavigation}
    >
      {content}
    </CustomerCenterLayout>
  );
}
