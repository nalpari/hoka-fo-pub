import type { ReactNode } from 'react';
import { Disclosure } from '@/shared/components/molecules/Disclosure/Disclosure';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const content = css({ m: '0' });

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
      <Typography as="p" className={content}>
        {children}
      </Typography>
    </Disclosure>
  );
}
