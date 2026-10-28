import { ClaimProductQuantity } from './ClaimProductQuantity';
import { ClaimProductChoice } from './ClaimProductChoice';
import { Stack } from 'styled-system/jsx';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { css } from 'styled-system/css';
import type { ClaimKind, OrderLine } from './orders.types';

type Props = {
  items: readonly OrderLine[];
  kind: ClaimKind;
  quantities: Record<string, number>;
  onToggle: (line: OrderLine, checked: boolean) => void;
  onQuantity: (key: string, quantity: number) => void;
};

/** 신청할 상품의 선택과 허용 수량 입력을 표시합니다. (Displays selectable claim products and bounded quantities.) */
export function ClaimProductSelection({ items, kind, quantities, onToggle, onQuantity }: Props) {
  return (
    <ContentSection
      title="상품 선택"
      gap="0"
      headerProps={{
        titleAs: 'h2',
        titleProps: { variant: 'body3', weight: 'semibold' },
        css: css.raw({ pb: '3', borderBottom: '1px solid var(--colors-black-100)' }),
      }}
    >
      <Stack as="ul" gap="0" listStyleType="none">
        {items.map((line) => (
          <Stack
            as="li"
            key={line.key}
            gap="4"
            py="4"
            borderBottom="1px solid var(--colors-black-20)"
          >
            <ClaimProductChoice
              line={line}
              checked={Boolean(quantities[line.key])}
              onToggle={onToggle}
            />
            {kind === 'cancel' ? (
              <ClaimProductQuantity
                productKey={line.key}
                max={line.quantity}
                value={quantities[line.key] || 1}
                onQuantity={onQuantity}
              />
            ) : null}
          </Stack>
        ))}
      </Stack>
    </ContentSection>
  );
}
