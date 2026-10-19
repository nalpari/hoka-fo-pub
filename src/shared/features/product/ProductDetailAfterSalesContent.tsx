'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';
import {
  faBoxOpen,
  faClipboardList,
  faMagnifyingGlass,
  faScrewdriverWrench,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';

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

const steps = [
  {
    icon: faClipboardList,
    title: '온라인 접수',
    description: 'A/S 신청서를 작성하고 구매 정보와 상품 상태를 전달해 주세요.',
  },
  {
    icon: faBoxOpen,
    title: '상품 발송',
    description: '접수 안내에 따라 수선이 필요한 상품을 보내 주세요.',
  },
  {
    icon: faMagnifyingGlass,
    title: '상품 확인 및 판정',
    description: '접수된 상품의 상태와 수선 가능 여부를 확인합니다.',
  },
  {
    icon: faScrewdriverWrench,
    title: '수선 진행',
    description: '판정 결과와 비용 등 안내 내용을 확인한 뒤 수선이 진행됩니다.',
  },
  {
    icon: faTruckFast,
    title: '완료 안내 및 발송',
    description: '처리가 완료되면 안내 후 상품을 보내 드립니다.',
  },
];

const questions = [
  {
    question: 'A/S 기간은 어느 정도 소요될까요?',
    answer:
      '상품 상태와 수선 내용, 부자재 수급에 따라 처리 기간이 달라질 수 있습니다. 예상 일정은 접수 시 A/S 담당자에게 확인해 주세요.',
  },
  {
    question: '무상 또는 유상 수선 여부는 어떻게 확인하나요?',
    answer:
      '구매 정보와 상품 상태를 확인한 후 안내받으실 수 있습니다. 신청 시 구매 내역과 수선이 필요한 부분의 사진을 준비해 주세요. 비용과 수선 가능 여부는 접수 후 판정 결과에 따라 안내됩니다.',
  },
  {
    question: '상품의 수선을 맡기고 싶어요!',
    answer:
      'HOKA A/S 온라인 접수 페이지에서 신청해 주세요. 구매처에 따라 접수 방법이 다를 수 있으므로, 매장이나 다른 판매처에서 구매한 상품은 먼저 구매처에 문의해 주세요.',
  },
];

export function ProductDetailAfterSalesContent() {
  return (
    <Stack gap="10" pt="6">
      <Typography as="p" variant="body5">
        HOKA 상품에 이상이 있거나 수선이 필요한 경우 구매처 또는 A/S 접수 창구로 문의해 주세요.
        <br />
        A/S 관련 문의는 고객센터 또는 1:1 문의를 이용해 주세요.
      </Typography>

      <Stack gap="8" border="1px solid var(--color-black-20)" p="8" _mobile={{ p: '4' }}>
        <Grid className={styles.contact}>
          <Typography as="h4" variant="body5" weight="bold">
            HOKA 온라인 스토어
          </Typography>
          <Stack gap="3">
            <Typography as="p" variant="body5">
              온라인 주문·배송·교환·반품 관련 문의
            </Typography>
            <Typography as="p" variant="body5">
              상담 채널과 운영시간은 고객센터에서 확인해 주세요.
            </Typography>
            <Typography variant="body5">
              <Link className={styles.link} href="/support">
                고객센터 안내
              </Link>
            </Typography>
          </Stack>
        </Grid>
        <Grid className={styles.contact}>
          <Typography as="h4" variant="body5" weight="bold">
            HOKA A/S 접수
          </Typography>
          <Stack gap="3">
            <Typography as="p" variant="body5">
              조이웍스 A/S 온라인 신청서
            </Typography>
            <Typography as="p" variant="body5">
              상품 수선 접수 및 진행 관련 문의
            </Typography>
            <Typography variant="body5">
              <a
                className={styles.link}
                href={serviceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                A/S 온라인 접수 (새 창)
              </a>
            </Typography>
          </Stack>
        </Grid>
        <Grid className={styles.action}>
          <Stack gap="2">
            <Typography as="h4" variant="body5" weight="bold">
              FAQs
            </Typography>
            <Typography as="p" variant="body5">
              자주 묻는 질문의 답변을 찾아보세요.
            </Typography>
          </Stack>
          <ButtonLink href="/support/faq" variant="secondary" size="short">
            자주 묻는 질문 찾기
          </ButtonLink>
        </Grid>
        <Grid className={styles.action}>
          <Stack gap="2">
            <Typography as="h4" variant="body5" weight="bold">
              1:1 문의
            </Typography>
            <Typography as="p" variant="body5">
              문의 내용을 남겨 주시면 확인 후 답변해 드리겠습니다.
            </Typography>
          </Stack>
          <ButtonLink href="/support/inquiries/new" variant="secondary" size="short">
            1:1 문의하기
          </ButtonLink>
        </Grid>
      </Stack>

      <Stack gap="6">
        <Typography as="h4" variant="heading9">
          A/S 처리 절차
        </Typography>
        <Typography as="p" variant="body5">
          온라인 신청 후 접수 안내에 따라 상품을 발송해 주세요. 수선 가능 여부와 비용, 처리 일정은
          상품 확인 후 안내됩니다.
        </Typography>
        <Grid
          as="ol"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          gap="10 4"
          listStyle="none"
          m="0"
          py="10"
          px="0"
          borderTop="2px solid var(--color-black-100)"
          borderBottom="1px solid var(--color-black-40)"
          _mobile={{
            gridTemplateColumns: '1fr',
            '& > li, & > li:nth-child(4), & > li:nth-child(5)': { gridColumn: 'auto' },
          }}
          css={{
            '& > li': { gridColumn: 'span 2', textAlign: 'center', alignItems: 'center' },
            '& > li:nth-child(4)': { gridColumn: '2 / 4' },
            '& > li:nth-child(5)': { gridColumn: '4 / 6' },
          }}
        >
          {steps.map((step, index) => (
            <Stack as="li" gap="3" key={step.title}>
              <Icon fontAwesomeIcon={step.icon} size="48px" />
              <Typography variant="cta2">STEP {index + 1}</Typography>
              <Typography variant="body5" weight="bold">
                {step.title}
              </Typography>
              <Typography as="p" variant="body5">
                {step.description}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Stack>

      <Grid
        gridTemplateColumns="160px minmax(0, 1fr)"
        gap="8"
        _mobile={{ gridTemplateColumns: '1fr', gap: '6' }}
      >
        <Typography as="h4" variant="heading8">
          궁금하신 점이 있으세요?
        </Typography>
        <Stack gap="8">
          {questions.map(({ question, answer }) => (
            <Box key={question} pb="8" borderBottom="1px solid var(--color-black-20)">
              <Stack gap="4">
                <Typography as="h5" variant="body4" weight="bold">
                  Q. {question}
                </Typography>
                <Typography as="p" variant="body5">
                  {answer}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Grid>
    </Stack>
  );
}
