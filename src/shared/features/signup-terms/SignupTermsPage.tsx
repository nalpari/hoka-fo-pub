import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupTermsContent, signupTerms } from './SignupTermsContent';

export function SignupTermsPage() {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState([false, false, false, false]);
  const [detail, setDetail] = useState<number | null>(null);
  const [previous, setPrevious] = useState(false);
  const [notice, setNotice] = useState('');

  const next = () => {
    if (signupTerms.some((term, index) => term.required && !agreements[index])) {
      setNotice('필수 약관에 모두 동의해 주세요.');
      return;
    }
    navigate('/signup?step=details');
  };

  return (
    <SignupTermsContent
      agreements={agreements}
      detail={detail}
      previous={previous}
      notice={notice}
      onAllChange={(checked) => {
        setAgreements(agreements.map(() => checked));
        setNotice('');
      }}
      onChange={(index, checked) => {
        setAgreements((values) =>
          values.map((value, position) => (position === index ? checked : value)),
        );
        setNotice('');
      }}
      onDetail={(index) => {
        setDetail(index);
        setPrevious(false);
      }}
      onPrevious={() => setPrevious(!previous)}
      onCancel={() => navigate('/signup/verify')}
      onNext={next}
    />
  );
}
