import type { ReactNode } from 'react';
import { Disclosure } from '@/shared/components/atoms/Disclosure/Disclosure';

type ProductInquiryNoticeSectionProps = {
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  title: string;
};

export function ProductInquiryNoticeSection({
  children,
  isOpen,
  onToggle,
  title,
}: ProductInquiryNoticeSectionProps) {
  return (
    <Disclosure open={isOpen} onOpenChange={onToggle} title={title}>
      <p style={{ margin: 0 }}>{children}</p>
    </Disclosure>
  );
}
