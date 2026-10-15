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
  detail: css({ '--button-padding-x': '0px', flexShrink: '0' }),
  carrier: css({ '& > button': { justifySelf: 'end' } }),
  carrierSection: css({ borderBottom: '1px solid var(--color-black-20)' }),
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

export type PhoneVerificationErrors = Partial<Record<keyof PhoneInformation, string>>;

type Props = {
  title?: string;
  description?: string;
  information: PhoneInformation;
  agreements: boolean[];
  showAgreementErrors?: boolean;
  requested: boolean;
  code: string;
  secondsLeft: number;
  resendWait: number;
  notice: string;
  fieldErrors?: PhoneVerificationErrors;
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
  const {
    information,
    agreements,
    showAgreementErrors = false,
    requested,
    code,
    secondsLeft,
    resendWait,
    notice,
    detail,
  } = props;

  const textField = (
    key: keyof PhoneInformation,
    label: string,
    placeholder: string,
    maxLength?: number,
  ) => (
    <FormField
      variant="boxed"
      htmlFor={`phone-${key}`}
      label={label}
      required
      error={props.fieldErrors?.[key]}
    >
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
      error={props.fieldErrors?.[key]}
      name={`phone-${key}`}
      value={information[key]}
      options={options.map((option) => ({ value: option, label: option }))}
      onValueChange={(value) => props.onInformationChange(key, value)}
    />
  );

  return (
    <Box as="main" pt="24" px="5" pb="20" _mobile={{ pt: '10', px: '4', pb: '8' }}>
      <Box maxW="568px" mx="auto">
        <Box mb="8">
          <Typography as="h1" web="heading7" mo="heading5">
            {props.title ?? '휴대폰 인증'}
          </Typography>
        </Box>
        {props.description ? (
          <Box mt="-6" mb="6">
            <Typography as="p" variant="body5" tone="subtle">
              {props.description}
            </Typography>
          </Box>
        ) : null}
        <Stack
          as="section"
          gap="4"
          pb="6"
          borderBottom="1px solid var(--color-black-20)"
          aria-labelledby="phone-terms-title"
        >
          <HStack justify="space-between" mb="2">
            <Typography as="h2" id="phone-terms-title" variant="headingKr7">
              휴대폰 인증약관
            </Typography>
            <Terms checked={agreements.every(Boolean)} onCheckedChange={props.onAllAgree}>
              <Typography variant="body4">모두동의</Typography>
            </Terms>
          </HStack>
          {verificationTerms.map((term, index) => (
            <HStack key={term} justify="space-between" gap="2" alignItems="center">
              <Terms
                checked={agreements[index]}
                onCheckedChange={(checked) => props.onAgreementChange(index, checked)}
                required
                invalid={showAgreementErrors && !agreements[index]}
              >
                <Typography variant="body4">(필수) {term}</Typography>
              </Terms>
              <Button
                variant="link"
                size="md"
                className={styles.detail}
                onClick={() => props.onDetail(term)}
              >
                자세히 보기
              </Button>
            </HStack>
          ))}
        </Stack>
        <Box my="6">
          <Typography as="h2" variant="headingKr9">
            인증 정보
          </Typography>
        </Box>
        <form onSubmit={props.onConfirm}>
          <Stack gap="4">
            {textField('name', '이름', '이름을 입력해 주세요')}
            {textField('birthDate', '생년월일', '생년월일 8자리를 입력해 주세요', 8)}
            <Grid columns={2} gap="2">
              {selectField('nationality', '국적', ['내국인', '외국인'])}
              {selectField('gender', '성별', ['남자', '여자'])}
            </Grid>
            <Grid
              gridTemplateColumns="minmax(0, 2fr) minmax(0, 1fr)"
              gap="3"
              alignItems="center"
              className={styles.carrier}
            >
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
                size="md"
                className={styles.detail}
                onClick={() => props.onDetail('알뜰폰 사업자')}
              >
                알뜰폰 사업자 보기
              </Button>
            </Grid>
            {textField('phone', '휴대폰 번호', '휴대폰 번호를 입력해 주세요', 13)}
            <Button
              variant="primary"
              size="tall"
              fullWidth
              disabled={requested && resendWait > 0}
              onClick={props.onRequest}
            >
              {requested ? '인증번호 재요청' : '인증번호 요청'}
            </Button>
            {requested ? (
              <>
                <Box mt="2">
                  <FormField variant="boxed" htmlFor="phone-code" label="인증번호" required>
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
                </Box>
                <Box mt="-2">
                  <Typography as="p" variant="body5" tone="error">
                    남은 시간{' '}
                    {Math.floor(secondsLeft / 60)
                      .toString()
                      .padStart(2, '0')}
                    :{(secondsLeft % 60).toString().padStart(2, '0')}초
                  </Typography>
                </Box>
                <Box mb="2">
                  <Typography as="p" variant="body5">
                    입력하신 휴대폰번호로 전송된 인증번호를 입력해주세요. 3분 이내에 인증번호
                    6자리를 입력하셔야 하며, 인증번호가 오지 않을 경우 3분 후 재요청을 눌러주세요.
                  </Typography>
                </Box>
                <Button variant="primary" size="tall" type="submit" fullWidth>
                  인증번호 확인
                </Button>
              </>
            ) : null}
            {notice ? <StatusMessage tone="info">{notice}</StatusMessage> : null}
          </Stack>
        </form>
        <Box mt="4">
          <Typography as="p" variant="body4" tone="tertiary">
            * 인증문의 (주)KCB고객센터 02-708-1000
          </Typography>
        </Box>
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
          <Stack gap="4">
            {mvnoCarriers.map((carrier, index) => (
              <Stack
                key={carrier.title}
                gap="3"
                pb={index === mvnoCarriers.length - 1 ? '0' : '4'}
                className={index === mvnoCarriers.length - 1 ? undefined : styles.carrierSection}
              >
                <Typography as="h2" variant="body3">
                  {carrier.title}
                </Typography>
                <Typography as="p" variant="body4">
                  {carrier.names}
                </Typography>
              </Stack>
            ))}
            <Button variant="primary" fullWidth onClick={() => props.onDetail(null)}>
              확인
            </Button>
          </Stack>
        ) : null}
      </ModalDialog>
    </Box>
  );
}
