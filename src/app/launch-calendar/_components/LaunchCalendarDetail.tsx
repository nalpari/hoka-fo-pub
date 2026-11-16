'use client';

import Image from 'next/image';

import { type CSSProperties, useRef, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { DescriptionList } from '@/components/common/atoms/DescriptionList';
import { FormField } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';
import { Radio } from '@/components/common/atoms/Radio';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { launchDetail, launchNotificationPreview } from '@/app/launch-calendar/launchCalendar.data';

// [ 개발팀 바인딩 ] product와 notificationStatus는 준비된 표시 데이터이며 실제 신청·인증·공유 요청을 실행하지 않습니다. 상품 통합 소유자가 상품/발매 ID, 알림 신청 payload와 pending/실패/재시도, 성공 후 상태 갱신을 연결합니다. campaignPlaceholder는 시안의 미제공 기획전 이미지 슬롯으로 실제 콘텐츠가 아닙니다.
/** 발매 예정 상품과 발매 사양 및 플랫폼별 알림 CTA를 표시합니다. (Displays an upcoming product, release specifications, and platform-specific notification actions.) */
export function LaunchCalendarDetail({
  product = launchDetail,
  notificationStatus = 'available',
  preview,
}: {
  product?: typeof launchDetail;
  notificationStatus?: 'available' | 'notified';
  preview?: 'phone-required';
}) {
  const platform = usePlatform();
  const mobile = platform === 'mobile';
  const notified = notificationStatus === 'notified';
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [phoneRequiredOpen, setPhoneRequiredOpen] = useState(preview === 'phone-required');
  const [timing, setTiming] = useState('');
  const [editingPhone, setEditingPhone] = useState(false);
  const [phone, setPhone] = useState('');
  const notificationTrigger = useRef<HTMLButtonElement>(null);
  const gallery = product.images.map((src, index) => (
    <Box key={src} pos="relative" aspectRatio="1" w="100%" bg="var(--color-black-10)">
      <Box
        pos="absolute"
        inset="0"
        style={index === 0 ? { top: '9.44%', height: '81.12%' } : undefined}
      >
        <Image
          src={src}
          alt={`${product.name} ${index + 1}`}
          fill
          loading={index < 2 ? 'eager' : 'lazy'}
          sizes={
            mobile
              ? '100vw'
              : '(min-width: 1676px) 500px, (min-width: 1200px) calc((100vw - 176px) * 0.338667 - 8px), 339px'
          }
          className={css({ objectFit: 'contain' })}
        />
      </Box>
    </Box>
  ));
  const action = (
    <Button
      ref={notificationTrigger}
      type="button"
      variant="primary"
      fullWidth
      size="tall"
      disabled={notified}
      onClick={() => setNotificationOpen(true)}
      iconRight={notified ? 'check-regular' : undefined}
      iconSize="18px"
      iconColor="black.40"
      style={
        {
          '--button-height': mobile ? '44px' : '48px',
          '--button-disabled-bg': 'var(--color-black-20)',
          '--button-disabled-color': 'var(--color-black-40)',
        } as CSSProperties
      }
      className={css({
        '--button-disabled-bg': 'var(--color-black-20)',
        '--button-disabled-color': 'var(--color-black-40)',
        '& > span > span': { flexDirection: 'row-reverse' },
      })}
    >
      <Typography variant="eland-purchase-action">
        {notified ? '입고 알림 신청 완료' : '입고 알림 신청'}
      </Typography>
    </Button>
  );

  return (
    <>
      {/* [ 개발팀 바인딩 ] 휴대폰 번호 안내는 독립 STATE fixture입니다. 실제 신청 시 표시 조건은 상품 통합 소유자가 연결하며, 확인/닫기는 안내만 닫고 요청·저장·신청 완료 전환을 수행하지 않습니다. */}
      <ModalDialog
        variant="alert"
        open={phoneRequiredOpen}
        onOpenChange={setPhoneRequiredOpen}
        finalFocus={notificationTrigger}
        title="런칭캘린더"
        closeLabel="런칭캘린더 안내 닫기"
        message="휴대폰 번호를 입력해주세요"
        description="알림을 받을 휴대폰 번호를 입력해 주세요."
        actions={{ kind: 'single', onConfirm: () => setPhoneRequiredOpen(false) }}
      />
      {/* [ 개발팀 바인딩 ] 등록 번호는 명시적 확인용 fixture입니다. 현재는 선택·번호 입력·열기/닫기만 제공합니다. 상품 통합 소유자가 실제 회원 번호/등록 여부와 상품·발매 식별자, 선택 시점 및 변경 번호 payload를 연결해야 합니다. 신청 버튼은 미연결이며 요청·저장·완료 전환을 수행하지 않습니다. 연결 시 pending 중 중복 신청을 막고 실패 시 입력을 유지하며 오류/재시도를 제공하고, 성공 응답 이후에만 닫기와 notificationStatus 갱신을 수행해야 합니다. */}
      <ModalDialog
        open={notificationOpen}
        finalFocus={notificationTrigger}
        onOpenChange={setNotificationOpen}
        title="알림 신청"
        closeLabel="알림 신청 닫기"
        variant="form"
        mobilePresentation="bottomSheet"
        blurBackdrop={false}
        contentClassName={css({ p: '24px 32px 40px', _mobile: { p: '16px 16px 24px' } })}
        footerProps={{
          css: {
            pb: '40px',
            _mobile: { pt: '16px', pb: '32px', borderTop: '1px solid #E9EAEB' },
            '& button': { w: '160px', _mobile: { w: '100%' } },
          },
        }}
        footer={
          <Button
            type="button"
            variant="primary"
            size="tall"
            className={css({ '&&': { w: '160px', _mobile: { w: '100%' } } })}
            disabled={!timing || (editingPhone && !phone.trim())}
          >
            신청하기
          </Button>
        }
      >
        <Stack gap="24px" _mobile={{ gap: '16px' }}>
          <Stack gap="16px" pb="24px" borderBottom="1px solid #E9EAEB" _mobile={{ pb: '16px' }}>
            <Typography as="p" variant="body3">
              출시 알림을 받을 시점을 선택해 주세요.
            </Typography>
            <Radio
              ariaLabel="출시 알림 시점"
              name="launch-notification-timing"
              value={timing}
              onValueChange={setTiming}
              className={css({ gap: '16px' })}
              options={[
                { value: 'release', label: '출시 정시' },
                { value: '15-minutes', label: '출시 15분 전' },
                { value: '30-minutes', label: '출시 30분 전' },
              ]}
            />
          </Stack>
          <Stack gap={editingPhone ? '16px' : '0'}>
            <HStack justifyContent="space-between">
              <Typography variant="body3">알림 받을 번호</Typography>
              {!editingPhone && (
                <Button
                  type="button"
                  variant="secondary"
                  size="short"
                  onClick={() => setEditingPhone(true)}
                >
                  변경
                </Button>
              )}
            </HStack>
            <Stack gap="8px">
              {editingPhone ? (
                <FormField
                  htmlFor="launch-notification-phone"
                  label="휴대폰 번호"
                  required
                  variant="boxed"
                >
                  <TextInput
                    id="launch-notification-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="‘-’ 없이 숫자만 입력"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </FormField>
              ) : (
                <Typography
                  variant="body2"
                  className={css({ fontFamily: 'english', fontSize: '20px' })}
                >
                  {launchNotificationPreview.maskedPhone}
                </Typography>
              )}
              <Typography as="p" variant="body4" className={css({ color: '#777777' })}>
                {editingPhone
                  ? '* 입력한 번호로 알림톡이 발송되며, 회원정보에 저장됩니다.'
                  : '* 회원정보에 등록된 휴대폰 번호로 알림톡이 발송됩니다.'}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </ModalDialog>
      <Box
        as="main"
        pt="56px"
        pb="96px"
        className={css({
          _mobile: {
            '& ~ footer::after': {
              content: '""',
              display: 'block',
              height: 'calc(92px + env(safe-area-inset-bottom))',
            },
          },
        })}
        _mobile={{ pt: 0, pb: '72px' }}
      >
        <Grid
          w="min(calc(100% - 144px), 1532px)"
          mx="auto"
          gridTemplateColumns="minmax(0, 1016fr) minmax(340px, 484fr)"
          gap="32px"
          alignItems="start"
          _mobile={{ w: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
          <Box
            pos="relative"
            w="100%"
            minW="0"
            aria-label="발매 예정 상품 이미지"
            _mobile={{ mb: '-16px' }}
          >
            {mobile ? (
              <Carousel itemCount={product.images.length} loop>
                <CarouselViewport
                  freeMode={false}
                  mobileItemGutter={0}
                  mode="mobile"
                  showScrollbar={false}
                >
                  {gallery}
                </CarouselViewport>
                <CarouselPagination
                  label="발매 예정 상품 이미지 선택"
                  className={css({
                    position: 'absolute',
                    zIndex: 2,
                    bottom: '16px',
                    insetInline: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '4px',
                  })}
                />
              </Carousel>
            ) : (
              <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" gap="16px">
                {gallery}
              </Grid>
            )}
          </Box>
          <Stack as="article" gap="40px" minW="0" w="100%" _mobile={{ display: 'contents' }}>
            <ContentHeader
              title={product.name}
              titleAs="h1"
              titleProps={{ variant: 'eland-product-title' }}
              description={product.priceLabel}
              descriptionProps={{ variant: 'eland-product-price' }}
              gap="20px"
              _mobile={{ px: '16px', w: '100%', gap: '16px' }}
            />
            <HStack
              gap="8px"
              _mobile={{
                py: '24px',
                mx: '16px',
                w: 'calc(100% - 32px)',
                justifyContent: 'center',
                borderBlock: '1px solid var(--color-black-20)',
              }}
            >
              <Icon name="clock-ten" size={mobile ? '16px' : '18px'} color="red.80" />
              <Typography
                as="p"
                variant="eland-launch-release"
                tone="red80"
                className={css({ _mobile: { fontSize: '16px' } })}
              >
                {product.releaseLabel}
              </Typography>
            </HStack>
            {!mobile && action}
            <ContentSection
              as="section"
              title="상품 정보"
              gap="28px"
              px="32px"
              pt="32px"
              pb="40px"
              bg="var(--color-black-10)"
              headerProps={{ titleProps: { variant: 'heading8' } }}
              _mobile={{ px: '16px', pb: '32px', w: '100%' }}
            >
              <Stack gap="40px">
                <Stack gap="20px">
                  <ContentHeader
                    title={product.descriptionTitle}
                    titleAs="h3"
                    titleProps={{ variant: 'body3', weight: 'bold' }}
                  />
                  <Typography as="p" variant="eland-body">
                    {product.description}
                  </Typography>
                </Stack>
                <DescriptionList
                  items={product.releaseInformation}
                  labelWidth="72px"
                  termProps={{ variant: 'eland-launch-spec-label' }}
                  descriptionProps={{ variant: 'eland-launch-spec' }}
                  slotStyles={{
                    root: css.raw({
                      columnGap: '12px',
                      rowGap: '30px',
                      _mobile: { rowGap: '32px' },
                    }),
                  }}
                />
              </Stack>
            </ContentSection>
          </Stack>
        </Grid>
      </Box>
      <Box
        aria-label="기획전 이미지 준비 영역"
        display="grid"
        placeItems="center"
        aspectRatio="1920 / 980"
        bg="var(--color-black-10)"
        _mobile={{ aspectRatio: '1' }}
      >
        <Typography
          variant="body3"
          weight="bold"
          className={css({
            fontSize: '28px',
            lineHeight: '30.72px',
            _mobile: { fontSize: '22px', lineHeight: '34px' },
          })}
        >
          {product.campaignPlaceholder}
        </Typography>
      </Box>
      {mobile && (
        <HStack
          aria-label="발매 알림 신청"
          pos="fixed"
          bottom="0"
          insetInline="0"
          zIndex="50"
          gap="16px"
          pt="16px"
          px="16px"
          pb="max(32px, env(safe-area-inset-bottom))"
          bg="white"
          borderTop="1px solid var(--color-black-20)"
        >
          <Button type="button" variant="icon" size="32px" aria-label="공유하기">
            <Icon name="arrow-up-from-bracket-regular" size="22px" />
          </Button>
          {action}
        </HStack>
      )}
    </>
  );
}
