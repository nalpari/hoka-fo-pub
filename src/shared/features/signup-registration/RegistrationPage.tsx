'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  RegistrationContent,
  type RegistrationInformation,
  type MarketingPreferences,
} from './RegistrationContent';
import { MarketingConsentSummaryModal } from './MarketingConsentSummaryModal';

const emailLocalPartPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
const emailDomainPattern =
  /^(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;
const namePattern = /^[가-힣a-zA-Z]+(?:\s[가-힣a-zA-Z]+)*$/;
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{10,12}$/;

const receivedVerificationInfo = {
  birthDate: '19830522',
  phone: '010-6698-5552',
};

export function RegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<'information' | 'additional'>(
    searchParams.get('step') === 'additional' ? 'additional' : 'information',
  );
  const [information, setInformation] = useState<RegistrationInformation>({
    name: '',
    password: '',
    confirmation: '',
    birthDate: receivedVerificationInfo.birthDate,
    phone: receivedVerificationInfo.phone,
    postalCode: '',
    address: '',
    addressDetail: '',
    email: '',
    domain: '',
    anniversary: '',
  });
  const [preferences, setPreferences] = useState<MarketingPreferences>({
    email: 'no',
    coupon: 'no',
    sms: 'no',
    married: 'no',
  });
  const [domainChoice, setDomainChoice] = useState('direct');
  const [notice, setNotice] = useState('');
  const [duplicateNotice, setDuplicateNotice] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    domain: '',
    name: '',
    password: '',
    confirmation: '',
  });
  const [checkedEmail, setCheckedEmail] = useState('');
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const change = (key: keyof RegistrationInformation, value: string) => {
    setInformation((previous) => ({ ...previous, [key]: value }));
    setNotice('');
    if (
      key === 'email' ||
      key === 'domain' ||
      key === 'name' ||
      key === 'password' ||
      key === 'confirmation'
    ) {
      setFieldErrors((previous) => ({
        ...previous,
        [key]: '',
        ...(key === 'password' ? { confirmation: '' } : {}),
      }));
    }
    if (key === 'email' || key === 'domain') {
      setCheckedEmail('');
      setDuplicateNotice('');
    }
  };

  const checkEmail = () => {
    const errors = {
      email: emailLocalPartPattern.test(information.email.trim())
        ? ''
        : '올바른 이메일 형식으로 입력해 주세요',
      domain: emailDomainPattern.test(information.domain.trim())
        ? ''
        : '올바른 도메인 형식으로 입력해 주세요',
    };
    setFieldErrors((previous) => ({ ...previous, ...errors }));
    if (errors.email || errors.domain) {
      setCheckedEmail('');
      setDuplicateNotice('');
      return;
    }
    setCheckedEmail(`${information.email.trim()}@${information.domain.trim()}`);
    setDuplicateNotice(
      '이메일 주소 형식을 확인했습니다. 실제 중복 여부는 서비스 연결 후 확인됩니다.',
    );
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stage === 'additional') {
      setSummaryOpen(true);
      return;
    }
    const emailError = emailLocalPartPattern.test(information.email.trim())
      ? ''
      : '올바른 이메일 형식으로 입력해 주세요';
    const domainError = emailDomainPattern.test(information.domain.trim())
      ? ''
      : '올바른 도메인 형식으로 입력해 주세요';
    const errors = {
      email: emailError,
      domain: domainError,
      name: namePattern.test(information.name.trim()) ? '' : '올바른 이름을 입력해주세요',
      password: passwordPattern.test(information.password)
        ? ''
        : '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요',
      confirmation:
        information.confirmation && information.password === information.confirmation
          ? ''
          : '비밀번호가 일치하지 않습니다',
    };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) {
      setCheckedEmail('');
      setNotice('');
      return;
    }
    if (
      checkedEmail !== `${information.email.trim()}@${information.domain.trim()}` ||
      !checkedEmail
    ) {
      setNotice('이메일 중복확인 버튼으로 입력 형식을 확인해주세요.');
      return;
    }
    if (
      !information.postalCode.trim() ||
      !information.address.trim() ||
      !information.addressDetail.trim() ||
      !emailLocalPartPattern.test(information.email.trim()) ||
      !emailDomainPattern.test(information.domain.trim())
    ) {
      setNotice('필수 회원정보와 올바른 이메일 주소를 입력해주세요.');
      return;
    }
    setNotice('');
    setStage('additional');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <RegistrationContent
        stage={stage}
        information={information}
        preferences={preferences}
        domainChoice={domainChoice}
        notice={notice}
        duplicateNotice={duplicateNotice}
        addressOpen={addressOpen}
        fieldErrors={fieldErrors}
        onChange={change}
        onPreferenceChange={(key, value) =>
          setPreferences((previous) => ({ ...previous, [key]: value }))
        }
        onDomainChoice={(value) => {
          setDomainChoice(value);
          change('domain', value === 'direct' ? '' : value);
        }}
        onDuplicateCheck={checkEmail}
        onAddressOpen={setAddressOpen}
        onSubmit={submit}
        onCancel={() => {
          if (stage === 'additional') {
            setStage('information');
            setNotice('');
          } else router.push('/signup/terms');
        }}
      />
      {summaryOpen ? (
        <MarketingConsentSummaryModal
          preferences={preferences}
          onOpenChange={setSummaryOpen}
          onConfirm={() => router.push('/signup/complete')}
        />
      ) : null}
    </>
  );
}
