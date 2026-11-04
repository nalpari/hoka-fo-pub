'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { CSSProperties } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Flex, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentLayout } from '@/components/common/layouts/ContentLayout';

import {
  type LaunchCalendarItem,
  launchCalendarItems,
  type LaunchCalendarMode,
  launchCalendarTabs,
} from '@/app/launch-calendar/launchCalendar.data';

const actionStyle = css({
  w: '120px',
  flexShrink: 0,
  '& > span': { w: '100%' },
  '& > span > span': { flexDirection: 'row-reverse' },
  '--button-padding-x': '12px',
  '--button-disabled-bg': 'var(--color-black-20)',
  '--button-disabled-color': 'var(--color-black-40)',
  _mobile: { '--button-label-size': '14px' },
});

function LaunchCalendarCard({ item, eager }: { item: LaunchCalendarItem; eager: boolean }) {
  const platform = usePlatform();
  const imageScale = item.crop.width / 100;
  const notified = item.action === 'notified';
  const notify = item.action === 'notify' || notified;
  const disabled = notified || item.action === 'sold-out';
  const label = notified ? '신청 완료' : notify ? '알림 신청' : disabled ? 'Sold Out' : '구매하기';
  const icon = notify ? (
    <Icon
      name={notified ? 'check-regular' : 'bell-regular'}
      size="18px"
      color={notified ? 'black.40' : 'white'}
    />
  ) : undefined;

  return (
    <Stack as="article" gap="26px" minW="0" _mobile={{ gap: '0' }}>
      <Box
        as="figure"
        pos="relative"
        m="0"
        aspectRatio="4 / 5"
        bg="var(--color-black-10)"
        overflow="hidden"
        borderRadius="9.315px"
        _mobile={{ aspectRatio: '1', borderRadius: 0 }}
      >
        <Link
          href={item.href}
          aria-label={`${item.name} 런칭 상세 보기`}
          className={css({
            display: 'block',
            position: 'absolute',
            inset: 0,
            _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '-2px' },
          })}
        >
          <Box
            pos="absolute"
            style={{
              left: `${item.crop.left}%`,
              top: `${item.crop.top}%`,
              width: `${item.crop.width}%`,
              height: `${item.crop.height}%`,
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              loading={eager ? 'eager' : 'lazy'}
              sizes={
                platform === 'mobile'
                  ? `${Math.ceil(1024 * imageScale)}px`
                  : `(min-width: 1920px) ${Math.ceil(432 * imageScale)}px, (min-width: 1200px) calc((100vw - 192px) * ${imageScale / 4}), ${Math.ceil(252 * imageScale)}px`
              }
              style={{ objectFit: item.imageFit }}
            />
          </Box>
          {item.dateLabel && (
            <Typography
              as="span"
              variant="body3"
              weight="bold"
              className={css({
                position: 'absolute',
                top: '32px',
                left: '32px',
                _mobile: { top: '16px', left: '12px', fontSize: '14px' },
              })}
            >
              {item.dateLabel}
            </Typography>
          )}
        </Link>
      </Box>
      <Flex gap="16px" px="8px" align="start" _mobile={{ gap: '16px', p: '16px' }}>
        <Stack gap="16px" flex="1" minW="0" _mobile={{ gap: '8px' }}>
          {item.releaseLabel && (
            <Typography as="p" variant="body3" mo="body5">
              {item.releaseLabel}
            </Typography>
          )}
          <ContentHeader
            title={item.name}
            titleAs="h2"
            titleProps={{
              variant: 'heading8',
              weight: 'black',
              className: css({
                '&&': {
                  fontSize: '24px',
                  lineHeight: '23.04px',
                  _mobile: { fontSize: '28px', lineHeight: '1.1' },
                },
              }),
            }}
            description={item.priceLabel}
            descriptionProps={{ variant: 'body3', mo: 'body4', weight: 'medium' }}
            gap="16px"
            _mobile={{ gap: '8px' }}
          />
        </Stack>
        {item.action === 'buy' ? (
          <ButtonLink
            href={item.href}
            variant="primary"
            size={platform === 'mobile' ? 'short' : 'tall'}
            className={actionStyle}
            style={
              {
                '--button-padding-x': '12px',
                '--button-label-size': platform === 'mobile' ? '14px' : '16px',
              } as CSSProperties
            }
          >
            {label}
          </ButtonLink>
        ) : (
          <Button
            type="button"
            variant="primary"
            size={platform === 'mobile' ? 'short' : 'tall'}
            className={actionStyle}
            disabled={disabled}
            aria-label={`${item.name} ${label}`}
            icon={icon}
            style={
              {
                '--button-disabled-bg': 'var(--color-black-20)',
                '--button-disabled-color': 'var(--color-black-40)',
                '--button-padding-x': '12px',
                '--button-label-size': platform === 'mobile' ? '14px' : '16px',
              } as CSSProperties
            }
          >
            {label}
          </Button>
        )}
      </Flex>
    </Stack>
  );
}

// [ 개발팀 바인딩 ] mode별 items는 시안 fixture입니다. 탭은 독립 URL의 일반 탐색이고, 알림 신청은 미연결 표시이며 클릭으로 완료 상태를 만들지 않습니다. 실제 목록/알림 요청과 대상 ID·pending/실패/재시도·최신 응답 갱신은 런칭 캘린더 통합 소유자의 책임입니다.
/** 시안에 준비된 런칭 목록과 독립 URL 탭을 표시합니다. (Displays prepared launch listings and independently addressable tabs.) */
export function LaunchCalendarContent({
  mode = 'feed',
  items = launchCalendarItems[mode],
}: {
  mode?: LaunchCalendarMode;
  items?: readonly LaunchCalendarItem[];
}) {
  const platform = usePlatform();

  return (
    <ContentLayout
      className={css({
        w: 'min(calc(100% - 144px), 1776px)',
        mx: 'auto',
        py: '96px',
        _mobile: { w: '100%', pt: '48px', pb: '72px' },
      })}
    >
      <Stack gap="60px" _mobile={{ gap: '0' }}>
        <Stack
          as="header"
          gap="40px"
          alignItems="center"
          _mobile={{ gap: '24px', alignItems: 'stretch', px: '16px', pb: '0' }}
        >
          <ContentHeader
            title="Launch Calendar"
            titleAs="h1"
            titleProps={{
              variant: 'heading7',
              weight: 'black',
              className: css({
                '&&': {
                  fontSize: '44px',
                  lineHeight: '30.72px',
                  _mobile: { fontSize: '28px', lineHeight: '30.72px' },
                },
              }),
            }}
          />
          <HStack
            as="nav"
            aria-label="런칭 캘린더 목록"
            gap="16px"
            _mobile={{ gap: '6px', w: '100%', py: '16px' }}
          >
            {launchCalendarTabs.map((tab) => (
              <ButtonLink
                key={tab.mode}
                href={tab.href}
                aria-current={mode === tab.mode ? 'page' : undefined}
                variant={mode === tab.mode ? 'primary' : 'secondary'}
                size="short"
                style={
                  platform === 'mobile'
                    ? ({
                        '--button-height': '32px',
                        '--button-padding-x': '16px',
                        '--button-label-size': '14px',
                        '--button-label-weight': '500',
                      } as CSSProperties)
                    : undefined
                }
                className={css({
                  w: '120px',
                  '& > span': { w: '100%' },
                  _mobile: { w: 'auto', minW: '0' },
                })}
              >
                {tab.label}
              </ButtonLink>
            ))}
          </HStack>
        </Stack>
        <Grid
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          columnGap="16px"
          rowGap="96px"
          aria-label="런칭 상품"
          _mobile={{
            gridTemplateColumns: '1fr',
            rowGap: '16px',
          }}
        >
          {items.map((item, index) => (
            <LaunchCalendarCard key={item.id} item={item} eager={index < 4} />
          ))}
        </Grid>
      </Stack>
    </ContentLayout>
  );
}
