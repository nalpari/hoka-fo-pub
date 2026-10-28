'use client';

import Link from 'next/link';

import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {
  type FormEvent,
  type FormEventHandler,
  type ReactNode,
  useState,
  useSyncExternalStore,
} from 'react';
import { useShop } from '@/context/ShopShell';

import { css } from 'styled-system/css';
import { Box, Circle, Flex, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { Icon } from '@/components/common/atoms/Icon';
import { Radio } from '@/components/common/atoms/Radio';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import { AmountRow } from '@/components/common/molecules/AmountRow';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { CharacterCount } from '@/components/common/molecules/FormFields/CharacterCount';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { OrderActionBar } from '@/components/common/molecules/OrderActionBar';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { AddressFields } from '@/components/common/organisms/Address/AddressFields';
import { OrderRecommendations } from '@/components/common/organisms/OrderRecommendations';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { OrderPageLayout } from '@/components/common/layouts/OrderPageLayout';

import {
  checkoutCouponOptions,
  getCheckoutCouponDiscount,
  getMaximumCheckoutCoupon,
} from '@/components/checkout/checkout-coupons';
import {
  type CheckoutRow,
  checkoutShippingFee,
  getCheckoutSummary,
} from '@/components/checkout/checkout-summary';
import { faCheck } from '@/icons/fontAwesome';
import { getCartImage } from '@/mocks/cartDisplay';
import { orderRecommendations } from '@/mocks/orderRecommendations';
import { products } from '@/mocks/products';
import { type CartItem } from '@/types/cart';

/** 주문 완료 아이콘과 감사 인사를 표시합니다. (Displays the order completion icon and thank-you message.) */
function CheckoutCompleteHeader() {
  return (
    <>
      <Circle
        border="2px solid var(--colors-black-100)"
        size="10"
        flex="0 1 auto"
        display={{ _mobile: 'none' }}
        aria-hidden="true"
      >
        <Icon fontAwesomeIcon={faCheck} size={26} />
      </Circle>
      <Typography as="p" variant="heading7">
        구매해 주셔서 감사합니다.
      </Typography>
    </>
  );
}

/** 주문 접수 완료 안내와 추천 상품을 표시합니다. (Displays order completion and recommended products.) */
function CheckoutComplete() {
  return (
    <Stack gap="16">
      <ContentSection
        as="section"
        alignItems="center"
        gap="8"
        pt="16"
        header={<CheckoutCompleteHeader />}
        footer={
          <ButtonLink href="/mypage/orders" variant="primary" size="short" fullWidth>
            주문 내용 확인하기
          </ButtonLink>
        }
      >
        <Typography as="p" variant="body4" className={css({ textAlign: 'center' })}>
          주문이 정상적으로 접수되었습니다.
          <br />
          앞으로도 만족스러운 서비스로 보답하겠습니다.
        </Typography>
      </ContentSection>
      <OrderRecommendations items={orderRecommendations} layout="portrait" />
    </Stack>
  );
}

function CheckoutPaymentNotice() {
  return (
    <Stack gap="2" pt="4" borderTop="1px solid var(--colors-black-20)">
      <Typography variant="body5" tone="subtle">
        아래 [결제하기] 버튼을 클릭하면 선택한 결제방법에 맞는 결제 창이 나타납니다.
      </Typography>
      <Typography variant="body5" tone="subtle">
        결제 창을 통해 입력되는 고객님의 정보는 안전하게 암호화되어 전송됩니다.
      </Typography>
      <Typography variant="body5" tone="subtle">
        결제 신청 시 승인 진행에 다소 시간이 소요될 수 있으므로 결과 화면이 나타날 때까지 기다려
        주십시오.
      </Typography>
    </Stack>
  );
}

/** 결제 필수 동의 두 항목을 표시합니다. (Displays the two required checkout agreements.) */
function CheckoutAgreement({
  orderAgreed,
  privacyAgreed,
  error,
  onOrderAgreedChange,
  onPrivacyAgreedChange,
}: {
  orderAgreed: boolean;
  privacyAgreed: boolean;
  error: boolean;
  onOrderAgreedChange: (agreed: boolean) => void;
  onPrivacyAgreedChange: (agreed: boolean) => void;
}) {
  const detailsLink = css({
    flexShrink: '0',
    fontSize: '12px',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    whiteSpace: 'nowrap',
  });

  return (
    <Stack gap="2">
      <Flex alignItems="flex-start" justifyContent="space-between" gap="6">
        <Checkbox
          className={css({
            alignItems: 'flex-start',
          })}
          checked={orderAgreed}
          interactiveLabel
          onCheckedChange={onOrderAgreedChange}
          label={
            <Typography variant="body5">주문 내용을 확인하였으며 결제에 동의합니다.</Typography>
          }
        />
        <Link href="/support/terms" className={detailsLink}>
          전문보기
        </Link>
      </Flex>
      <Flex alignItems="flex-start" justifyContent="space-between" gap="6">
        <Checkbox
          className={css({
            alignItems: 'flex-start',
          })}
          checked={privacyAgreed}
          interactiveLabel
          onCheckedChange={onPrivacyAgreedChange}
          label={
            <Typography variant="body5">
              개인정보 수집 · 이용내용을 확인하였으며 결제에 동의합니다.
            </Typography>
          }
        />
        <Link href="/support/terms?tab=privacy" className={detailsLink}>
          전문보기
        </Link>
      </Flex>
      {error ? (
        <Typography as="p" variant="body5" className={css({ color: 'red.100' })} role="alert">
          필수 항목에 동의해 주세요.
        </Typography>
      ) : null}
    </Stack>
  );
}

/** 선택한 결제 수단의 안내를 표시합니다. (Displays notices for the selected payment method.) */
function CheckoutPaymentMethodNotice({ label }: { label: string | undefined }) {
  return (
    <Stack gap="1" pt="2">
      {[1, 2, 3].map((index) => (
        <Typography key={index} variant="body5" tone="subtle">
          - {label} 안내사항 {index}
        </Typography>
      ))}
    </Stack>
  );
}

const marks = { naver: 'N pay', toss: 'toss', samsung: 'SAMSUNG pay', payco: 'PAYCO' } as const;

/** 결제 타일의 브랜드 표시 영역을 구성합니다. (Displays the payment tile brand mark.) */
function CheckoutPaymentMark({ method }: { method: PaymentMethod }) {
  return (
    <Box h="4" display="flex" alignItems="center" justifyContent="center" aria-hidden="true">
      {method === 'kakao' ? (
        <img
          src="/images/checkout/kakaopay.png"
          alt=""
          className={css({ w: '28px', h: '16px', objectFit: 'contain' })}
        />
      ) : method === 'card' ? (
        <Icon fontAwesomeIcon={faCreditCard} size={16} />
      ) : (
        <Typography
          variant="body5"
          weight="bold"
          className={css({
            color: method === 'payco' ? 'red.100' : method === 'naver' ? '#00a949' : '#2357c9',
          })}
        >
          {marks[method]}
        </Typography>
      )}
    </Box>
  );
}

const paymentMethods = [
  { value: 'kakao', label: '카카오페이' },
  { value: 'naver', label: '네이버페이' },
  { value: 'toss', label: '토스페이' },
  { value: 'card', label: '신용카드' },
  { value: 'samsung', label: '삼성페이' },
  { value: 'payco', label: '페이코' },
] as const;

type PaymentMethod = (typeof paymentMethods)[number]['value'];

/** 결제 수단 타일과 선택 상태를 표시합니다. (Displays payment method tiles and their selection state.) */
function CheckoutPaymentMethods({
  payment,
  onPaymentChange,
}: {
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
}) {
  return (
    <Radio<PaymentMethod>
      ariaLabel="결제 수단"
      name="paymentMethod"
      variant="custom"
      value={payment}
      onValueChange={onPaymentChange}
      className={css({ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1!' })}
      optionClassName={css({
        minH: '88px',
        _mobile: { minH: '110px' },
        p: '0',
        bg: 'transparent',
        border: '1px solid var(--colors-black-20)',
        cursor: 'pointer',
        _focusVisible: { outline: '2px solid var(--colors-black-100)', outlineOffset: '2px' },
      })}
      selectedOptionClassName={css({ borderColor: 'black.100!' })}
      options={paymentMethods.map((method) => ({
        value: method.value,
        label: (
          <Stack h="100%" alignItems="center" justifyContent="center" gap="1">
            <CheckoutPaymentMark method={method.value} />
            <Typography variant="body5">{method.label}</Typography>
            <img
              src={`/images/icon/form/radio-${payment === method.value ? 'checked' : 'unchecked'}.svg`}
              alt=""
              width={16}
              height={16}
            />
          </Stack>
        ),
      }))}
    />
  );
}

/** 결제 수단을 선택 가능한 타일로 표시합니다. (Displays selectable payment method tiles.) */
function CheckoutPayment({
  payment,
  onPaymentChange,
}: {
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
}) {
  return (
    <ContentSection
      as="section"
      gap="4"
      title="결제 정보"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading9', mo: 'heading7' } }}
    >
      <CheckoutPaymentMethods payment={payment} onPaymentChange={onPaymentChange} />
      <CheckoutPaymentMethodNotice
        label={paymentMethods.find((method) => method.value === payment)?.label}
      />
    </ContentSection>
  );
}

const fields = [
  {
    name: 'name',
    label: '받는 분',
    placeholder: '이름을 입력해주세요',
    autoComplete: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'email',
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
    autoComplete: 'email',
    type: 'email',
    required: false,
  },
  {
    name: 'phone',
    label: '휴대폰 번호',
    placeholder: '휴대폰 번호를 입력해주세요',
    autoComplete: 'tel',
    type: 'tel',
    required: true,
  },
  {
    name: 'otherPhone',
    label: '다른 전화번호',
    placeholder: '다른 전화번호를 입력해주세요',
    autoComplete: 'off',
    type: 'tel',
    required: false,
  },
] as const;

/** 주문 배송 연락처를 공통 필드로 표시합니다. (Displays shipping contact inputs using shared form fields.) */
function CheckoutRecipientFields({ errors }: { errors?: ShippingErrors }) {
  return fields.map((field) => (
    <TextFormField
      key={field.name}
      id={`shipping-${field.name}`}
      label={field.label}
      variant="boxed"
      required={field.required}
      error={field.name === 'name' || field.name === 'phone' ? errors?.[field.name] : undefined}
      inputProps={{
        name: field.name,
        placeholder: field.placeholder,
        autoComplete: field.autoComplete,
        type: field.type,
      }}
    />
  ));
}

type Props = {
  errors?: ShippingErrors;
  postalCode: string;
  address: string;
  onPostalCodeChange: (postalCode: string) => void;
  onAddressChange: (address: string) => void;
  searchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
};

/** 배송지 주소 입력과 주소 검색을 연결합니다. (Connects shipping address fields and address search.) */
function CheckoutAddressFields({
  errors,
  postalCode,
  address,
  onPostalCodeChange,
  onAddressChange,
  searchOpen,
  onSearchOpenChange,
}: Props) {
  const addressDetailDisabled = !postalCode.trim() || !address.trim();

  return (
    <>
      <AddressFields
        variant="boxed"
        fieldOptions={{
          postalCode: { disabled: true, inputProps: { name: 'postalCode', readOnly: true } },
          address: { disabled: true, inputProps: { name: 'address', readOnly: true } },
          addressDetail: {
            disabled: addressDetailDisabled,
            inputProps: { name: 'addressDetail' },
          },
        }}
        idPrefix="shipping"
        value={{ postalCode, address }}
        errors={errors}
        onValueChange={(field, next) => {
          if (field === 'postalCode') onPostalCodeChange(next);
          if (field === 'address') onAddressChange(next);
        }}
        searchOpen={searchOpen}
        onSearchOpenChange={onSearchOpenChange}
      />
      <input type="hidden" name="postalCode" value={postalCode} />
      <input type="hidden" name="address" value={address} />
    </>
  );
}

type CheckoutShippingFormProps = {
  errors?: ShippingErrors;
  postalCode: string;
  address: string;
  onAddressChange: (address: string) => void;
  onPostalCodeChange: (postalCode: string) => void;
  searchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
  onUseSavedAddress: () => void;
};

function CheckoutShippingForm({
  errors,
  postalCode,
  address,
  onAddressChange,
  onPostalCodeChange,
  searchOpen,
  onSearchOpenChange,
  onUseSavedAddress,
}: CheckoutShippingFormProps) {
  return (
    <Stack gap="4">
      <CheckoutRecipientFields errors={errors} />
      <CheckoutAddressFields
        errors={errors}
        postalCode={postalCode}
        address={address}
        onAddressChange={onAddressChange}
        onPostalCodeChange={onPostalCodeChange}
        searchOpen={searchOpen}
        onSearchOpenChange={onSearchOpenChange}
      />
      <Checkbox label="기본배송지로 등록" />
      <Button variant="link" size="sm" onClick={onUseSavedAddress}>
        기존 배송지 사용
      </Button>
    </Stack>
  );
}

type CheckoutSavedAddressProps = {
  errors?: ShippingErrors;
  onEdit: () => void;
};

function CheckoutSavedAddress({ errors, onEdit }: CheckoutSavedAddressProps) {
  return (
    <Box border="1px solid var(--colors-black-20)">
      <HStack justifyContent="space-between" alignItems="center" bg="black.10" px="4" h="56px">
        <HStack gap="2">
          <Typography variant="body3" weight="medium">
            홍길동집
          </Typography>
          <Box border="1px solid var(--colors-black-20)" px="1" py="0.5" borderRadius="2px">
            <Typography variant="body5">기본 배송지</Typography>
          </Box>
        </HStack>
        <Button variant="link" size="sm" onClick={onEdit}>
          배송지변경
        </Button>
      </HStack>
      <Stack gap="3" px="4" py="5" borderTop="1px solid var(--colors-black-20)">
        <HStack gap="4" alignItems="flex-start">
          <Box minW="48px">
            <Typography variant="body4" tone="subtle">
              주소
            </Typography>
          </Box>
          <Stack flex="1" gap="1">
            <TextInput
              appearance="compact"
              aria-label="주소"
              name="address"
              autoComplete="street-address"
              defaultValue="서울시 강남구 역삼동 234-1"
            />
            {errors?.address ? (
              <Typography variant="body5" tone="subtle">
                {errors.address}
              </Typography>
            ) : null}
          </Stack>
        </HStack>
        <HStack gap="4">
          <Box minW="48px">
            <Typography variant="body4" tone="subtle">
              받는 분
            </Typography>
          </Box>
          <TextInput
            appearance="compact"
            aria-label="받는 분"
            name="name"
            autoComplete="name"
            defaultValue="홍길동"
          />
        </HStack>
        <HStack gap="4">
          <Box minW="48px">
            <Typography variant="body4" tone="subtle">
              연락처
            </Typography>
          </Box>
          <TextInput
            appearance="compact"
            aria-label="연락처"
            name="phone"
            autoComplete="tel"
            defaultValue="010-1234-5678"
          />
        </HStack>
      </Stack>
    </Box>
  );
}

/** 배송 요청 직접 입력과 글자 수 안내를 표시합니다. (Displays custom delivery instructions with a character count.) */
function CheckoutDeliveryMessageField({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <TextFormField
      id="delivery-message"
      label="요청사항"
      variant="boxed"
      inputProps={{
        multiline: true,
        name: 'deliveryMessage',
        value,
        onChange: (event) => onValueChange(event.target.value),
        maxLength: 250,
        rows: 5,
        placeholder: '내용을 입력해주세요.',
      }}
      renderControl={(control) => (
        <Stack gap="2" w="100%">
          {control}
          <CharacterCount
            length={value.length}
            limit={250}
            tone="subtle"
            className={css({ textAlign: 'right' })}
          />
        </Stack>
      )}
    />
  );
}

/** 배송 요청의 정해진 옵션을 표시합니다. (Displays preset delivery instruction options.) */
function CheckoutDeliveryRequestSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Dropdown
      ariaLabel="배송시 요청사항"
      label="배송시 요청사항"
      required
      name="deliveryRequest"
      placeholder="요청사항을 선택해주세요"
      value={value}
      onValueChange={onValueChange}
      options={[
        { value: 'door', label: '문 앞에 놓아주세요' },
        { value: 'call', label: '배송 전 연락주세요' },
        { value: 'security', label: '경비실에 맡겨주세요' },
        { value: 'custom', label: '직접 입력하기' },
      ]}
    />
  );
}

/** 배송 요청 선택과 직접 입력을 관리합니다. (Manages delivery instructions and custom text.) */
function CheckoutDeliveryRequest() {
  const [request, setRequest] = useState('');
  const [message, setMessage] = useState('');
  return (
    <Stack gap="3">
      <CheckoutDeliveryRequestSelect value={request} onValueChange={setRequest} />
      {request === 'custom' ? (
        <CheckoutDeliveryMessageField value={message} onValueChange={setMessage} />
      ) : null}
    </Stack>
  );
}

type ShippingErrors = Partial<Record<'name' | 'phone' | 'address', string>>;

function CheckoutShipping({ errors }: { errors?: ShippingErrors }) {
  const [editing, setEditing] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <ContentSection
      as="section"
      gap="4"
      title="주문자 및 배송지 정보"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading9', mo: 'heading7' } }}
    >
      {editing ? (
        <CheckoutShippingForm
          errors={errors}
          postalCode={postalCode}
          address={address}
          onAddressChange={setAddress}
          onPostalCodeChange={setPostalCode}
          searchOpen={searchOpen}
          onSearchOpenChange={setSearchOpen}
          onUseSavedAddress={() => setEditing(false)}
        />
      ) : (
        <CheckoutSavedAddress errors={errors} onEdit={() => setEditing(true)} />
      )}
      <CheckoutDeliveryRequest />
    </ContentSection>
  );
}

type CheckoutProductListProps = { rows: readonly CheckoutRow[] };

function CheckoutProductList({ rows }: CheckoutProductListProps) {
  return (
    <Stack borderTop="1px solid var(--colors-black-100)">
      {rows.map(({ item, product }) => (
        <OrderProductSummary
          key={`${item.id}-${item.color}-${item.width}-${item.size}`}
          image={getCartImage(item, product.primaryImage ?? '/images/mypage/speedgoat-7-gtx.png')}
          name={product.name}
          optionText={`옵션 : ${item.width} / ${item.color} / ${item.size} / ${item.quantity}개`}
          amount={product.price * item.quantity}
        />
      ))}
    </Stack>
  );
}

/** 주문 금액과 쿠폰 선택 결과를 요약합니다. (Summarizes order amounts and coupon selection.) */
function CheckoutDiscountSummary({
  total,
  discount,
  itemCount,
  coupon,
  maxBenefit,
  onCouponChange,
  onMaxBenefitChange,
}: {
  total: number;
  discount: number;
  itemCount: number;
  coupon: string;
  maxBenefit: boolean;
  onCouponChange: (coupon: string) => void;
  onMaxBenefitChange: (checked: boolean) => void;
}) {
  return (
    <Stack gap="4">
      <Stack gap="3" border="1px solid var(--colors-black-20)">
        <AmountRow label={`주문금액 (상품 ${itemCount}개)`} amount={total} px="4" pt="4" />
        <AmountRow label="상품 할인금액" amount={0} px="4" />
        <Stack gap="2" px="4">
          <Flex justifyContent="flex-end">
            <Checkbox
              label="최대 혜택 적용"
              checked={maxBenefit}
              onCheckedChange={onMaxBenefitChange}
            />
          </Flex>
          <Dropdown
            ariaLabel="쿠폰 선택"
            label="쿠폰"
            required
            value={coupon}
            onValueChange={(value) => onCouponChange(value)}
            options={checkoutCouponOptions}
          />
        </Stack>
        <AmountRow label="쿠폰 할인금액" amount={discount} discount px="4" />
        <AmountRow label="배송비" amount={checkoutShippingFee} px="4" />
        <AmountRow
          label="총 결제 금액"
          amount={total - discount + checkoutShippingFee}
          emphasis
          emphasizeLabel
          p="4"
          bg="black.10"
          borderTop="1px solid var(--colors-black-20)"
        />
      </Stack>
      <Stack gap="1">
        <Typography variant="body5" tone="subtle">
          - 쿠폰 보유 시 최대 할인 쿠폰으로 자동 적용됩니다.
        </Typography>
        <Typography variant="body5" tone="subtle">
          - 정상 상품과 세일 상품을 함께 결제 시 쿠폰 적용 가능 상품에만 쿠폰이 적용됩니다.
        </Typography>
        <Typography variant="body5" tone="subtle">
          - 할인 및 쿠폰 적용 후 실 결제금액의 최대 30%까지 마일리지 사용 가능합니다.
        </Typography>
        <Typography variant="body5" tone="subtle">
          - 마일리지는 5,000점 이상 보유 시 100점 단위로 사용 가능합니다.
        </Typography>
      </Stack>
    </Stack>
  );
}

/** 주문 상품과 할인 및 결제 금액을 표시합니다. (Displays ordered products, discounts, and payment totals.) */
function CheckoutSummary({
  rows,
  total,
  discount = 0,
  coupon,
  maxBenefit,
  onCouponChange,
  onMaxBenefitChange,
}: {
  rows: readonly CheckoutRow[];
  total: number;
  discount?: number;
  coupon: string;
  maxBenefit: boolean;
  onCouponChange: (coupon: string) => void;
  onMaxBenefitChange: (checked: boolean) => void;
}) {
  return (
    <ContentSection
      as="section"
      gap="4"
      title="주문상품 정보 및 할인 적용"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading9', mo: 'heading7' } }}
    >
      <CheckoutProductList rows={rows} />
      <Typography variant="body5" tone="subtle">
        * 상품수량 변경은 상품상세 또는 장바구니에서 하실 수 있습니다.
      </Typography>
      <CheckoutDiscountSummary
        total={total}
        discount={discount}
        itemCount={rows.reduce((count, { item }) => count + item.quantity, 0)}
        coupon={coupon}
        maxBenefit={maxBenefit}
        onCouponChange={onCouponChange}
        onMaxBenefitChange={onMaxBenefitChange}
      />
    </ContentSection>
  );
}

type CheckoutContentProps = {
  rows: readonly CheckoutRow[];
  total: number;
  discount: number;
  payment: PaymentMethod;
  errors: ShippingErrors;
  coupon: string;
  maxBenefit: boolean;
  orderAgreed: boolean;
  privacyAgreed: boolean;
  agreementError: boolean;
  onPaymentChange: (payment: PaymentMethod) => void;
  onCouponChange: (coupon: string) => void;
  onMaxBenefitChange: (checked: boolean) => void;
  onOrderAgreedChange: (checked: boolean) => void;
  onPrivacyAgreedChange: (checked: boolean) => void;
};

/** Prepared checkout sections; the form owns validation, consent and coupon state. */
function CheckoutContent({
  rows,
  total,
  discount,
  payment,
  errors,
  coupon,
  maxBenefit,
  orderAgreed,
  privacyAgreed,
  agreementError,
  onPaymentChange,
  onCouponChange,
  onMaxBenefitChange,
  onOrderAgreedChange,
  onPrivacyAgreedChange,
}: CheckoutContentProps) {
  return (
    <Stack gap={{ base: '10', _mobile: '6' }}>
      <CheckoutShipping errors={errors} />
      <CheckoutSummary
        rows={rows}
        total={total}
        discount={discount}
        coupon={coupon}
        maxBenefit={maxBenefit}
        onCouponChange={onCouponChange}
        onMaxBenefitChange={onMaxBenefitChange}
      />
      <CheckoutPayment payment={payment} onPaymentChange={onPaymentChange} />
      <CheckoutPaymentNotice />
      <CheckoutAgreement
        orderAgreed={orderAgreed}
        privacyAgreed={privacyAgreed}
        error={agreementError}
        onOrderAgreedChange={onOrderAgreedChange}
        onPrivacyAgreedChange={onPrivacyAgreedChange}
      />
      <OrderActionBar>
        <Button type="submit" variant="primary" fullWidth>
          {(total - discount + checkoutShippingFee).toLocaleString()}원 결제하기
        </Button>
      </OrderActionBar>
    </Stack>
  );
}

type CheckoutFormProps = {
  completed: boolean;
  rows: readonly CheckoutRow[];
  total: number;
  payment: PaymentMethod;
  onPaymentChange: (payment: PaymentMethod) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

/** 결제 입력과 제출 검증 상태를 관리합니다. (Manages checkout inputs and submission validation state.) */
function CheckoutForm({
  completed,
  rows,
  total,
  payment,
  onPaymentChange,
  onSubmit,
}: CheckoutFormProps) {
  const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'address', string>>>({});
  const [coupon, setCoupon] = useState('none');
  const [maxBenefit, setMaxBenefit] = useState(false);
  const discount = getCheckoutCouponDiscount(coupon, rows, total);
  const [agreementError, setAgreementError] = useState(false);
  const [orderAgreed, setOrderAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  if (completed) return <CheckoutComplete />;

  if (rows.length === 0)
    return (
      <Stack as="section" alignItems="center" gap="4" py="20">
        <Typography as="p" variant="body3">
          주문할 상품이 없습니다.
        </Typography>
        <Link href="/cart">장바구니로 돌아가기</Link>
      </Stack>
    );

  return (
    <form
      noValidate
      onInput={(event) => {
        const input = event.target as HTMLInputElement;
        if (input.value.trim()) setErrors((previous) => ({ ...previous, [input.name]: undefined }));
      }}
      onSubmit={(event) => {
        const data = new FormData(event.currentTarget);
        const nextErrors = {
          name: String(data.get('name') ?? '').trim() ? '' : '받는 분을 입력해 주세요.',
          phone: String(data.get('phone') ?? '').trim() ? '' : '연락처를 입력해 주세요.',
          address: String(data.get('address') ?? '').trim() ? '' : '주소를 입력해 주세요.',
        };
        setErrors(nextErrors);
        const missingAgreement = !orderAgreed || !privacyAgreed;
        setAgreementError(missingAgreement);
        if (Object.values(nextErrors).some(Boolean) || missingAgreement) {
          event.preventDefault();
          return;
        }
        onSubmit(event);
      }}
    >
      <CheckoutContent
        rows={rows}
        total={total}
        discount={discount}
        payment={payment}
        errors={errors}
        coupon={coupon}
        maxBenefit={maxBenefit}
        orderAgreed={orderAgreed}
        privacyAgreed={privacyAgreed}
        agreementError={agreementError}
        onPaymentChange={onPaymentChange}
        onCouponChange={(value) => {
          setCoupon(value);
          setMaxBenefit(false);
        }}
        onMaxBenefitChange={(checked) => {
          setMaxBenefit(checked);
          if (checked) setCoupon(getMaximumCheckoutCoupon(rows, total));
        }}
        onOrderAgreedChange={(checked) => {
          setOrderAgreed(checked);
          if (checked && privacyAgreed) setAgreementError(false);
        }}
        onPrivacyAgreedChange={(checked) => {
          setPrivacyAgreed(checked);
          if (checked && orderAgreed) setAgreementError(false);
        }}
      />
    </form>
  );
}

/** 주문서와 완료 화면의 제목 및 단계 골격을 구성합니다. (Composes checkout and completion headings and progress.) */
function CheckoutLayout({ completed, children }: { completed: boolean; children: ReactNode }) {
  return (
    <OrderPageLayout
      step={completed ? 3 : 2}
      title={
        <ContentHeader
          title={completed ? '주문완료' : '주문/결제'}
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading5' }}
          className={css({ _mobile: completed ? { display: 'none' } : {} })}
        />
      }
    >
      {children}
    </OrderPageLayout>
  );
}

const subscribeLocation = () => () => {};

const serverSelected = () => null;

const clientSelected = () => new URLSearchParams(window.location.search).get('selected');

/** 선택 상품의 주문 상태와 결제 완료 후 장바구니 정리를 관리합니다. (Manages selected-item checkout and removes completed items from the cart.) */
export default function Page() {
  const { cart, remove } = useShop();
  const onComplete = (items: readonly CartItem[]) => items.forEach(remove);
  const [payment, setPayment] = useState<PaymentMethod>('kakao');
  const [completed, setCompleted] = useState(false);
  const selectedParam = useSyncExternalStore(subscribeLocation, clientSelected, serverSelected);
  const selectedKeys = selectedParam?.split('|');

  const selectedCart = selectedKeys
    ? cart.filter((item) =>
        selectedKeys.includes(`${item.id}-${item.color}-${item.width}-${item.size}`),
      )
    : cart;
  const { rows, total } = getCheckoutSummary(selectedCart, products);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCompleted(true);
    onComplete(selectedCart);
  };

  return (
    <CheckoutLayout completed={completed}>
      <CheckoutForm
        completed={completed}
        rows={rows}
        total={total}
        payment={payment}
        onPaymentChange={setPayment}
        onSubmit={submit}
      />
    </CheckoutLayout>
  );
}
