import { HStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';

type SearchHeaderProps = { onClose: () => void };

/** 전체 검색 패널의 닫기 행을 표시합니다. (Displays the close row of the global search panel.) */
export function SearchHeader({ onClose }: SearchHeaderProps) {
  return (
    <HStack
      h="56px"
      px="16px"
      justifyContent="flex-end"
      gap="0"
      borderBottom="1px solid {colors.black.20}"
    >
      <Button variant="icon" aria-label="검색 닫기" size="24px" onClick={onClose}>
        <Icon name="hoka-action-xmark-regular" size="16px" />
      </Button>
    </HStack>
  );
}
