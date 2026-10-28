import { Divider } from '@/components/common/atoms/Divider/Divider';
import { Stack } from 'styled-system/jsx';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { MyPageMenuItem, type MyPageMenuItemProps } from './MyPageMenuItem';

export function MyPageMenuSection({
  title,
  items,
}: {
  title: string;
  items: MyPageMenuItemProps[];
}) {
  return (
    <ContentSection
      as="section"
      gap="4"
      aria-label={title}
      title={<>{title}</>}
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading5' } }}
    >
      <Divider variant="strong" />
      <Stack gap="0">
        {items.map((item) => (
          <MyPageMenuItem key={item.to} label={item.label} to={item.to} />
        ))}
      </Stack>
    </ContentSection>
  );
}
