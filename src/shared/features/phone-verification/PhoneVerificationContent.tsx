import type { FormEvent } from 'react';
import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Terms } from '@/shared/components/molecules/Terms/Terms';
import { Dropdown } from '@/shared/components/atoms/Dropdown/Dropdown';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const styles = {
  page: css({ pt: '24', px: '5', pb: '20', _mobile: { pt: '10', px: '4', pb: '8' } }),
  content: css({ maxW: '568px', mx: 'auto' }),
  title: css({ m: '0', mb: '8' }),
  terms: css({ gap: '2', pb: '6', borderBottom: '1px solid var(--color-black-20)' }),
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
  button: css({ w: '100%' }),
  countdown: css({ m: '0', mt: '-2', color: 'var(--color-red-80)' }),
  text: css({ m: '0' }),
  intro: css({ m: '-6 0 6', color: 'var(--color-black-60)' }),
  help: css({ m: '0', mt: '4' }),
  modal: css({ p: '4', _mobile: { p: '4' } }),
  carrierList: css({ gap: '4' }),
  carrierSection: css({ gap: '3', pb: '4', borderBottom: '1px solid var(--color-black-20)' }),
  carrierSectionLast: css({ gap: '3' }),
  carrierTitle: css({ m: '0' }),
  carrierNames: css({ m: '0', lineHeight: '1.3' }),
  modalButton: css({
    '--button-height': '40px!',
    '--button-radius': '999px',
    '--button-border-width': '0px!',
  }),
};

const mvnoCarriers = [
  {
    title: 'SKT 알뜰폰',
    names:
      'KCT, SK텔링크, KDM링크, 이마트, 스마텔, 아이즈비전, 에스원, 유니컴즈, 인스코비, 프리텔레콤, 큰사람 컴퓨터, 티브로드, 하나방송, 제주방송, 남인천방송, 서경방송, 광주방송, 금강방송, JCN울산',
  },
  {
    title: 'KT 알뜰폰',
    names:
      '홈플러스, 온세텔레콤, CJ헬로비전, 위너스텔, 에버그린모바일, S로밍, 에넥스텔레콤, KT파워텔, 프리텔레콤, 씨엔커뮤니케이션, 몬스터텔레콤, 머천드코리아, 인스코비, 에스원, 에이에스엔코리아, 세종텔레콤, KT텔레캅, 이지모바일, KT M모바일, 유니컴즈, 엔알컴퍼니, 아이즈비전, 제이씨티, 정성모바일',
  },
  {
    title: 'LG U+ 알뜰폰',
    names:
      '미디어로그, 인스코비, 머천드코리아, 엠티텔레콤, 홈플러스, 이마트, 리더스텔레콤, 씨엔엠브이엔오, 비엔에스솔루션, 인티파크, 에프아이텔, 자티전자, 서경방송, JCN울산, 푸른방송, 남인천방송, 금강방송, 제주방송, 와이엘랜드',
  },
] as const;

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
  title?: string;
  description?: string;
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
    <FormField variant="boxed" htmlFor={`phone-${key}`} label={label} required>
      <TextInput
        id={`phone-${key}`}
        value={information[key]}
        placeholder={placeholder}
        maxLength={maxLength}
        type={key === 'phone' ? 'tel' : 'text'}
        inputMode={key === 'name' ? 'text' : 'numeric'}
        autoComplete={key === 'name' ? 'name' : key === 'phone' ? 'tel-national' : 'off'}
        onChange={(event) => props.onInformationChange(key, event.target.value)}
      />
    </FormField>
  );

  const selectField = (key: keyof PhoneInformation, label: string, options: string[]) => (
    <Dropdown
      ariaLabel={label}
      label={label}
      required
      name={`phone-${key}`}
      value={information[key]}
      options={options.map((option) => ({ value: option, label: option }))}
      onValueChange={(value) => props.onInformationChange(key, value)}
    />
  );

  return (
    <Box as="main" className={styles.page}>
      <Box className={styles.content}>
        <Typography as="h1" variant="authTitle" className={styles.title}>
          {props.title ?? '휴대폰 인증'}
        </Typography>
        {props.description ? (
          <Typography as="p" variant="authCaption" className={styles.intro}>
            {props.description}
          </Typography>
        ) : null}
        <Stack as="section" className={styles.terms} aria-labelledby="phone-terms-title">
          <HStack className={styles.termsTitle}>
            <Typography as="h2" id="phone-terms-title" variant="authBody" className={styles.text}>
              휴대폰 인증약관
            </Typography>
            <Terms checked={agreements.every(Boolean)} onCheckedChange={props.onAllAgree}>
              <Typography variant="bodyKr5">모두동의</Typography>
            </Terms>
          </HStack>
          {verificationTerms.map((term, index) => (
            <HStack key={term} className={styles.termRow}>
              <Terms
                checked={agreements[index]}
                onCheckedChange={(checked) => props.onAgreementChange(index, checked)}
                required
              >
                <Typography variant="bodyKr5">(필수) {term}</Typography>
              </Terms>
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
              onClick={() => props.onDetail('알뜰폰 사업자')}
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
                variant="boxed"
                htmlFor="phone-code"
                label="인증번호"
                required
                className={css({ mt: '2' })}
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
        size="md"
        mobilePresentation="fullscreen"
      >
        {detail === '알뜰폰 사업자' ? (
          <Stack className={[styles.modal, styles.carrierList].join(' ')}>
            {mvnoCarriers.map((carrier, index) => (
              <Stack
                key={carrier.title}
                className={
                  index === mvnoCarriers.length - 1
                    ? styles.carrierSectionLast
                    : styles.carrierSection
                }
              >
                <Typography as="h2" variant="authBody" className={styles.carrierTitle}>
                  {carrier.title}
                </Typography>
                <Typography as="p" variant="authSmall" className={styles.carrierNames}>
                  {carrier.names}
                </Typography>
              </Stack>
            ))}
            <Button
              variant="primary"
              fullWidth
              className={styles.modalButton}
              onClick={() => props.onDetail(null)}
            >
              확인
            </Button>
          </Stack>
        ) : null}
      </ModalDialog>
    </Box>
  );
}
