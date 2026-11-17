'use client';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 문의 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import { type RefObject, useState } from 'react';

import { Box, Flex, Stack, VStack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { Icon } from '@/components/common/atoms/Icon';
import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';
import { modalOrderLookupContentRecipe } from '@/components/common/layouts/ModalDialog.recipe';

import { type InquiryOrder, inquiryOrders } from '@/app/support/inquiries/new/inquiryOrders.data';
import { type InquiryOrderSelection } from '@/app/support/inquiries/new/inquiryOrders.data';
const periodOptions = [
  { value: '1y', label: '1년' },
  { value: '6m', label: '6개월' },
  { value: '3m', label: '3개월' },
  { value: '1m', label: '1개월' },
  { value: 'custom', label: '직접설정' },
] as const;
const classes = modalOrderLookupContentRecipe();

const styles = modalOrderLookupContentRecipe.raw();

export type InquiryLookupPreview = { empty?: boolean; period?: 'custom'; selected?: boolean };

/** 문의 대상 주문과 상품을 선택하는 모달입니다. (Selects an order and products for an inquiry.) */
export function InquiryOrderLookup({
  preview,
  initialSelection,
  onClose,
  onSelect,
  finalFocus,
}: {
  preview?: InquiryLookupPreview;
  initialSelection: InquiryOrderSelection;
  onClose: () => void;
  onSelect: (selection: NonNullable<InquiryOrderSelection>) => void;
  finalFocus: RefObject<HTMLButtonElement | null>;
}) {
  const [selection, setSelection] = useState<InquiryOrderSelection>(
    () =>
      initialSelection ??
      (preview?.selected
        ? { order: inquiryOrders[0], products: inquiryOrders[0].products.slice(0, 1) }
        : null),
  );
  const [period, setPeriod] = useState<(typeof periodOptions)[number]['value']>(
    preview?.period ?? '1y',
  );
  const [expandedOrder, setExpandedOrder] = useState<string | null>(
    initialSelection?.order.id ?? inquiryOrders[0]?.id ?? null,
  );
  const [visibleCount, setVisibleCount] = useState(5);
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-08-30');
  const filteredOrders = preview?.empty
    ? []
    : inquiryOrders.map((order, index) =>
        index === 0 ? { ...order, products: order.products.slice(0, 4) } : order,
      );
  const more =
    visibleCount < filteredOrders.length
      ? {
          counter: { current: visibleCount, total: filteredOrders.length },
          onLoadMore: () => setVisibleCount(filteredOrders.length),
        }
      : undefined;
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
  return (
    <ModalDialog
      variant="orderLookup"
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      finalFocus={finalFocus}
      title="주문 상품 조회"
      closeLabel="주문상품 조회 닫기"
      mobilePresentation="fullscreen"
      actions={{
        kind: 'confirm',
        fullWidth: false,
        buttonProps: { size: 'tall' },
        confirmLabel: '문의 등록',
        confirmDisabled: !selection,
        onConfirm: () => {
          if (selection) onSelect(selection);
        },
      }}
    >
      <Stack css={styles.root}>
        <Stack css={styles.intro}>
          <Typography variant="body4" className={classes.lead}>
            1:1 문의를 원하시는 주문번호 및 상품명을 선택해 주세요.
          </Typography>
          <Typography variant="body5" tone="tertiary" className={classes.note}>
            *문의 접수 시 한 건의 문의에는 하나의 주문번호만 선택하실 수 있습니다. 하나의 주문번호
            안에서는 여러 상품을 함께 선택하실 수 있습니다.
          </Typography>
        </Stack>

        <Stack css={styles.filters}>
          <FilterTabs
            ariaLabel="주문 조회 기간"
            value={period}
            onValueChange={setPeriod}
            options={periodOptions}
            variant="fill"
            railClassName={classes.tabs}
            itemClassName={() => classes.tab}
          />
          {period === 'custom' && (
            <Flex css={styles.dateRange}>
              <input
                aria-label="조회 시작일"
                type="date"
                value={dateFrom}
                onChange={(event) => setDateFrom(event.target.value)}
                className={classes.dateInput}
              />
              <span>~</span>
              <input
                aria-label="조회 종료일"
                type="date"
                value={dateTo}
                onChange={(event) => setDateTo(event.target.value)}
                className={classes.dateInput}
              />
              <Button size="short" variant="secondary">
                조회
              </Button>
            </Flex>
          )}
          <Stack css={styles.results}>
            <Flex css={styles.count}>
              <Typography variant="body4">
                총{' '}
                <Typography variant="body3" language="en" className={classes.countNumber}>
                  {filteredOrders.length}
                </Typography>
                건
              </Typography>
            </Flex>
            <Stack css={styles.orders}>
              {filteredOrders.slice(0, visibleCount).map((order) => {
                const isExpanded = expandedOrder === order.id;
                const isSelected = selection?.order.id === order.id;
                return (
                  <Box key={order.id} css={styles.order}>
                    <Flex css={styles.orderHeader} data-expanded={isExpanded}>
                      <Radio
                        ariaLabel="주문번호"
                        value={selection?.order.id ?? ''}
                        onValueChange={() => selectOrder(order)}
                        options={[
                          {
                            value: order.id,
                            label: <span className={classes.hidden}>{order.id}</span>,
                          },
                        ]}
                      />
                      <Button
                        variant="plain"
                        fullWidth
                        type="button"
                        aria-expanded={isExpanded}
                        aria-label={`${order.id} 상품 목록 ${isExpanded ? '접기' : '펼치기'}`}
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className={classes.orderHeading}
                      >
                        <Stack as="span" css={styles.orderMeta}>
                          <Typography variant="body4" language="en" className={classes.date}>
                            {order.date}
                          </Typography>
                          <Typography
                            variant="body5"
                            tone="tertiary"
                            className={classes.orderNumber}
                          >
                            주문번호 {order.id}
                          </Typography>
                        </Stack>
                        <Icon
                          name={
                            isExpanded
                              ? 'hoka-nav-chevron-up-regular'
                              : 'hoka-nav-chevron-down-regular'
                          }
                          size={16}
                        />
                      </Button>
                    </Flex>
                    {isExpanded && (
                      <Stack css={styles.items}>
                        <Typography variant="body5" className={classes.itemCount}>
                          {order.products.length}개 상품
                        </Typography>
                        {order.products.map((item) => (
                          <Flex key={item.id} css={styles.product}>
                            <Checkbox
                              label={
                                <span className={classes.hidden}>
                                  {item.code} {item.name} 선택
                                </span>
                              }
                              disabled={!isSelected}
                              checked={Boolean(
                                selection?.products.some((product) => product.id === item.id),
                              )}
                              onCheckedChange={(checked) => toggleProduct(order, item.id, checked)}
                            />
                            <Box css={styles.summary}>
                              <OrderProductSummary
                                variant="cart"
                                image={item.image}
                                name={item.name}
                                imageSize={{ web: 64, mobile: 64 }}
                                content={
                                  <div className={classes.productText}>
                                    <Typography
                                      variant="body4"
                                      language="en"
                                      className={classes.productName}
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body5"
                                      language="ko"
                                      className={classes.productOptions}
                                    >{`${item.color}, ${item.size}, ${item.quantity}개`}</Typography>
                                  </div>
                                }
                              />
                            </Box>
                            {item.statusLabel && (
                              <Badge
                                className={classes.badge}
                                variant={item.statusLabel === '결제완료' ? 'line' : 'filled'}
                                tone={item.statusLabel === '구매확정' ? 'tertiary' : 'primary'}
                              >
                                {item.statusLabel}
                              </Badge>
                            )}
                          </Flex>
                        ))}
                      </Stack>
                    )}
                  </Box>
                );
              })}
            </Stack>
            {filteredOrders.length === 0 && (
              <Flex css={styles.empty}>
                <Typography variant="body4" tone="tertiary">
                  조회된 주문 내역이 없습니다.
                </Typography>
              </Flex>
            )}
            {more ? (
              <VStack css={styles.more}>
                <Button
                  variant="plain"
                  size="lg"
                  onClick={more.onLoadMore}
                  disabled={!more.onLoadMore}
                  loadMore={{ counter: more.counter }}
                />
              </VStack>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
    </ModalDialog>
  );
}
