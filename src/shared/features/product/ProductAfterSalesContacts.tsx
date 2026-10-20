import type { ReactNode } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';

const styles = {
  contact: css({
    gridTemplateColumns: 'minmax(140px, 1fr) 2fr',
    gap: '6',
    pb: '8',
    borderBottom: '1px solid var(--color-black-20)',
    _mobile: { gridTemplateColumns: '1fr', gap: '3', pb: '6' },
  }),
  action: css({
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: '4',
    _mobile: { gridTemplateColumns: '1fr', justifyItems: 'start' },
  }),
  link: css({ textDecoration: 'underline', textUnderlineOffset: '3px' }),
};

const serviceUrl = 'https://service.joy-works.co.kr/';

function AfterSalesContact({
  title,
  descriptions,
  link,
}: {
  title: string;
  descriptions: readonly string[];
  link: ReactNode;
}) {
  return (
    <Grid className={styles.contact}>
      <Typography as="h4" variant="body5" weight="bold">
        {title}
      </Typography>
      <Stack gap="3">
        {descriptions.map((description) => (
          <Typography as="p" variant="body5" key={description}>
            {description}
          </Typography>
        ))}
        <Typography variant="body5">{link}</Typography>
      </Stack>
    </Grid>
  );
}

function AfterSalesAction({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <Grid className={styles.action}>
      <ContentHeader
        gap="2"
        titleAs="h4"
        title={title}
        titleProps={{ variant: 'body5', weight: 'bold' }}
        description={description}
        descriptionProps={{ variant: 'body5' }}
      />
      <ButtonLink href={href} variant="secondary" size="short">
        {label}
      </ButtonLink>
    </Grid>
  );
}

export function ProductAfterSalesContacts() {
  return (
    <Stack gap="8" border="1px solid var(--color-black-20)" p="8" _mobile={{ p: '4' }}>
      <AfterSalesContact
        title="HOKA 온라인 스토어"
        descriptions={[
          '온라인 주문·배송·교환·반품 관련 문의',
          '상담 채널과 운영시간은 고객센터에서 확인해 주세요.',
        ]}
        link={
          <Link className={styles.link} href="/support">
            고객센터 안내
          </Link>
        }
      />
      <AfterSalesContact
        title="HOKA A/S 접수"
        descriptions={['조이웍스 A/S 온라인 신청서', '상품 수선 접수 및 진행 관련 문의']}
        link={
          <a className={styles.link} href={serviceUrl} target="_blank" rel="noopener noreferrer">
            A/S 온라인 접수 (새 창)
          </a>
        }
      />
      <AfterSalesAction
        title="FAQs"
        description="자주 묻는 질문의 답변을 찾아보세요."
        href="/support/faq"
        label="자주 묻는 질문 찾기"
      />
      <AfterSalesAction
        title="1:1 문의"
        description="문의 내용을 남겨 주시면 확인 후 답변해 드리겠습니다."
        href="/support/inquiries/new"
        label="1:1 문의하기"
      />
    </Stack>
  );
}
