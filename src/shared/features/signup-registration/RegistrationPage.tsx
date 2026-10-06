import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RegistrationContent,
  type RegistrationInformation,
  type MarketingPreferences,
} from './RegistrationContent';

export function RegistrationPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<'information' | 'additional'>('information');
  const [information, setInformation] = useState<RegistrationInformation>({
    id: '',
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
  const [checkedId, setCheckedId] = useState('');
  const [addressOpen, setAddressOpen] = useState(false);

  const change = (key: keyof RegistrationInformation, value: string) => {
    setInformation((previous) => ({ ...previous, [key]: value }));
    setNotice('');
    if (key === 'id') {
      setCheckedId('');
      setDuplicateNotice('');
    }
  };

  const checkId = () => {
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(information.id)) {
      setDuplicateNotice('미리보기 아이디는 영문으로 시작하는 영문·숫자 4~20자로 입력해주세요.');
      return;
    }
    setCheckedId(information.id);
    setDuplicateNotice('아이디 형식을 확인했습니다. 실제 중복 여부는 서비스 연결 후 확인됩니다.');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stage === 'additional') {
      navigate('/signup/complete');
      return;
    }
    if (checkedId !== information.id || !checkedId) {
      setNotice('아이디 중복 확인 버튼으로 입력 형식을 확인해주세요.');
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
      onDuplicateCheck={checkId}
      onAddressOpen={setAddressOpen}
      onSubmit={submit}
      onCancel={() => {
        if (stage === 'additional') {
          setStage('information');
          setNotice('');
        } else navigate('/signup/terms');
      }}
    />
  );
}
