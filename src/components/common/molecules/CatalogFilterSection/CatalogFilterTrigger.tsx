import { Typography } from '@/components/common/atoms/Typography/Typography';
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

/** 카탈로그 필터 섹션의 열기 상태와 제목을 표시합니다. (Displays the title and toggle state of a catalog filter section.) */
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
      <Typography variant="body3" weight="semibold">{title}</Typography>
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
