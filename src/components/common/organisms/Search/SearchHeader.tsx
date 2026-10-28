import { HStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';

import { faXmark } from '@/icons/fontAwesome';

type SearchHeaderProps = { onClose: () => void };

export function SearchHeader({ onClose }: SearchHeaderProps) {
  return (
    <HStack
      h="56px"
      px="16px"
      justifyContent="flex-end"
      gap="0"
      borderBottom="1px solid"
      borderColor="black.20"
    >
      <Button variant="icon" aria-label="검색 닫기" size="24px" onClick={onClose}>
        <Icon fontAwesomeIcon={faXmark} size="16px" />
      </Button>
    </HStack>
  );
}
