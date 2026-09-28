import type { Preview } from 'storybook';
import '../src/shared/styles/global.scss';

const preview: Preview = {
  parameters: {
    a11y: { test: 'todo' },
    controls: { expanded: true },
    layout: 'padded',
    options: { storySort: { order: ['Development', 'PAGES'] } },
    viewport: {
      options: {
        hoka1920: {
          name: 'HOKA · 1920px',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
        hoka1600: {
          name: 'HOKA · 1600px',
          styles: { width: '1600px', height: '1080px' },
          type: 'desktop',
        },
        hoka1200: {
          name: 'HOKA · 1200px',
          styles: { width: '1200px', height: '900px' },
          type: 'desktop',
        },
        hoka768: {
          name: 'HOKA · 768px',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        hoka375: {
          name: 'HOKA · 375px',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
      },
    },
  },
};
export default preview;
