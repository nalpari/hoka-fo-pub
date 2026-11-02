import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';

import { ContentSection } from '@/components/common/layouts/ContentSection';

const links = [
  {
    href: '/support/inquiries/new',
    title: '1:1 문의',
    text: '1:1 문의를 남겨 주시면 빠른 시간 내에 도와드리겠습니다.',
    label: '1:1 문의하기',
  },
  {
    href: '/support/faq',
    title: 'FAQs',
    text: '가장 자주 묻는 질문과 답변을 찾아보세요.',
    label: 'FAQs 바로가기',
  },
];

/** 고객센터의 문의 작성과 FAQ 바로가기를 표시합니다. (Displays customer support inquiry and FAQ shortcuts.) */
export function SupportQuickLinks() {
  return (
    <Stack
      direction={{ base: 'row', _mobile: 'column' }}
      gap={{ base: '52px', _mobile: '6' }}
      border="1px solid"
      borderColor="black.20"
      p="8"
      _mobile={{ px: '0' }}
    >
      {links.map((item, index) => (
        <ContentSection
          as="section"
          aria-label={item.title}
          title={item.title}
          headerProps={{
            gap: '2',
            titleAs: 'h2',
            titleProps: {
              web: 'heading9',
              mo: 'heading6',
              language: 'ko',
              className: css({ _mobile: { fontWeight: 'bold' } }),
            },
            description: item.text,
            descriptionProps: { variant: 'body4', tone: 'subtle' },
          }}
          footer={
            <ButtonLink href={item.href} variant="secondary" size="short" density="compact">
              {item.label}
            </ButtonLink>
          }
          key={item.href}
          flex="1"
          minW="0"
          alignItems="flex-start"
          gap={{ base: '4', _mobile: '5' }}
          position="relative"
          _mobile={{ px: '4' }}
          css={
            index === 1
              ? {
                  _before: {
                    content: '""',
                    position: 'absolute',
                    left: '-26px',
                    top: '0',
                    bottom: '0',
                    width: '1px',
                    bg: 'black.20',
                    _mobile: {
                      left: '0',
                      right: '0',
                      bottom: 'auto',
                      width: 'auto',
                      height: '1px',
                    },
                  },
                  _mobile: { pt: '6' },
                }
              : undefined
          }
        ></ContentSection>
      ))}
    </Stack>
  );
}
