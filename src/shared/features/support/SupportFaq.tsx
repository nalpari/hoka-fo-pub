import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Divider, Stack } from 'styled-system/jsx';
import { PageActionButton } from '@/shared/components/molecules/PageActionButton/PageActionButton';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function SupportFaq() {
  return (
    <ContentSection
      as="section"
      aria-labelledby="support-faq-title"
      gap="0"
      header={
        <Stack gap="6" _mobile={{ gap: '4' }}>
          <Typography as="h2" web="heading7" mo="heading5" id="support-faq-title">
            FAQs
          </Typography>
          <Divider
            aria-hidden="true"
            orientation="horizontal"
            h="2px"
            bg="black.100"
            display={{ base: 'block', _mobile: 'none' }}
          />
        </Stack>
      }
    >
      <Stack
        gap="6"
        pt="16"
        alignItems="center"
        _mobile={{ pt: '4', gap: '4', alignItems: 'stretch' }}
      >
        <Typography as="p" variant="body3">
          가장 자주 찾는 질문의 답변을 찾아보세요!
        </Typography>
        <PageActionButton href="/support/faq" width="compact" containerProps={{ pt: '0' }}>
          FAQs 바로가기
        </PageActionButton>
      </Stack>
    </ContentSection>
  );
}
