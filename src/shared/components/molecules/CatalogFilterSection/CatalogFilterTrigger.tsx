import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

const icon = css({ w: '16px', h: '16px', flexShrink: 0 });

type CatalogFilterTriggerProps = {
  expanded: boolean;
  title: string;
};

export function CatalogFilterTrigger({ expanded, title }: CatalogFilterTriggerProps) {
  return (
    <HStack as="summary" cursor="pointer" justifyContent="space-between" py="24px">
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
