'use client';

import { type ReactNode, useCallback, useRef, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Dropdown, type DropdownOption } from '@/components/common/atoms/Dropdown';
import { Icon } from '@/components/common/atoms/Icon';
import { Radio } from '@/components/common/atoms/Radio';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { faCopy, faUser } from '@/icons/fontAwesome';

import { renderGuideCode } from './GuideCode';
import { type GuideCopyNotice, GuideCopyToast } from './GuideCopyToast';
import { GuideTimeline } from './GuideTimeline';

const sections = [
  {
    id: 'form-input-fields',
    title: 'Input Fields',
    description: '입력 상태 · 타입별 비교',
  },
  { id: 'form-dropdown-selection', title: 'Dropdown Selection', description: '선택 필드 상태' },
  { id: 'form-checkbox', title: 'Checkbox', description: '선택 · 비활성화 상태' },
  { id: 'form-radio', title: 'Radio', description: '선택 · 비활성화 상태' },
  { id: 'form-dropdown-menu', title: 'Dropdown Menu', description: '목록 · 아이콘 · 이미지' },
] as const;

const formCode = css({
  minW: '0',
  justifyContent: 'space-between',
  p: '3',
  overflowWrap: 'anywhere',
  border: '1px solid token(colors.black.20)',
  bg: 'surface.subtle',
  fontSize: '12px',
  lineHeight: '1.5',
});

const exampleCard = css({
  minW: '0',
  p: { base: '4', _mobile: '3' },
  border: '1px solid token(colors.black.20)',
  borderRadius: '2',
  bg: 'surface.default',
});

const focusPreview = css({
  '& > div': { outline: '2px solid token(colors.black.100)', outlineOffset: '-2px' },
});

const copyButton = css({
  flexShrink: '0',
  bg: 'black.10',
  border: '1px solid token(colors.black.40)',
  borderRadius: '4px',
  _hover: { bg: 'black.20!' },
});

const menuOptions = [
  { value: 'one', label: '드롭다운 메뉴 1' },
  { value: 'two', label: '드롭다운 메뉴 2' },
  { value: 'three', label: '드롭다운 메뉴 3' },
];

const iconMenuOptions: readonly DropdownOption[] = menuOptions.map((option) => ({
  ...option,
  prefix: <Icon fontAwesomeIcon={faUser} size={16} />,
}));

const imageMenuOptions: readonly DropdownOption[] = [
  {
    value: 'us',
    label: 'United States',
    prefix: <Icon src="/images/flag/us.svg" size={16} />,
  },
  {
    value: 'jp',
    label: 'Japan',
    prefix: <Icon src="/images/flag/jp.svg" size={16} />,
  },
];

