import Link from 'next/link';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { NoticeHeading } from './NoticeHeading';

type Props = {
  notices: readonly { title: string; date: string }[];
  shown: number;
  platform: 'web' | 'mobile';
};

const noticeLink = css({
  display: 'flex',
  alignItems: 'center',
  minH: '74px',
  px: '16px',
  py: '24px',
  borderBottom: '1px solid token(colors.black.20)',
  _mobile: { minH: '58px', px: '0', py: '16px' },
  _focusVisible: {
    outline: '2px solid var(--color-focus-ring)',
    outlineOffset: '-2px',
  },
});

export function NoticesList({ notices, shown, platform }: Props) {
  return (
    <Stack
      as="section"
      aria-label="공지사항 목록"
      gap="0"
      borderTopColor="black.100"
      borderTopStyle="solid"
      borderTopWidth={{ base: '2px', _mobile: '0' }}
      pt="8px"
    >
      <Stack as="ul" gap="0" m="0" p="0" listStyleType="none">
        {notices.slice(0, shown).map((notice, index) => (
          <li key={`${notice.title}-${index}`}>
            <Link href={`/support/notices/${index + 1}`} className={noticeLink}>
              <NoticeHeading notice={notice} platform={platform} />
            </Link>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
