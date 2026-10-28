'use client';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Accordion } from '@/components/common/atoms/Accordion/Accordion';
import { Typography } from '@/components/common/atoms/Typography/Typography';

const cautions = [
  '특정 상품에 대한 문의는 상품 정보 상세 페이지를 이용해 주시기 바랍니다.',
  '등록된 문의는 수정 및 삭제가 불가능합니다.',
  '1:1 문의에 주소, 연락처 등 개인정보 및 계좌정보를 남기실 경우, 질문이 삭제될 수 있습니다.',
  '계좌정보는 MY > 계정관리 > 환불계좌관리에 등록해 주시기 바랍니다.',
];

const trigger = css({
  px: '0',
  py: '0',
  minH: '24px',
  textAlign: 'left',
});

const panel = css({ pt: '3' });

/** 문의 화면에서 확인할 유의사항을 펼쳐 보여줍니다. (Shows expandable cautions for the inquiry page.) */
export function InquiryCautions() {
  return (
    <Box borderTop="1px solid token(colors.black.20)" py="5">
      <Accordion
        defaultValue={['cautions']}
        indicatorColor="var(--color-text-primary)"
        multiple={false}
        triggerClassName={trigger}
        panelClassName={panel}
        items={[
          {
            value: 'cautions',
            title: (
              <Typography variant="body4" weight="medium" tone="primary">
                유의사항
              </Typography>
            ),
            content: (
              <Stack as="ul" gap="0" listStyleType="none">
                {cautions.map((item) => (
                  <HStack as="li" key={item} alignItems="flex-start" gap="1">
                    <Typography as="span" variant="body5" tone="tertiary" aria-hidden="true">
                      ・
                    </Typography>
                    <Typography variant="body5" tone="tertiary">
                      {item}
                    </Typography>
                  </HStack>
                ))}
              </Stack>
            ),
          },
        ]}
      />
    </Box>
  );
}
