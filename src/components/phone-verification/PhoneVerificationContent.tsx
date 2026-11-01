import { useContext, useState } from 'react';
import { PhoneVerificationContext } from '@/context/PhoneVerificationContext';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { VerificationCountdown } from '@/components/common/molecules/FormFields/VerificationCountdown';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import {
  type PhoneInformation,
  type PhoneVerificationContentProps,
} from '@/components/phone-verification/phone-verification.types';

const styles = { carrierSection: css({ borderBottom: '1px solid var(--color-black-20)' }) };

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

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

function PhoneVerificationDetailDialog({ open, onOpenChange }: Props) {
  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title="알뜰폰 사업자"
      closeLabel="안내 닫기"
      size="md"
      mobilePresentation="fullscreen"
      actions={{ kind: 'single', onConfirm: () => onOpenChange(false) }}
    >
      <Stack gap="4">
        {mvnoCarriers.map((carrier, index) => (
          <ContentHeader
            key={carrier.title}
            gap="3"
            pb={index === mvnoCarriers.length - 1 ? '0' : '4'}
            className={index === mvnoCarriers.length - 1 ? undefined : styles.carrierSection}
            titleAs="h2"
            title={<>{carrier.title}</>}
            titleProps={{ variant: 'body3' }}
            description={<>{carrier.names}</>}
            descriptionProps={{ variant: 'body4' }}
          />
        ))}
      </Stack>
    </ModalDialog>
  );
}

type PhoneVerificationDialogsProps = Pick<PhoneVerificationContentProps, 'detail' | 'onDetail'>;

function PhoneVerificationDialogs({ detail, onDetail }: PhoneVerificationDialogsProps) {
  const service = useContext(PhoneVerificationContext);
  const [previous, setPrevious] = useState(false);
  const [version, setVersion] = useState('');
  const term = service?.terms?.find((item) => item.title === detail);
  const selected = term?.previousVersions?.find((item) => item.id === version);

  const onOpenChange = (open: boolean) => {
    if (!open) onDetail(null);
  };

  if (detail === '알뜰폰 사업자') {
    return <PhoneVerificationDetailDialog open onOpenChange={onOpenChange} />;
  }

  return (
    <ModalDialog
      open={detail !== null}
      onOpenChange={onOpenChange}
      title={detail ?? ''}
      closeLabel="안내 닫기"
      size="md"
      mobilePresentation="fullscreen"
      actions={{ kind: 'single', onConfirm: () => onDetail(null) }}
    >
      <Stack gap="6">
        <Typography variant="heading7">{detail}</Typography>
        <Box minH="240px" overflowY="auto" maxH="50vh" whiteSpace="pre-line" p="4" bg="black.10">
          {selected?.body ?? term?.body ?? (
            <Typography variant="body4">
              본인확인 서비스 이용을 위한 약관입니다. 개인정보의 수집 및 이용, 고유식별정보 처리,
              통신사 이용 및 본인확인 서비스에 관한 동의 내용을 확인해 주세요. 이 영역은 화면
              미리보기용 본문이며 실제 약관 전문은 인증 서비스 제공자가 전달한 내용으로 표시합니다.
            </Typography>
          )}
        </Box>
        <Button variant="link" onClick={() => setPrevious(!previous)}>
          이전 약관 보기
        </Button>
        {previous ? (
          <Stack gap="2">
            {term?.previousVersions?.length ? (
              term.previousVersions.map((item) => (
                <Button key={item.id} variant="secondary" onClick={() => setVersion(item.id)}>
                  {item.label}
                </Button>
              ))
            ) : (
              <Typography variant="body5">이전 약관이 없습니다.</Typography>
            )}
          </Stack>
        ) : null}
      </Stack>
    </ModalDialog>
  );
}

const PhoneVerificationAgreementsStyles = {
  detail: css({ '--button-padding-x': '0px', flexShrink: '0' }),
};

const verificationTerms = [
  '개인정보 이용약관 동의',
  '고유식별 정보 처리동의',
  '통신사 이용약관 동의',
  '휴대폰 본인확인 이용약관 동의',
] as const;

type PhoneVerificationAgreementsProps = Pick<
  PhoneVerificationContentProps,
  | 'agreements'
  | 'fixedAgreementErrors'
  | 'showAgreementErrors'
  | 'onAllAgree'
  | 'onAgreementChange'
  | 'onDetail'
>;

