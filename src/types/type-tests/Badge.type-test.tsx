import { Badge } from '@/components/common/atoms/Badge';

const runClubRoad = <Badge runClubCategory="Road" />;

const runClubTrail = (
  <Badge runClubCategory="Trail" className="category-badge" aria-label="Trail" />
);

// @ts-expect-error Run club labels are generated from the category.
const customCategoryLabel = <Badge runClubCategory="Road">Custom</Badge>;

// @ts-expect-error A category cannot also select a launch status.
const categoryAndStatus = <Badge runClubCategory="Road" status="COMING" />;

// @ts-expect-error A category cannot also select promotional labels.
const categoryAndPromotion = <Badge runClubCategory="Road" promotion="Best" />;

// @ts-expect-error The category owns its appearance.
const categoryAndVariant = <Badge runClubCategory="Road" variant="line" />;

// @ts-expect-error Categories are limited to supported run club labels.
const invalidCategory = <Badge runClubCategory="Track" />;

void [
  runClubRoad,
  runClubTrail,
  customCategoryLabel,
  categoryAndStatus,
  categoryAndPromotion,
  categoryAndVariant,
  invalidCategory,
];
