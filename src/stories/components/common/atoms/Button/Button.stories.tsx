import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { HStack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import {
  ButtonDocs,
  ButtonDocsContainer,
} from '@/stories/components/common/atoms/Button/ButtonDocs';
import {
  fontAwesomeNames,
  IconButtonPreview,
  iconButtonSource,
  type IconButtonStoryArgs,
  IconCatalog,
  PropertyComparison,
  svgPaths,
} from '@/stories/components/common/atoms/IconButton/IconButtonDocs';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { page: ButtonDocs, container: ButtonDocsContainer },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <ButtonDocs />,
};

export const DefaultLink: Story = {
  args: { variant: 'link', children: '기본 링크' },
};

export const PlainButtonLink: Story = {
  render: () => (
    <ButtonLink href="/support/faq" variant="plain" size="lg">
      밑줄 없는 텍스트 링크
    </ButtonLink>
  ),
};

export const Chip: Story = {
  args: {
    variant: 'chip',
    children: '스피드고트',
  },
};

export const FilterTriggerSizes: Story = {
  render: () => (
    <HStack gap="4">
      <Button variant="filterTrigger" icon={<Icon name="filter" />}>
        <Typography variant="body4">필터</Typography>
      </Button>
      <Button variant="filterTrigger" size="regular" icon={<Icon name="filter" size={20} />}>
        <Typography variant="cta1">Filter &amp; Sort</Typography>
      </Button>
    </HStack>
  ),
};

const secondaryContent = (
  <>
    <Typography variant="cta2">더보기 </Typography>
    <Typography variant="body5" tone="tertiary">
      (1/10)
    </Typography>
  </>
);

export const SecondaryContentTone: Story = {
  args: { variant: 'secondary', size: 'short', children: secondaryContent },
};

export const DisabledSecondaryContentTone: Story = {
  args: { ...SecondaryContentTone.args, disabled: true },
};

export const SecondaryLinkContentTone: Story = {
  render: () => (
    <ButtonLink href="/support/faq" variant="secondary" size="short">
      {secondaryContent}
    </ButtonLink>
  ),
};

function CounterExample() {
  const [current, setCurrent] = useState(1);
  return (
    <Button
      loadMore={{ counter: { current, total: 3 } }}
      disabled={current === 3}
      onClick={() => setCurrent((value) => value + 1)}
    />
  );
}

const loadMoreArgs = { loadMore: { remaining: 12 } } satisfies NonNullable<Story['args']>;

export const LoadMoreDefault: Story = {
  parameters: { layout: 'centered' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: '더보기 (12) ⌄' });
    await expect(button).not.toHaveAttribute('loadmore');
  },
  args: { ...loadMoreArgs },
};

export const LoadMoreCustomLabel: Story = {
  parameters: { layout: 'centered' },
  args: { ...loadMoreArgs, loadMore: { label: '리뷰 더보기', remaining: 3 } },
};

export const LoadMorePageCounter: Story = {
  parameters: { layout: 'centered' },
  args: {
    ...loadMoreArgs,
    loadMore: { counter: { current: 1, total: 3 } },
    variant: 'secondary',
    size: 'short',
  },
};

export const LoadMoreMyPageCounter: Story = {
  parameters: { layout: 'centered' },
  args: {
    ...loadMoreArgs,
    variant: 'secondary',
    size: 'short',
    fullWidth: true,
    loadMore: {
      counter: { current: 1, total: 3 },
      labelProps: { mo: 'ctaKr2' },
      counterProps: { mo: 'body5' },
    },
  },
};

export const LoadMoreZeroRemaining: Story = {
  parameters: { layout: 'centered' },
  args: { ...loadMoreArgs, loadMore: { remaining: 0 } },
};

export const LoadMoreDisabled: Story = {
  parameters: { layout: 'centered' },
  args: { ...loadMoreArgs, disabled: true },
};

export const LoadMoreLoading: Story = {
  parameters: { layout: 'centered' },
  args: { ...loadMoreArgs, loading: true },
};

export const LoadMoreCounterLink: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <ButtonLink
      href="/support/faq"
      variant="secondary"
      size="short"
      loadMore={{ label: '전체보기', counter: { current: 1, total: 3 } }}
    />
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole('link', { name: '전체보기 (1/3)' }),
    ).toHaveAttribute('href', '/support/faq');
  },
  args: { ...loadMoreArgs },
};

export const LoadMoreControlledCounter: Story = {
  parameters: { layout: 'centered' },
  render: () => <CounterExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '더보기 (1/3)' }));
    await userEvent.click(canvas.getByRole('button', { name: '더보기 (2/3)' }));
    await expect(canvas.getByRole('button', { name: '더보기 (3/3)' })).toBeDisabled();
  },
  args: { ...loadMoreArgs },
};

