import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Fragment, type ReactNode } from 'react';
import { css } from 'styled-system/css';

const styles = {
  info: css({
    mt: '7',
    p: '5',
    bg: 'var(--color-black-10)',
    '& h2': { mb: '3' },
    '& h3': { mt: '5', mb: '2' },
  }),
  specs: css({
    display: 'grid',
    gridTemplateColumns: '76px 1fr',
    gap: '1.5 3',
    mt: '5',
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
  return (
    <section className={styles.info} id={id}>
      <Typography as="h2" variant="heading9">
        {title}
      </Typography>
      {sections.map((section, index) => (
        <Fragment key={index}>
          <Typography as="h3" variant="body5" weight="bold">
            {section.title}
          </Typography>
          <Typography as="p" variant="body5">
            {section.content}
          </Typography>
        </Fragment>
      ))}
      <dl className={styles.specs}>
        {specifications.map((specification, index) => (
          <Fragment key={index}>
            <Typography as="dt" variant="body5" weight="bold">
              {specification.label}
            </Typography>
            <Typography as="dd" variant="body5">
              {specification.value}
            </Typography>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}
