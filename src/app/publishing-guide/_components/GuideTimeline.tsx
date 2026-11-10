'use client';

import { useEffect, useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

const timeline = css({
  alignSelf: 'start',
  position: 'sticky',
  top: 'calc(var(--layout-site-header-height) + 24px)',
  p: '4',
  border: '1px solid token(colors.black.20)',
  borderRadius: '2',
  bg: 'surface.default',
  _mobile: { position: 'static', top: 'auto', order: -1 },
});

const timelineItems = css({
  ml: '2',
  pl: '4',
  borderLeft: '1px solid token(colors.black.40)',
});

const timelineLink = css({
  position: 'relative',
  display: 'block',
  py: '1',
  color: 'text.primary',
  textDecoration: 'none',
  _before: {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '-21px',
    w: '10px',
    h: '10px',
    transform: 'translateY(-50%)',
    border: '2px solid token(colors.black.40)',
    borderRadius: 'full',
    bg: 'surface.default',
  },
  '&[aria-current=location]': { color: 'black.100' },
  '&[aria-current=location] span': { fontWeight: '700' },
  '&[aria-current=location]::before': { bg: 'black.100', borderColor: 'black.100' },
  _hover: { color: 'text.primary', textDecoration: 'underline' },
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
});

export type GuideTimelineEntry = {
  id: string;
  title: string;
  description: string;
};

/** 가이드 섹션으로 이동하는 공통 sticky 타임라인을 표시합니다. (Displays a shared sticky timeline linking to guide sections.) */
export function GuideTimeline({
  title,
  entries,
}: {
  title: string;
  entries: readonly GuideTimelineEntry[];
}) {
  const [activeId, setActiveId] = useState(entries[0]?.id);

  useEffect(() => {
    const update = () => {
      const current = [...entries].reverse().find(({ id }) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 180;
      });
      setActiveId(current?.id ?? entries[0]?.id);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [entries]);

  return (
    <Stack as="nav" className={timeline} gap="3" aria-label={`${title} 바로가기`}>
      <Typography as="h2" variant="body3" weight="medium">
        {title}
      </Typography>
      <Stack className={timelineItems} gap="0">
        {entries.map((item) => (
          <a
            key={item.id}
            className={timelineLink}
            href={`#${item.id}`}
            aria-current={activeId === item.id ? 'location' : undefined}
          >
            <Typography as="span" variant="body5" weight="medium">
              {item.title}
            </Typography>
            <Box as="span" display="block">
              <Typography as="span" variant="body5" tone="subtle">
                {item.description}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Stack>
  );
}
