'use client';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faBan,
  faBoxOpen,
  faCheck,
  faChevronLeft,
  faClipboardList,
  faCreditCard,
  faDesktop,
  faFileLines,
  faFilePdf,
  faFolder,
  faFolderOpen,
  faFolderTree,
  faImage,
  faMagnifyingGlass,
  faMinus,
  faPlus,
  faScrewdriverWrench,
  faTriangleExclamation,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import { type ReactNode, useCallback, useRef, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import {
  faBox,
  faChevronDown,
  faChevronRight,
  faCircleCheck,
  faCircleInfo,
  faComments,
  faCopy,
  faEye,
  faEyeSlash,
  faLocationDot,
  faStarRegular,
  faStarSolid,
  faUser,
  faUserSolid,
  faXmark,
} from '@/icons/fontAwesome';

import { renderGuideCode } from './GuideCode';
import { type GuideCopyNotice, GuideCopyToast } from './GuideCopyToast';
import { GuideTimeline } from './GuideTimeline';

type IconExample = {
  label: string;
  preview: ReactNode;
  code: string;
  source: string;
  note: string;
};

// 현재 사용처를 조사한 고정 가이드 목록입니다. 서비스 데이터나 자동 수집 결과가 아닙니다.
const iconGroups: { id: string; title: string; description: string; items: IconExample[] }[] = [
  {
    id: 'icon-assets',
    title: 'SVG 아이콘',
    description: '이름과 파일 경로로 사용하는 아이콘',
    items: [
      {
        label: '멤버십',
        preview: <Icon name="navigation/membership" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="navigation/membership" size={16} />',
        source: 'ShopShell.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '가입 선물',
        preview: <Icon name="gift" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="gift" size={18} />',
        source: 'SignupContent.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '기념일',
        preview: <Icon name="partyHorn" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="partyHorn" size={18} />',
        source: 'SignupContent.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '회원 등급',
        preview: <Icon name="medal" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="medal" size={18} />',
        source: 'SignupContent.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '휴대폰 인증',
        preview: <Icon name="phoneVerification" size={80} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="phoneVerification" size={80} />',
        source: 'IdentityVerificationContent.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '아이핀 인증',
        preview: <Icon name="ipinVerification" size={80} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="ipinVerification" size={80} />',
        source: 'IdentityVerificationContent.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '타이머',
        preview: <Icon name="timer" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="timer" size={18} />',
        source: 'ShopShell.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '계정 잠금 해제',
        preview: <Icon name="unlock-keyhole" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="unlock-keyhole" size={18} />',
        source: 'account-locked/complete/page.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '카카오',
        preview: <Icon name="social/kakao" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="social/kakao" size={18} />',
        source: 'Button.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '네이버',
        preview: <Icon name="social/naver" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="social/naver" size={18} />',
        source: 'Button.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '별점 반 개',
        preview: <Icon name="rating/rating-star-half" size={16} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="rating/rating-star-half" size={16} color="currentColor" />',
        source: 'RatingStars.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '수량 감소',
        preview: <Icon name="action/fa-minus" size={24} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="action/fa-minus" size={24} color="currentColor" />',
        source: 'NumberStepper.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '수량 증가',
        preview: <Icon name="action/fa-plus" size={24} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="action/fa-plus" size={24} color="currentColor" />',
        source: 'NumberStepper.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '선택 태그 삭제',
        preview: <Icon name="tag-delete" size={16} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="tag-delete" size={16} color="currentColor" />',
        source: 'ProductListingPage.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '필터',
        preview: <Icon name="filter" size={20} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="filter" size={20} color="currentColor" />',
        source: 'ProductListingPage.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '우측 화살표',
        preview: <Icon name="chevron-right" size={12} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="chevron-right" size={12} color="currentColor" />',
        source: 'Breadcrumb.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '입고 예정',
        preview: <Icon name="action/fa-clock-nine" size={12} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="action/fa-clock-nine" size={12} color="currentColor" />',
        source: 'SizeSelector.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '사이즈 가이드',
        preview: <Icon name="action/fa-ruler-horizontal" size={18} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="action/fa-ruler-horizontal" size={18} color="currentColor" />',
        source: 'ProductDetailContent.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '공유',
        preview: <Icon name="action/fa-arrow-up-from-bracket" size={16} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="action/fa-arrow-up-from-bracket" size={16} color="currentColor" />',
        source: 'ProductDetailContent.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '닫기',
        preview: <Icon name="close" size={16} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="close" size={16} color="currentColor" />',
        source: 'OrderTrackingDialog.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '하단 화살표',
        preview: <Icon name="chevron-down-small" size={14} color="currentColor" />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="chevron-down-small" size={14} color="currentColor" />',
        source: 'MyPageReviewsContent.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '검색',
        preview: <Icon src="/images/header/search.svg" size={19} mask />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/header/search.svg" size={19} mask />',
        source: 'ShopShell.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '모바일 메뉴',
        preview: <Icon src="/images/header/m-menu.svg" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/header/m-menu.svg" size={20} />',
        source: 'ShopShell.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '알림 신청됨',
        preview: <Icon src="/images/launch-calendar/check.svg" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/launch-calendar/check.svg" size={18} />',
        source: 'LaunchCalendarContent.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '발매 알림',
        preview: <Icon src="/images/launch-calendar/bell.svg" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/launch-calendar/bell.svg" size={18} />',
        source: 'LaunchCalendarContent.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '발매 시간',
        preview: <Icon src="/images/launch-calendar/clock.svg" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/launch-calendar/clock.svg" size={18} />',
        source: 'LaunchCalendarDetail.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '발매 상품 사이즈',
        preview: <Icon src="/images/launch-calendar/ruler.svg" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/launch-calendar/ruler.svg" size={16} />',
        source: 'LaunchCalendarDetail.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '필터 펼침',
        preview: <Icon src="/images/icon/filter-expanded.svg" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/filter-expanded.svg" size={16} />',
        source: 'ProductListingPage.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '필터 접힘',
        preview: <Icon src="/images/icon/filter-collapsed.svg" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/filter-collapsed.svg" size={16} />',
        source: 'ProductListingPage.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '카탈로그 필터 닫기',
        preview: <Icon src="/images/icon/catalog-filter-close.svg" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/catalog-filter-close.svg" size={16} />',
        source: 'BottomSheet.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '가입 완료',
        preview: <Icon src="/images/icon/join-check.svg" size={48} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/join-check.svg" size={48} />',
        source: 'signup/complete/page.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '회원 전용',
        preview: <Icon src="/images/icon/lock-keyhole.svg" size={14} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/lock-keyhole.svg" size={14} />',
        source: 'ProductDetailContent.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '관심상품 선택',
        preview: <Icon src="/images/icon/wishlist-solid.svg" size={20} mask />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/wishlist-solid.svg" size={20} mask />',
        source: 'Wishlist.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '관심상품 기본',
        preview: <Icon src="/images/icon/wishlist-regular.svg" size={20} mask />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/wishlist-regular.svg" size={20} mask />',
        source: 'Wishlist.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: '장바구니 담기',
        preview: <Icon src="/images/icon/orders/bag-shopping.svg" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/orders/bag-shopping.svg" size={18} />',
        source: 'OrdersProducts.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '헤더 장바구니',
        preview: <Icon src="/images/icon/notification/notification-bag.svg" size={22} mask />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/notification/notification-bag.svg" size={22} mask />',
        source: 'ShopShell.tsx',
        note: 'CSS mask · color 변경 가능',
      },
      {
        label: 'Instagram',
        preview: <Icon src="/images/icon/social/instagram.svg" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/social/instagram.svg" size={24} />',
        source: 'ShopShell.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: 'YouTube',
        preview: <Icon src="/images/icon/social/youtube.svg" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/social/youtube.svg" size={24} />',
        source: 'ShopShell.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: 'X',
        preview: <Icon src="/images/icon/social/x.svg" size={24} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/social/x.svg" size={24} />',
        source: 'ShopShell.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '정보 도움말',
        preview: <Icon src="/images/icon/tooltip/info.svg" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/tooltip/info.svg" size={16} />',
        source: 'HelpTips.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '질문 도움말',
        preview: <Icon src="/images/icon/tooltip/question.svg" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/tooltip/question.svg" size={16} />',
        source: 'HelpTips.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '도움말 말풍선 화살표',
        preview: (
          <img
            src="/images/icon/tooltip/arrow.svg"
            width={17}
            height={8}
            alt=""
            aria-hidden="true"
          />
        ),
        code: '\n<img src="/images/icon/tooltip/arrow.svg" width={17} height={8} alt="" aria-hidden="true" />',
        source: 'HelpTips.tsx',
        note: '장식 이미지 · 17 × 8px',
      },
    ],
  },
  {
    id: 'icon-form',
    title: '폼 상태 아이콘',
    description: '선택·비활성·드롭다운·달력',
    items: [
      {
        label: 'checkbox · 기본',
        preview: <Icon src="/images/icon/form/checkbox-unchecked.svg" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/form/checkbox-unchecked.svg" size={20} />',
        source: 'Checkbox.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
      },
      {
        label: 'checkbox · 선택',
        preview: <Icon src="/images/icon/form/checkbox-checked.svg" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/form/checkbox-checked.svg" size={20} />',
        source: 'Checkbox.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
      },
      {
        label: 'checkbox · 비활성',
        preview: <Icon src="/images/icon/form/checkbox-disabled.svg" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/form/checkbox-disabled.svg" size={20} />',
        source: 'Checkbox.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
      },
      {
        label: 'checkbox · 선택 + 비활성',
        preview: <Icon src="/images/icon/form/checkbox-disabled-checked.svg" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/form/checkbox-disabled-checked.svg" size={20} />',
        source: 'Checkbox.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
      },
      {
        label: 'radio · 기본',
        preview: <Icon src="/images/icon/form/radio-unchecked.svg" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/form/radio-unchecked.svg" size={20} />',
        source: 'Radio.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
      },
      {
        label: 'radio · 선택',
        preview: <Icon src="/images/icon/form/radio-checked.svg" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/form/radio-checked.svg" size={20} />',
        source: 'Radio.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
      },
      {
        label: 'radio · 비활성',
        preview: <Icon src="/images/icon/form/radio-disabled.svg" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/form/radio-disabled.svg" size={20} />',
        source: 'Radio.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
      },
      {
        label: 'radio · 선택 + 비활성',
        preview: <Icon src="/images/icon/form/radio-disabled-checked.svg" size={20} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/form/radio-disabled-checked.svg" size={20} />',
        source: 'Radio.tsx',
        note: '상태 이미지 확인용 · 실제 폼에서는 Checkbox / Radio 사용',
      },
      {
        label: '드롭다운 표시',
        preview: <Icon src="/images/icon/form/sort-down.svg" size={18} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/form/sort-down.svg" size={18} />',
        source: 'Dropdown.tsx',
        note: '원본 SVG 색상 유지',
      },
      {
        label: '날짜 선택',
        preview: <Icon src="/images/icon/form/calendar.svg" size={16} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon src="/images/icon/form/calendar.svg" size={16} />',
        source: 'OrdersStatus.tsx',
        note: '원본 SVG 색상 유지',
      },
    ],
  },
  {
    id: 'icon-fontawesome',
    title: 'Font Awesome',
    description: '공통 UI·화면 목록에서 사용하는 아이콘',
    items: [
      {
        label: 'faChevronRight',
        preview: <Icon fontAwesomeIcon={faChevronRight} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faChevronRight } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faChevronRight} size={24} color=\"currentColor\" />",
        source: 'OrderRecommendations.tsx, ShopShell.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faXmark',
        preview: <Icon fontAwesomeIcon={faXmark} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faXmark } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faXmark} size={24} color=\"currentColor\" />",
        source:
          'CartProductSection.tsx, InquiryFormContent.tsx, ModalDialog.tsx, ProductDetailContent.tsx, SearchHeader.tsx, ShopShell.tsx, TextInput.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faTriangleExclamation',
        preview: <Icon fontAwesomeIcon={faTriangleExclamation} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faTriangleExclamation} size={24} color=\"currentColor\" />",
        source: 'SystemStatusPage.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faCheck',
        preview: <Icon fontAwesomeIcon={faCheck} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faCheck } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faCheck} size={24} color=\"currentColor\" />",
        source: 'StepIndicator.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faChevronLeft',
        preview: <Icon fontAwesomeIcon={faChevronLeft} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faChevronLeft } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faChevronLeft} size={24} color=\"currentColor\" />",
        source: 'ProductOptionList.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faBox',
        preview: <Icon fontAwesomeIcon={faBox} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faBox } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faBox} size={24} color=\"currentColor\" />",
        source: 'ShopShell.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faComments',
        preview: <Icon fontAwesomeIcon={faComments} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faComments } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faComments} size={24} color=\"currentColor\" />",
        source: 'ShopShell.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faLocationDot',
        preview: <Icon fontAwesomeIcon={faLocationDot} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faLocationDot } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faLocationDot} size={24} color=\"currentColor\" />",
        source: 'ShopShell.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faUser',
        preview: <Icon fontAwesomeIcon={faUser} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faUser } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faUser} size={24} color=\"currentColor\" />",
        source: 'ShopShell.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faUserSolid',
        preview: <Icon fontAwesomeIcon={faUserSolid} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faUserSolid } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faUserSolid} size={24} color=\"currentColor\" />",
        source: 'ShopShell.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faCircleInfo',
        preview: <Icon fontAwesomeIcon={faCircleInfo} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faCircleInfo } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faCircleInfo} size={24} color=\"currentColor\" />",
        source: 'Dropdown.tsx, FormField.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faChevronDown',
        preview: <Icon fontAwesomeIcon={faChevronDown} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faChevronDown } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faChevronDown} size={24} color=\"currentColor\" />",
        source:
          'Accordion.tsx, FaqContent.tsx, ProductDetailContent.tsx, RunningSessionEntriesContent.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faStarRegular',
        preview: <Icon fontAwesomeIcon={faStarRegular} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faStarRegular } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faStarRegular} size={24} color=\"currentColor\" />",
        source: 'RatingStars.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faStarSolid',
        preview: <Icon fontAwesomeIcon={faStarSolid} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faStarSolid } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faStarSolid} size={24} color=\"currentColor\" />",
        source: 'RatingStars.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faEye',
        preview: <Icon fontAwesomeIcon={faEye} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faEye } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faEye} size={24} color=\"currentColor\" />",
        source: 'TextInput.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faEyeSlash',
        preview: <Icon fontAwesomeIcon={faEyeSlash} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faEyeSlash } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faEyeSlash} size={24} color=\"currentColor\" />",
        source: 'TextInput.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faCreditCard',
        preview: <Icon fontAwesomeIcon={faCreditCard} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faCreditCard } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faCreditCard} size={24} color=\"currentColor\" />",
        source: 'CheckoutPayment.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faBell',
        preview: <Icon fontAwesomeIcon={faBell} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faBell } from '@fortawesome/free-regular-svg-icons';\n\n<Icon fontAwesomeIcon={faBell} size={24} color=\"currentColor\" />",
        source: 'SizeSelector.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faMagnifyingGlass',
        preview: <Icon fontAwesomeIcon={faMagnifyingGlass} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faMagnifyingGlass} size={24} color=\"currentColor\" />",
        source: 'ProductDetailContent.tsx, SearchField.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faBan',
        preview: <Icon fontAwesomeIcon={faBan} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faBan } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faBan} size={24} color=\"currentColor\" />",
        source: 'IaStructurePage.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faDesktop',
        preview: <Icon fontAwesomeIcon={faDesktop} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faDesktop } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faDesktop} size={24} color=\"currentColor\" />",
        source: 'IaStructurePage.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faFileLines',
        preview: <Icon fontAwesomeIcon={faFileLines} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faFileLines } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faFileLines} size={24} color=\"currentColor\" />",
        source: 'IaStructurePage.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faFolder',
        preview: <Icon fontAwesomeIcon={faFolder} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faFolder } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faFolder} size={24} color=\"currentColor\" />",
        source: 'IaStructurePage.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faFolderOpen',
        preview: <Icon fontAwesomeIcon={faFolderOpen} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faFolderOpen } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faFolderOpen} size={24} color=\"currentColor\" />",
        source: 'IaStructurePage.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faFolderTree',
        preview: <Icon fontAwesomeIcon={faFolderTree} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faFolderTree } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faFolderTree} size={24} color=\"currentColor\" />",
        source: 'IaStructurePage.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faBoxOpen',
        preview: <Icon fontAwesomeIcon={faBoxOpen} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faBoxOpen } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faBoxOpen} size={24} color=\"currentColor\" />",
        source: 'ProductDetailContent.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faClipboardList',
        preview: <Icon fontAwesomeIcon={faClipboardList} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faClipboardList } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faClipboardList} size={24} color=\"currentColor\" />",
        source: 'ProductDetailContent.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faScrewdriverWrench',
        preview: <Icon fontAwesomeIcon={faScrewdriverWrench} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faScrewdriverWrench} size={24} color=\"currentColor\" />",
        source: 'ProductDetailContent.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faTruckFast',
        preview: <Icon fontAwesomeIcon={faTruckFast} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faTruckFast } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faTruckFast} size={24} color=\"currentColor\" />",
        source: 'ProductDetailContent.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faFilePdf',
        preview: <Icon fontAwesomeIcon={faFilePdf} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faFilePdf } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faFilePdf} size={24} color=\"currentColor\" />",
        source: 'InquiryListContent.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faImage',
        preview: <Icon fontAwesomeIcon={faImage} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faImage } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faImage} size={24} color=\"currentColor\" />",
        source: 'InquiryListContent.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faCircleCheck',
        preview: <Icon fontAwesomeIcon={faCircleCheck} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faCircleCheck } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faCircleCheck} size={24} color=\"currentColor\" />",
        source: 'CouponManagement.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faMinus',
        preview: <Icon fontAwesomeIcon={faMinus} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faMinus } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faMinus} size={24} color=\"currentColor\" />",
        source: 'InquiryOrderLookup.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faPlus',
        preview: <Icon fontAwesomeIcon={faPlus} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faPlus } from '@fortawesome/free-solid-svg-icons';\n\n<Icon fontAwesomeIcon={faPlus} size={24} color=\"currentColor\" />",
        source: 'InquiryOrderLookup.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
      {
        label: 'faCopy',
        preview: <Icon fontAwesomeIcon={faCopy} size={24} color="currentColor" />,
        code: "import { Icon } from '@/components/common/atoms/Icon';\nimport { faCopy } from '@/icons/fontAwesome';\n\n<Icon fontAwesomeIcon={faCopy} size={24} color=\"currentColor\" />",
        source: 'ButtonGuide.tsx',
        note: 'Font Awesome · color 변경 가능',
      },
    ],
  },
  {
    id: 'icon-carousel',
    title: '캐러셀',
    description: '이전·다음 방향',
    items: [
      {
        label: '캐러셀 · 이전',
        preview: <Icon name="carousel-arrow" direction="previous" size={48} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="carousel-arrow" direction="previous" size={48} />',
        source: 'CarouselControls.tsx',
        note: '전용 SVG · direction으로 방향 지정',
      },
      {
        label: '캐러셀 · 다음',
        preview: <Icon name="carousel-arrow" direction="next" size={48} />,
        code: 'import { Icon } from \'@/components/common/atoms/Icon\';\n\n<Icon name="carousel-arrow" direction="next" size={48} />',
        source: 'CarouselControls.tsx',
        note: '전용 SVG · direction으로 방향 지정',
      },
    ],
  },
  {
    id: 'icon-inline',
    title: '화면 전용 SVG',
    description: '각 화면에서 직접 그리는 아이콘',
    items: [
      {
        label: '상품 스펙 안내',
        preview: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 7v4M6.5 11h3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="4.5" r="1" fill="currentColor" />
          </svg>
        ),
        code: '\n<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">\n          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />\n          <path d="M8 7v4M6.5 11h3" stroke="currentColor" strokeWidth="1.5" />\n          <circle cx="8" cy="4.5" r="1" fill="currentColor" />\n        </svg>',
        source: 'ProductDetailContent.tsx',
        note: '화면 내부 전용 SVG · 공통 Icon name으로 등록되지 않음',
      },
      {
        label: '목록 펼침 표시',
        preview: (
          <svg fill="none" height="8" viewBox="0 0 13 8" width="13">
            <path
              d="M0.480469 0.508114L6.24565 6.2733L11.9805 0.477905"
              stroke="currentColor"
              strokeWidth="1.35887"
            />
          </svg>
        ),
        code: '\n<svg fill="none" height="8" viewBox="0 0 13 8" width="13">\n      <path\n        d="M0.480469 0.508114L6.24565 6.2733L11.9805 0.477905"\n        stroke="currentColor"\n        strokeWidth="1.35887"\n      />\n    </svg>',
        source: 'ProductListingPage.tsx',
        note: '화면 내부 전용 SVG · 공통 Icon name으로 등록되지 않음',
      },
      {
        label: '국가 선택 지구본',
        preview: (
          <svg
            width="28"
            height="28"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.7 2.5 4.1 5.5 4.1 9S14.7 18.5 12 21c-2.7-2.5-4.1-5.5-4.1-9S9.3 5.5 12 3" />
          </svg>
        ),
        code: '\n<svg width="28" height="28"\n        aria-hidden="true"\n        viewBox="0 0 24 24"\n        fill="none"\n        stroke="currentColor"\n        strokeWidth="2.4"\n      >\n        <circle cx="12" cy="12" r="9" />\n        <path d="M3 12h18M12 3c2.7 2.5 4.1 5.5 4.1 9S14.7 18.5 12 21c-2.7-2.5-4.1-5.5-4.1-9S9.3 5.5 12 3" />\n      </svg>',
        source: 'LocalesContent.tsx',
        note: '화면 내부 전용 SVG · 공통 Icon name으로 등록되지 않음',
      },
    ],
  },
];

