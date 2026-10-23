import type { ReactNode } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { BottomSheet } from '@/shared/components/layouts/BottomSheet/BottomSheet';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const sortPills = css({
  '&[role="radiogroup"]': { display: 'flex', flexWrap: 'wrap', gap: '2' },
});

const sortPill = css({
  border: '1px solid var(--color-black-20)',
  borderRadius: 'full',
  px: '3',
  py: '1.5',
  cursor: 'pointer',
  color: 'black.100',
  bg: 'white.0',
  '&[data-checked]': { bg: 'black.100', color: 'white.0', borderColor: 'black.100' },
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
});

type MobileProductFilterProps = {
  children: ReactNode;
  resultCount: number;
  onClose: () => void;
  onApply: () => void;
  sort: string;
  onSortChange: (sort: string) => void;
};

/** Mobile-only filter bottom sheet for the product listing. */
export function MobileProductFilter({
  children,
  resultCount,
  onClose,
  onApply,
  sort,
  onSortChange,
}: MobileProductFilterProps) {
  return (
    <BottomSheet
      ariaLabel="상품 필터"
      footer={
        <Button onClick={onApply} variant="primary">
          필터 적용하기 ({resultCount})
        </Button>
      }
      onClose={onClose}
      title="필터"
    >
      <>
        <ContentSection
          as="section"
          title="정렬"
          gap="4"
          pb="6"
          headerProps={{ titleProps: { variant: 'bodyKr3', weight: 'bold' } }}
        >
          <Radio
            ariaLabel="상품 정렬"
            variant="custom"
            className={sortPills}
            optionClassName={sortPill}
            value={sort}
            onValueChange={onSortChange}
            options={['베스트순', '신상품순', '높은가격순', '낮은가격순'].map((value) => ({
              label: <Typography variant="bodyKr5">{value}</Typography>,
              value,
            }))}
          />
        </ContentSection>
        {children}
      </>
    </BottomSheet>
  );
}
