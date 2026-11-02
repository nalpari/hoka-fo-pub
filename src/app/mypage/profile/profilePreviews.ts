export const profilePreviews = [
  {
    href: '/mypage/profile/preview-save',
    label: '저장 확인',
    state: 'save',
  },
  {
    href: '/mypage/profile/preview-save-complete',
    label: '수정 완료',
    state: 'complete',
  },
  {
    href: '/mypage/profile/preview-phone-required',
    label: '본인인증 안내',
    state: 'unverified',
  },
  {
    href: '/mypage/profile/preview-withdraw',
    label: '탈퇴 확인',
    state: 'withdraw',
  },
  {
    href: '/mypage/profile/preview-withdraw-complete',
    label: '탈퇴 완료',
    state: 'withdraw-complete',
  },
  {
    href: '/mypage/profile/preview-cancel',
    label: '수정 취소 확인',
    state: 'cancel',
  },
  {
    href: '/mypage/profile/preview-password',
    label: '비밀번호 입력',
    state: 'input',
  },
  {
    href: '/mypage/profile/preview-password-confirm',
    label: '비밀번호 변경 확인',
    state: 'confirm',
  },
] as const;
