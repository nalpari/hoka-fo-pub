import { ShopApp } from '@/shared/ShopApp';
import { css } from 'styled-system/css';

const webPlatform = css({ minW: 'var(--layout-web-min-width)' });

export default function WebApp() {
  return (
    <div className={webPlatform}>
      <ShopApp platform="web" />
    </div>
  );
}
