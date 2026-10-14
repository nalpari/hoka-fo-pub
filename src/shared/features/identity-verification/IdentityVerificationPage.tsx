import { useNavigate } from 'react-router-dom';
import {
  IdentityVerificationContent,
  type VerificationMethod,
} from './IdentityVerificationContent';

export function IdentityVerificationPage() {
  const navigate = useNavigate();

  const selectMethod = (method: VerificationMethod) => {
    if (method === 'phone') {
      navigate('/signup/verify/phone');
      return;
    }
  };

  return <IdentityVerificationContent onSelect={selectMethod} />;
}
