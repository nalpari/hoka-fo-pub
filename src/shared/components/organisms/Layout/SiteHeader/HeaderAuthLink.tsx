import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { HStack, Divider } from 'styled-system/jsx';

const authLink = css({
  color: 'var(--hoka-black)',
  fontFamily: 'Pretendard, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '-0.02em',
  whiteSpace: 'nowrap',
});

export function HeaderAuthLink() {
  return (
    <HStack gap="6px" alignItems="center">
      <Link to="/login" className={authLink}>
        로그인
      </Link>
      <Divider aria-hidden="true" orientation="vertical" h="16px" w="1px" bg="var(--hoka-black)" />
      <Link to="/signup" className={authLink}>
        회원가입
      </Link>
    </HStack>
  );
}
