import { css } from 'styled-system/css';
import { usePlatform } from '@/shared/context/platform';
import { FooterNavigationWeb } from './FooterNavigationWeb';
import { FooterNavigationMobile } from './FooterNavigationMobile';

const styles = {
  section: css({
    gridArea: 'navigation',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gap: 0,
    _mobile: { display: 'block', gridTemplateColumns: 'none' },
  }),
};

export function FooterNavigation() {
  const platform = usePlatform();

  return (
    <section className={styles.section} aria-label="Footer navigation">
      {platform === 'web' ? <FooterNavigationWeb /> : <FooterNavigationMobile />}
    </section>
  );
}
