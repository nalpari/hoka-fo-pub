import type { ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import type { SystemStyleObject } from 'styled-system/types';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { TextInput, type TextInputProps } from '@/components/common/atoms/TextInput';

const input = css.raw({
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
  iconPlacement?: 'responsive' | 'start';
  as?: 'form' | 'div';
  icon?: ReactNode;
  rootStyles?: SystemStyleObject;
  inputStyles?: SystemStyleObject;
  inputProps?: Omit<
    Extract<TextInputProps, { multiline?: false }>,
    'value' | 'defaultValue' | 'onChange' | 'className' | 'multiline'
  >;
};

/** 검색어 입력과 선택적 검색 실행을 표시합니다. (Displays a search input with an optional search action.) */
export function SearchField({
  label,
  placeholder,
  value,
  onValueChange,
  onSearch,
  iconPlacement = 'responsive',
  as = 'form',
  icon,
  rootStyles,
  inputStyles,
  inputProps,
}: SearchFieldProps) {
  const searchIcon = icon ?? <Icon name="magnifying-glass-regular" size={16} aria-hidden="true" />;

  return (
    <Box
      as={as}
      role={as === 'form' ? 'search' : undefined}
      className={css(
        {
          display: 'flex',
          alignItems: 'center',
          w: '100%',
          h: '56px',
          px: '3',
          gap: '2.5',
          flexDirection:
            iconPlacement === 'start' ? 'row' : { base: 'row-reverse', _mobile: 'row' },
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'black.100',
          bg: 'white.0',
        },
        rootStyles,
      )}
      onSubmit={
        as === 'form'
          ? (event) => {
              event.preventDefault();
              onSearch?.();
            }
          : undefined
      }
    >
      {onSearch ? (
        <Button variant="icon" type="submit" aria-label="검색 실행" size="16px">
          {searchIcon}
        </Button>
      ) : (
        searchIcon
      )}
      <TextInput
        {...inputProps}
        aria-label={label}
        className={css(input, inputStyles)}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      />
    </Box>
  );
}