const sections = [
  { id: 'icon-usage', title: '사용 기준', description: '크기·색상·접근성' },
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
      <HStack justifyContent="center" alignItems="center" minH="100px" bg="surface.subtle">
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
          <Icon fontAwesomeIcon={faCopy} size={16} />
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
            사용 기준
          </Typography>
          <Typography as="p" variant="body4">
            공통 Icon을 사용합니다. size 기본값은 16px이며 숫자 또는 CSS 크기를 받습니다. PC·모바일
            크기가 다르면 호출부에서 각각 지정합니다.
          </Typography>
          <Typography as="p" variant="body4">
            Font Awesome과 CSS mask는 color로 색상을 바꿉니다. 등록된 name이나 일반 src 이미지는 SVG
            원본 색상을 유지합니다. 원본을 단색으로 바꾸려면 src와 mask를 함께 사용합니다.
          </Typography>
          <Typography as="p" variant="body4">
            장식 아이콘은 alt를 비워 두고, 의미가 있는 아이콘은 alt로 설명합니다. 아이콘만 있는
            버튼은 버튼에 aria-label을 지정합니다. 캐러셀 화살표는 버튼에서 접근성 이름을
            제공합니다.
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            서비스 화면과 화면 목록·기존 가이드의 사용처를 기준으로 정리했습니다. 로고·국기·상품
            이미지·배경 장식과 사용되지 않는 파일은 제외합니다. 카드의 크기는 예시이며 사용 화면의
            PC·모바일 규격을 우선합니다.
          </Typography>
          <Grid columns={{ base: 3, _mobile: 1 }} gap="3">
            <IconExampleCard
              onCopy={copyCode}
              example={{
                label: '크기 · 16 / 18 / 24px',
                source: 'Icon.tsx',
                note: 'size는 아이콘의 너비와 높이',
                preview: (
                  <HStack gap="4">
                    {[16, 18, 24].map((size) => (
                      <Stack key={size} gap="2" alignItems="center">
                        <Icon fontAwesomeIcon={faChevronDown} size={size} />
                        <Typography variant="body5">{size}px</Typography>
                      </Stack>
                    ))}
                  </HStack>
                ),
                code: '<Icon fontAwesomeIcon={faChevronDown} size={16} />\n<Icon fontAwesomeIcon={faChevronDown} size={18} />\n<Icon fontAwesomeIcon={faChevronDown} size={24} />',
              }}
            />
            <IconExampleCard
              onCopy={copyCode}
              example={{
                label: '색상 · 기본 / 회색 / 파랑',
                source: 'Icon.tsx',
                note: '색상 토큰 또는 CSS 색상',
                preview: (
                  <HStack gap="4">
                    <Icon fontAwesomeIcon={faCircleInfo} size={24} />
                    <Icon fontAwesomeIcon={faCircleInfo} size={24} color="black.40" />
                    <Icon fontAwesomeIcon={faCircleInfo} size={24} color="blue.100" />
                  </HStack>
                ),
                code: '<Icon fontAwesomeIcon={faCircleInfo} size={24} />\n<Icon fontAwesomeIcon={faCircleInfo} size={24} color="black.40" />\n<Icon fontAwesomeIcon={faCircleInfo} size={24} color="blue.100" />',
              }}
            />
            <IconExampleCard
              onCopy={copyCode}
              example={{
                label: '파일을 단색 mask로 사용',
                source: 'ShopShell.tsx',
                note: 'src + mask + color',
                preview: <Icon src="/images/header/search.svg" size={24} mask color="blue.100" />,
                code: '<Icon src="/images/header/search.svg" size={24} mask color="blue.100" />',
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
            <Grid columns={{ base: 3, _mobile: 1 }} gap="3">
              {group.items.map((example) => (
                <IconExampleCard key={example.label} example={example} onCopy={copyCode} />
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
      <GuideTimeline title="아이콘" entries={sections} />
      <GuideCopyToast notice={notice} onDismiss={dismissNotice} />
    </Grid>
  );
}
