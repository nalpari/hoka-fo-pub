import { css } from 'styled-system/css';

type SignupMethod = 'local' | 'kakao' | 'naver';

type SignupStep = 0 | 1 | 2 | 3;

const styles = {
  steps: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2',
    mb: '34px',
    p: 0,
    listStyle: 'none',
    '& li': {
      display: 'grid',
      gap: '5px',
      color: 'var(--color-black-40)',
      fontSize: '14' /* 기존 13px */,
      textAlign: 'center',
    },
    '& li::before': { h: '3px', bg: 'var(--color-black-20)', content: '""' },
    '& span': { fontSize: '12' /* 기존: 11px */ },
  }),
  current: css({
    color: 'var(--color-black-100) !important',
    fontWeight: '700 !important',
    '&::before': { bg: 'var(--color-black-100) !important' },
  }),
  complete: css({ '&::before': { bg: 'var(--color-black-100) !important' } }),
};

type SignupProgressProps = {
  method: SignupMethod;
  step: SignupStep;
};

export function SignupProgress({ method, step }: SignupProgressProps) {
  const labels =
    method === 'naver' ? ['정보 입력', '가입 완료'] : ['약관 동의', '정보 입력', '가입 완료'];
  const currentStep = method === 'naver' ? step - 1 : step;

  return (
    <ol className={styles.steps} aria-label="회원가입 단계">
      {labels.map((label, index) => {
        const position = index + 1;
        const state =
          currentStep === position
            ? styles.current
            : currentStep > position
              ? styles.complete
              : undefined;

        return (
          <li className={state} key={label}>
            {position}
            <span>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
