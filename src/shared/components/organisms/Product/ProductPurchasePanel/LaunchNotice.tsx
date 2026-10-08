import { css } from 'styled-system/css';

const notice = css({
  p: '11px',
  bg: 'var(--color-black-10)',
  color: 'var(--color-red-100)',
  fontSize: '14' /* 기존 13px */,
});

type LaunchNoticeProps = {
  status: 'COMING';
};

/** 출시 전 상품의 구매 가능 시점을 알리는 안내입니다. */
export function LaunchNotice({ status }: LaunchNoticeProps) {
  if (status !== 'COMING') return null;

  return <p className={notice}>COMING SOON · 발매 알림은 출시 후 제공됩니다.</p>;
}
