'use client';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const cautions = [
  '특정 상품에 대한 문의는 상품 정보 상세 페이지를 이용해 주시기 바랍니다.',
  '등록된 문의는 수정 및 삭제가 불가능합니다.',
  '1:1 문의에 주소, 연락처 등 개인정보 및 계좌정보를 남기실 경우, 질문이 삭제될 수 있습니다.',
  '계좌정보는 MY > 계정관리 > 환불계좌관리에 등록해 주시기 바랍니다.',
];

const trigger = css({ px: '4', py: '4', textAlign: 'left' });

export function InquiryCautions() {
  return (
    <Box
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="black.40"
      pb="6"
      _mobile={{ borderBottom: '0' }}
    >
      <Accordion
        defaultValue={['cautions']}
        multiple={false}
        triggerClassName={trigger}
        items={[
          {
            value: 'cautions',
            title: <Typography web="heading9" mo="body4">유의사항 ⓘ</Typography>,
            content: (
              <Stack as="ul" gap="1" pl="5" pr="4" listStyleType="disc">
                {cautions.map((item) => (
                  <Box as="li" key={item}>
                    <Typography web="body4" mo="body5" tone="tertiary">
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ),
          },
        ]}
      />
    </Box>
  );
}
