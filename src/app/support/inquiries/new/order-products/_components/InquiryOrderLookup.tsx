'use client';

/**
 * [ 개발팀 바인딩 ]
 * InquiryDataContext.orders에 기간별 서버 주문 결과를 전달하고 form.resolveSelection으로 저장된 주문/상품 ID를 복원합니다.
 * 선택 결과는 주문 id와 productIds만 저장합니다. 화면용 이름/가격/이미지는 서버 조회 결과에서 복원하며 복원 실패 시 저장한 선택을 유지합니다.
 * preview.period는 시안 직접 확인용 고정 주문 자료이며 조회·선택 복원·저장을 실행하지 않습니다.
 * 실제 items/totalCount/hasMore/pending/error·추가 조회·재시도·오래된 응답 폐기는 기존 orders 소유자의 책임입니다.
 */

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { InquiryDataContext } from '@/context/InquiryDataContext';
import { usePlatform } from '@/context/platform';
import { useBindingQuery } from '@/hooks/useBindingQuery';
import { useRequestAction } from '@/hooks/useRequestAction';

import { css } from 'styled-system/css';
import { Box, Flex, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { Icon } from '@/components/common/atoms/Icon';
import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { type InquiryOrder, inquiryOrders } from '@/app/support/inquiries/new/inquiryOrders.data';
import {
  consumeInquiryOrderSelection,
  restoreInquiryOrderSelection,
} from '@/app/support/inquiries/new/inquiryOrderSelection.storage';
import {
  clearInquiryOrderReturnMarker,
  type InquiryOrderSelection,
  readInquiryOrderDraft,
  saveInquiryOrderResult,
  shouldReturnToInquiry,
} from '@/app/support/inquiries/new/inquiryOrderSelection.storage';
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
  preview?: { period: '1y' | 'custom' };
}) {
  const context = useContext(InquiryDataContext);
  const platform = usePlatform();
  const binding = previewEmpty || preview ? undefined : context.orders;
  const resolve = preview ? undefined : context.form?.resolveSelection;
  const request = useRequestAction();
  const router = useRouter();
  const [selection, setSelection] = useState<InquiryOrderSelection>(null);
  const [initialSelection, setInitialSelection] = useState<InquiryOrderSelection>(null);
  const [loaded, setLoaded] = useState(Boolean(preview));
  const [open, setOpen] = useState(true);
  const [hasInquiryOrigin, setHasInquiryOrigin] = useState(false);
  const [period, setPeriod] = useState<(typeof periodOptions)[number]['value']>(
    preview?.period ?? '1y',
  );
  const [expandedOrder, setExpandedOrder] = useState<string | null>(inquiryOrders[0]?.id ?? null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-08-30');
  const [customRange, setCustomRange] = useState({ from: '2026-01-01', to: '2026-08-30' });
  const [invalid, setInvalid] = useState(false);

  const [restoreError, setRestoreError] = useState('');
  const [restoreAttempt, setRestoreAttempt] = useState(0);
  useEffect(() => {
    if (previewEmpty || preview) return;
    if (resolve) {
      let active = true;
      void restoreInquiryOrderSelection('draft', resolve)
        .then((result) => {
          if (!active) return;
          setSelection(result ?? null);
          setInitialSelection(result ?? null);
          if (result !== undefined) consumeInquiryOrderSelection('draft');
          setExpandedOrder(result?.order.id ?? null);
          setHasInquiryOrigin(shouldReturnToInquiry());
          setRestoreError('');
          setLoaded(true);
        })
        .catch((cause: unknown) => {
          if (active)
            setRestoreError(
              cause instanceof Error ? cause.message : '선택 상품을 복원하지 못했습니다.',
            );
        });
      return () => {
        active = false;
      };
    }
    const pending = readInquiryOrderDraft();
    const hasInquiryOrigin = shouldReturnToInquiry();
    // The route must hydrate the browser-only selection before enabling its actions.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialSelection(pending);
    setSelection(pending);
    setExpandedOrder(pending?.order.id ?? inquiryOrders[0]?.id ?? null);
    setHasInquiryOrigin(hasInquiryOrigin);
    setLoaded(true);
  }, [resolve, restoreAttempt, previewEmpty, preview]);

  const periodMonths = { '1y': 12, '6m': 6, '3m': 3, '1m': 1 } as const;
  useBindingQuery(binding?.onQueryChange, {
    period,
    from: period === 'custom' ? customRange.from : '',
    to: period === 'custom' ? customRange.to : '',
  });
  const filteredOrders = previewEmpty
    ? []
    : preview
      ? inquiryOrders.map((order, index) =>
          index === 0 ? { ...order, products: order.products.slice(0, 4) } : order,
        )
      : binding
        ? [...binding.items]
        : inquiryOrders.filter((order) => {
            if (period === 'custom')
              return order.date >= customRange.from && order.date <= customRange.to;
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
    if (preview) {
      setOpen(false);
      return;
    }
    if (previewEmpty) return;
    saveInquiryOrderResult(nextSelection);
    if (hasInquiryOrigin) {
      clearInquiryOrderReturnMarker();
      router.back();
    } else {
      router.push('/support/inquiries/new');
    }
  };

  const submitSelection = () => {
    if (previewEmpty || !selection || selection.products.length === 0) {
      setInvalid(true);
      return;
    }
    returnToInquiry(selection);
  };

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
      <BindingFeedback
        pending={binding?.pending || request.pending}
        error={binding?.error || request.error || restoreError}
        onRetry={restoreError ? () => setRestoreAttempt((value) => value + 1) : binding?.onRetry}
      />
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
          <Typography variant="body4">
            총 {binding?.totalCount ?? filteredOrders.length}건
          </Typography>
        </Flex>
        <Stack gap="0" borderTop="1px solid token(colors.black.100)">
          {(binding ? filteredOrders : filteredOrders.slice(0, visibleCount)).map((order) => {
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
                    <Icon fontAwesomeIcon={isExpanded ? faMinus : faPlus} size="16px" />
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
                        <Box
                          display="grid"
                          placeItems="center"
                          flexShrink="0"
                          w={{ base: '76px', _mobile: '64px' }}
                          h={{ base: '76px', _mobile: '64px' }}
                          border="1px solid token(colors.black.40)"
                        >
                          <Image
                            alt=""
                            src={item.image}
                            width={76}
                            height={76}
                            sizes="(max-width: 1024px) 64px, 76px"
                            className={css({ w: '100%', h: '100%', objectFit: 'cover' })}
                          />
                        </Box>
                        <Stack gap="1" flex="1" minW="0">
                          <Typography variant="body5" weight="semibold">
                            {item.name}
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
        {(binding ? binding.hasMore : visibleCount < filteredOrders.length) && (
          <Flex justifyContent="center">
            <Button
              variant="secondary"
              size="short"
              density="compact"
              loadMore={{
                counter: {
                  current: binding?.items.length ?? Math.min(visibleCount, filteredOrders.length),
                  total: binding?.totalCount ?? filteredOrders.length,
                },
              }}
              disabled={binding?.pending || request.pending}
              onClick={() =>
                binding
                  ? void request.run(binding.onLoadMore)
                  : setVisibleCount(filteredOrders.length)
              }
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
  );

  if (platform === 'mobile')
    return (
      <ModalDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next && !preview) router.push('/support/inquiries/new');
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
