import { Typography, type TypographyProps } from '@/shared/components/atoms/Typography/Typography';

type Props = {
  length: number;
  limit: number;
  spaced?: boolean;
  tone?: TypographyProps['tone'];
  className?: string;
};

export function CharacterCount({ length, limit, spaced = false, tone, className }: Props) {
  const separator = spaced ? ' / ' : '/';

  return (
    <Typography variant="body5" tone={tone} className={className}>
      {length}
      {separator}
      {spaced ? limit.toLocaleString() : limit}
    </Typography>
  );
}
