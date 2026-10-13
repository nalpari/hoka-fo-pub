import type { FormEvent } from 'react';
import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Dropdown } from '@/shared/components/atoms/Dropdown/Dropdown';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

export type RegistrationInformation = {
  name: string;
  password: string;
  confirmation: string;
  birthDate: string;
  phone: string;
  address: string;
  addressDetail: string;
  email: string;
  domain: string;
  anniversary: string;
};

export type MarketingPreferences = { email: string; coupon: string; sms: string; married: string };

const styles = {
  page: css({ pt: '24', px: '5', pb: '20', _mobile: { pt: '10', px: '4', pb: '8' } }),
  content: css({ maxW: '420px', mx: 'auto' }),
  title: css({ m: '0', mb: '10', _mobile: { mb: '8' } }),
  form: css({ display: 'flex', flexDirection: 'column' }),
  button: css({ w: '100%', py: '2' }),
  actions: css({ gridTemplateColumns: '1fr 1fr', gap: '2' }),
  hint: css({ m: '0', mt: '-2' }),
  heading: css({ m: '0', mb: '6' }),
  preferences: css({ pb: '6', mb: '6', borderBottom: '1px solid var(--color-black-20)' }),
  row: css({ justifyContent: 'space-between', gap: '3', alignItems: 'start' }),
  radio: css({ display: 'flex!', gap: '6', flexShrink: '0' }),
  married: css({ mb: '4' }),
  disabledInput: css({
    bg: 'var(--color-black-10)',
    color: 'var(--color-text-subtle)',
    cursor: 'not-allowed',
    _disabled: { opacity: '1' },
  }),
};

