import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const globe = css({ w: '7', h: '7', flexShrink: 0 });

/** 국가 선택 화면의 제목과 지구본 아이콘을 표시합니다. (Displays the locale selection heading and globe icon.) */
export function LocalesHeading() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      gap="3"
      minH="92px"
      bg="var(--color-black-10)"
      _mobile={{ minH: '15' }}
    >
      <svg
        className={globe}
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.7 2.5 4.1 5.5 4.1 9S14.7 18.5 12 21c-2.7-2.5-4.1-5.5-4.1-9S9.3 5.5 12 3" />
      </svg>
      <Typography as="h1" web="body2" mo="body3" weight="bold">
        Choose your shipping country
      </Typography>
    </Flex>
  );
}