const codeExamples = {
  inputDefault:
    '<TextFormField variant="boxed" id="field" label="필드명" required inputProps={{ placeholder: "텍스트를 입력해주세요" }} />',
  inputFocus:
    '<TextFormField variant="boxed" id="field" label="필드명" required inputProps={{ placeholder: "텍스트를 입력해주세요" }} />',
  inputTyping:
    '<TextFormField variant="boxed" id="field" label="필드명" required inputProps={{ value, onChange: (event) => setValue(event.target.value) }} />',
  inputError:
    '<TextFormField variant="boxed" id="field" label="필드명" required error="이 메시지는 레이블과 관련된 오류 정보를 보여줍니다." inputProps={{ placeholder: "텍스트를 입력해주세요" }} />',
  password:
    '<TextFormField variant="boxed" id="password" label="비밀번호" required inputProps={{ type: "password", placeholder: "비밀번호를 입력해 주세요" }} />',
  phone:
    '<TextFormField variant="boxed" id="phone" label="휴대폰 번호" required info="휴대폰 번호 안내" hint="HOKA의 개인정보 보호정책에 대한 자세한 내용을 확인하세요." inputProps={{ placeholder: "Example: 3333333333" }} />',
  number:
    '<TextFormField variant="boxed" id="number" label="Number" required inputProps={{ type: "number", placeholder: "숫자를 입력해 주세요" }} />',
  multiline:
    '<TextFormField variant="boxed" id="message" label="문의 내용" required inputProps={{ multiline: true, placeholder: "내용을 입력해 주세요" }} />',
  selection:
    '<Dropdown ariaLabel="메뉴 선택" label="타이틀명" required placeholder="메뉴를 선택해 주세요" options={options} value={value} onValueChange={setValue} />',
  selectionError:
    '<Dropdown ariaLabel="메뉴 선택" label="타이틀명" required error="메뉴를 선택해 주세요." options={options} value={value} onValueChange={setValue} />',
  selectionDisabled:
    '<Dropdown ariaLabel="메뉴 선택" label="타이틀명" disabled options={options} value={value} onValueChange={setValue} />',
  checkbox: '<Checkbox label="동의 항목" checked={checked} onCheckedChange={setChecked} />',
  checkboxDisabled:
    '<Checkbox label="동의 항목" checked={checked} disabled onCheckedChange={setChecked} />',
  radio: '<Radio ariaLabel="수신 여부" options={options} value={value} onValueChange={setValue} />',
  radioDisabled:
    '<Radio ariaLabel="수신 여부" disabled options={options} value={value} onValueChange={setValue} />',
  dropdownList:
    '<Dropdown ariaLabel="메뉴 선택" label="타이틀명" placeholder="메뉴를 선택해 주세요" options={options} value={value} onValueChange={setValue} />',
  dropdownIconList:
    '<Dropdown ariaLabel="사용자 선택" label="타이틀명" options={options.map((option) => ({ ...option, prefix: <Icon fontAwesomeIcon={faUser} size={16} /> }))} />',
  dropdownImageList:
    '<Dropdown ariaLabel="국가 선택" label="타이틀명" options={[{ value: "us", label: "United States", prefix: <Icon src="/images/flag/us.svg" size={16} /> }]} />',
} as const;

type FormExampleProps = {
  title: string;
  description: string;
  code: string;
  onCopy: (code: string) => void;
  children: ReactNode;
  className?: string;
};

function FormExample({ title, description, code, onCopy, children, className }: FormExampleProps) {
  return (
    <Stack className={[exampleCard, className].filter(Boolean).join(' ')} gap="3">
      <HStack alignItems="baseline" justifyContent="space-between" gap="2" flexWrap="wrap">
        <Typography variant="body4" weight="semibold">
          {title}
        </Typography>
        <Typography variant="body5" tone="subtle">
          {description}
        </Typography>
      </HStack>
      <Box minW="0" py="2">
        {children}
      </Box>
      <HStack as="code" className={formCode} alignItems="flex-start" gap="3">
        <Box as="span" flex="1" minW="0" overflowWrap="anywhere">
          {renderGuideCode(code)}
        </Box>
        <ButtonCopy code={code} onCopy={onCopy} />
      </HStack>
    </Stack>
  );
}

function ButtonCopy({ code, onCopy }: { code: string; onCopy: (code: string) => void }) {
  return (
    <Button
      aria-label="폼 코드 복사"
      className={copyButton}
      title="코드 복사"
      type="button"
      variant="icon"
      size={32}
      onClick={() => onCopy(code)}
    >
      <Icon fontAwesomeIcon={faCopy} size={16} />
    </Button>
  );
}

