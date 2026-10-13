import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Fragment, type ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

const styles = {
  info: css({
    px: '8',
    py: '8',
    bg: 'var(--color-black-10)',
    _mobile: { px: '4' },
  }),
  specs: css({
    display: 'grid',
    gridTemplateColumns: '26.6% 1fr',
    columnGap: '3',
    rowGap: '6',
  }),
};

export type ProductInformationProps = {
  id?: string;
  title?: string;
  sections: readonly { title: string; content: ReactNode }[];
  specifications: readonly { label: string; value: ReactNode }[];
};

/** Product description sections and a semantic specification list. */
export function ProductInformation({
  id,
  title = '상품 정보',
  sections,
  specifications,
}: ProductInformationProps) {
  const [description, ...features] = sections;

  return (
    <Stack as="section" gap="10" className={styles.info} id={id}>
      <Stack gap="6">
        <Typography as="h2" variant="heading8">
          {title}
        </Typography>
        {description && (
          <Stack gap="6">
            <Typography as="h3" variant="heading9">
              {description.title}
            </Typography>
            <Typography as="p" variant="body3">
              {description.content}
            </Typography>
          </Stack>
        )}
      </Stack>
      {features.map((section, index) => (
        <Stack gap="6" key={index}>
          <Typography as="h3" variant="heading9">
            {section.title}
          </Typography>
          <Typography as="p" variant="body3">
            {section.content}
          </Typography>
        </Stack>
      ))}
      <dl className={styles.specs}>
        {specifications.map((specification, index) => (
          <Fragment key={index}>
            <Typography as="dt" variant="cta1">
              {specification.label}
            </Typography>
            <Typography as="dd" variant="body4">
              {specification.value}
            </Typography>
          </Fragment>
        ))}
      </dl>

      <Button variant="link" colorway="black" size="md">
        더 보기
      </Button>
    </Stack>
  );
}
