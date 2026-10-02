import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

const icon = css({ w: '4', h: '4', flexShrink: 0 });

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
    <HStack
      as="button"
      aria-controls={controlsId}
      aria-expanded={expanded}
      bg="transparent"
      border="0"
      cursor="pointer"
      justifyContent="space-between"
      onClick={onToggle}
      px="0"
      py="6"
      textAlign="left"
      type="button"
      w="100%"
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
    </HStack>
  );
}
