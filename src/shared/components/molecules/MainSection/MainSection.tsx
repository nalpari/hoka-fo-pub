import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export type MainSectionProps = {
  title: string;
  actionSlot?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Keeps the header in the content frame while allowing the content rail to span the viewport. */
  contentWidth?: 'contained' | 'fullBleed';
  spacing?: 'default' | 'compact';
};

const section = css({
  w: '100%',
});
const header = css({
  w: 'min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))',
  mx: 'auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  _mobile: {
    w: 'calc(100% - 32px)',
  },
});
const content = css({
  w: 'min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))',
  mx: 'auto',
  _mobile: { w: '100%' },
});
const fullBleedContent = css({
  w: '100vw',
  mx: 'calc(50% - 50vw)',
});
const heading = css({
  m: '0',
  fontFamily: 'var(--main-section-heading-font-family)',
  fontSize: 'var(--main-section-heading-font-size)',
  fontWeight: 'var(--main-section-heading-font-weight)',
  lineHeight: 'var(--main-section-heading-line-height)',
  color: 'var(--main-section-heading-color)',
  _mobile: {
    fontSize: 'var(--main-section-heading-mobile-font-size)',
    lineHeight: 'var(--main-section-heading-mobile-line-height)',
  },
});

/** A home-page content region with a heading and optional header controls. */
export function MainSection({
  title,
  actionSlot,
  children,
  className,
  contentWidth = 'contained',
  spacing = 'default',
}: MainSectionProps) {
  return (
    <section className={[section, className].filter(Boolean).join(' ')}>
      <VStack
        alignItems="flex-start"
        gap={
          spacing === 'compact'
            ? { base: '32px', _mobile: '24px' }
            : { base: '40px', _mobile: '24px' }
        }
      >
        <HStack className={header}>
          <h2 className={heading}>{title}</h2>
          {actionSlot}
        </HStack>
        <div className={contentWidth === 'fullBleed' ? fullBleedContent : content}>{children}</div>
      </VStack>
    </section>
  );
}
