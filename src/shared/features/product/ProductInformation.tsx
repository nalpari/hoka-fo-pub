import { Fragment, type ReactNode } from 'react';
import { css } from 'styled-system/css';

const styles = {
  info: css({
    mt: '7',
    p: '5',
    bg: 'var(--color-black-10)',
    '& h2': { mb: '3', fontSize: '16' /* 기존 17px */, fontWeight: 'black' },
    '& h3': { mt: '5', mb: '2', fontSize: '12', fontWeight: 'bold' },
    '& p': { fontSize: '12', lineHeight: 'body' },
  }),
  specs: css({
    display: 'grid',
    gridTemplateColumns: '76px 1fr',
    gap: '1.5 3',
    mt: '5',
    fontSize: '12',
    '& dt': { fontWeight: 'bold' },
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
      <h2>{title}</h2>
      {sections.map((section, index) => (
        <Fragment key={index}>
          <h3>{section.title}</h3>
          <p>{section.content}</p>
        </Fragment>
      ))}
      <dl className={styles.specs}>
        {specifications.map((specification, index) => (
          <Fragment key={index}>
            <dt>{specification.label}</dt>
            <dd>{specification.value}</dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}