/** 요청된 다섯 폼 컴포넌트의 상태와 타입별 예시를 보여줍니다. (Shows state and type examples for the five requested form component categories.) */
export function FormGuide() {
  const [notice, setNotice] = useState<GuideCopyNotice | null>(null);
  const nextNoticeId = useRef(0);
  const [typingValue, setTypingValue] = useState('텍스트를 입력해주세요');
  const [passwordValue, setPasswordValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [selectedMenuValue, setSelectedMenuValue] = useState('');
  const [iconMenuValue, setIconMenuValue] = useState('');
  const [imageMenuValue, setImageMenuValue] = useState('us');
  const [checkboxStates, setCheckboxStates] = useState([false, true, false, true]);
  const [radioStates, setRadioStates] = useState(['', 'yes', '', 'yes']);

  const dismissNotice = useCallback((id: number) => {
    setNotice((current) => (current?.id === id ? null : current));
  }, []);

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      nextNoticeId.current += 1;
      setNotice({ id: nextNoticeId.current, text: '폼 사용 코드를 복사했습니다.' });
    } catch {
      nextNoticeId.current += 1;
      setNotice({
        id: nextNoticeId.current,
        text: '복사하지 못했습니다. 표시된 코드를 직접 선택해 복사해 주세요.',
      });
    }
  }

  const updateCheckbox = (index: number, checked: boolean) => {
    setCheckboxStates((current) =>
      current.map((value, itemIndex) => (itemIndex === index ? checked : value)),
    );
  };

  const updateRadio = (index: number, value: string) => {
    setRadioStates((current) =>
      current.map((currentValue, itemIndex) => (itemIndex === index ? value : currentValue)),
    );
  };

  return (
    <Grid
      className={css({
        gridTemplateColumns: { base: 'minmax(0, 1fr) 240px', _mobile: 'minmax(0, 1fr)' },
      })}
      alignItems="start"
      gap="4"
      pt="6"
    >
      <Stack minW="0" gap={{ base: '6', _mobile: '4' }}>
        <HStack alignItems="baseline" gap="3" flexWrap="wrap">
          <Typography as="h2" variant="heading8">
            Form
          </Typography>
          <Typography as="p" variant="body5" tone="subtle">
            Figma 기준의 폼 상태와 타입별 예시를 확인하고 사용 코드를 복사합니다.
          </Typography>
        </HStack>

        <Stack
          as="section"
          id="form-input-fields"
          gap="3"
          aria-labelledby="form-input-fields-title"
        >
          <SectionTitle id="form-input-fields-title" title="Input Fields" />
          <Typography variant="body5" tone="subtle">
            기본 입력은 Default, Focus, Typing, Error 상태를, 입력 타입은
            기본·비밀번호·전화번호·숫자·여러 줄을 보여줍니다.
          </Typography>
          <Grid columns={{ base: 4, _mobile: 2 }} gap="3">
            <FormExample
              title="Default"
              description="기본 상태"
              code={codeExamples.inputDefault}
              onCopy={copyCode}
            >
              <TextFormField
                variant="boxed"
                id="guide-state-default"
                label="필드명"
                required
                inputProps={{ placeholder: '텍스트를 입력해주세요' }}
              />
            </FormExample>
            <FormExample
              title="Focus"
              description="포커스 상태"
              code={codeExamples.inputFocus}
              onCopy={copyCode}
            >
              <TextFormField
                className={focusPreview}
                variant="boxed"
                id="guide-state-focus"
                label="필드명"
                required
                inputProps={{ placeholder: '텍스트를 입력해주세요' }}
              />
            </FormExample>
            <FormExample
              title="Typing"
              description="입력 중"
              code={codeExamples.inputTyping}
              onCopy={copyCode}
            >
              <TextFormField
                variant="boxed"
                id="guide-state-typing"
                label="필드명"
                required
                inputProps={{
                  value: typingValue,
                  onChange: (event) => setTypingValue(event.target.value),
                }}
              />
            </FormExample>
            <FormExample
              title="Error"
              description="오류 상태"
              code={codeExamples.inputError}
              onCopy={copyCode}
            >
              <TextFormField
                variant="boxed"
                id="guide-state-error"
                label="필드명"
                required
                error="이 메시지는 레이블과 관련된 오류 정보를 보여줍니다."
                inputProps={{ placeholder: '텍스트를 입력해주세요' }}
              />
            </FormExample>
          </Grid>

          <Grid columns={{ base: 3, _mobile: 1 }} gap="3">
            <FormExample
              title="Default"
              description="기본 입력"
              code={codeExamples.inputDefault}
              onCopy={copyCode}
            >
              <TextFormField
                variant="boxed"
                id="guide-type-default"
                label="필드명"
                required
                inputProps={{ placeholder: '텍스트를 입력해주세요' }}
              />
            </FormExample>
            <FormExample
              title="Password"
              description="표시 전환"
              code={codeExamples.password}
              onCopy={copyCode}
            >
              <TextFormField
                variant="boxed"
                id="guide-type-password"
                label="비밀번호"
                required
                inputProps={{
                  type: 'password',
                  placeholder: '비밀번호를 입력해 주세요',
                  value: passwordValue,
                  onChange: (event) => setPasswordValue(event.target.value),
                }}
              />
            </FormExample>
            <FormExample
              title="Phone Number"
              description="안내 아이콘 · 도움말"
              code={codeExamples.phone}
              onCopy={copyCode}
            >
              <TextFormField
                variant="boxed"
                id="guide-type-phone"
                label="휴대폰 번호"
                required
                info="휴대폰 번호 안내"
                hint="HOKA의 개인정보 보호정책에 대한 자세한 내용을 확인하세요."
                inputProps={{
                  placeholder: 'Example: 3333333333',
                  value: phoneValue,
                  onChange: (event) => setPhoneValue(event.target.value),
                }}
              />
            </FormExample>
            <FormExample
              title="Number"
              description="숫자 입력"
              code={codeExamples.number}
              onCopy={copyCode}
            >
              <TextFormField
                variant="boxed"
                id="guide-type-number"
                label="Number"
                required
                inputProps={{
                  type: 'number',
                  placeholder: '숫자를 입력해 주세요',
                  value: numberValue,
                  onChange: (event) => setNumberValue(event.target.value),
                }}
              />
            </FormExample>
            <FormExample
              title="Open Text Area"
              description="여러 줄 입력"
              code={codeExamples.multiline}
              onCopy={copyCode}
            >
              <TextFormField
                variant="boxed"
                id="guide-type-open-text"
                label="문의 내용"
                required
                inputProps={{
                  multiline: true,
                  placeholder: '내용을 입력해 주세요',
                  value: messageValue,
                  onChange: (event) => setMessageValue(event.target.value),
                }}
              />
            </FormExample>
          </Grid>
        </Stack>

        <Stack
          as="section"
          id="form-dropdown-selection"
          gap="3"
          aria-labelledby="form-dropdown-selection-title"
        >
          <SectionTitle id="form-dropdown-selection-title" title="Dropdown Selection" />
          <Typography variant="body5" tone="subtle">
            기본·선택·오류·비활성화 상태를 비교하고, 선택 필드를 눌러 메뉴를 확인합니다.
          </Typography>
          <Grid columns={{ base: 4, _mobile: 2 }} gap="3">
            <FormExample
              title="Default"
              description="선택 전"
              code={codeExamples.selection}
              onCopy={copyCode}
            >
              <Dropdown
                ariaLabel="기본 메뉴 선택"
                label="타이틀명"
                required
                placeholder="메뉴를 선택해 주세요"
                options={menuOptions}
                value={selectedValue}
                onValueChange={setSelectedValue}
              />
            </FormExample>
            <FormExample
              title="Selected"
              description="선택 완료"
              code={codeExamples.selection}
              onCopy={copyCode}
            >
              <Dropdown
                ariaLabel="선택된 메뉴"
                label="타이틀명"
                required
                options={menuOptions}
                value="one"
                onValueChange={() => undefined}
              />
            </FormExample>
            <FormExample
              title="Error"
              description="오류 상태"
              code={codeExamples.selectionError}
              onCopy={copyCode}
            >
              <Dropdown
                ariaLabel="오류 메뉴 선택"
                label="타이틀명"
                required
                placeholder="메뉴를 선택해 주세요"
                error="메뉴를 선택해 주세요."
                options={menuOptions}
                value={errorValue}
                onValueChange={setErrorValue}
              />
            </FormExample>
            <FormExample
              title="Disabled"
              description="비활성화"
              code={codeExamples.selectionDisabled}
              onCopy={copyCode}
            >
              <Dropdown
                ariaLabel="비활성화 메뉴 선택"
                label="타이틀명"
                disabled
                options={menuOptions}
                value="one"
                onValueChange={() => undefined}
              />
            </FormExample>
          </Grid>
        </Stack>

        <Stack as="section" id="form-checkbox" gap="3" aria-labelledby="form-checkbox-title">
          <SectionTitle id="form-checkbox-title" title="Checkbox" />
          <Typography variant="body5" tone="subtle">
            기본·선택·비활성화·비활성화 선택 상태입니다.
          </Typography>
          <Grid columns={{ base: 4, _mobile: 2 }} gap="3">
            {[
              { title: 'Default', checked: checkboxStates[0], disabled: false },
              { title: 'Selected', checked: checkboxStates[1], disabled: false },
              { title: 'Disabled', checked: checkboxStates[2], disabled: true },
              { title: 'Disabled Selected', checked: checkboxStates[3], disabled: true },
            ].map((item, index) => (
              <FormExample
                key={item.title}
                title={item.title}
                description="체크박스 상태"
                code={item.disabled ? codeExamples.checkboxDisabled : codeExamples.checkbox}
                onCopy={copyCode}
              >
                <Checkbox
                  label="동의 항목"
                  checked={item.checked}
                  disabled={item.disabled}
                  onCheckedChange={(checked) => updateCheckbox(index, checked)}
                />
              </FormExample>
            ))}
          </Grid>
        </Stack>

        <Stack as="section" id="form-radio" gap="3" aria-labelledby="form-radio-title">
          <SectionTitle id="form-radio-title" title="Radio" />
          <Typography variant="body5" tone="subtle">
            기본·선택·비활성화·비활성화 선택 상태입니다.
          </Typography>
          <Grid columns={{ base: 4, _mobile: 2 }} gap="3">
            {[
              { title: 'Default', value: radioStates[0], disabled: false },
              { title: 'Selected', value: radioStates[1], disabled: false },
              { title: 'Disabled', value: radioStates[2], disabled: true },
              { title: 'Disabled Selected', value: radioStates[3], disabled: true },
            ].map((item, index) => (
              <FormExample
                key={item.title}
                title={item.title}
                description="라디오 상태"
                code={item.disabled ? codeExamples.radioDisabled : codeExamples.radio}
                onCopy={copyCode}
              >
                <Radio
                  ariaLabel={`${item.title} 예시`}
                  disabled={item.disabled}
                  options={[
                    { value: 'yes', label: '수신' },
                    { value: 'no', label: '수신 안함' },
                  ]}
                  value={item.value}
                  onValueChange={(value) => updateRadio(index, value)}
                />
              </FormExample>
            ))}
          </Grid>
        </Stack>

        <Stack
          as="section"
          id="form-dropdown-menu"
          gap="3"
          aria-labelledby="form-dropdown-menu-title"
        >
          <SectionTitle id="form-dropdown-menu-title" title="Dropdown Menu" />
          <Typography variant="body5" tone="subtle">
            각 선택 필드를 눌러 기본 목록, 아이콘 목록, 이미지 목록을 확인합니다.
          </Typography>
          <Grid columns={{ base: 3, _mobile: 1 }} gap="3">
            <FormExample
              title="List"
              description="텍스트 목록"
              code={codeExamples.dropdownList}
              onCopy={copyCode}
            >
              <Dropdown
                ariaLabel="일반 메뉴"
                label="타이틀명"
                placeholder="메뉴를 선택해 주세요"
                options={menuOptions}
                value={selectedMenuValue}
                onValueChange={setSelectedMenuValue}
              />
            </FormExample>
            <FormExample
              title="Icon + List"
              description="아이콘이 있는 목록"
              code={codeExamples.dropdownIconList}
              onCopy={copyCode}
            >
              <Dropdown
                ariaLabel="사용자 메뉴"
                label="타이틀명"
                placeholder="사용자를 선택해 주세요"
                options={iconMenuOptions}
                value={iconMenuValue}
                onValueChange={setIconMenuValue}
              />
            </FormExample>
            <FormExample
              title="Image + List"
              description="이미지가 있는 목록"
              code={codeExamples.dropdownImageList}
              onCopy={copyCode}
            >
              <Dropdown
                ariaLabel="국가 메뉴"
                label="타이틀명"
                placeholder="국가를 선택해 주세요"
                options={imageMenuOptions}
                value={imageMenuValue}
                onValueChange={setImageMenuValue}
              />
            </FormExample>
          </Grid>
        </Stack>
      </Stack>
      <GuideTimeline title="폼 컴포넌트" entries={sections} />
      <GuideCopyToast notice={notice} onDismiss={dismissNotice} />
    </Grid>
  );
}

function SectionTitle({ id, title }: { id: string; title: string }) {
  return (
    <Typography as="h3" id={id} variant="heading8">
      {title}
    </Typography>
  );
}
