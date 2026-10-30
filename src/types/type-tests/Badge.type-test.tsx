import { Badge } from '@/components/common/atoms/Badge';

const runningSessionRoad = <Badge runningSessionCategory="Road" />;

const runningSessionTrail = (
  <Badge runningSessionCategory="Trail" className="category-badge" aria-label="Trail" />
);

// @ts-expect-error Run club labels are generated from the category.
const customCategoryLabel = <Badge runningSessionCategory="Road">Custom</Badge>;

// @ts-expect-error A category cannot also select a launch status.
const categoryAndStatus = <Badge runningSessionCategory="Road" status="COMING" />;

// @ts-expect-error A category cannot also select promotional labels.
const categoryAndPromotion = <Badge runningSessionCategory="Road" promotion="Best" />;

// @ts-expect-error The category owns its appearance.
const categoryAndVariant = <Badge runningSessionCategory="Road" variant="line" />;

// @ts-expect-error Categories are limited to supported run club labels.
const invalidCategory = <Badge runningSessionCategory="Track" />;

void [
  runningSessionRoad,
  runningSessionTrail,
  customCategoryLabel,
  categoryAndStatus,
  categoryAndPromotion,
  categoryAndVariant,
  invalidCategory,
];
