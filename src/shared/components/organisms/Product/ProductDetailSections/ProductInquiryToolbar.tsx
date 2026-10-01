import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';

type ProductInquiryToolbarProps = {
  privateOnly: boolean;
  onPrivateOnlyChange: (privateOnly: boolean) => void;
};

export function ProductInquiryToolbar({
  privateOnly,
  onPrivateOnlyChange,
}: ProductInquiryToolbarProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      pb="5"
      borderBottom="1px solid #111"
    >
      <Checkbox
        className={css({ color: '#9aa2af', fontSize: '14px' })}
        label="비밀글 제외"
        checked={privateOnly}
        onChange={(event) => onPrivateOnlyChange(event.target.checked)}
      />
      <Button
        className={css({
          minW: '120px',
          minH: '10',
          borderColor: '#111',
          bg: '#111',
          color: '#fff',
          fontWeight: '700',
        })}
        variant="primary"
      >
        문의하기
      </Button>
    </Flex>
  );
}
