import { Box } from 'styled-system/jsx';
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/components/common/molecules/Breadcrumb/Breadcrumb';

type Props = { breadcrumbs: BreadcrumbItem[] };

export function MyPageBreadcrumbs({ breadcrumbs }: Props) {
  return (
    <Box px="4" pt="6" pb="2">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: '마이페이지', href: '/mypage' },
          ...breadcrumbs,
        ]}
      />
    </Box>
  );
}
