import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { faXmark } from '@/icons/fontAwesome';
import { HStack } from 'styled-system/jsx';

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
      <IconButton aria-label="검색 닫기" size="24px" onClick={onClose}>
        <Icon fontAwesomeIcon={faXmark} size="16px" />
      </IconButton>
    </HStack>
  );
}
