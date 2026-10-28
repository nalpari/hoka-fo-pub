import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import {
  fontAwesomeNames,
  IconButtonPreview,
  iconButtonSource,
  type IconButtonStoryArgs,
  IconCatalog,
  PropertyComparison,
  svgPaths,
} from '@/components/common/atoms/IconButton/IconButtonDocs';

const defaults = {
  iconSource: 'fontAwesome',
  fontAwesomeName: 'faXmark',
  svgPath: 'close.svg',
  size: 36,
  iconSize: 20,
  shape: 'square',
  tone: 'default',
  color: 'currentColor',
  disabled: false,
  'aria-label': '닫기',
} satisfies IconButtonStoryArgs;

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: defaults,
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
    docs: {
      description: {
        component:
          '아이콘을 children으로 전달하는 버튼입니다. Playground Controls에서 아이콘 종류와 이름을 선택하세요. Font Awesome 직접 입력은 공용 모듈의 export 이름(예: faHeartSolid)을 사용합니다. SVG는 public/images/icon 전체 파일을 제공합니다. 아래 Grid에서 전체 아이콘을 확인하고 속성별 표에서 예시를 비교하며, 미리보기를 클릭하여 사용 코드를 복사할 수 있습니다.\n\n문서 전용 인자는 실제 IconButton props가 아닙니다. 생성된 JSX처럼 Icon을 children에 넣어 사용하세요. SVG는 원본 색상을 유지하며, tone="disabled"와 실제 disabled 동작은 별개입니다.',
      },
      source: {
        type: 'dynamic',
        transform: (_source: string, context: { args: IconButtonStoryArgs }) =>
          iconButtonSource(context.args),
      },
    },
  },
} satisfies Meta<IconButtonStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = { name: 'Playground · 아이콘 선택' };

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: '닫기' })).toBeDisabled();
  },
};

export const FontAwesomeInput: Story = {
  name: 'Font Awesome · 직접 입력',
  args: { fontAwesomeName: 'faHeartSolid', 'aria-label': '찜하기' },
  argTypes: { fontAwesomeName: { control: 'text' } },
  parameters: {
    docs: {
      description: {
        story:
          'Controls의 Font Awesome export에 faHeartSolid, faGift 등을 입력하세요. 대소문자를 구분하며, 빈 값과 미등록 이름에는 오류 안내를 표시합니다.',
      },
    },
  },
};

export const ProjectSvg: Story = {
  name: '프로젝트 SVG · 선택',
  args: { iconSource: 'svg' },
};

export const AllIcons: Story = {
  name: '전체 아이콘 · 클릭하여 복사',
  render: () => <IconCatalog />,
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: '// 미리보기를 클릭하여 사용 코드를 복사하세요.',
        type: 'code',
        transform: undefined,
      },
    },
  },
};

export const PropertyTable: Story = {
  name: '속성별 비교 표',
  render: () => <PropertyComparison defaults={defaults} />,
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: '// 미리보기를 클릭하여 사용 코드를 복사하세요.',
        type: 'code',
        transform: undefined,
      },
    },
  },
};

export const InvalidFontAwesome: Story = {
  name: '입력 오류 · 미등록 이름',
  args: { fontAwesomeName: 'faUnknown' },
  argTypes: { fontAwesomeName: { control: 'text' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert')).toHaveTextContent('등록된 Font Awesome');
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};

export const EmptyFontAwesome: Story = {
  ...InvalidFontAwesome,
  name: '입력 오류 · 빈 값',
  args: { fontAwesomeName: '' },
};

export const KeyboardFocus: Story = {
  name: '키보드 포커스',
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: '닫기' });
    button.focus();
    await userEvent.tab({ shift: true });
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};
