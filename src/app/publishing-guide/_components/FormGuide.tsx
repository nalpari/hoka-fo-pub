'use client';

import { type ReactNode, useCallback, useRef, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Dropdown, type DropdownOption } from '@/components/common/atoms/Dropdown';
import { FormField } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';
import { NumberStepper } from '@/components/common/atoms/NumberStepper';
import { Radio } from '@/components/common/atoms/Radio';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Select } from '@/components/common/atoms/Select';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import { FormActionGroup } from '@/components/common/molecules/FormActionGroup';
import { CharacterCount } from '@/components/common/molecules/FormFields/CharacterCount';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { VerificationCountdown } from '@/components/common/molecules/FormFields/VerificationCountdown';
import { SearchField } from '@/components/common/molecules/SearchField';

import { AddressFields } from '@/components/common/organisms/Address/AddressFields';
import { EmailAddressFields } from '@/components/common/organisms/EmailAddressFields';

import { faCopy } from '@/icons/fontAwesome';

import { renderGuideCode } from './GuideCode';
import { type GuideCopyNotice, GuideCopyToast } from './GuideCopyToast';
import { GuideTimeline } from './GuideTimeline';

const sections = [
  { id: 'form-fields', title: '필드 조합', description: 'FormField · TextFormField' },
  { id: 'form-text', title: '텍스트 입력', description: 'TextInput · Select · Dropdown' },
  {
    id: 'form-selection',
    title: '선택 컨트롤',
    description: 'Checkbox · Radio · SegmentedControl',
  },
  { id: 'form-compositions', title: '폼 조합', description: '검색 · 주소 · 이메일 · 액션' },
  { id: 'form-support', title: '입력 보조', description: '수량 · 글자 수 · 인증 시간' },
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

const copyButton = css({
  flexShrink: '0',
  bg: 'black.10',
  border: '1px solid token(colors.black.40)',
  borderRadius: '4px',
  _hover: { bg: 'black.20!' },
});

const selectOptions = [
  { value: '', label: '항목을 선택해 주세요' },
  { value: 'question', label: '상품 문의' },
  { value: 'delivery', label: '배송 문의' },
];

const dropdownOptions: readonly DropdownOption[] = [
  { value: 'direct', label: '직접 입력' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
];

const codeExamples = {
  formField:
    '<FormField htmlFor="name" label="이름" required hint="실명을 입력해 주세요."><TextInput id="name" name="name" placeholder="이름을 입력해 주세요" /></FormField>',
  textFormField:
    '<TextFormField id="email" label="이메일" required error={error} inputProps={{ type: "email", value, onChange: (event) => setValue(event.target.value) }} />',
  textInput: '<TextInput aria-label="이름" placeholder="이름을 입력해 주세요" />',
  password:
    '<TextInput aria-label="비밀번호" type="password" placeholder="비밀번호를 입력해 주세요" />',
  textarea:
    '<TextInput aria-label="문의 내용" multiline placeholder="문의 내용을 입력해 주세요" />',
  select:
    '<FormField htmlFor="category" label="문의 유형"><Select id="category" value={value} onChange={(event) => setValue(event.target.value)}><option value="">선택해 주세요</option><option value="product">상품 문의</option></Select></FormField>',
  dropdown:
    '<Dropdown ariaLabel="문의 유형" label="문의 유형" placeholder="선택해 주세요" options={options} value={value} onValueChange={setValue} />',
  checkbox:
    '<Checkbox label="개인정보 수집에 동의합니다" checked={checked} onCheckedChange={setChecked} />',
  checkboxGroup:
    '<Checkbox ariaLabel="관심 카테고리" options={options} value={values} onValueChange={setValues} />',
  radio:
    '<Radio ariaLabel="수신 여부" label="마케팅 정보 수신" options={options} value={value} onValueChange={setValue} />',
  segmented:
    '<SegmentedControl ariaLabel="정렬 기준" options={options} value={value} onValueChange={setValue} />',
  search:
    '<SearchField label="검색어" placeholder="검색어를 입력해 주세요" value={query} onValueChange={setQuery} onSearch={handleSearch} />',
  address:
    '<AddressFields variant="boxed" idPrefix="shipping" value={address} onValueChange={updateAddress} searchOpen={searchOpen} onSearchOpenChange={setSearchOpen} />',
  email:
    '<EmailAddressFields idPrefix="signup" local={local} domain={domain} domainChoice={domainChoice} errors={errors} options={domainOptions} onLocalChange={setLocal} onDomainChange={setDomain} onDomainChoice={setDomainChoice} />',
  actions:
    '<form onSubmit={handleSubmit}><FormActionGroup onCancel={handleCancel} submitLabel="저장" /></form>',
  stepper: '<NumberStepper value={quantity} min={1} max={10} onChange={setQuantity} />',
  count: '<CharacterCount length={message.length} limit={1000} spaced />',
  countdown: '<VerificationCountdown secondsLeft={89} />',
} as const;

type FormExampleProps = {
  title: string;
  description: string;
  code: string;
  onCopy: (code: string) => void;
  children: ReactNode;
};

function FormExample({ title, description, code, onCopy, children }: FormExampleProps) {
  return (
    <Stack className={exampleCard} gap="3">
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

/** 프로젝트 공통 폼 컴포넌트의 상태와 사용 코드를 모아 보여줍니다. (Shows shared form components with their states and usage snippets.) */
export function FormGuide() {
  const [notice, setNotice] = useState<GuideCopyNotice | null>(null);
  const nextNoticeId = useRef(0);
  const [name, setName] = useState('서현');
  const [password, setPassword] = useState('hoka2026');
  const [message, setMessage] = useState('문의 내용을 입력해 주세요.');
  const [category, setCategory] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['running']);
  const [deliveryMethod, setDeliveryMethod] = useState('home');
  const [sort, setSort] = useState('popular');
  const [query, setQuery] = useState('HOKA');
  const [quantity, setQuantity] = useState(2);
  const [address, setAddress] = useState({
    postalCode: '06100',
    address: '서울특별시 강남구 테헤란로',
    addressDetail: '',
  });
  const [addressSearchOpen, setAddressSearchOpen] = useState(false);
  const [emailLocal, setEmailLocal] = useState('hoka.member');
  const [emailDomain, setEmailDomain] = useState('gmail.com');
  const [emailDomainChoice, setEmailDomainChoice] = useState('gmail.com');

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
            프로젝트 공통 폼 컴포넌트의 실제 상태와 사용 코드를 확인하고 복사합니다.
          </Typography>
        </HStack>

        <Stack as="section" id="form-fields" gap="3" aria-labelledby="form-fields-title">
          <SectionTitle id="form-fields-title" title="필드 조합" />
          <Grid columns={{ base: 2, _mobile: 1 }} gap="3">
            <FormExample
              title="FormField + TextInput"
              description="label · required · hint"
              code={codeExamples.formField}
              onCopy={copyCode}
            >
              <FormField
                htmlFor="guide-name"
                label="이름"
                required
                hint="가입 정보와 동일한 이름을 입력해 주세요."
              >
                <TextInput
                  id="guide-name"
                  name="name"
                  placeholder="이름을 입력해 주세요"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </FormField>
            </FormExample>
            <FormExample
              title="TextFormField"
              description="label과 control 연결 · 오류 표시"
              code={codeExamples.textFormField}
              onCopy={copyCode}
            >
              <TextFormField
                id="guide-email"
                label="이메일"
                required
                error="이메일 형식을 확인해 주세요."
                inputProps={{
                  type: 'email',
                  defaultValue: 'member@',
                  placeholder: 'name@example.com',
                }}
              />
            </FormExample>
          </Grid>
        </Stack>

        <Stack as="section" id="form-text" gap="3" aria-labelledby="form-text-title">
          <SectionTitle id="form-text-title" title="텍스트 입력" />
          <Grid columns={{ base: 2, _mobile: 1 }} gap="3">
            <FormExample
              title="TextInput"
              description="기본 입력"
              code={codeExamples.textInput}
              onCopy={copyCode}
            >
              <TextInput
                aria-label="이름 입력"
                placeholder="이름을 입력해 주세요"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormExample>
            <FormExample
              title="Password"
              description="비밀번호 표시 전환"
              code={codeExamples.password}
              onCopy={copyCode}
            >
              <TextInput
                aria-label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormExample>
            <FormExample
              title="Textarea"
              description="여러 줄 입력"
              code={codeExamples.textarea}
              onCopy={copyCode}
            >
              <TextInput
                aria-label="문의 내용"
                multiline
                placeholder="문의 내용을 입력해 주세요"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </FormExample>
            <FormExample
              title="Select"
              description="Native select"
              code={codeExamples.select}
              onCopy={copyCode}
            >
              <FormField htmlFor="guide-category" label="문의 유형" required>
                <Select
                  id="guide-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {selectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormField>
            </FormExample>
            <FormExample
              title="Dropdown"
              description="커스텀 선택 메뉴"
              code={codeExamples.dropdown}
              onCopy={copyCode}
            >
              <Dropdown
                ariaLabel="문의 유형"
                label="문의 유형"
                placeholder="문의 유형을 선택해 주세요"
                options={selectOptions.filter((option) => option.value)}
                value={dropdownValue}
                onValueChange={setDropdownValue}
              />
            </FormExample>
          </Grid>
        </Stack>

        <Stack as="section" id="form-selection" gap="3" aria-labelledby="form-selection-title">
          <SectionTitle id="form-selection-title" title="선택 컨트롤" />
          <Grid columns={{ base: 2, _mobile: 1 }} gap="3">
            <FormExample
              title="Checkbox"
              description="단일 동의"
              code={codeExamples.checkbox}
              onCopy={copyCode}
            >
              <Checkbox
                label="개인정보 수집에 동의합니다."
                checked={agreed}
                onCheckedChange={setAgreed}
              />
            </FormExample>
            <FormExample
              title="Checkbox group"
              description="복수 선택"
              code={codeExamples.checkboxGroup}
              onCopy={copyCode}
            >
              <Checkbox
                ariaLabel="관심 카테고리"
                options={[
                  { value: 'running', label: '러닝' },
                  { value: 'hiking', label: '하이킹' },
                  { value: 'walking', label: '워킹' },
                ]}
                value={selectedTopics}
                onValueChange={setSelectedTopics}
              />
            </FormExample>
            <FormExample
              title="Radio"
              description="단일 선택"
              code={codeExamples.radio}
              onCopy={copyCode}
            >
              <Radio
                ariaLabel="수령 방법"
                label="수령 방법"
                options={[
                  { value: 'home', label: '택배 수령' },
                  { value: 'store', label: '매장 수령' },
                ]}
                value={deliveryMethod}
                onValueChange={setDeliveryMethod}
              />
            </FormExample>
            <FormExample
              title="SegmentedControl"
              description="탭 패널 없는 단일 필터"
              code={codeExamples.segmented}
              onCopy={copyCode}
            >
              <SegmentedControl
                ariaLabel="정렬 기준"
                options={[
                  { value: 'popular', label: '인기순' },
                  { value: 'recent', label: '최신순' },
                  { value: 'price', label: '가격순' },
                ]}
                value={sort}
                onValueChange={setSort}
              />
            </FormExample>
          </Grid>
        </Stack>

        <Stack
          as="section"
          id="form-compositions"
          gap="3"
          aria-labelledby="form-compositions-title"
        >
          <SectionTitle id="form-compositions-title" title="폼 조합" />
          <Grid columns={{ base: 2, _mobile: 1 }} gap="3">
            <FormExample
              title="SearchField"
              description="검색 입력과 submit 액션"
              code={codeExamples.search}
              onCopy={copyCode}
            >
              <SearchField
                label="검색어"
                placeholder="검색어를 입력해 주세요"
                value={query}
                onValueChange={setQuery}
                onSearch={() => {
                  nextNoticeId.current += 1;
                  setNotice({ id: nextNoticeId.current, text: `“${query}” 검색 예시입니다.` });
                }}
              />
            </FormExample>
            <FormExample
              title="EmailAddressFields"
              description="이메일 아이디 · 도메인 선택"
              code={codeExamples.email}
              onCopy={copyCode}
            >
              <Stack gap="3">
                <EmailAddressFields
                  idPrefix="guide-email-address"
                  local={emailLocal}
                  domain={emailDomain}
                  domainChoice={emailDomainChoice}
                  errors={{}}
                  options={dropdownOptions}
                  onLocalChange={setEmailLocal}
                  onDomainChange={setEmailDomain}
                  onDomainChoice={(next) => {
                    setEmailDomainChoice(next);
                    if (next !== 'direct') setEmailDomain(next);
                  }}
                />
              </Stack>
            </FormExample>
            <FormExample
              title="AddressFields"
              description="주소 입력과 검색 팝업"
              code={codeExamples.address}
              onCopy={copyCode}
            >
              <Stack gap="3">
                <AddressFields
                  variant="boxed"
                  idPrefix="guide-address"
                  value={address}
                  onValueChange={(field, value) =>
                    setAddress((current) => ({ ...current, [field]: value }))
                  }
                  searchOpen={addressSearchOpen}
                  onSearchOpenChange={setAddressSearchOpen}
                />
              </Stack>
            </FormExample>
            <FormExample
              title="FormActionGroup"
              description="취소 · 제출 액션"
              code={codeExamples.actions}
              onCopy={copyCode}
            >
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  nextNoticeId.current += 1;
                  setNotice({ id: nextNoticeId.current, text: '제출 버튼 예시입니다.' });
                }}
              >
                <FormActionGroup
                  onCancel={() => {
                    nextNoticeId.current += 1;
                    setNotice({ id: nextNoticeId.current, text: '취소 버튼 예시입니다.' });
                  }}
                  submitLabel="저장"
                />
              </form>
            </FormExample>
          </Grid>
        </Stack>

        <Stack as="section" id="form-support" gap="3" aria-labelledby="form-support-title">
          <SectionTitle id="form-support-title" title="입력 보조" />
          <Grid columns={{ base: 2, _mobile: 1 }} gap="3">
            <FormExample
              title="NumberStepper"
              description="최소·최대 수량 제어"
              code={codeExamples.stepper}
              onCopy={copyCode}
            >
              <NumberStepper value={quantity} min={1} max={10} onChange={setQuantity} />
            </FormExample>
            <FormExample
              title="CharacterCount"
              description="입력 길이와 제한 표시"
              code={codeExamples.count}
              onCopy={copyCode}
            >
              <HStack justifyContent="flex-end">
                <CharacterCount length={message.length} limit={1000} spaced />
              </HStack>
            </FormExample>
            <FormExample
              title="VerificationCountdown"
              description="남은 인증 시간 표시"
              code={codeExamples.countdown}
              onCopy={copyCode}
            >
              <VerificationCountdown secondsLeft={89} />
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
