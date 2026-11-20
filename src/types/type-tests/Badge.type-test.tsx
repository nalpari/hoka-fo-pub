import { Badge } from '@/components/common/atoms/Badge';

const address = (
  <Badge variant="outlined" visual="square">
    기본 배송지
  </Badge>
);

const muted = (
  <Badge visual="round" tone="tertiary">
    구매확정
  </Badge>
);

const promotion = (
  <Badge variant="plain" tone="red80">
    Exclusive
  </Badge>
);

// @ts-expect-error Appearance is independent of the address label.
const invalidVariant = <Badge variant="address">기본 배송지</Badge>;

void [address, muted, promotion, invalidVariant];

// @ts-expect-error Filled badges require an explicit shape.
void (<Badge variant="filled">배송완료</Badge>);
