import { Progress as BaseProgress } from '@base-ui/react/progress';
import { css } from 'styled-system/css';

type Props = { value: number; max: number; label?: string };

const track = css({ h: '1', bg: '#e5e5e5' });

const valueStyle = css({
  display: 'block',
  h: '100%',
  bg: '#0082ca',
  transition: 'width .2s ease',
});

export function ProgressBar({ value, max, label }: Props) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <BaseProgress.Root aria-label={label} max={max} value={value}>
      <BaseProgress.Track className={track}>
        <BaseProgress.Indicator className={valueStyle} style={{ width: `${percent}%` }} />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
