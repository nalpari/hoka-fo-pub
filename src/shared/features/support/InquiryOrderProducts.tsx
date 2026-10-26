import { Box, Flex, HStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { InquiryOrderSelection } from './inquiryOrderSelection.storage';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type Props = {
  invalid: boolean;
  onLookup: () => void;
  onSelectionChange: (selection: InquiryOrderSelection) => void;
  selection: InquiryOrderSelection;
};

/** 문의 대상 주문을 선택하거나 현재 선택 내용을 표시합니다. (Starts order lookup or displays the selected order.) */
export function InquiryOrderProducts({ invalid, onLookup, onSelectionChange, selection }: Props) {
  return selection ? (
    <Box border="1px solid token(colors.black.20)">
      <HStack
        justifyContent="space-between"
        p={{ base: '4', _mobile: '3' }}
        borderBottom="1px solid token(colors.black.20)"
        _mobile={{ alignItems: 'flex-start' }}
      >
        <Typography variant="body5" weight="medium">
          {selection.order.date}
        </Typography>
        <Button
          aria-label="선택한 주문 삭제"
          icon={<Icon fontAwesomeIcon={faXmark} size="16px" />}
          variant="ghost"
          onClick={() => onSelectionChange(null)}
        />
      </HStack>
      <Box p={{ base: '4', _mobile: '3' }} borderBottom="1px solid token(colors.black.20)">
        <Typography variant="body5" tone="tertiary">
          주문번호 : {selection.order.id}
        </Typography>
      </Box>
      <Box
        p={{ base: '4', _mobile: '3' }}
        borderBottom="1px solid token(colors.black.20)"
        whiteSpace="pre-line"
      >
        <Typography variant="body5" tone="tertiary">
          상품코드 : {selection.products.map((item) => item.code).join('\n')}
        </Typography>
      </Box>
      <Flex justifyContent="center" gap="2" p={{ base: '4', _mobile: '3' }}>
        <Button size="short" variant="primary" onClick={onLookup}>
          상품변경
        </Button>
        <Button size="short" variant="secondary" onClick={() => onSelectionChange(null)}>
          선택 초기화
        </Button>
      </Flex>
    </Box>
  ) : (
    <Flex
      direction="column"
      alignItems={{ base: 'flex-end', _mobile: 'stretch' }}
      gap="3"
      flex="1"
      pb="3"
    >
      <Box w={{ base: '180px', _mobile: '100%' }}>
        <Button size="tall" variant="primary" fullWidth onClick={onLookup}>
          주문 상품 조회
        </Button>
      </Box>
      <Flex as="p" w="100%" justifyContent={{ base: 'flex-end', _mobile: 'flex-start' }} m="0">
        <Typography variant="body5" tone={invalid ? 'error' : 'tertiary'}>
          {invalid
            ? '문의하실 주문 상품을 선택해주세요.'
            : '*주문 상품조회 버튼을 눌러 문의하실 주문 상품을 선택해 주세요.'}
        </Typography>
      </Flex>
    </Flex>
  );
}
