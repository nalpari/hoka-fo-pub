import type { FormEvent } from 'react';
import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { Select } from '@/shared/components/atoms/Select/Select';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const styles = {
  page: css({ pt: '24', px: '5', pb: '20', _mobile: { pt: '10', px: '4', pb: '8' } }),
  content: css({ maxW: '420px', mx: 'auto' }),
  title: css({ m: '0', mb: '8' }),
  terms: css({ gap: '2', pb: '6', borderBottom: '1px solid #e9eaeb' }),
  termsTitle: css({ justifyContent: 'space-between', mb: '4' }),
  termRow: css({ justifyContent: 'space-between', gap: '2', alignItems: 'center' }),
  detail: css({ '--button-padding-x': '0px', '--button-height': '24px!', flexShrink: '0' }),
  heading: css({ m: '0', mt: '6', mb: '6', fontWeight: 'semibold' }),
  fields: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  pair: css({ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '2' }),
  carrier: css({
    gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
    gap: '3',
    alignItems: 'center',
    '& > button': { justifySelf: 'end' },
  }),
  button: css({
    '--button-radius': '999px',
    '--button-height': '48px!',
    '--button-border-width': '0px!',
  }),
  countdown: css({ m: '0', mt: '-2', color: '#E10F00' }),
  text: css({ m: '0' }),
  help: css({ m: '0', mt: '4' }),
  modal: css({ p: '6' }),
};

export const verificationTerms = [
  '개인정보 이용약관 동의',
  '고유식별 정보 처리동의',
  '통신사 이용약관 동의',
  '휴대폰 본인확인 이용약관 동의',
] as const;

export type PhoneInformation = {
  name: string;
  birthDate: string;
  nationality: string;
  gender: string;
  carrier: string;
  phone: string;
};

type Props = {
  information: PhoneInformation;
  agreements: boolean[];
  requested: boolean;
  code: string;
  secondsLeft: number;
  resendWait: number;
  notice: string;
  detail: string | null;
  onInformationChange: (key: keyof PhoneInformation, value: string) => void;
  onAgreementChange: (index: number, checked: boolean) => void;
  onAllAgree: (checked: boolean) => void;
  onCodeChange: (value: string) => void;
  onRequest: () => void;
  onConfirm: (event: FormEvent<HTMLFormElement>) => void;
  onDetail: (title: string | null) => void;
};

