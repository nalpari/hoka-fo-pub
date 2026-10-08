import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RegistrationContent,
  type RegistrationInformation,
  type MarketingPreferences,
} from './RegistrationContent';
import { MarketingConsentSummaryModal } from './MarketingConsentSummaryModal';

export function RegistrationPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'information' | 'additional'>('information');
  const [information, setInformation] = useState<RegistrationInformation>({
    name: '',
    password: '',
    confirmation: '',
    birthDate: '',
    phone: '',
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
  const [checkedEmail, setCheckedEmail] = useState('');
  const [addressOpen, setAddressOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const change = (key: keyof RegistrationInformation, value: string) => {
    setInformation((previous) => ({ ...previous, [key]: value }));
    setNotice('');
    if (key === 'email' || key === 'domain') {
      setCheckedEmail('');
      setDuplicateNotice('');
    }
  };

  const checkEmail = () => {
    if (
      !/^[^\s@]+$/.test(information.email) ||
      !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(information.domain)
    ) {
      setCheckedEmail('');
      setDuplicateNotice('이메일 주소와 도메인을 올바르게 입력해주세요.');
      return;
    }
    setCheckedEmail(`${information.email}@${information.domain}`);
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
    if (checkedEmail !== `${information.email}@${information.domain}` || !checkedEmail) {
      setNotice('이메일 중복확인 버튼으로 입력 형식을 확인해주세요.');
      return;
    }
    if (
      !information.name.trim() ||
      !/^\d{8}$/.test(information.birthDate) ||
      !/^01[016789]\d{7,8}$/.test(information.phone.replace(/[-\s]/g, '')) ||
      !information.address.trim() ||
      !information.addressDetail.trim() ||
      !/^[^\s@]+$/.test(information.email) ||
      !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(information.domain)
    ) {
      setNotice('필수 회원정보와 올바른 이메일 주소를 입력해주세요.');
      return;
    }
    if (
      information.password.length < 8 ||
      !/[a-zA-Z]/.test(information.password) ||
      !/\d/.test(information.password) ||
      !/[^a-zA-Z0-9\s]/.test(information.password)
    ) {
      setNotice('비밀번호는 8자 이상으로 영문·숫자·특수기호를 조합해주세요.');
      return;
    }
    if (information.password !== information.confirmation) {
      setNotice('비밀번호 재입력 값이 일치하지 않습니다.');
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
          } else navigate('/signup/terms');
        }}
      />
      {summaryOpen ? (
        <MarketingConsentSummaryModal
          preferences={preferences}
          onOpenChange={setSummaryOpen}
          onConfirm={() => navigate('/signup/complete')}
        />
      ) : null}
    </>
  );
}
