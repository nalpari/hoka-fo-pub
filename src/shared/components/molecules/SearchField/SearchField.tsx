import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';

const input = css({
  '&&': {
    minW: '0!',
    minH: '0!',
    h: '100%!',
    p: '0!',
    border: '0!',
    borderRadius: '0!',
    bg: 'transparent!',
    fontFamily: 'korean',
    fontSize: '16',
    letterSpacing: 'korean',
    _placeholder: { color: 'black.40' },
    _focusVisible: { outline: 'none!' },
  },
});

export type SearchFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  onSearch?: () => void;
};

export function SearchField({
  label,
  placeholder,
  value,
  onValueChange,
  onSearch,
}: SearchFieldProps) {
  return (
    <HStack
      as="form"
      role="search"
      w="100%"
      h="56px"
      px="3"
      gap="2.5"
      flexDirection={{ base: 'row-reverse', _mobile: 'row' }}
      borderWidth="1px"
      borderStyle="solid"
      borderColor="black.100"
      bg="white.0"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.();
      }}
    >
      {onSearch ? (
        <IconButton type="submit" aria-label="검색 실행" size="16px">
          <Icon aria-hidden="true" fontAwesomeIcon={faMagnifyingGlass} size="16px" />
        </IconButton>
      ) : (
        <Icon aria-hidden="true" fontAwesomeIcon={faMagnifyingGlass} size="16px" />
      )}
      <TextInput
        aria-label={label}
        className={input}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      />
    </HStack>
  );
}
