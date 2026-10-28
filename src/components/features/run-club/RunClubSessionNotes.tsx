import { sessionNotices, sessionPrecautions } from './runClub.data';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Box } from 'styled-system/jsx';
import { css } from 'styled-system/css';

/** 세션 안내 또는 주의 사항 목록을 표시합니다. (Displays a session notice or precaution list.) */
export function RunClubSessionNotes({ precautions = false }: { precautions?: boolean }) {
  return (
    <Box
      as="aside"
      my="24px"
      color="var(--color-text-tertiary)"
      _mobile={{ mt: '8', mb: '6' }}

      aria-label={precautions ? '주의 사항' : '안내 사항'}
    >
      <Typography as="p" variant="body4" mo="body5" weight="bold" className={css({ m: '0 0 6px' })}>
        {precautions ? '주의 사항' : '안내 사항'} ⓘ
      </Typography>
      <Box as="ul" listStyle="none" p="0" m="0">
        {(precautions ? sessionPrecautions : sessionNotices).map((notice) => (
          <Typography
            as="li"
            variant="body4"
            mo="body5"
            key={notice}
            className={css({ _before: { content: '"- "' } })}
          >
            {notice}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