function PhoneVerificationAgreements(props: PhoneVerificationAgreementsProps) {
  const { agreements, showAgreementErrors = false } = props;
  const agreementRows = verificationTerms.map((term, index) => (
    <HStack key={term} justify="space-between" gap="4" alignItems="center">
      <Checkbox
        variant="consent"
        checked={agreements[index]}
        onCheckedChange={(checked) => props.onAgreementChange(index, checked)}
        required
        invalid={showAgreementErrors && (props.fixedAgreementErrors || !agreements[index])}
        label={
          <>
            <Typography variant="body4">(필수) {term}</Typography>
          </>
        }
      />
      <Button
        variant="link"
        size="md"
        className={PhoneVerificationAgreementsStyles.detail}
        onClick={() => props.onDetail(term)}
      >
        자세히 보기
      </Button>
    </HStack>
  ));
  const errorMessage = showAgreementErrors ? (
    <StatusMessage id="phone-terms-error" tone="error">
      필수 약관에 모두 동의해 주세요.
    </StatusMessage>
  ) : null;
  return (
    <ContentSection
      as="section"
      gap="6"
      pb="6"
      borderBottom="1px solid var(--color-black-20)"
      aria-labelledby="phone-terms-title"
      aria-describedby={showAgreementErrors ? 'phone-terms-error' : undefined}
      title="휴대폰 인증약관"
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        css: css.raw({ pb: '4', borderBottom: '1px solid var(--color-black-100)' }),
        titleProps: { id: 'phone-terms-title', web: 'heading10', mo: 'heading7' },
        action: (
          <Checkbox
            variant="consent"
            checked={agreements.every(Boolean)}
            onCheckedChange={props.onAllAgree}
            label={
              <>
                <Typography variant="body4">모두동의</Typography>
              </>
            }
          />
        ),
      }}
    >
      <Stack gap="4">
        {agreementRows}
        {errorMessage}
      </Stack>
    </ContentSection>
  );
}

const PhoneInformationFieldsStyles = {
  detail: css({ '--button-padding-x': '0px', flexShrink: '0' }),
};

type PhoneInformationFieldsProps = Pick<
  PhoneVerificationContentProps,
  'information' | 'fieldErrors' | 'onInformationChange' | 'onDetail'
>;

function PhoneInformationFields(props: PhoneInformationFieldsProps) {
  const { information } = props;
  const textField = (
    key: keyof PhoneInformation,
    label: string,
    placeholder: string,
    maxLength?: number,
  ) => {
    return (
      <TextFormField
        variant="boxed"
        id={`phone-${key}`}
        label={label}
        required
        error={props.fieldErrors?.[key]}
        inputProps={{
          value: information[key],
          placeholder: placeholder,
          maxLength: maxLength,
          type: key === 'phone' ? 'tel' : 'text',
          inputMode: key === 'name' ? 'text' : 'numeric',
          autoComplete: key === 'name' ? 'name' : key === 'phone' ? 'tel-national' : 'off',
          onChange: (event) => props.onInformationChange(key, event.target.value),
        }}
      />
    );
  };

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
    <>
      {textField('name', '이름', '이름을 입력해 주세요')}
      {textField('birthDate', '생년월일', '생년월일 8자리를 입력해 주세요', 8)}
      <Grid columns={2} gap="2">
        {selectField('nationality', '국적', ['내국인', '외국인'])}
        {selectField('gender', '성별', ['남자', '여자'])}
      </Grid>
      <Grid gridTemplateColumns="minmax(0, 2fr) minmax(0, 1fr)" gap="3" alignItems="center">
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
          className={[PhoneInformationFieldsStyles.detail, css({ justifySelf: 'end' })].join(' ')}
          onClick={() => props.onDetail('알뜰폰 사업자')}
        >
          알뜰폰 사업자 보기
        </Button>
      </Grid>
      {textField('phone', '휴대폰 번호', '휴대폰 번호를 입력해 주세요', 13)}
    </>
  );
}

type VerificationCodeFieldsProps = Pick<
  PhoneVerificationContentProps,
  'code' | 'codeError' | 'secondsLeft' | 'onCodeChange'
>;

