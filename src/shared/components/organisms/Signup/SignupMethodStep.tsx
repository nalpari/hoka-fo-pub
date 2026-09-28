import { Link } from 'react-router-dom';
import { Box, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

type SignupMethod = 'local' | 'kakao' | 'naver';

type SignupMethodOption = {
  id: SignupMethod;
  label: string;
  description: string;
};

const styles = {
  choice: css({ pt: '2px' }),
  benefit: css({
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    mb: '36px',
    p: '24px',
    bg: '#f2f2ef',
    '& > span': {
      display: 'grid',
      flex: '0 0 52px',
      w: '52px',
      h: '52px',
      placeItems: 'center',
      borderRadius: '50%',
      bg: '#111',
      color: '#fff',
      fontSize: '24px',
      fontWeight: 900,
    },
    '& p': { mt: '5px', mb: 0, color: '#666', fontSize: '13px' },
  }),
  description: css({ mt: '9px', mb: 0, color: '#666', fontSize: '14px' }),
  methods: css({
    display: 'grid',
    gap: '10px',
    mt: '28px',
    '& button': {
      display: 'grid',
      gap: '4px',
      p: '17px 20px',
      border: '1px solid #d2d2d2',
      textAlign: 'left',
    },
    '& span': { color: '#777', fontSize: '13px' },
  }),
  local: css({ bg: '#111', color: '#fff' }),
  kakao: css({ bg: '#fee500' }),
  naver: css({ bg: '#03c75a', color: '#fff' }),
  loginLink: css({
    mt: '28px',
    color: '#777',
    fontSize: '13px',
    textAlign: 'center',
    '& a': { color: '#111', fontWeight: 700, textDecoration: 'underline' },
  }),
};

type SignupMethodStepProps = {
  methods: SignupMethodOption[];
  onSelect: (method: SignupMethod) => void;
};

export function SignupMethodStep({ methods, onSelect }: SignupMethodStepProps) {
  return (
    <>
      <VStack className={styles.choice}>
        <Box className={styles.benefit}>
          <span aria-hidden="true">H</span>
          <Box>
            <b>HOKA 멤버십에 가입하세요</b>
            <p>신규 가입 쿠폰과 멤버십 전용 혜택을 드립니다.</p>
          </Box>
        </Box>
        <h2>가입 방법을 선택해 주세요</h2>
        <p className={styles.description}>선택한 방식의 본인 인증 후 회원가입 절차가 진행됩니다.</p>
        <VStack className={styles.methods}>
          {methods.map((method) => (
            <Button
              className={styles[method.id]}
              key={method.id}
              onClick={() => onSelect(method.id)}
            >
              <b>{method.label}</b>
              <span>{method.description}</span>
            </Button>
          ))}
        </VStack>
      </VStack>
      <p className={styles.loginLink}>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </>
  );
}
