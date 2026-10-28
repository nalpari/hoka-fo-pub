import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';

const supportLink = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '44px',
  px: '4',
  bg: 'surface.subtle',
  color: 'text.primary',
  _hover: { bg: 'black.20' },
  _focusVisible: { outline: '2px solid', outlineOffset: '4px' },
});

type Props = { title: string; description: string; label: string; to: string };

export function ProductSupportLink({ title, description, label, to }: Props) {
  return (
    <Grid
      gridTemplateColumns="minmax(0, 1fr) 160px"
      alignItems="center"
      gap="5"
      _mobile={{ gridTemplateColumns: '1fr', gap: '3' }}
    >
      <ContentHeader
        gap="2"
        titleAs="h4"
        title={<>{title}</>}
        titleProps={{ variant: 'body5', weight: 'bold' }}
        description={<>{description}</>}
        descriptionProps={{ variant: 'body5', tone: 'tertiary' }}
      />
      <Link href={to} className={supportLink}>
        <Typography variant="body5" weight="medium">
          {label}
        </Typography>
      </Link>
    </Grid>
  );
}
