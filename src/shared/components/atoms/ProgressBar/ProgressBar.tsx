import { css } from 'styled-system/css';

type Props = { value: number; max: number; label?: string };

const track = css({ h: '4px', bg: '#e5e5e5' });

const valueStyle = css({
  display: 'block',
  h: '100%',
  bg: '#0082ca',
  transition: 'width .2s ease',
});

export function ProgressBar({ value, max, label }: Props) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      aria-label={label}
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={value}
      className={track}
      role="progressbar"
    >
      <span className={valueStyle} style={{ width: `${percent}%` }} />
    </div>
  );
}
