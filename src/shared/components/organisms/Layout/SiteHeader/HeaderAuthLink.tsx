import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { HStack, Divider } from 'styled-system/jsx';

const authLink = css({
  whiteSpace: 'nowrap',
  '&&': {
    color: 'var(--hoka-black)',
  },
});

export function HeaderAuthLink() {
  return (
    <HStack gap="1.5" alignItems="center">
      <Link to="/login" className={authLink}>
        <Typography variant="body3">로그인</Typography>
      </Link>
      <Divider aria-hidden="true" orientation="vertical" h="4" w="1px" bg="var(--hoka-black)" />
      <Link to="/signup" className={authLink}>
        <Typography variant="body3">회원가입</Typography>
      </Link>
    </HStack>
  );
}