const socialArgs = {
  social: { provider: 'kakao' },
  children: '카카오 로그인',
  onClick: fn(),
} satisfies NonNullable<Story['args']>;

export const SocialKakaoLogin: Story = {
  parameters: { layout: 'centered' },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).not.toHaveAttribute('social');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
  args: { ...socialArgs },
};

export const SocialNaverLogin: Story = {
  parameters: { layout: 'centered' },
  args: { ...socialArgs, social: { provider: 'naver' }, children: '네이버 로그인' },
};

export const SocialKakaoSignup: Story = {
  parameters: { layout: 'centered' },
  args: {
    ...socialArgs,
    social: { provider: 'kakao', appearance: 'signup' },
    size: 'tall',
    children: '카카오 계정으로 신규가입',
  },
};

export const SocialNaverSignup: Story = {
  parameters: { layout: 'centered' },
  args: {
    ...socialArgs,
    social: { provider: 'naver', appearance: 'signup' },
    size: 'tall',
    children: '네이버 계정으로 신규가입',
  },
};

export const SocialDisabled: Story = {
  parameters: { layout: 'centered' },
  args: { ...socialArgs, disabled: true },
};

export const SocialLoading: Story = {
  parameters: { layout: 'centered' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
  args: { ...socialArgs, loading: true },
};

const iconButtonArgs = {
  variant: 'icon',
  iconSource: 'fontAwesome',
  fontAwesomeName: 'faXmark',
  svgPath: 'close.svg',
  size: 36,
  iconSize: 20,
  shape: 'square',
  tone: 'default',
  color: 'currentColor',
  disabled: false,
  loading: false,
  'aria-label': '닫기',
} satisfies IconButtonStoryArgs & {
  variant: 'icon';
};

const iconButtonDefaults = {
  args: iconButtonArgs,
  render: (args) => <IconButtonPreview {...args} />,
  argTypes: {
    children: { control: false, table: { disable: true } },
    iconSource: {
      name: '아이콘 종류',
      control: 'select',
      options: ['fontAwesome', 'svg'],
      description:
        'Font Awesome 또는 프로젝트 SVG 선택. 문서 전용 인자로 실제 컴포넌트에는 전달되지 않습니다.',
    },
    fontAwesomeName: {
      name: 'Font Awesome export',
      control: 'select',
      options: fontAwesomeNames,
      if: { arg: 'iconSource', eq: 'fontAwesome' },
      description:
        '공용 fontAwesome 모듈의 export 이름. 직접 입력 스토리에서는 텍스트로 수정합니다.',
    },
    svgPath: {
      name: 'SVG 파일',
      control: 'select',
      options: svgPaths,
      if: { arg: 'iconSource', eq: 'svg' },
      description: 'public/images/icon 기준 상대 경로. 하위 폴더 포함.',
    },
    size: {
      control: 'number',
      description: '버튼 크기. 숫자는 px이며 실제 API는 CSS 길이 문자열도 지원합니다.',
    },
    iconSize: {
      control: { type: 'number', min: 1 },
      description: '자식 Icon의 크기(px). 버튼 크기와 독립적인 문서 전용 인자입니다.',
    },
    shape: { control: 'select', options: ['square', 'circle'], description: '버튼 모양' },
    color: {
      control: 'color',
      description: '기본 tone의 아이콘 색상. src SVG는 원본 색상을 유지합니다.',
    },
    tone: {
      control: 'select',
      options: ['default', 'inverse', 'disabled'],
      description: '색상 표현. disabled tone 자체는 클릭을 막지 않습니다.',
    },
    disabled: { control: 'boolean', description: '실제 클릭과 Tab 포커스를 차단합니다.' },
    'aria-label': {
      control: 'text',
      description: '아이콘 버튼의 실제 용도에 맞는 접근성 이름. 필수로 지정하세요.',
    },
  },
  parameters: {
    controls: { disable: false },
    layout: 'centered',
    docs: {
      description: {
        component:
          '아이콘을 children으로 전달하는 버튼입니다. Playground Controls에서 아이콘 종류와 이름을 선택하세요. Font Awesome 직접 입력은 공용 모듈의 export 이름(예: faHeartSolid)을 사용합니다. SVG는 public/images/icon 전체 파일을 제공합니다. 아래 Grid에서 전체 아이콘을 확인하고 속성별 표에서 예시를 비교하며, 미리보기를 클릭하여 사용 코드를 복사할 수 있습니다.\n\n문서 전용 인자는 실제 Button의 아이콘 모드 props가 아닙니다. 생성된 JSX처럼 Icon을 children에 넣어 사용하세요. SVG는 원본 색상을 유지하며, tone="disabled"와 실제 disabled 동작은 별개입니다.',
      },
      source: {
        type: 'dynamic',
        transform: (
          _source: string,
          context: {
            args: IconButtonStoryArgs;
          },
        ) => iconButtonSource(context.args),
      },
    },
  },
} satisfies Meta<IconButtonStoryArgs>;

type IconButtonStory = StoryObj<typeof iconButtonDefaults>;

export const IconButtonPlayground: IconButtonStory = {
  ...iconButtonDefaults,
  name: 'Icon Button · Playground · 아이콘 선택',
  args: { ...iconButtonDefaults.args },
};

export const IconButtonDefault: IconButtonStory = {
  ...iconButtonDefaults,
  args: { ...iconButtonDefaults.args },
};

export const IconButtonDisabled: IconButtonStory = {
  ...iconButtonDefaults,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: '닫기' })).toBeDisabled();
  },
  args: { ...iconButtonDefaults.args, disabled: true },
};

