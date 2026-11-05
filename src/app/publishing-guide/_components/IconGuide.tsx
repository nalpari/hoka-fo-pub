'use client';

import { type ReactNode, useCallback, useRef, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Circle, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { renderGuideCode } from './GuideCode';
import { type GuideCopyNotice, GuideCopyToast } from './GuideCopyToast';
import { GuideTimeline } from './GuideTimeline';

type IconExample = {
  registeredName?: string;
  origin?: { label: string; name: string; detail?: string };
  label: string;
  preview: ReactNode;
  code: string;
  source: string;
  note: string;
};

// 현재 사용처를 조사한 고정 가이드 목록입니다. 서비스 데이터나 자동 수집 결과가 아닙니다.
const iconGroups: { id: string; title: string; description: string; items: IconExample[] }[] = [
  {
    id: 'font-awesome-basic',
    title: '폰트어썸 기본형 · 18px',
    description: '18px 원본 SVG 하나를 size로 확대·축소합니다.',
    items: [
      {
        label: '더하기 · 18px',
        registeredName: 'plus-regular',
        origin: { label: 'Font Awesome', name: 'plus', detail: 'Regular' },
        preview: <Icon name="plus-regular" size={18} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="plus-regular" size={18} />`,
        source: 'Figma plus / Regular · 화면 미적용',
        note: '원본 18px · size로 크기 변경 · color로 색상 변경 가능',
      },
      {
        label: '더하기 · 16px',
        registeredName: 'plus-regular',
        origin: { label: 'Font Awesome', name: 'plus', detail: 'Regular' },
        preview: <Icon name="plus-regular" size={16} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="plus-regular" size={16} />`,
        source: 'ProductListingPage.tsx · CatalogFilterTrigger',
        note: '상품 목록 필터 · 접힌 필터 펼치기 · 16px',
      },
      {
        label: '빼기 · 18px',
        registeredName: 'minus-regular',
        origin: { label: 'Font Awesome', name: 'minus', detail: 'Regular' },
        preview: <Icon name="minus-regular" size={18} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="minus-regular" size={18} />`,
        source: 'Figma minus / Regular · 화면 미적용',
        note: '원본 18px · size로 크기 변경 · color로 색상 변경 가능',
      },
      {
        label: '빼기 · 16px',
        registeredName: 'minus-regular',
        origin: { label: 'Font Awesome', name: 'minus', detail: 'Regular' },
        preview: <Icon name="minus-regular" size={16} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="minus-regular" size={16} />`,
        source: 'ProductListingPage.tsx · CatalogFilterTrigger',
        note: '상품 목록 필터 · 펼친 필터 접기 · 16px',
      },
      {
        label: '닫기 기본 · 18px',
        registeredName: 'xmark-regular',
        origin: { label: 'Font Awesome', name: 'xmark', detail: 'Regular' },
        preview: <Icon name="xmark-regular" size={18} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="xmark-regular" size={18} />`,
        source: 'Figma xmark / Regular',
        note: '원본 18px · size로 크기 변경 · color로 색상 변경 가능',
      },
      {
        label: '닫기 · 20px',
        registeredName: 'xmark-regular',
        origin: { label: 'Font Awesome', name: 'xmark', detail: 'Regular' },
        preview: <Icon name="xmark-regular" size={20} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="xmark-regular" size={20} />`,
        source: 'CartProductSection.tsx, ModalDialog.tsx',
        note: '원본 18px · size로 크기 변경 · color로 색상 변경 가능',
      },
      {
        label: '선택 태그 삭제 · 모바일 14px / 데스크탑 16px',
        registeredName: 'xmark-regular',
        origin: { label: 'Font Awesome', name: 'xmark', detail: 'Regular' },
        preview: (
          <HStack gap="6">
            <Stack alignItems="center" gap="2">
              <Icon name="xmark-regular" size={14} />
              <Typography variant="body5">모바일 14px</Typography>
            </Stack>
            <Stack alignItems="center" gap="2">
              <Icon name="xmark-regular" size={16} />
              <Typography variant="body5">데스크탑 16px</Typography>
            </Stack>
          </HStack>
        ),
        code: `import { usePlatform } from '@/context/platform';
import { Icon } from '@/components/common/atoms/Icon';

const platform = usePlatform();

<Icon name="xmark-regular" size={platform === 'mobile' ? '14px' : '16px'} />`,
        source: 'ProductListingPage.tsx',
        note: '선택 태그 삭제 · 모바일 14px / 데스크탑 16px · 원본 18px',
      },
    ],
  },
  {
    id: 'icon-design-system',
    title: '디자인팀 아이콘',
    description:
      '방향·액션·배너·폼 상태·별점·쇼핑 아이콘. 확인된 글리프는 이름에 Regular/Solid를 표기합니다.',
    items: [
      {
        label: '오른쪽 기본',
        registeredName: 'hoka-nav-chevron-right-regular',

        preview: <Icon name="hoka-nav-chevron-right-regular" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-right-regular" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '왼쪽 기본',
        registeredName: 'hoka-nav-chevron-left-regular',

        preview: <Icon name="hoka-nav-chevron-left-regular" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-left-regular" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '위 기본',
        registeredName: 'hoka-nav-chevron-up-regular',

        preview: <Icon name="hoka-nav-chevron-up-regular" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-up-regular" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '아래 기본',
        registeredName: 'hoka-nav-chevron-down-regular',

        preview: <Icon name="hoka-nav-chevron-down-regular" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-down-regular" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '오른쪽 기본 · 회색',
        registeredName: 'hoka-nav-chevron-right-regular',

        preview: <Icon name="hoka-nav-chevron-right-regular" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-right-regular" size={24} color="black.40" />`,
        source: 'HOKA 디자인 시스템',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '왼쪽 기본 · 회색',
        registeredName: 'hoka-nav-chevron-left-regular',

        preview: <Icon name="hoka-nav-chevron-left-regular" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-left-regular" size={24} color="black.40" />`,
        source: 'HOKA 디자인 시스템',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '위 기본 · 회색',
        registeredName: 'hoka-nav-chevron-up-regular',

        preview: <Icon name="hoka-nav-chevron-up-regular" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-up-regular" size={24} color="black.40" />`,
        source: 'HOKA 디자인 시스템',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '아래 기본 · 회색',
        registeredName: 'hoka-nav-chevron-down-regular',

        preview: <Icon name="hoka-nav-chevron-down-regular" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-down-regular" size={24} color="black.40" />`,
        source: 'HOKA 디자인 시스템',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '오른쪽 원',
        registeredName: 'hoka-nav-chevron-right-regular-circle',

        preview: <Icon name="hoka-nav-chevron-right-regular-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-right-regular-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '왼쪽 원',
        registeredName: 'hoka-nav-chevron-left-regular-circle',

        preview: <Icon name="hoka-nav-chevron-left-regular-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-left-regular-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '위 원',
        registeredName: 'hoka-nav-chevron-up-regular-circle',

        preview: <Icon name="hoka-nav-chevron-up-regular-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-up-regular-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '아래 원',
        registeredName: 'hoka-nav-chevron-down-regular-circle',

        preview: <Icon name="hoka-nav-chevron-down-regular-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-down-regular-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '오른쪽 원 · 회색',
        registeredName: 'hoka-nav-chevron-right-regular-circle',

        preview: <Icon name="hoka-nav-chevron-right-regular-circle" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-right-regular-circle" size={24} color="black.40" />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '왼쪽 원 · 회색',
        registeredName: 'hoka-nav-chevron-left-regular-circle',

        preview: <Icon name="hoka-nav-chevron-left-regular-circle" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-left-regular-circle" size={24} color="black.40" />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '위 원 · 회색',
        registeredName: 'hoka-nav-chevron-up-regular-circle',

        preview: <Icon name="hoka-nav-chevron-up-regular-circle" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-up-regular-circle" size={24} color="black.40" />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '아래 원 · 회색',
        registeredName: 'hoka-nav-chevron-down-regular-circle',

        preview: <Icon name="hoka-nav-chevron-down-regular-circle" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-nav-chevron-down-regular-circle" size={24} color="black.40" />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
    ],
  },
  {
    id: 'icon-design-actions',
    title: '디자인팀 액션 아이콘',
    description: '기본 · 회색 · 원형',
    items: [
      {
        label: '더하기 기본',
        registeredName: 'hoka-action-plus-regular',

        preview: <Icon name="hoka-action-plus-regular" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-plus-regular" size={24} />`,
        source: 'NumberStepper.tsx, InquiryOrderLookup.tsx',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '빼기 기본',
        registeredName: 'hoka-action-minus-regular',

        preview: <Icon name="hoka-action-minus-regular" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-minus-regular" size={24} />`,
        source: 'NumberStepper.tsx, InquiryOrderLookup.tsx',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },

      {
        label: '닫기 기본',
        registeredName: 'hoka-action-xmark-regular',

        preview: <Icon name="hoka-action-xmark-regular" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-xmark-regular" size={24} />`,
        source:
          'InquiryFormContent.tsx, ProductDetailContent.tsx, SearchHeader.tsx, ShopShell.tsx, TextInput.tsx',
        note: '원본 여백 포함 24px · 화면에 따라 14·16·18·24px',
      },
      {
        label: '더하기 · 회색',
        registeredName: 'hoka-action-plus-regular',

        preview: <Icon name="hoka-action-plus-regular" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-plus-regular" size={24} color="black.40" />`,
        source: 'InquiryOrderLookup.tsx',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '빼기 · 회색',
        registeredName: 'hoka-action-minus-regular',

        preview: <Icon name="hoka-action-minus-regular" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-minus-regular" size={24} color="black.40" />`,
        source: 'HOKA 디자인 시스템',
        note: '여백 포함 24px · 회색은 color="black.40"',
      },
      {
        label: '닫기 · 회색',
        registeredName: 'hoka-action-xmark-regular',

        preview: <Icon name="hoka-action-xmark-regular" size={24} color="black.40" />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-xmark-regular" size={24} color="black.40" />`,
        source:
          'InquiryFormContent.tsx, ProductDetailContent.tsx, SearchHeader.tsx, ShopShell.tsx, TextInput.tsx',
        note: '원본 여백 포함 24px · 화면에 따라 14·16·18·24px',
      },
      {
        label: '더하기 원',
        registeredName: 'hoka-action-plus-regular-circle',

        preview: <Icon name="hoka-action-plus-regular-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-plus-regular-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '빼기 원',
        registeredName: 'hoka-action-minus-regular-circle',

        preview: <Icon name="hoka-action-minus-regular-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-minus-regular-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '닫기 원',
        registeredName: 'hoka-action-xmark-regular-circle',

        preview: <Icon name="hoka-action-xmark-regular-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-xmark-regular-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
    ],
  },
  {
    id: 'icon-design-other',
    title: '디자인팀 폼·배너·쇼핑 아이콘',
    description: '상태별 예시',
    items: [
      {
        label: '배너 left default',
        registeredName: 'hoka-echo-left-state-default',
        preview: <Icon name="hoka-echo-left-state-default" size={16} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-echo-left-state-default" size={16} />`,
        source: '현재 사용 화면 없음',
        note: '16px',
      },
      {
        label: '배너 left hover',
        registeredName: 'hoka-echo-left-state-hover',
        preview: <Icon name="hoka-echo-left-state-hover" size={16} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-echo-left-state-hover" size={16} />`,
        source: '현재 사용 화면 없음',
        note: '16px',
      },
      {
        label: '배너 right default',
        registeredName: 'hoka-echo-right-state-default',
        preview: <Icon name="hoka-echo-right-state-default" size={16} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-echo-right-state-default" size={16} />`,
        source: '현재 사용 화면 없음',
        note: '16px',
      },
      {
        label: '배너 right hover',
        registeredName: 'hoka-echo-right-state-hover',
        preview: <Icon name="hoka-echo-right-state-hover" size={16} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-echo-right-state-hover" size={16} />`,
        source: '현재 사용 화면 없음',
        note: '16px',
      },
      {
        label: '원형 액션 left default',
        registeredName: 'hoka-action-angle-left-default-circle',

        preview: <Icon name="hoka-action-angle-left-default-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-angle-left-default-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '원형 액션 left active',
        registeredName: 'hoka-action-angle-left-active-circle',

        preview: <Icon name="hoka-action-angle-left-active-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-angle-left-active-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '원형 액션 right default',
        registeredName: 'hoka-action-angle-right-default-circle',

        preview: <Icon name="hoka-action-angle-right-default-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-angle-right-default-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '원형 액션 right active',
        registeredName: 'hoka-action-angle-right-active-circle',

        preview: <Icon name="hoka-action-angle-right-active-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-angle-right-active-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '원형 액션 plus default',
        registeredName: 'hoka-action-plus-regular-default-circle',

        preview: <Icon name="hoka-action-plus-regular-default-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-plus-regular-default-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: '원형 액션 plus active',
        registeredName: 'hoka-action-plus-regular-active-circle',

        preview: <Icon name="hoka-action-plus-regular-active-circle" size={24} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-action-plus-regular-active-circle" size={24} />`,
        source: 'HOKA 디자인 시스템',
        note: '24px',
      },
      {
        label: 'checkbox · 기본',
        origin: {
          label: '종류',
          name: 'checkbox 상태 SVG',
          detail: '폼 상태 조합',
        },
        preview: <Icon name="hoka-checkbox-unchecked" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-checkbox-unchecked" size={16} />',
        source: 'Checkbox.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
        registeredName: 'hoka-checkbox-unchecked',
      },
      {
        label: 'checkbox · 선택',
        origin: {
          label: '종류',
          name: 'checkbox 상태 SVG',
          detail: '폼 상태 조합',
        },
        preview: <Icon name="hoka-checkbox-checked" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-checkbox-checked" size={16} />',
        source: 'Checkbox.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
        registeredName: 'hoka-checkbox-checked',
      },
      {
        label: 'checkbox · 비활성 기본',
        origin: {
          label: '종류',
          name: 'checkbox 상태 SVG',
          detail: '폼 상태 조합',
        },
        preview: <Icon name="hoka-checkbox-disabled" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-checkbox-disabled" size={16} />',
        source: 'Checkbox.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
        registeredName: 'hoka-checkbox-disabled',
      },
      {
        label: 'checkbox · 비활성 선택',
        origin: {
          label: '종류',
          name: 'checkbox 상태 SVG',
          detail: '폼 상태 조합',
        },
        preview: <Icon name="hoka-checkbox-disabled-checked" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-checkbox-disabled-checked" size={16} />',
        source: 'Checkbox.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
        registeredName: 'hoka-checkbox-disabled-checked',
      },
      {
        label: 'radio · 기본',
        origin: {
          label: '종류',
          name: 'radio 상태 SVG',
          detail: '폼 상태 조합',
        },
        preview: <Icon name="hoka-radio-unchecked" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-radio-unchecked" size={16} />',
        source: 'Radio.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
        registeredName: 'hoka-radio-unchecked',
      },
      {
        label: 'radio · 선택',
        origin: {
          label: '종류',
          name: 'radio 상태 SVG',
          detail: '폼 상태 조합',
        },
        preview: <Icon name="hoka-radio-checked" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-radio-checked" size={16} />',
        source: 'Radio.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
        registeredName: 'hoka-radio-checked',
      },
      {
        label: 'radio · 비활성 기본',
        origin: {
          label: '종류',
          name: 'radio 상태 SVG',
          detail: '폼 상태 조합',
        },
        preview: <Icon name="hoka-radio-disabled" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-radio-disabled" size={16} />',
        source: 'Radio.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
        registeredName: 'hoka-radio-disabled',
      },
      {
        label: 'radio · 비활성 선택',
        origin: {
          label: '종류',
          name: 'radio 상태 SVG',
          detail: '폼 상태 조합',
        },
        preview: <Icon name="hoka-radio-disabled-checked" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-radio-disabled-checked" size={16} />',
        source: 'Radio.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
        registeredName: 'hoka-radio-disabled-checked',
      },
      {
        label: 'faStarRegular',
        origin: { label: 'Font Awesome', name: 'star', detail: 'Regular' },
        preview: <Icon name="hoka-star-regular" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-star-regular" size={16} />',
        source: 'RatingStars.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'hoka-star-regular',
      },
      {
        label: 'faStarSolid',
        origin: { label: 'Font Awesome', name: 'star', detail: 'Solid' },
        preview: <Icon name="hoka-star-solid" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-star-solid" size={16} />',
        source: 'RatingStars.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'hoka-star-solid',
      },
      {
        label: '별점 반 개',
        origin: {
          label: 'Font Awesome',
          name: 'hoka-star-half-stroke',
          detail: '스타일 구분 미확인',
        },
        preview: <Icon name="hoka-star-half-stroke" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-star-half-stroke" size={16} />',
        source: 'RatingStars.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'hoka-star-half-stroke',
      },
      {
        label: '장바구니 담기',
        origin: { label: 'Font Awesome', name: 'bag-shopping', detail: 'Regular' },
        preview: <Icon name="hoka-bag-shopping-regular" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-bag-shopping-regular" size={18} />\n\n<Icon name="hoka-bag-shopping-regular" size={22} />',
        source: 'OrdersProducts.tsx, ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'hoka-bag-shopping-regular',
      },
      {
        label: '쇼핑백 · 알림 배지',
        registeredName: 'hoka-bag-shopping-regular',
        preview: (
          <Box as="span" pos="relative" display="inline-flex">
            <Icon name="hoka-bag-shopping-regular" size={22} />
            <Circle pos="absolute" top="-.3rem" right="-4px" size="12px" bg="blue.100">
              <Typography
                variant="body5"
                weight="medium"
                tone="inverse"
                className={css({ fontSize: '8px', lineHeight: '16px' })}
              >
                1
              </Typography>
            </Circle>
          </Box>
        ),
        code: `import { css } from 'styled-system/css';
import { Box, Circle } from 'styled-system/jsx';

import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

<Box as="span" pos="relative" display="inline-flex">
  <Icon name="hoka-bag-shopping-regular" size={22} />
  <Circle pos="absolute" top="-.3rem" right="-4px" size="12px" bg="blue.100">
    <Typography variant="body5" weight="medium" tone="inverse" className={css({ fontSize: '8px', lineHeight: '16px' })}>
      1
    </Typography>
  </Circle>
</Box>`,
        source: 'ShopShell.tsx',
        note: '22px 아이콘 · 12px 파란 배지 · 알림 1건 예시',
      },
      {
        label: '장바구니',
        registeredName: 'hoka-basket-shopping-regular',
        preview: <Icon name="hoka-basket-shopping-regular" size={16} />,
        code: `import { Icon } from '@/components/common/atoms/Icon';

<Icon name="hoka-basket-shopping-regular" size={16} />`,
        source: 'ShopShell.tsx',
        note: '알림 건수는 화면에서 배지를 조합합니다.',
      },
      {
        label: '장바구니 · 알림 배지',
        registeredName: 'hoka-basket-shopping-regular',
        preview: (
          <Box as="span" pos="relative" display="inline-flex">
            <Icon name="hoka-basket-shopping-regular" size={22} />
            <Circle pos="absolute" top="-.3rem" right="-4px" size="12px" bg="blue.100">
              <Typography
                variant="body5"
                weight="medium"
                tone="inverse"
                className={css({ fontSize: '8px', lineHeight: '16px' })}
              >
                1
              </Typography>
            </Circle>
          </Box>
        ),
        code: `import { css } from 'styled-system/css';
import { Box, Circle } from 'styled-system/jsx';

import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

<Box as="span" pos="relative" display="inline-flex">
  <Icon name="hoka-basket-shopping-regular" size={22} />
  <Circle pos="absolute" top="-.3rem" right="-4px" size="12px" bg="blue.100">
    <Typography variant="body5" weight="medium" tone="inverse" className={css({ fontSize: '8px', lineHeight: '16px' })}>
      1
    </Typography>
  </Circle>
</Box>`,
        source: 'ShopShell.tsx',
        note: '22px 아이콘 · 12px 파란 배지 · 알림 1건 예시',
      },
      {
        label: 'faUser',
        origin: { label: 'Font Awesome', name: 'user', detail: 'Regular' },
        preview: <Icon name="hoka-user-regular" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-user-regular" size={18} />',
        source: 'ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'hoka-user-regular',
      },
      {
        label: '계정 · 알림 배지',
        registeredName: 'hoka-user-regular',
        preview: (
          <Box as="span" pos="relative" display="inline-flex">
            <Icon name="hoka-user-regular" size={22} />
            <Circle pos="absolute" top="-.3rem" right="-4px" size="12px" bg="blue.100">
              <Typography
                variant="body5"
                weight="medium"
                tone="inverse"
                className={css({ fontSize: '8px', lineHeight: '16px' })}
              >
                1
              </Typography>
            </Circle>
          </Box>
        ),
        code: `import { css } from 'styled-system/css';
import { Box, Circle } from 'styled-system/jsx';

import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

<Box as="span" pos="relative" display="inline-flex">
  <Icon name="hoka-user-regular" size={22} />
  <Circle pos="absolute" top="-.3rem" right="-4px" size="12px" bg="blue.100">
    <Typography variant="body5" weight="medium" tone="inverse" className={css({ fontSize: '8px', lineHeight: '16px' })}>
      1
    </Typography>
  </Circle>
</Box>`,
        source: 'ShopShell.tsx',
        note: '22px 아이콘 · 12px 파란 배지 · 알림 1건 예시',
      },
      {
        label: 'faEye',
        origin: { label: 'Font Awesome', name: 'eye', detail: 'Regular' },
        preview: <Icon name="eye-regular" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="eye-regular" size={24} />',
        source: 'TextInput.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'eye-regular',
      },
      {
        label: 'faEyeSlash',
        origin: { label: 'Font Awesome', name: 'eye-slash', detail: 'Regular' },
        preview: <Icon name="eye-slash-regular" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="eye-slash-regular" size={24} />',
        source: 'TextInput.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'eye-slash-regular',
      },
    ],
  },
  {
    id: 'icon-direction',
    title: '화살표·방향',
    description: '화살표와 이동 방향',
    items: [
      {
        label: '캐러셀 · 이전',
        preview: <Icon name="carousel-arrow" size={48} direction="previous" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="carousel-arrow" size={48} direction="previous" />',
        source: 'CarouselControls.tsx',
        note: '전용 SVG · direction으로 방향 지정',
        registeredName: 'carousel-arrow',
      },
      {
        label: '캐러셀 · 다음',
        preview: <Icon name="carousel-arrow" size={48} direction="next" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="carousel-arrow" size={48} direction="next" />',
        source: 'CarouselControls.tsx',
        note: '전용 SVG · direction으로 방향 지정',
        registeredName: 'carousel-arrow',
      },
      {
        label: '하단 화살표',
        origin: { label: 'Font Awesome', name: 'chevron-down', detail: 'Regular' },
        preview: <Icon name="chevron-down-regular" size={14} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="chevron-down-regular" size={14} />\n\n<Icon name="chevron-down-regular" size={13} />',
        source:
          'MyPageReviewsContent.tsx, ProductListingPage.tsx, Accordion.tsx, FaqContent.tsx, ProductDetailContent.tsx, RunningSessionEntriesContent.tsx, IaStructurePage.tsx, TermsDocument.tsx, NoticesContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'chevron-down-regular',
      },

      {
        label: 'faChevronLeft',
        origin: { label: 'Font Awesome', name: 'chevron-left', detail: 'Solid' },
        preview: <Icon name="chevron-left-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="chevron-left-solid" size={24} />',
        source: 'ProductOptionList.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'chevron-left-solid',
      },
      {
        label: '우측 화살표',
        origin: { label: 'Font Awesome', name: 'chevron-right', detail: '스타일 구분 미확인' },
        preview: <Icon name="chevron-right" size={12} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="chevron-right" size={12} />',
        source: 'Breadcrumb.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'chevron-right',
      },
      {
        label: 'faChevronRight',
        origin: { label: 'Font Awesome', name: 'chevron-right', detail: 'Solid' },
        preview: <Icon name="chevron-right-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="chevron-right-solid" size={24} />',
        source: 'OrderRecommendations.tsx, ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'chevron-right-solid',
      },
      {
        label: '드롭다운 표시',
        origin: { label: 'Font Awesome', name: 'sort-down', detail: 'Solid' },
        preview: <Icon name="sort-down-solid" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="sort-down-solid" size={18} />',
        source: 'Dropdown.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'sort-down-solid',
      },
    ],
  },
  {
    id: 'icon-action',
    title: '기본 동작',
    description: '검색·닫기·추가·공유·복사',
    items: [
      {
        label: '공유',
        origin: { label: 'Font Awesome', name: 'arrow-up-from-bracket', detail: 'Regular' },
        preview: <Icon name="arrow-up-from-bracket-regular" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="arrow-up-from-bracket-regular" size={16} />',
        source: 'ProductDetailContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'arrow-up-from-bracket-regular',
      },
      {
        label: '모바일 메뉴',
        origin: { label: 'Font Awesome', name: 'bars', detail: 'Regular' },
        preview: <Icon name="bars-regular" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="bars-regular" size={20} />',
        source: 'ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'bars-regular',
      },
      {
        label: 'faCopy',
        origin: { label: 'Font Awesome', name: 'copy', detail: 'Regular' },
        preview: <Icon name="copy-regular" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="copy-regular" size={24} />',
        source: 'ButtonGuide.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'copy-regular',
      },
      {
        label: '검색',
        origin: { label: 'Font Awesome', name: 'magnifying-glass', detail: 'Regular' },
        preview: <Icon name="magnifying-glass-regular" size={19} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="magnifying-glass-regular" size={19} />',
        source: 'ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'magnifying-glass-regular',
      },
      {
        label: 'faMagnifyingGlass',
        origin: { label: 'Font Awesome', name: 'magnifying-glass', detail: 'Solid' },
        preview: <Icon name="magnifying-glass-solid" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="magnifying-glass-solid" size={16} />',
        source: 'ProductDetailContent.tsx, SearchField.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'magnifying-glass-solid',
      },
      {
        label: 'faScrewdriverWrench',
        origin: { label: 'Font Awesome', name: 'screwdriver-wrench', detail: 'Solid' },
        preview: <Icon name="screwdriver-wrench-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="screwdriver-wrench-solid" size={24} />',
        source: 'ProductDetailContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'screwdriver-wrench-solid',
      },
      {
        label: '필터',
        origin: { label: 'Font Awesome', name: 'sliders', detail: 'Regular' },
        preview: <Icon name="sliders-regular" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="sliders-regular" size={20} />',
        source: 'ProductListingPage.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'sliders-regular',
      },
      {
        label: '선택 태그 삭제',
        origin: { label: 'Font Awesome', name: 'xmark', detail: 'Regular' },
        preview: <Icon name="hoka-action-xmark-regular" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="hoka-action-xmark-regular" size={24} />',
        source: 'ProductListingPage.tsx, OrderTrackingDialog.tsx, BottomSheet.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'hoka-action-xmark-regular',
      },
    ],
  },
  {
    id: 'icon-status',
    title: '상태·안내',
    description: '체크·경고·정보·잠금·알림',
    items: [
      {
        label: 'faBan',
        origin: { label: 'Font Awesome', name: 'ban', detail: 'Solid' },
        preview: <Icon name="ban-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="ban-solid" size={24} />',
        source: 'IaStructurePage.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'ban-solid',
      },
      {
        label: '발매 알림',
        origin: { label: 'Font Awesome', name: 'bell', detail: 'Regular' },
        preview: <Icon name="bell-regular" size={18} color="white" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="bell-regular" size={18} color="white" />\n\n<Icon name="bell-regular" size={14} />',
        source: 'LaunchCalendarContent.tsx, SizeSelector.tsx',
        note: 'color로 색상 변경 가능',

        registeredName: 'bell-regular',
      },
      {
        label: '알림 신청됨',
        origin: { label: 'Font Awesome', name: 'check', detail: 'Regular' },
        preview: <Icon name="check-regular" size={18} color="black.40" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="check-regular" size={18} color="black.40" />',
        source: 'LaunchCalendarContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'check-regular',
      },
      {
        label: 'faCheck',
        origin: { label: 'Font Awesome', name: 'check', detail: 'Solid' },
        preview: <Icon name="check-solid" size={12} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="check-solid" size={12} />',
        source: 'StepIndicator.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'check-solid',
      },
      {
        label: 'faCircleCheck',
        origin: { label: 'Font Awesome', name: 'circle-check', detail: 'Regular' },
        preview: <Icon name="circle-check-regular" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="circle-check-regular" size={18} />',
        source: 'CouponManagement.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'circle-check-regular',
      },
      {
        label: '정보 도움말',
        origin: { label: 'Font Awesome', name: 'circle-info', detail: 'Regular' },
        preview: <Icon name="circle-info-regular" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="circle-info-regular" size={16} />',
        source: 'HelpTips.tsx, Dropdown.tsx, FormField.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'circle-info-regular',
      },
      {
        label: '질문 도움말',
        origin: { label: 'Font Awesome', name: 'circle-question', detail: 'Regular' },
        preview: <Icon name="circle-question-regular" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="circle-question-regular" size={16} />',
        source: 'HelpTips.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'circle-question-regular',
      },
      {
        label: '회원 전용',
        origin: { label: 'Font Awesome', name: 'lock-keyhole', detail: 'Regular' },
        preview: <Icon name="lock-keyhole-regular" size={14} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="lock-keyhole-regular" size={14} />',
        source: 'ProductDetailContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'lock-keyhole-regular',
      },
      {
        label: 'faTriangleExclamation',
        origin: { label: 'Font Awesome', name: 'triangle-exclamation', detail: 'Solid' },
        preview: <Icon name="triangle-exclamation-solid" size={48} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="triangle-exclamation-solid" size={48} />',
        source: 'SystemStatusPage.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'triangle-exclamation-solid',
      },
      {
        label: '계정 잠금 해제',
        origin: { label: 'Font Awesome', name: 'unlock-keyhole', detail: 'Regular' },
        preview: <Icon name="unlock-keyhole-regular" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="unlock-keyhole-regular" size={18} />',
        source: 'account-locked/complete/page.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'unlock-keyhole-regular',
      },
    ],
  },
  {
    id: 'icon-symbol',
    title: '사물·기호',
    description: '장바구니·사용자·시간·별·하트',
    items: [
      {
        label: 'faBox',
        origin: { label: 'Font Awesome', name: 'box', detail: 'Solid' },
        preview: <Icon name="box-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="box-solid" size={24} />',
        source: 'ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'box-solid',
      },
      {
        label: 'faBoxOpen',
        origin: { label: 'Font Awesome', name: 'box-open', detail: 'Solid' },
        preview: <Icon name="box-open-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="box-open-solid" size={24} />',
        source: 'ProductDetailContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'box-open-solid',
      },
      {
        label: '날짜 선택',
        origin: { label: 'Font Awesome', name: 'calendar', detail: 'Regular' },
        preview: <Icon name="calendar-regular" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="calendar-regular" size={16} />',
        source: 'OrdersStatus.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'calendar-regular',
      },
      {
        label: '멤버십',
        origin: { label: 'Font Awesome', name: 'circle-star', detail: 'Solid' },
        preview: <Icon name="circle-star-solid" size={16} color="black.10" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="circle-star-solid" size={16} color="black.10" />',
        source: 'ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'circle-star-solid',
      },
      {
        label: 'faClipboardList',
        origin: { label: 'Font Awesome', name: 'clipboard-list', detail: 'Solid' },
        preview: <Icon name="clipboard-list-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="clipboard-list-solid" size={24} />',
        source: 'ProductDetailContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'clipboard-list-solid',
      },
      {
        label: '입고 예정',
        origin: { label: 'Font Awesome', name: 'clock-nine', detail: 'Regular' },
        preview: <Icon name="clock-nine-regular" size={12} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="clock-nine-regular" size={12} />',
        source: 'SizeSelector.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'clock-nine-regular',
      },
      {
        label: '발매 시간',
        origin: { label: 'Font Awesome', name: 'clock-ten', detail: '스타일 구분 미확인' },
        preview: <Icon name="clock-ten" size={18} color="blue.100" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="clock-ten" size={18} color="blue.100" />',
        source: 'LaunchCalendarDetail.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'clock-ten',
      },
      {
        label: 'faComments',
        origin: { label: 'Font Awesome', name: 'comments', detail: 'Solid' },
        preview: <Icon name="comments-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="comments-solid" size={24} />',
        source: 'ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'comments-solid',
      },
      {
        label: 'faCreditCard',
        origin: { label: 'Font Awesome', name: 'credit-card', detail: 'Solid' },
        preview: <Icon name="credit-card-solid" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="credit-card-solid" size={16} />',
        source: 'CheckoutPayment.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'credit-card-solid',
      },
      {
        label: 'faDesktop',
        origin: { label: 'Font Awesome', name: 'desktop', detail: 'Solid' },
        preview: <Icon name="desktop-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="desktop-solid" size={24} />',
        source: 'IaStructurePage.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'desktop-solid',
      },
      {
        label: 'faFileLines',
        origin: { label: 'Font Awesome', name: 'file-lines', detail: 'Solid' },
        preview: <Icon name="file-lines-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="file-lines-solid" size={24} />',
        source: 'IaStructurePage.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'file-lines-solid',
      },
      {
        label: 'faFilePdf',
        origin: { label: 'Font Awesome', name: 'file-pdf', detail: 'Solid' },
        preview: <Icon name="file-pdf-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="file-pdf-solid" size={24} />',
        source: 'InquiryListContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'file-pdf-solid',
      },
      {
        label: 'faFolder',
        origin: { label: 'Font Awesome', name: 'folder', detail: 'Solid' },
        preview: <Icon name="folder-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="folder-solid" size={24} />',
        source: 'IaStructurePage.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'folder-solid',
      },
      {
        label: 'faFolderOpen',
        origin: { label: 'Font Awesome', name: 'folder-open', detail: 'Solid' },
        preview: <Icon name="folder-open-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="folder-open-solid" size={24} />',
        source: 'IaStructurePage.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'folder-open-solid',
      },
      {
        label: 'faFolderTree',
        origin: { label: 'Font Awesome', name: 'folder-tree', detail: 'Solid' },
        preview: <Icon name="folder-tree-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="folder-tree-solid" size={24} />',
        source: 'IaStructurePage.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'folder-tree-solid',
      },
      {
        label: '가입 선물',
        origin: { label: 'Font Awesome', name: 'gift', detail: 'Regular' },
        preview: <Icon name="gift-regular" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="gift-regular" size={18} />',
        source: 'SignupContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'gift-regular',
      },
      {
        label: '관심상품 기본',
        origin: { label: 'Font Awesome', name: 'heart', detail: 'Regular' },
        preview: <Icon name="heart-regular" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="heart-regular" size={20} />',
        source: 'Wishlist.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'heart-regular',
      },
      {
        label: '관심상품 선택',
        origin: { label: 'Font Awesome', name: 'heart', detail: 'Solid' },
        preview: <Icon name="heart-solid" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="heart-solid" size={20} />',
        source: 'Wishlist.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'heart-solid',
      },
      {
        label: 'faImage',
        origin: { label: 'Font Awesome', name: 'image', detail: 'Solid' },
        preview: <Icon name="image-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="image-solid" size={24} />',
        source: 'InquiryListContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'image-solid',
      },
      {
        label: 'faLocationDot',
        origin: { label: 'Font Awesome', name: 'location-dot', detail: 'Solid' },
        preview: <Icon name="location-dot-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="location-dot-solid" size={24} />',
        source: 'ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'location-dot-solid',
      },
      {
        label: '회원 등급',
        origin: { label: 'Font Awesome', name: 'medal', detail: 'Regular' },
        preview: <Icon name="medal-regular" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="medal-regular" size={18} />',
        source: 'SignupContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'medal-regular',
      },
      {
        label: '기념일',
        origin: { label: 'Font Awesome', name: 'party-horn', detail: 'Regular' },
        preview: <Icon name="party-horn-regular" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="party-horn-regular" size={18} />',
        source: 'SignupContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'party-horn-regular',
      },
      {
        label: '사이즈 가이드',
        origin: { label: 'Font Awesome', name: 'ruler-horizontal', detail: 'Regular' },
        preview: <Icon name="ruler-horizontal-regular" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="ruler-horizontal-regular" size={18} />\n\n<Icon name="ruler-horizontal-regular" size={16} />',
        source: 'ProductDetailContent.tsx, LaunchCalendarDetail.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'ruler-horizontal-regular',
      },
      {
        label: '타이머',
        origin: { label: 'Font Awesome', name: 'timer', detail: 'Regular' },
        preview: <Icon name="timer-regular" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="timer-regular" size={18} />',
        source: 'ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'timer-regular',
      },
      {
        label: 'faTruckFast',
        origin: { label: 'Font Awesome', name: 'truck-fast', detail: 'Solid' },
        preview: <Icon name="truck-fast-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="truck-fast-solid" size={24} />',
        source: 'ProductDetailContent.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'truck-fast-solid',
      },
      {
        label: 'faUserSolid',
        origin: { label: 'Font Awesome', name: 'user', detail: 'Solid' },
        preview: <Icon name="user-solid" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="user-solid" size={24} />',
        source: 'ShopShell.tsx',
        note: 'color로 색상 변경 가능',
        registeredName: 'user-solid',
      },
    ],
  },
  {
    id: 'icon-custom',
    title: '브랜드·커스텀',
    description: '소셜 로고·인증 그림·전용 도형',
    items: [
      {
        label: '도움말 말풍선 화살표',
        origin: { label: '종류', name: '말풍선 화살표', detail: '장식 SVG' },
        preview: <Icon name="arrow" size={17} style={{ height: 8 }} aria-hidden="true" />,
        code: '\n<Icon name="arrow" size={17} style={{ height: 8 }} aria-hidden="true" />',
        source: 'HelpTips.tsx',
        note: '장식 이미지 · 17 × 8px',
        registeredName: 'arrow',
      },
      {
        label: '국가 선택 지구본',
        preview: <Icon name="globe" size={28} />,
        code: '<Icon name="globe" size={28} />',
        source: 'LocalesContent.tsx',
        note: 'SVG 파일 · 공통 Icon name 등록',
        registeredName: 'globe',
      },
      {
        label: 'Instagram',
        origin: { label: '종류', name: 'Instagram 로고', detail: 'Figma 3rd Party Icons' },
        preview: <Icon name="instagram" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="instagram" size={24} />',
        source: 'ShopShell.tsx',
        note: '원본 SVG 색상 유지',
        registeredName: 'instagram',
      },
      {
        label: '아이핀 인증',
        origin: {
          label: '종류',
          name: '인증 일러스트',
          detail: '단일 Font Awesome 아이콘 대응 미확인',
        },
        preview: <Icon name="ipin-verification" size={80} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="ipin-verification" size={80} />',
        source: 'IdentityVerificationContent.tsx',
        note: '원본 SVG 색상 유지',
        registeredName: 'ipin-verification',
      },
      {
        label: '가입 완료',
        origin: {
          label: '종류',
          name: '완료 표시 SVG',
          detail: '원형·체크 조합',
        },
        preview: <Icon name="join-check" size={48} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="join-check" size={48} />',
        source: 'signup/complete/page.tsx',
        note: '원본 SVG 색상 유지',
        registeredName: 'join-check',
      },
      {
        label: '카카오',
        origin: { label: '종류', name: 'Kakao 로고', detail: '브랜드 아이콘' },
        preview: <Icon name="kakao" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="kakao" size={18} />',
        source: 'Button.tsx',
        note: '원본 SVG 색상 유지',
        registeredName: 'kakao',
      },
      {
        label: '네이버',
        origin: { label: '종류', name: 'Naver 로고', detail: '브랜드 아이콘' },
        preview: <Icon name="naver" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="naver" size={18} />',
        source: 'Button.tsx',
        note: '원본 SVG 색상 유지',
        registeredName: 'naver',
      },
      {
        label: '휴대폰 인증',
        origin: {
          label: '종류',
          name: '인증 일러스트',
          detail: '단일 Font Awesome 아이콘 대응 미확인',
        },
        preview: <Icon name="phone-verification" size={80} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="phone-verification" size={80} />',
        source: 'IdentityVerificationContent.tsx',
        note: '원본 SVG 색상 유지',
        registeredName: 'phone-verification',
      },
      {
        label: '상품 스펙 안내',
        preview: <Icon name="specification-info" size={16} />,
        code: '<Icon name="specification-info" size={16} />',
        source: 'ProductDetailContent.tsx',
        note: 'SVG 파일 · 공통 Icon name 등록',
        registeredName: 'specification-info',
      },
      {
        label: 'X',
        origin: { label: '종류', name: 'X 로고', detail: 'Figma 3rd Party Icons' },
        preview: <Icon name="x" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="x" size={24} />',
        source: 'ShopShell.tsx',
        note: '원본 SVG 색상 유지',
        registeredName: 'x',
      },
      {
        label: 'YouTube',
        origin: { label: '종류', name: 'YouTube 로고', detail: 'Figma 3rd Party Icons' },
        preview: <Icon name="youtube" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="youtube" size={24} />',
        source: 'ShopShell.tsx',
        note: '원본 SVG 색상 유지',
        registeredName: 'youtube',
      },
    ],
  },
];

const sections = [
  { id: 'icon-usage', title: '사용법', description: '크기·색상·접근성' },
  ...iconGroups.map(({ id, title, description }) => ({ id, title, description })),
];

function IconExampleCard({
  example,
  onCopy,
}: {
  example: IconExample;
  onCopy: (code: string) => void;
}) {
  return (
    <Stack
      minW="0"
      p="4"
      gap="3"
      border="1px solid token(colors.black.20)"
      borderRadius="2"
      bg="surface.default"
    >
      <Typography as="h4" variant="body4" weight="semibold">
        {example.label}
      </Typography>
      {example.registeredName ? (
        <Typography as="p" variant="body5">
          name: {example.registeredName}
        </Typography>
      ) : null}
      {example.origin ? (
        <Typography as="p" variant="body5">
          {example.origin.label}: {example.origin.name}
          {example.origin.detail ? ` / ${example.origin.detail}` : ''}
        </Typography>
      ) : null}
      <HStack justifyContent="center" alignItems="center" minH="100px" bg="#D4D4D4">
        {example.preview}
      </HStack>
      <Typography as="p" variant="body5" tone="subtle">
        {example.note}
      </Typography>
      <Typography
        as="p"
        variant="body5"
        tone="subtle"
        className={css({ overflowWrap: 'anywhere' })}
      >
        사용처: {example.source}
      </Typography>
      <HStack
        as="code"
        alignItems="flex-start"
        gap="3"
        minW="0"
        mt="auto"
        p="3"
        bg="surface.subtle"
        border="1px solid token(colors.black.20)"
        fontSize="12px"
        lineHeight="1.5"
      >
        <Box as="span" flex="1" minW="0" whiteSpace="pre-wrap" overflowWrap="anywhere">
          {renderGuideCode(example.code)}
        </Box>
        <Button
          type="button"
          variant="icon"
          size={32}
          aria-label={`${example.label} 사용 코드 복사`}
          title="코드 복사"
          onClick={() => onCopy(example.code)}
          className={css({
            flexShrink: '0',
            bg: 'black.10',
            border: '1px solid token(colors.black.40)',
            borderRadius: '4px',
            _hover: { bg: 'black.20!' },
          })}
        >
          <Icon name="copy-regular" size={16} />
        </Button>
      </HStack>
    </Stack>
  );
}

/** 사용 중인 아이콘의 형태와 크기·색상·복사 코드를 안내합니다. (Documents active icons with size, color, and copyable usage examples.) */
export function IconGuide() {
  const [notice, setNotice] = useState<GuideCopyNotice | null>(null);
  const nextNoticeId = useRef(0);
  const dismissNotice = useCallback((id: number) => {
    setNotice((current) => (current?.id === id ? null : current));
  }, []);

  async function copyCode(code: string) {
    const id = ++nextNoticeId.current;
    try {
      await navigator.clipboard.writeText(code);
      setNotice({ id, text: '사용 코드를 복사했습니다.' });
    } catch {
      setNotice({ id, text: '복사하지 못했습니다. 코드를 직접 선택해 복사해 주세요.' });
    }
  }

  return (
    <Grid
      gridTemplateColumns={{ base: 'minmax(0, 1fr) 240px', _mobile: 'minmax(0, 1fr)' }}
      alignItems="start"
      gap="4"
      pt="6"
    >
      <Stack minW="0" gap={{ base: '6', _mobile: '4' }}>
        <HStack alignItems="baseline" gap="3" flexWrap="wrap">
          <Typography as="h2" variant="heading8">
            Icon
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            현재 사용 중인 아이콘 ·{' '}
            {iconGroups.reduce((count, group) => count + group.items.length, 0)}개 예시
          </Typography>
        </HStack>
        <Stack
          as="section"
          id="icon-usage"
          aria-labelledby="icon-usage-title"
          gap="3"
          scrollMarginTop="calc(var(--layout-site-header-height) + 16px)"
        >
          <Typography as="h3" id="icon-usage-title" variant="heading8">
            사용법
          </Typography>
          <Typography as="p" variant="body4">
            공통 Icon을 사용합니다. size 기본값은 16px이며 숫자 또는 CSS 크기를 받습니다.
            데스크탑·모바일 크기가 다르면 호출부에서 각각 지정합니다.
          </Typography>
          <Typography as="p" variant="body4">
            모든 아이콘은 name으로 불러옵니다. 단색 아이콘은 color로 색상을 바꾸고, 다색·상태
            아이콘은 원본 색상을 유지합니다. 렌더링 방식은 atoms/Icon.assets.ts에서 관리합니다.
          </Typography>
          <Typography as="p" variant="body4">
            장식 아이콘은 alt를 비워 두고, 의미가 있는 아이콘은 alt로 설명합니다. 아이콘만 있는
            버튼은 버튼에 aria-label을 지정합니다. 캐러셀 화살표는 버튼에서 접근성 이름을
            제공합니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            서비스 화면과 화면 목록·기존 가이드의 사용처를 기준으로 정리했습니다. 로고·국기·상품
            이미지·배경 장식과 사용되지 않는 파일은 제외합니다. 사용처가 확인된 아이콘은 실제 호출
            크기로 표시합니다. 화면별 크기가 다르면 해당 화면의 규격을 따릅니다.
          </Typography>
          <Grid columns={{ base: 3, _mobile: 1 }} gap="3">
            <IconExampleCard
              onCopy={copyCode}
              example={{
                label: '크기 · 16 / 20 / 24px',
                source: 'Icon.tsx',
                note: 'size는 아이콘의 너비와 높이',
                preview: (
                  <HStack gap="4">
                    {[16, 20, 24].map((size) => (
                      <Stack key={size} gap="2" alignItems="center">
                        <Icon name="chevron-down-regular" size={size} />
                        <Typography variant="body5">{size}px</Typography>
                      </Stack>
                    ))}
                  </HStack>
                ),
                code: '<Icon name="chevron-down-regular" size={16} />\n<Icon name="chevron-down-regular" size={20} />\n<Icon name="chevron-down-regular" size={24} />',
              }}
            />
            <IconExampleCard
              onCopy={copyCode}
              example={{
                label: '색상 · 기본 / 회색 / 파랑',
                source: 'Icon.tsx',
                note: 'color로 색상 변경 가능',
                preview: (
                  <HStack gap="4">
                    <Icon name="circle-info-regular" size={16} />
                    <Icon name="circle-info-regular" size={16} color="black.40" />
                    <Icon name="circle-info-regular" size={16} color="blue.100" />
                  </HStack>
                ),
                code: '<Icon name="circle-info-regular" size={16} />\n<Icon name="circle-info-regular" size={16} color="black.40" />\n<Icon name="circle-info-regular" size={16} color="blue.100" />',
              }}
            />
            <IconExampleCard
              onCopy={copyCode}
              example={{
                label: '아이콘 색상 지정',
                source: 'ShopShell.tsx',
                note: 'color로 색상 변경 가능',
                preview: <Icon name="magnifying-glass-regular" size={16} color="blue.100" />,
                code: '<Icon name="magnifying-glass-regular" size={16} color="blue.100" />',
              }}
            />
          </Grid>
        </Stack>
        {iconGroups.map((group) => (
          <Stack
            as="section"
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-title`}
            gap="3"
            scrollMarginTop="calc(var(--layout-site-header-height) + 16px)"
          >
            <Typography as="h3" id={`${group.id}-title`} variant="heading8">
              {group.title} · {group.items.length}
            </Typography>
            <Typography as="p" variant="body5" tone="subtle">
              {group.description}
            </Typography>
            <Grid
              columns={{ base: group.id === 'icon-design-actions' ? 3 : 4, _mobile: 1 }}
              gap="3"
            >
              {group.items.map((example, index) => {
                const family = example.registeredName?.replace(/-(regular|solid)$/, '');
                const previous = group.items[index - 1];
                const next = group.items[index + 1];
                const isSolid = /-solid$/.test(example.registeredName ?? '');
                if (
                  isSolid &&
                  previous?.registeredName?.replace(/-(regular|solid)$/, '') === family &&
                  /-regular$/.test(previous.registeredName ?? '')
                )
                  return null;
                const paired =
                  example.registeredName?.endsWith('-regular') &&
                  next?.registeredName === `${family}-solid`;
                return paired ? (
                  <Grid
                    key={example.registeredName}
                    columns={2}
                    gap="3"
                    gridColumn={{ base: 'span 2', _mobile: 'span 1' }}
                    minW="0"
                  >
                    <IconExampleCard example={example} onCopy={copyCode} />
                    <IconExampleCard example={next} onCopy={copyCode} />
                  </Grid>
                ) : (
                  <IconExampleCard key={example.label} example={example} onCopy={copyCode} />
                );
              })}
            </Grid>
          </Stack>
        ))}
      </Stack>
      <GuideTimeline title="아이콘" entries={sections} />
      <GuideCopyToast notice={notice} onDismiss={dismissNotice} />
    </Grid>
  );
}
