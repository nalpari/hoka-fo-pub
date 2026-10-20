import { Grid, Stack } from 'styled-system/jsx';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import {
  faBoxOpen,
  faClipboardList,
  faMagnifyingGlass,
  faScrewdriverWrench,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';

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

export function ProductAfterSalesProcess() {
  return (
    <ContentSection
      gap="6"
      title="A/S 처리 절차"
      headerProps={{
        gap: '6',
        titleAs: 'h4',
        titleProps: { variant: 'heading9' },
        description: (
          <>
            온라인 신청 후 접수 안내에 따라 상품을 발송해 주세요. 수선 가능 여부와 비용, 처리 일정은
            상품 확인 후 안내됩니다.
          </>
        ),
        descriptionProps: { variant: 'body5' },
      }}
    >
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
    </ContentSection>
  );
}
