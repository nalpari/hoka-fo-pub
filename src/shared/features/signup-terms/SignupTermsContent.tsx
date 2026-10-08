import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

export const signupTerms = [
  { label: 'HOKA Korea 이용약관 동의', required: true },
  { label: '개인정보 수집 동의', required: true },
  { label: '개인정보 수집 동의', required: false },
  { label: '개인정보 제3자 (제휴사) 제공 동의', required: true },
] as const;

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
  content: css({ maxW: '420px', mx: 'auto' }),
  title: css({ m: '0', mb: '6' }),
  all: css({ pb: '4', mb: '4', borderBottom: '1px solid var(--color-black-20)' }),
  list: css({ gap: '2' }),
  row: css({ gap: '2', justifyContent: 'space-between', alignItems: 'center' }),
  detail: css({ flexShrink: '0', '--button-padding-x': '0px' }),
  actions: css({ gridTemplateColumns: '1fr 1fr', gap: '2', mt: '6' }),
  button: css({
    '--button-radius': '999px',
    '--button-height': '48px!',
    '--button-border-width': '0px!',
  }),
  cancel: css({
    '--button-bg': 'var(--color-white-000)!',
    '--button-color': 'var(--color-black-100)!',
    '--button-border-width': '1px!',
    '--button-border-color': 'var(--color-black-100)!',
  }),
  popup: css({
    display: 'flex',
    flexDirection: 'column',
    maxH: '90svh',
    _mobile: { h: '100svh', maxH: '100svh', borderRadius: '0' },
  }),
  body: css({ display: 'flex', flexDirection: 'column', minH: '0', flex: '1', p: '4' }),
  documentHeader: css({ justifyContent: 'space-between', gap: '2', mb: '4' }),
  document: css({
    border: '1px solid var(--color-black-20)',
    p: '4',
    overflowY: 'auto',
    minH: '0',
    maxH: '55svh',
    _mobile: { maxH: 'none', flex: '1' },
  }),
  text: css({ m: '0', mb: '4' }),
  dates: css({ m: '0', mt: '2' }),
  confirm: css({ mt: 'auto', pt: '6' }),
};

type Props = {
  agreements: boolean[];
  detail: number | null;
  previous: boolean;
  notice: string;
  onAllChange: (checked: boolean) => void;
  onChange: (index: number, checked: boolean) => void;
  onDetail: (index: number | null) => void;
  onPrevious: () => void;
  onCancel: () => void;
  onNext: () => void;
};

export function SignupTermsContent(props: Props) {
  const selected = props.detail === null ? null : signupTerms[props.detail];

  return (
    <Box as="main" className={styles.page}>
      <Box className={styles.content}>
        <Typography as="h1" variant="authTitle" className={styles.title}>
          약관동의
        </Typography>
        <Box className={styles.all}>
          <Checkbox
            label={
              <Typography variant="authSmall">모든 약관을 확인하고 전체동의 합니다</Typography>
            }
            checked={props.agreements.every(Boolean)}
            onCheckedChange={props.onAllChange}
          />
        </Box>
        <Stack className={styles.list}>
          {signupTerms.map((term, index) => (
            <HStack key={index} className={styles.row}>
              <Checkbox
                label={
                  <Typography variant="authSmall">
                    ({term.required ? '필수' : '선택'}) {term.label}
                  </Typography>
                }
                checked={props.agreements[index]}
                onCheckedChange={(checked) => props.onChange(index, checked)}
              />
              <Button
                variant="link"
                size="sm"
                className={styles.detail}
                onClick={() => props.onDetail(index)}
                aria-label={`${term.required ? '필수' : '선택'} ${term.label} 자세히 보기`}
              >
                <Typography variant="authCaption">자세히 보기</Typography>
              </Button>
            </HStack>
          ))}
        </Stack>
        {props.notice ? <StatusMessage tone="error">{props.notice}</StatusMessage> : null}
        <Grid className={styles.actions}>
          <Button
            variant="primary"
            fullWidth
            className={[styles.button, styles.cancel].join(' ')}
            onClick={props.onCancel}
          >
            취소
          </Button>
          <Button variant="primary" fullWidth className={styles.button} onClick={props.onNext}>
            다음
          </Button>
        </Grid>
      </Box>
      <ModalDialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) props.onDetail(null);
        }}
        title="HOKA Korea 이용약관"
        closeLabel="약관 닫기"
        popupClassName={styles.popup}
      >
        <Box className={styles.body}>
          <HStack className={styles.documentHeader}>
            <Typography variant="authSmall">
              ({selected?.required ? '필수' : '선택'}) {selected?.label}
            </Typography>
            <Button variant="link" size="sm" className={styles.detail} onClick={props.onPrevious}>
              <Typography variant="authCaption">
                {props.previous ? '현재 약관 보기' : '이전 약관 보기'}
              </Typography>
            </Button>
          </HStack>
          <Box as="article" className={styles.document} tabIndex={0} aria-label="약관 내용">
            {props.previous ? (
              <Typography as="p" variant="authCaption" className={styles.text}>
                이전 약관은 등록 준비 중입니다.
              </Typography>
            ) : (
              [1, 2].map((number) => (
                <Box key={number}>
                  <Typography as="h2" variant="authSmall" className={styles.text}>
                    약관 타이틀{number}
                  </Typography>
                  <Typography as="p" variant="authSmall" className={styles.text}>
                    {'약관내용'.repeat(55)}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
          <Typography as="p" variant="authCaption" tone="subtle" className={styles.dates}>
            공고일자 : 2025년 08월 25일 / 시행일자 : 2025년 09월 01일
          </Typography>
          <Box className={styles.confirm}>
            <Button
              variant="primary"
              fullWidth
              className={styles.button}
              onClick={() => props.onDetail(null)}
            >
              확인
            </Button>
          </Box>
        </Box>
      </ModalDialog>
    </Box>
  );
}