function VerificationCodeFields(props: VerificationCodeFieldsProps) {
  const { code, secondsLeft } = props;
  return (
    <>
      <Box mt="2">
        <TextFormField
          variant="boxed"
          id="phone-code"
          label="인증번호"
          required
          error={props.codeError}
          inputProps={{
            inputMode: 'numeric',
            autoComplete: 'one-time-code',
            maxLength: 6,
            placeholder: '인증번호 6자리를 입력해 주세요',
            value: code,
            onChange: (event) => props.onCodeChange(event.target.value),
          }}
        />
      </Box>
      <Box mt="-2">
        <VerificationCountdown secondsLeft={secondsLeft} />
      </Box>
      <Box mb="2">
        <Typography as="p" variant="body5">
          입력하신 휴대폰번호로 전송된 인증번호를 입력해주세요. 3분 이내에 인증번호 6자리를
          입력하셔야 하며, 인증번호가 오지 않을 경우 3분 후 재요청을 눌러주세요.
        </Typography>
      </Box>
      <Button variant="primary" type="submit" fullWidth>
        인증번호 확인
      </Button>
    </>
  );
}

type PhoneVerificationFormProps = Pick<
  PhoneVerificationContentProps,
  | 'pending'
  | 'information'
  | 'fieldErrors'
  | 'onInformationChange'
  | 'onDetail'
  | 'onConfirm'
  | 'onRequest'
  | 'requested'
  | 'resendWait'
  | 'code'
  | 'codeError'
  | 'secondsLeft'
  | 'onCodeChange'
  | 'notice'
  | 'noticeTone'
>;

function PhoneVerificationForm(props: PhoneVerificationFormProps) {
  return (
    <form noValidate onSubmit={props.onConfirm} aria-busy={props.pending}>
      <fieldset disabled={props.pending}>
        <Stack gap="4">
          <PhoneInformationFields
            information={props.information}
            fieldErrors={props.fieldErrors}
            onInformationChange={props.onInformationChange}
            onDetail={props.onDetail}
          />
          <Box pt="2">
            <Button
              variant="primary"
              fullWidth
              disabled={props.requested && props.resendWait > 0}
              onClick={props.onRequest}
            >
              {props.requested ? '인증번호 재요청' : '인증번호 요청'}
            </Button>
          </Box>
          {props.requested ? (
            <VerificationCodeFields
              code={props.code}
              codeError={props.codeError}
              secondsLeft={props.secondsLeft}
              onCodeChange={props.onCodeChange}
            />
          ) : null}
          {props.notice ? (
            <StatusMessage tone={props.noticeTone ?? 'info'}>{props.notice}</StatusMessage>
          ) : null}
          {props.pending && <Typography role="status">인증 요청을 처리하고 있습니다.</Typography>}
        </Stack>
      </fieldset>
    </form>
  );
}

export type {
  PhoneInformation,
  PhoneVerificationErrors,
} from '@/components/phone-verification/phone-verification.types';

/** 휴대폰 인증 입력과 약관·인증번호 영역을 구성합니다 (Displays the phone verification content composition). */
export function PhoneVerificationContent(props: PhoneVerificationContentProps) {
  return (
    <AccountPageLayout
      title={props.title ?? '휴대폰 인증'}
      description={props.description}
      contentWidth="500px"
      outsideContent={
        <>
          <PhoneVerificationDialogs detail={props.detail} onDetail={props.onDetail} />
          <ModalDialog
            open={props.expired ?? false}
            onOpenChange={(open) => {
              if (!open) props.onExpiredClose?.();
            }}
            title="인증시간 만료"
            closeLabel="인증시간 만료 안내 닫기"
            size="sm"
            actions={{ kind: 'single', onConfirm: () => props.onExpiredClose?.() }}
          >
            <Typography variant="body3">
              인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.
            </Typography>
          </ModalDialog>
        </>
      }
    >
      <fieldset disabled={props.pending}>
        <Stack gap="6">
          <PhoneVerificationAgreements
            agreements={props.agreements}
            fixedAgreementErrors={props.fixedAgreementErrors}
            showAgreementErrors={props.showAgreementErrors}
            onAllAgree={props.onAllAgree}
            onAgreementChange={props.onAgreementChange}
            onDetail={props.onDetail}
          />
          <ContentSection
            gap="6"
            title="인증 정보"
            headerProps={{ titleAs: 'h2', titleProps: { variant: 'headingKr10' } }}
          >
            <PhoneVerificationForm {...props} />
          </ContentSection>
        </Stack>
      </fieldset>
      <Box mt="4">
        <Typography as="p" variant="body4" tone="tertiary">
          * 인증문의 (주)KCB고객센터 02-708-1000
        </Typography>
      </Box>
    </AccountPageLayout>
  );
}
