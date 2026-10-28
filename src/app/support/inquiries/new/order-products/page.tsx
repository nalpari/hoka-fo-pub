'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { Box, Flex, Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox/Checkbox';
import { FilterTabs } from '@/components/common/atoms/FilterTabs/FilterTabs';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Radio } from '@/components/common/atoms/Radio/Radio';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/components/support/support.navigation';
import { inquiryOrders, type InquiryOrder } from '@/components/support/inquiryOrders.data';
import {
  readInquiryOrderDraft,
  clearInquiryOrderReturnMarker,
  saveInquiryOrderResult,
  shouldReturnToInquiry,
  type InquiryOrderSelection,
} from '@/components/support/inquiryOrderSelection.storage';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

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
  _mobile: { flexWrap: 'wrap' },
});

const visuallyHidden = css({ srOnly: true });

/** 문의 대상 주문을 조회하고 상품을 선택하는 전용 페이지입니다. (Provides the dedicated order and product selection page for inquiries.) */
export default function Page() {
  const router = useRouter();
  const [selection, setSelection] = useState<InquiryOrderSelection>(null);
  const [initialSelection, setInitialSelection] = useState<InquiryOrderSelection>(null);
  const [loaded, setLoaded] = useState(false);
  const [hasInquiryOrigin, setHasInquiryOrigin] = useState(false);
  const [period, setPeriod] = useState<(typeof periodOptions)[number]['value']>('1y');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(inquiryOrders[0]?.id ?? null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-08-30');
  const [customRange, setCustomRange] = useState({ from: '2026-01-01', to: '2026-08-30' });
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const pending = readInquiryOrderDraft();
    const hasInquiryOrigin = shouldReturnToInquiry();
    // The route must hydrate the browser-only selection before enabling its actions.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialSelection(pending);
    setSelection(pending);
    setExpandedOrder(pending?.order.id ?? inquiryOrders[0]?.id ?? null);
    setHasInquiryOrigin(hasInquiryOrigin);
    setLoaded(true);
  }, []);

  const periodMonths = { '1y': 12, '6m': 6, '3m': 3, '1m': 1 } as const;
  const filteredOrders = inquiryOrders.filter((order) => {
    if (period === 'custom') return order.date >= customRange.from && order.date <= customRange.to;
    const startDate = new Date(Date.UTC(2026, 9 - periodMonths[period], 26));
    return order.date >= startDate.toISOString().slice(0, 10) && order.date <= '2026-10-26';
  });

  const selectOrder = (order: InquiryOrder) => {
    if (selection?.order.id === order.id) {
      setSelection(null);
      return;
    }
    setSelection({ order, products: order.products });
    setExpandedOrder(order.id);
    setInvalid(false);
  };

  const toggleProduct = (order: InquiryOrder, productId: string, checked: boolean) => {
    setSelection((current) => {
      const products = current?.order.id === order.id ? current.products : [];
      const nextProducts = checked
        ? [...products, order.products.find((item) => item.id === productId)!]
        : products.filter((item) => item.id !== productId);
      return nextProducts.length > 0 ? { order, products: nextProducts } : null;
    });
    setInvalid(false);
  };

  const returnToInquiry = (nextSelection: InquiryOrderSelection) => {
    saveInquiryOrderResult(nextSelection);
    if (hasInquiryOrigin) {
      clearInquiryOrderReturnMarker();
      router.back();
    } else {
      router.push('/support/inquiries/new');
    }
  };

  const submitSelection = () => {
    if (!selection || selection.products.length === 0) {
      setInvalid(true);
      return;
    }
    returnToInquiry(selection);
  };

  return (
    <CustomerCenterLayout
      header={
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          title="주문 상품 조회"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading5' }}
          description="1:1문의를 원하시는 주문번호 및 상품명을 선택해 주세요."
          descriptionProps={{
            variant: 'body3',
            className: css({ color: 'black.100', _mobile: { color: 'black.60' } }),
          }}
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
      <Stack gap={{ base: '6', _mobile: '4' }} pt={{ base: '10', _mobile: '6' }}>
        <Stack gap={{ base: '6', _mobile: '0' }}>
          <FilterTabs
            ariaLabel="주문 조회 기간"
            value={period}
            onValueChange={setPeriod}
            options={periodOptions}
            variant="fill"
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
              <Button
                size="short"
                variant="secondary"
                onClick={() => setCustomRange({ from: dateFrom, to: dateTo })}
              >
                조회
              </Button>
            </Flex>
          )}
          <Flex justifyContent="flex-end">
            <Typography variant="body5" tone="tertiary">
              총 {filteredOrders.length}건
            </Typography>
          </Flex>
          <Stack gap="0" borderTop="1px solid token(colors.black.100)">
            {filteredOrders.slice(0, visibleCount).map((order) => {
              const isExpanded = expandedOrder === order.id;
              const isSelected = selection?.order.id === order.id;

              return (
                <Box key={order.id} borderBottom="1px solid token(colors.black.20)">
                  <Flex alignItems="center" gap="3" p={{ base: '4', _mobile: '3' }}>
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
                      <Typography variant="body5" tone="tertiary">
                        {order.id}
                      </Typography>
                      <Typography variant="body5" tone="tertiary">
                        {order.date}
                      </Typography>
                      <Typography variant="body5" weight="medium">
                        {order.products.length}개 상품
                      </Typography>
                      <Icon fontAwesomeIcon={isExpanded ? faMinus : faPlus} size="16px" />
                    </button>
                  </Flex>
                  {isExpanded && (
                    <Stack gap="0" borderTop="1px solid token(colors.black.20)">
                      {order.products.map((item) => (
                        <Flex
                          key={item.id}
                          alignItems={{ base: 'center', _mobile: 'flex-start' }}
                          gap="3"
                          p={{ base: '4', _mobile: '3' }}
                          borderBottom="1px solid token(colors.black.20)"
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
                          <Box
                            display="grid"
                            placeItems="center"
                            flexShrink="0"
                            w={{ base: '76px', _mobile: '64px' }}
                            h={{ base: '76px', _mobile: '64px' }}
                            border="1px solid token(colors.black.40)"
                          >
                            <img
                              alt=""
                              src={item.image}
                              className={css({ w: '100%', h: '100%', objectFit: 'cover' })}
                            />
                          </Box>
                          <Stack gap="1" flex="1" minW="0">
                            <Typography variant="body5" weight="semibold">
                              {item.name}
                            </Typography>
                            <Typography variant="body5" tone="tertiary">
                              상품 코드 : {item.code}
                            </Typography>
                            <Typography variant="body5" tone="tertiary">
                              {item.color} / {item.size}, {item.quantity}개
                            </Typography>
                          </Stack>
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
                variant="plain"
                size="md"
                onClick={() => setVisibleCount(filteredOrders.length)}
              >
                더보기 ({filteredOrders.length - visibleCount})
              </Button>
            </Flex>
          )}
        </Stack>
        <Stack gap="4">
          <Typography variant="body5" tone={invalid ? 'error' : 'tertiary'}>
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
                onClick={() => returnToInquiry(initialSelection)}
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
    </CustomerCenterLayout>
  );
}