type Props = {
  stage: 'information' | 'additional';
  information: RegistrationInformation;
  preferences: MarketingPreferences;
  domainChoice: string;
  notice: string;
  duplicateNotice: string;
  fieldErrors: {
    email: string;
    domain: string;
    name: string;
    password: string;
    confirmation: string;
  };
  addressOpen: boolean;
  onChange: (key: keyof RegistrationInformation, value: string) => void;
  onPreferenceChange: (key: keyof MarketingPreferences, value: string) => void;
  onDomainChoice: (value: string) => void;
  onDuplicateCheck: () => void;
  onAddressOpen: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export function RegistrationContent(props: Props) {
  const field = (
    key: keyof RegistrationInformation,
    label: string,
    placeholder: string,
    type = 'text',
    fieldId = `registration-${key}`,
    disabled = false,
  ) => {
    const error =
      key === 'email'
        ? props.fieldErrors.email
        : key === 'domain'
          ? props.fieldErrors.domain
          : key === 'name'
            ? props.fieldErrors.name
            : key === 'password'
              ? props.fieldErrors.password
              : key === 'confirmation'
                ? props.fieldErrors.confirmation
                : '';

    return (
      <FormField
        variant="boxed"
        htmlFor={fieldId}
        disabled={disabled}
        invalid={Boolean(error)}
        error={error || undefined}
        label={<Typography variant="body5">* {label}</Typography>}
      >
        <TextInput
          id={fieldId}
          type={type}
          disabled={disabled}
          className={disabled ? styles.disabledInput : undefined}
          value={props.information[key]}
          placeholder={placeholder}
          autoComplete={
            key === 'password' || key === 'confirmation'
              ? 'new-password'
              : key === 'name'
                ? 'name'
                : key === 'phone'
                  ? 'tel'
                  : 'off'
          }
          onChange={(event) => props.onChange(key, event.target.value)}
        />
      </FormField>
    );
  };

  const preference = (
    key: keyof MarketingPreferences,
    label: string,
    yes = '수신',
    no = '수신안함',
  ) => (
    <HStack className={styles.row}>
      <Typography
        variant="body4"
        className={
          key === 'sms' ? css({ w: '176px', flexShrink: '0', whiteSpace: 'pre-line' }) : undefined
        }
      >
        {label}
      </Typography>
      <Radio
        className={styles.radio}
        ariaLabel={label}
        value={props.preferences[key]}
        onValueChange={(value) => props.onPreferenceChange(key, value)}
        options={[
          { value: 'yes', label: <Typography variant="body4">{yes}</Typography> },
          { value: 'no', label: <Typography variant="body4">{no}</Typography> },
        ]}
      />
    </HStack>
  );

  return (
    <Box as="main" className={styles.page}>
      <Box className={styles.content}>
        <Typography as="h1" web="heading7" mo="heading6" className={styles.title}>
          {props.stage === 'information' ? '회원 정보' : '부가 정보'}
        </Typography>
        <form className={styles.form} onSubmit={props.onSubmit}>
          {props.stage === 'information' ? (
            <>
              {field('email', '이메일 주소', '이메일 주소를 입력해주세요.')}
              {field(
                'domain',
                '도메인',
                '도메인을 입력해주세요',
                'text',
                'registration-domain',
                props.domainChoice !== 'direct',
              )}
              <Dropdown
                ariaLabel="이메일 도메인 선택"
                label="직접입력"
                required
                value={props.domainChoice}
                onValueChange={props.onDomainChoice}
                options={[
                  { value: 'direct', label: '직접입력' },
                  { value: 'naver.com', label: 'naver.com' },
                  { value: 'gmail.com', label: 'gmail.com' },
                  { value: 'daum.net', label: 'daum.net' },
                ]}
              />
              <Button
                variant="primary"
                height="tall"
                fullWidth
                className={styles.button}
                onClick={props.onDuplicateCheck}
              >
                이메일 중복확인
              </Button>
              {props.duplicateNotice ? (
                <StatusMessage>{props.duplicateNotice}</StatusMessage>
              ) : null}
              {field('name', '이름', '이름을 입력해주세요.')}
              {field('password', '비밀번호', '비밀번호를 입력해주세요', 'password')}
              <Typography as="p" variant="body5" className={styles.hint}>
                연속적인 숫자나 생일, 전화번호 등 추측하기 쉬운 개인정보 및 아이디와 비슷한 전화번호
                사용을 피하시기 바랍니다. 비밀번호는 특수기호를 포함한 3가지 이상을 조합하여
                입력해주세요.
              </Typography>
              {field('confirmation', '비밀번호 재입력', '비밀번호를 다시 입력해주세요', 'password')}
              {field(
                'birthDate',
                '생년월일',
                '생년월일 8자리를 입력해주세요',
                'text',
                undefined,
                true,
              )}
              {field('phone', '휴대폰번호', '휴대폰번호를 입력해주세요', 'text', undefined, true)}
              <FormField variant="boxed" htmlFor="registration-address" label="주소" required>
                <TextInput
                  id="registration-address"
                  readOnly
                  value={props.information.address}
                  placeholder="주소를 입력해주세요"
                  onClick={() => props.onAddressOpen(true)}
                  aria-haspopup="dialog"
                />
              </FormField>
              {field('addressDetail', '상세주소', '상세주소를 입력해주세요')}
            </>
          ) : (
            <>
              <Box as="section">
                <Typography as="h2" variant="body3" weight="medium" className={styles.heading}>
                  마케팅 정보 수신 동의
                </Typography>
                <Stack gap="4" className={styles.preferences}>
                  {preference('email', '이메일 수신')}
                  {preference('coupon', '모바일 쿠폰북 수신')}
                  {preference('sms', '문자수신(LMS, SMS),\n카카오톡 등 전자적 전송매체')}
                </Stack>
              </Box>
              <Box as="section">
                <Typography as="h2" variant="body3" weight="medium" className={styles.heading}>
                  부가정보
                </Typography>
                <Box className={styles.married}>
                  {preference('married', '결혼유무', '기혼', '미혼')}
                </Box>
              </Box>
            </>
          )}
          {props.notice ? <StatusMessage tone="error">{props.notice}</StatusMessage> : null}
          <Grid className={styles.actions}>
            <Button
              variant="secondary"
              height="tall"
              fullWidth
              className={styles.button}
              onClick={props.onCancel}
            >
              취소
            </Button>
            <Button
              variant="primary"
              type="submit"
              height="tall"
              fullWidth
              className={styles.button}
            >
              다음
            </Button>
          </Grid>
        </form>
      </Box>
      <ModalDialog
        open={props.addressOpen}
        onOpenChange={props.onAddressOpen}
        title="주소찾기"
        closeLabel="주소찾기 닫기"
      >
        <Stack>
          <Typography as="p" variant="body4">
            주소 검색 서비스 연결 전입니다. 미리보기 주소를 직접 입력해주세요.
          </Typography>
          {field('address', '주소', '주소를 입력해주세요', 'text', 'registration-address-dialog')}
          <Button
            variant="primary"
            className={styles.button}
            onClick={() => props.onAddressOpen(false)}
          >
            확인
          </Button>
        </Stack>
      </ModalDialog>
    </Box>
  );
}
