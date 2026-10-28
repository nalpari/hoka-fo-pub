'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  RegistrationContent,
  type RegistrationInformation,
  type MarketingPreferences,
} from '@/components/features/signup-registration/RegistrationContent';
import { MarketingConsentSummaryModal } from '@/components/features/signup-registration/MarketingConsentSummaryModal';
import { isValidName, isValidRegistrationId } from '@/lib/validation';
import { isValidPassword, passwordRequirementsMessage } from '@/lib/passwordValidation';
import {
  isValidEmailLocalPart,
  isValidEmailDomain,
  emailFormatErrorMessage,
  emailDomainErrorMessage,
} from '@/lib/emailValidation';

const receivedVerificationInfo = {
  birthDate: '19830522',
  phone: '010-6698-5552',
};

const registrationIdErrorMessage =
  '아이디는 영어소문자로 시작해야 하며, 영어,숫자,_(언더바)를 사용하여 5~20자로 구성할 수 있습니다.';

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<'information' | 'additional'>(
    searchParams.get('step') === 'additional' ? 'additional' : 'information',
  );
  const [information, setInformation] = useState<RegistrationInformation>({
    id: '',
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
    sms: 'no',
    kakao: 'no',
  });
  const [domainChoice, setDomainChoice] = useState('direct');
  const [notice, setNotice] = useState('');
  const [duplicateNotice, setDuplicateNotice] = useState('');
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof RegistrationInformation, string>> & {
      id: string;
      email: string;
      domain: string;
      name: string;
      password: string;
      confirmation: string;
    }
  >({
    id: '',
    email: '',
    domain: '',
    name: '',
    password: '',
    confirmation: '',
  });
  const [checkedId, setCheckedId] = useState('');
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const change = (key: keyof RegistrationInformation, value: string) => {
    setInformation((previous) => ({ ...previous, [key]: value }));
    setNotice('');
    setFieldErrors((previous) => ({
      ...previous,
      [key]: '',
      ...(key === 'password' ? { confirmation: '' } : {}),
    }));
    if (key === 'id') {
      setCheckedId('');
      setDuplicateNotice('');
    }
  };

  const checkId = () => {
    const idError = isValidRegistrationId(information.id) ? '' : registrationIdErrorMessage;
    setFieldErrors((previous) => ({ ...previous, id: idError }));
    if (idError) {
      setCheckedId('');
      setDuplicateNotice('');
      return;
    }
    setCheckedId(information.id);
    setDuplicateNotice('아이디 형식을 확인했습니다. 실제 중복 여부는 서비스 연결 후 확인됩니다.');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stage === 'additional') {
      setSummaryOpen(true);
      return;
    }
    const idError = isValidRegistrationId(information.id) ? '' : registrationIdErrorMessage;
    const emailError = isValidEmailLocalPart(information.email.trim())
      ? ''
      : emailFormatErrorMessage;
    const domainError = isValidEmailDomain(information.domain.trim())
      ? ''
      : emailDomainErrorMessage;
    const errors = {
      id: idError,
      email: emailError,
      postalCode: information.postalCode.trim() ? '' : '우편번호 찾기로 우편번호를 입력해주세요.',
      address: information.address.trim() ? '' : '우편번호 찾기로 주소를 입력해주세요.',
      addressDetail: information.addressDetail.trim() ? '' : '상세주소를 입력해주세요.',
      domain: domainError,
      name: isValidName(information.name) ? '' : '올바른 이름을 입력해주세요',
      password: isValidPassword(information.password) ? '' : passwordRequirementsMessage,
      confirmation:
        information.confirmation && information.password === information.confirmation
          ? ''
          : '비밀번호가 일치하지 않습니다',
    };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) {
      setNotice('');
      return;
    }
    if (checkedId !== information.id || !checkedId) {
      setNotice('아이디 중복확인을 해주세요.');
      return;
    }
    if (
      !information.postalCode.trim() ||
      !information.address.trim() ||
      !information.addressDetail.trim() ||
      !isValidRegistrationId(information.id) ||
      !isValidEmailLocalPart(information.email.trim()) ||
      !isValidEmailDomain(information.domain.trim())
    ) {
      setNotice('필수 회원정보와 올바른 아이디, 이메일 주소를 입력해주세요.');
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
        onDuplicateCheck={checkId}
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