export function PhoneVerificationContent(props: Props) {
  const { information, agreements, requested, code, secondsLeft, resendWait, notice, detail } =
    props;

  const textField = (
    key: keyof PhoneInformation,
    label: string,
    placeholder: string,
    maxLength?: number,
  ) => (
    <FormField
      htmlFor={`phone-${key}`}
      label={<Typography variant="authCaption">* {label}</Typography>}
      variant="boxed"
    >
      <TextInput
        id={`phone-${key}`}
        value={information[key]}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={key === 'name' ? 'text' : 'numeric'}
        autoComplete={key === 'name' ? 'name' : key === 'phone' ? 'tel-national' : 'off'}
        onChange={(event) => props.onInformationChange(key, event.target.value)}
      />
    </FormField>
  );

  const selectField = (key: keyof PhoneInformation, label: string, options: string[]) => (
    <FormField
      htmlFor={`phone-${key}`}
      label={<Typography variant="authCaption">* {label}</Typography>}
      variant="boxed"
    >
      <Select
        id={`phone-${key}`}
        value={information[key]}
        onChange={(event) => props.onInformationChange(key, event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Select>
    </FormField>
  );

  return (
    <Box as="main" className={styles.page}>
      <Box className={styles.content}>
        <Typography as="h1" variant="authTitle" className={styles.title}>
          휴대폰 인증
        </Typography>
        <Stack as="section" className={styles.terms} aria-labelledby="phone-terms-title">
          <HStack className={styles.termsTitle}>
            <Typography as="h2" id="phone-terms-title" variant="authBody" className={styles.text}>
              휴대폰 인증약관
            </Typography>
            <Checkbox
              label={<Typography variant="authSmall">모두동의</Typography>}
              checked={agreements.every(Boolean)}
              onCheckedChange={props.onAllAgree}
            />
          </HStack>
          {verificationTerms.map((term, index) => (
            <HStack key={term} className={styles.termRow}>
              <Checkbox
                label={<Typography variant="authSmall">(필수) {term}</Typography>}
                checked={agreements[index]}
                onCheckedChange={(checked) => props.onAgreementChange(index, checked)}
              />
              <Button
                variant="link"
                size="sm"
                className={styles.detail}
                onClick={() => props.onDetail(term)}
              >
                <Typography variant="authCaption">자세히 보기</Typography>
              </Button>
            </HStack>
          ))}
        </Stack>
        <Typography as="h2" variant="authBody" className={styles.heading}>
          인증 정보
        </Typography>
        <form className={styles.fields} onSubmit={props.onConfirm}>
          {textField('name', '이름', '이름을 입력해 주세요')}
          {textField('birthDate', '생년월일', '생년월일 8자리를 입력해 주세요', 8)}
          <Grid className={styles.pair}>
            {selectField('nationality', '국적', ['내국인', '외국인'])}
            {selectField('gender', '성별', ['남자', '여자'])}
          </Grid>
          <Grid className={styles.carrier}>
            {selectField('carrier', '통신사', [
              'SKT',
              'KT',
              'LG U+',
              'SKT 알뜰폰',
              'KT 알뜰폰',
              'LG U+ 알뜰폰',
            ])}
            <Button
              variant="link"
              className={styles.detail}
              onClick={() => props.onDetail('알뜰폰 사업자 안내')}
            >
              <Typography variant="authCaption">알뜰폰 사업자 보기</Typography>
            </Button>
          </Grid>
          {textField('phone', '휴대폰 번호', '휴대폰 번호를 입력해 주세요', 13)}
          <Button
            variant="primary"
            fullWidth
            className={styles.button}
            disabled={requested && resendWait > 0}
            onClick={props.onRequest}
          >
            {requested ? '인증번호 재요청' : '인증번호 요청'}
          </Button>
          {requested ? (
            <>
              <FormField
                htmlFor="phone-code"
                className={css({ mt: '2' })}
                label={<Typography variant="authCaption">* 인증번호</Typography>}
                variant="boxed"
              >
                <TextInput
                  id="phone-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="인증번호 6자리를 입력해 주세요"
                  value={code}
                  onChange={(event) => props.onCodeChange(event.target.value)}
                />
              </FormField>
              <Typography as="p" variant="authCaption" className={styles.countdown}>
                남은 시간{' '}
                {Math.floor(secondsLeft / 60)
                  .toString()
                  .padStart(2, '0')}
                :{(secondsLeft % 60).toString().padStart(2, '0')}초
              </Typography>
              <Typography as="p" variant="authCaption" className={styles.text}>
                입력하신 휴대폰번호로 전송된 인증번호를 입력해주세요. 3분 이내에 인증번호 6자리를
                입력하셔야 하며, 인증번호가 오지 않을 경우 3분 후 재요청을 눌러주세요.
              </Typography>
              <Button
                variant="primary"
                type="submit"
                fullWidth
                className={[styles.button, css({ mt: '2' })].join(' ')}
              >
                인증번호 확인
              </Button>
            </>
          ) : null}
          {notice ? <StatusMessage tone="info">{notice}</StatusMessage> : null}
        </form>
        <Typography as="p" variant="authSmall" tone="subtle" className={styles.help}>
          * 인증문의 (주)KCB고객센터 02-708-1000
        </Typography>
      </Box>
      <ModalDialog
        open={detail !== null}
        onOpenChange={(open) => {
          if (!open) props.onDetail(null);
        }}
        title={detail ?? ''}
        closeLabel="안내 닫기"
      >
        <Box className={styles.modal}>
          <Typography as="p" variant="authSmall">
            {detail === '알뜰폰 사업자 안내'
              ? '사용 중인 알뜰폰의 통신망에 따라 SKT, KT 또는 LG U+ 알뜰폰을 선택해 주세요.'
              : '인증 제공사의 실제 약관 내용은 서비스 연결 시 제공됩니다. 현재는 화면 미리보기입니다.'}
          </Typography>
        </Box>
      </ModalDialog>
    </Box>
  );
}
