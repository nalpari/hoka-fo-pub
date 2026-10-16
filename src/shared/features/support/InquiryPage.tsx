'use client';

import { Box, HStack, Stack } from 'styled-system/jsx';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { InquiryCautions } from '@/shared/features/support/InquiryCautions';

type InquiryPreview = 'empty' | 'pending' | 'answered';

export function InquiryPage({ preview = 'empty' }: { preview?: InquiryPreview }) {
  const inquiries = preview === 'empty' ? [] : [
    { id: '1', title: '문의하기 타이틀 노출 영역', answered: preview === 'answered' },
  ];

  return (
    <CustomerCenterLayout
      activePath="/support/inquiries"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '1:1 문의' },
      ]}
      groups={supportNavigation}
      hideIntroMobile
    >
      <Stack gap="4" mb="4">
        <Typography as="h2" web="heading6" mo="heading7">1:1 문의</Typography>
        <Typography as="p" web="body3" mo="body3">
          궁금하신 점이나 불편한 사항을 알려주시면 정성껏 답변해 드리겠습니다.
        </Typography>
      </Stack>
      <Box h="1px" bg="black.20" />

      <Stack gap="0" py="8" _mobile={{ py: '6' }}>
        {inquiries.length === 0 ? (
          <Box py="16" textAlign="center" minH={{ base: '430px', _mobile: '146px' }}>
            <Typography web="body3" mo="body4" tone="tertiary">
              등록된 문의사항이 없습니다.
            </Typography>
          </Box>
        ) : (
          inquiries.map((item) => {
            const question = (
              <HStack as="span" w="100%" gap={{ base: '4', _mobile: '3' }} alignItems="flex-start">
                <Typography web="heading7" mo="body2">Q</Typography>
                <Stack as="span" gap="3" flex="1" minW="0">
                  <Stack as="span" gap="2" alignItems="flex-start">
                    <Box as="span" px="2" py="1.5" borderRadius="full" border={item.answered ? undefined : '1px solid'} borderColor="black.40" bg={item.answered ? 'black.20' : undefined}>
                      <Typography web="body5" mo="body5" tone={item.answered ? 'tertiary' : undefined}>
                        {item.answered ? '답변완료' : '접수완료'}
                      </Typography>
                    </Box>
                    <Typography web="heading9" mo="heading9">{item.title}</Typography>
                  </Stack>
                  <Typography as="span" web="body4" mo="body4">
                    문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역
                  </Typography>
                </Stack>
              </HStack>
            );

            return (
              <Box key={item.id} py="4" borderBottom="1px solid" borderColor="black.20">
                {item.answered ? (
                  <Accordion
                    defaultValue={[item.id]}
                    multiple={false}
                    indicator={null}
                    items={[{
                      value: item.id,
                      title: question,
                      content: (
                        <HStack gap={{ base: '4', _mobile: '3' }} mt="4" alignItems="flex-start">
                          <Typography web="heading7" mo="body2">A</Typography>
                          <Box flex="1" minW="0" p="4" bg="black.10">
                            <Typography as="p" web="body4" mo="body4">
                              문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역
                            </Typography>
                          </Box>
                        </HStack>
                      ),
                    }]}
                  />
                ) : question}
              </Box>
            );
          })
        )}
      </Stack>

      <InquiryCautions />
      <Box mt="6" maxW="500px" mx="auto">
        <ButtonLink href="/support/inquiries/new" variant="primary" fullWidth>
          1:1 문의하기
        </ButtonLink>
      </Box>
    </CustomerCenterLayout>
  );
}
