import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';

const icon = css({ w: '4', h: '4', flexShrink: 0 });

const trigger = css({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '2',
  w: '100%',
  justifyContent: 'space-between',
  border: '0',
  bg: 'transparent',
  cursor: 'pointer',
  px: '0',
  py: '6',
  textAlign: 'left',
});

type CatalogFilterTriggerProps = {
  controlsId: string;
  expanded: boolean;
  onToggle: () => void;
  title: string;
};

export function CatalogFilterTrigger({
  controlsId,
  expanded,
  onToggle,
  title,
}: CatalogFilterTriggerProps) {
  return (
    <button
      aria-controls={controlsId}
      aria-expanded={expanded}
      className={trigger}
      onClick={onToggle}
      type="button"
    >
      <Typography as="span" variant="filterLegend">
        {title}
      </Typography>
      <img
        alt=""
        aria-hidden="true"
        className={icon}
        height={16}
        src={expanded ? '/images/icon/filter-expanded.svg' : '/images/icon/filter-collapsed.svg'}
        width={16}
      />
    </button>
  );
}
