'use client';

import Image from 'next/image';

import { useId, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { DescriptionList } from '@/components/common/atoms/DescriptionList';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { koreanSizes } from '@/components/common/molecules/SizeSelector/koreanSizes';
import { SizeSelector } from '@/components/common/molecules/SizeSelector/SizeSelector';

import { ContentLayout } from '@/components/common/layouts/ContentLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';

import { launchDetail } from '@/app/launch-calendar/launchCalendar.data';

// [ 개발팀 바인딩 ] 출시일·가격·갤러리·사이즈는 준비된 표시 데이터입니다. 출시일/재고 판정·신청/인증 요청·저장을 실행하지 않으며 전 사이즈는 발매 전 비활성입니다. 실제 상품/발매 ID·표시 데이터와 알림 payload·pending/실패/재시도·응답 갱신은 상품 통합 소유자가 연결합니다.
/** 발매 예정 상품의 이미지와 비활성 사이즈 및 안내를 표시합니다. (Displays an upcoming product's gallery, disabled sizes, and release information.) */
export function LaunchCalendarDetail({
  product = launchDetail,
}: {
  product?: typeof launchDetail;
}) {
  const platform = usePlatform();
  const [expanded, setExpanded] = useState(false);
  const [size, setSize] = useState('');
  const descriptionId = useId();
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
            platform === 'mobile'
              ? '100vw'
              : '(min-width: 1676px) 500px, (min-width: 1200px) calc((100vw - 192px) * 0.339), 342px'
          }
          className={css({ objectFit: 'contain' })}
        />
      </Box>
    </Box>
  ));

  return (
    <ContentLayout
      className={css({
        w: 'min(calc(100% - 144px), 1532px)',
        mx: 'auto',
        pt: '56px',
        pb: '96px',
        _mobile: { w: '100%', pt: 0, pb: '48px' },
      })}
    >
      <Grid
        gridTemplateColumns="minmax(0, 1016fr) minmax(340px, 484fr)"
        gap="32px"
        alignItems="start"
        _mobile={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
      >
        <Stack gap="96px" minW="0" w="100%" _mobile={{ gap: '32px', display: 'contents' }}>
          {platform === 'mobile' ? (
            <Box w="100%" aria-label="발매 예정 상품 이미지">
              <Carousel itemCount={product.images.length} loop>
                <CarouselViewport
                  freeMode={false}
                  mobileItemGutter={0}
                  mode="mobile"
                  showScrollbar={false}
                >
                  {gallery}
                </CarouselViewport>
                <CarouselPagination label="발매 예정 상품 이미지 선택" />
              </Carousel>
            </Box>
          ) : (
            <Grid
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              gap="16px"
              aria-label="발매 예정 상품 이미지"
              _mobile={{ gap: '8px', order: 0 }}
            >
              {gallery}
            </Grid>
          )}

          <Box
            py="32px"
            borderBlock="1px solid var(--color-black-20)"
            _mobile={{ order: 2, mx: '16px' }}
          >
            <DescriptionList
              items={product.releaseInformation}
              labelWidth="128px"
              termProps={{ variant: 'body4', weight: 'semibold' }}
              descriptionProps={{ variant: 'body4' }}
              slotStyles={{
                root: css.raw({
                  columnGap: '40px',
                  rowGap: '24px',
                  _mobile: { columnGap: '16px' },
                }),
              }}
            />
          </Box>
        </Stack>
        <Stack
          as="article"
          gap="40px"
          minW="0"
          w="100%"
          _mobile={{ order: 1, px: '16px', gap: '24px' }}
        >
          <ContentHeader
            title={product.name}
            titleAs="h1"
            titleProps={{
              variant: 'heading7',
              className: css({
                '&&': { fontSize: '32px', lineHeight: '30.72px', _mobile: { fontSize: '28px' } },
              }),
            }}
            eyebrow={product.gender}
            eyebrowProps={{ variant: 'body4', tone: 'tertiary' }}
            description={product.priceLabel}
            descriptionProps={{ variant: 'body2', weight: 'medium' }}
            gap="20px"
          />
          <HStack gap="8px">
            <Icon src="/images/launch-calendar/clock.svg" size="18px" />
            <Typography
              as="p"
              variant="body3"
              weight="semibold"
              className={css({ color: 'var(--color-blue-100)' })}
            >
              {product.releaseLabel}
            </Typography>
          </HStack>
          <ContentSection
            as="section"
            title="발매 사이즈"
            gap="16px"
            headerProps={{
              orientation: 'horizontal',
              titleProps: { variant: 'body3', weight: 'bold' },
              action: (
                <HStack gap="8px">
                  <Icon src="/images/launch-calendar/ruler.svg" size="16px" />
                  <ButtonLink href="/support/size-guide" variant="link" size="sm">
                    사이즈 가이드
                  </ButtonLink>
                </HStack>
              ),
            }}
          >
            <SizeSelector
              mode="single"
              ariaLabel="발매 사이즈"
              options={koreanSizes.map((value) => ({ value, state: 'unavailable' as const }))}
              value={size}
              onValueChange={setSize}
              columns={5}
              size="medium"
            />
          </ContentSection>
          <Button
            type="button"
            variant="primary"
            fullWidth
            size={platform === 'mobile' ? 'short' : 'tall'}
          >
            입고 알림 신청
          </Button>
          <ContentSection
            as="section"
            title="상품 정보"
            gap="24px"
            px="32px"
            pt="32px"
            pb="40px"
            bg="var(--color-black-10)"
            headerProps={{ titleProps: { variant: 'heading8', mo: 'heading8' } }}
            _mobile={{ px: '24px' }}
          >
            <Stack gap="20px">
              <ContentHeader
                title={product.descriptionTitle}
                titleAs="h3"
                titleProps={{ variant: 'body3', weight: 'bold' }}
              />
              <Typography
                as="p"
                id={descriptionId}
                variant="body3"
                className={expanded ? undefined : css({ lineClamp: 4 })}
              >
                {product.description}
              </Typography>
              <Button
                type="button"
                variant="link"
                size="sm"
                aria-expanded={expanded}
                aria-controls={descriptionId}
                onClick={() => setExpanded((value) => !value)}
                className={css({ alignSelf: 'start' })}
              >
                {expanded ? '닫기' : '더 보기'}
              </Button>
            </Stack>
            <DescriptionList
              items={product.specifications}
              labelWidth="80px"
              termProps={{ variant: 'body4', weight: 'semibold' }}
              descriptionProps={{ variant: 'body4' }}
              slotStyles={{ root: css.raw({ columnGap: '12px', rowGap: '24px' }) }}
            />
          </ContentSection>
        </Stack>
      </Grid>
    </ContentLayout>
  );
}
