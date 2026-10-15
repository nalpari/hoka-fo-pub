'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const employeeCouponLabels = [
  '50% 할인 쿠폰',
  '가족 할인 쿠폰',
  '생일기념 30% 할인 쿠폰',
  '자녀할인 쿠폰',
  '15% 할인 쿠폰',
];

const chip = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  h: '36px',
  px: '14px',
  borderRadius: '52px',
  bg: 'black.20',
});

const expandButton = css({
  display: 'grid',
  border: '1px solid var(--colors-black-40)',
  bg: 'white.0',
  boxShadow: '1',
});

const collapsedFade = css({
  position: 'absolute',
  top: '0',
  right: '0',
  w: '84px',
  h: '52px',
  bg: 'linear-gradient(90deg, transparent 0%, var(--colors-white-0) 50%)',
  pointerEvents: 'none',
  transition: 'opacity 180ms ease',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
});

const animatedList = css({
  transition: 'height 280ms ease',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
});

const animatedChevron = css({
  transition: 'transform 280ms ease',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
});

export function EmployeeCoupons() {
  const [expanded, setExpanded] = useState(false);
  const [wrapping, setWrapping] = useState(false);
  const [listHeight, setListHeight] = useState(52);
  const listRef = useRef<HTMLDivElement>(null);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
  }, []);

  useLayoutEffect(() => {
    if (expanded && wrapping && listRef.current) {
      setListHeight(listRef.current.scrollHeight);
    }
  }, [expanded, wrapping]);

  function toggleExpanded() {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);

    if (expanded) {
      setExpanded(false);
      setListHeight(52);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setWrapping(false);
      } else {
        collapseTimer.current = setTimeout(() => setWrapping(false), 280);
      }
    } else {
      setWrapping(true);
      setExpanded(true);
    }
  }

  return (
    <Stack as="section" gap="4" aria-label="임직원 쿠폰">
      <Typography as="h2" web="heading8" mo="heading5">
        임직원 쿠폰
      </Typography>
      <Box position="relative" minH="52px">
        <HStack
          id="employee-coupon-list"
          ref={listRef}
          className={animatedList}
          columnGap="1"
          rowGap="2"
          flexWrap={wrapping ? 'wrap' : 'nowrap'}
          alignItems="center"
          overflow="hidden"
          h={`${listHeight}px`}
          pr={wrapping ? '14' : '0'}
          py="2"
        >
          {employeeCouponLabels.map((label) => (
            <Box as="span" key={label} className={chip}>
              <Typography mo="body4" weight="medium">
                {label}
              </Typography>
            </Box>
          ))}
        </HStack>
        <Box className={collapsedFade} opacity={expanded ? '0' : '1'} />
        <Box position="absolute" top="0" right="0">
          <IconButton
            aria-controls="employee-coupon-list"
            aria-expanded={expanded}
            aria-label={expanded ? '임직원 쿠폰 접기' : '임직원 쿠폰 펼치기'}
            className={expandButton}
            onClick={toggleExpanded}
            shape="circle"
            size="52px"
          >
            <Box className={animatedChevron} transform={expanded ? 'rotate(180deg)' : undefined}>
              <Icon src="/images/icon/chevron-down-small.svg" size="16px" />
            </Box>
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
}