export const IconButtonLoading: IconButtonStory = {
  ...iconButtonDefaults,
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: '닫기' });
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
  args: { ...iconButtonDefaults.args, loading: true },
};

export const IconButtonFontAwesomeInput: IconButtonStory = {
  ...iconButtonDefaults,
  name: 'Icon Button · Font Awesome · 직접 입력',
  args: { ...iconButtonDefaults.args, fontAwesomeName: 'faHeartSolid', 'aria-label': '찜하기' },
  argTypes: {
    ...iconButtonDefaults.argTypes,
    fontAwesomeName: { ...iconButtonDefaults.argTypes.fontAwesomeName, control: 'text' },
  },
  parameters: {
    ...iconButtonDefaults.parameters,
    docs: {
      ...iconButtonDefaults.parameters.docs,
      description: {
        ...iconButtonDefaults.parameters.docs.description,
        story:
          'Controls의 Font Awesome export에 faHeartSolid, faGift 등을 입력하세요. 대소문자를 구분하며, 빈 값과 미등록 이름에는 오류 안내를 표시합니다.',
      },
    },
  },
};

export const IconButtonProjectSvg: IconButtonStory = {
  ...iconButtonDefaults,
  name: 'Icon Button · 프로젝트 SVG · 선택',
  args: { ...iconButtonDefaults.args, iconSource: 'svg' },
};

export const IconButtonAllIcons: IconButtonStory = {
  ...iconButtonDefaults,
  name: 'Icon Button · 전체 아이콘 · 클릭하여 복사',
  render: () => <IconCatalog />,
  args: { ...iconButtonDefaults.args },
  parameters: {
    ...iconButtonDefaults.parameters,
    controls: { ...iconButtonDefaults.parameters.controls, disable: true },
    docs: {
      ...iconButtonDefaults.parameters.docs,
      source: {
        ...iconButtonDefaults.parameters.docs.source,
        code: '// 미리보기를 클릭하여 사용 코드를 복사하세요.',
        type: 'code',
        transform: undefined,
      },
    },
  },
};

export const IconButtonPropertyTable: IconButtonStory = {
  ...iconButtonDefaults,
  name: 'Icon Button · 속성별 비교 표',
  render: () => <PropertyComparison defaults={iconButtonArgs} />,
  args: { ...iconButtonDefaults.args },
  parameters: {
    ...iconButtonDefaults.parameters,
    controls: { ...iconButtonDefaults.parameters.controls, disable: true },
    docs: {
      ...iconButtonDefaults.parameters.docs,
      source: {
        ...iconButtonDefaults.parameters.docs.source,
        code: '// 미리보기를 클릭하여 사용 코드를 복사하세요.',
        type: 'code',
        transform: undefined,
      },
    },
  },
};

export const IconButtonInvalidFontAwesome: IconButtonStory = {
  ...iconButtonDefaults,
  name: 'Icon Button · 입력 오류 · 미등록 이름',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert')).toHaveTextContent('등록된 Font Awesome');
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
  args: { ...iconButtonDefaults.args, fontAwesomeName: 'faUnknown' },
  argTypes: {
    ...iconButtonDefaults.argTypes,
    fontAwesomeName: { ...iconButtonDefaults.argTypes.fontAwesomeName, control: 'text' },
  },
};

export const IconButtonEmptyFontAwesome: IconButtonStory = {
  ...iconButtonDefaults,
  ...IconButtonInvalidFontAwesome,
  name: 'Icon Button · 입력 오류 · 빈 값',
  args: { ...iconButtonDefaults.args, fontAwesomeName: '' },
};

export const IconButtonKeyboardFocus: IconButtonStory = {
  ...iconButtonDefaults,
  name: 'Icon Button · 키보드 포커스',
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: '닫기' });
    button.focus();
    await userEvent.tab({ shift: true });
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
  args: { ...iconButtonDefaults.args },
};
