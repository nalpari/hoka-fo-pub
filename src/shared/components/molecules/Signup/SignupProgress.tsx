import { css } from 'styled-system/css';

type SignupMethod = 'local' | 'kakao' | 'naver';

type SignupStep = 0 | 1 | 2 | 3;

const styles = {
  steps: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    mb: '34px',
    p: 0,
    listStyle: 'none',
    '& li': { display: 'grid', gap: '5px', color: '#aaa', fontSize: '13px', textAlign: 'center' },
    '& li::before': { h: '3px', bg: '#ddd', content: '""' },
    '& span': { fontSize: '11px' },
  }),
  current: css({
    color: '#111 !important',
    fontWeight: '700 !important',
    '&::before': { bg: '#111 !important' },
  }),
  complete: css({ '&::before': { bg: '#111 !important' } }),
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
