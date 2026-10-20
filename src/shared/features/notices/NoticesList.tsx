import { css } from 'styled-system/css';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { NoticeHeading } from './NoticeHeading';
import { NoticeContent } from './NoticeContent';
import Link from 'next/link';
import { Stack } from 'styled-system/jsx';

type Props = {
  notices: readonly { title: string; date: string }[];
  shown: number;
  openIndex: number | null;
  onOpenIndexChange: (index: number | null) => void;
  platform: 'web' | 'mobile';
};

export function NoticesList({ notices, shown, openIndex, onOpenIndexChange, platform }: Props) {
  if (platform === 'mobile') {
    return (
      <Stack as="ul" gap="0" m="0" p="0" listStyleType="none">
        {notices.slice(0, shown).map((notice, index) => (
          <li key={`${notice.title}-${index}`}>
            <Link
              href={`/support/notices/${index + 1}`}
              className={css({
                display: 'flex',
                alignItems: 'center',
                minH: '55px',
                borderBottom: '1px solid token(colors.black.20)',
                _focusVisible: {
                  outline: '2px solid var(--color-focus-ring)',
                  outlineOffset: '-2px',
                },
              })}
            >
              <NoticeHeading notice={notice} platform={platform} />
            </Link>
          </li>
        ))}
      </Stack>
    );
  }

  return (
    <Accordion
      multiple={false}
      indicator={null}
      value={openIndex === null ? [] : [String(openIndex)]}
      onValueChange={(values) => onOpenIndexChange(values.length ? Number(values[0]) : null)}
      itemClassName={css({
        '& > h3': { m: '0' },
        borderBottom: '1px solid token(colors.black.20)',
      })}
      triggerClassName={css({
        '&&': {
          h: { base: '59px', _mobile: '55px' },
          px: { base: '4', _mobile: '0' },
          py: '0',
          bg: 'white.0',
          textAlign: 'left',
        },
      })}
      items={notices.slice(0, shown).map((notice, index) => ({
        value: String(index),
        title: <NoticeHeading notice={notice} platform={platform} />,
        content: <NoticeContent notice={notice} index={index} />,
      }))}
    />
  );
}
