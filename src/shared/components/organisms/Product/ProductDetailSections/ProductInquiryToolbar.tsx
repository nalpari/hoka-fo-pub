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
      borderBottom="1px solid var(--color-black-100)"
    >
      <Checkbox
        className={css({ color: 'var(--color-black-40)', fontSize: '14' })}
        label="비밀글 제외"
        checked={privateOnly}
        onCheckedChange={onPrivateOnlyChange}
      />
      <Button
        className={css({
          minW: '120px',
          minH: '10',
          borderColor: 'var(--color-black-100)',
          bg: 'var(--color-black-100)',
          color: 'var(--color-white-000)',
          fontWeight: 'bold',
        })}
        variant="primary"
      >
        문의하기
      </Button>
    </Flex>
  );
}
