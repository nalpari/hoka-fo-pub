import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';
import { config } from '@fortawesome/fontawesome-svg-core';
import { faIdCard, faMobileScreenButton, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const styles = {
  page: css({
    pt: '24',
    px: '5',
    pb: '20',
    _mobile: {
      pt: '10',
      px: '4',
      pb: '8',
      minH: 'calc(100svh - var(--layout-site-header-height))',
    },
  }),
  content: css({ maxW: '420px', mx: 'auto', gap: '0' }),
  title: css({ m: '0', mb: '3' }),
  description: css({ m: '0', mb: '8' }),
  methods: css({ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '2' }),
  method: css({ gap: '6', minW: '0' }),
  illustration: css({
    h: '160px',
    border: '1px solid #e9eaeb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    color: 'text.primary',
    '& > svg': { w: '48px!', h: '64px!' },
  }),
  shield: css({
    position: 'absolute',
    left: 'calc(50% - 33px)',
    top: '86px',
    bg: 'white',
    p: '1',
    display: 'flex',
    '& svg': { w: '24px!', h: '24px!', color: '#009bda' },
  }),
  button: css({
    '--button-radius': '999px',
    '--button-height': '48px!',
    '--button-border-width': '0px!',
  }),
  footnote: css({ m: '0', mt: '4' }),
  notice: css({ mt: '4' }),
};

export type VerificationMethod = 'phone' | 'ipin';

type IdentityVerificationContentProps = {
  onSelect: (method: VerificationMethod) => void;
  notice?: string;
};

export function IdentityVerificationContent({
  onSelect,
  notice,
}: IdentityVerificationContentProps) {
  return (
    <Box as="main" className={styles.page}>
      <Stack as="section" className={styles.content} aria-labelledby="verification-title">
        <Typography as="h1" variant="authTitle" className={styles.title} id="verification-title">
          본인인증
        </Typography>
        <Typography as="p" variant="authBody" tone="subtle" className={styles.description}>
          HOKA 온라인 회원가입 여부 확인을 위해 본인 인증이 필요합니다
        </Typography>
        <Grid className={styles.methods}>
          {(
            [
              { id: 'phone', label: '휴대폰 인증', icon: faMobileScreenButton },
              { id: 'ipin', label: '아이핀 인증', icon: faIdCard },
            ] as const
          ).map((method) => (
            <Stack key={method.id} className={styles.method}>
              <Box className={styles.illustration} aria-hidden="true">
                <FontAwesomeIcon icon={method.icon} />
                <span className={styles.shield}>
                  <FontAwesomeIcon icon={faShieldHalved} />
                </span>
              </Box>
              <Button
                variant="primary"
                fullWidth
                className={styles.button}
                onClick={() => onSelect(method.id)}
              >
                {method.label}
              </Button>
            </Stack>
          ))}
        </Grid>
        <Typography as="p" variant="authSmall" tone="subtle" className={styles.footnote}>
          ※ 본인 인증 시 입력하신 정보는 본인 확인 용도 외에는 사용되지 않으며 별도 저장하지
          않습니다.
        </Typography>
        {notice ? (
          <Box className={styles.notice}>
            <StatusMessage tone="error">{notice}</StatusMessage>
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
}
