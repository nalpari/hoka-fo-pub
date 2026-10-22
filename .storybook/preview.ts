import type { Preview } from 'storybook';
import '../src/shared/styles/global.scss';

const preview: Preview = {
  parameters: {
    nextjs: { appDirectory: true },
    a11y: { test: 'todo' },
    controls: { expanded: true },
    layout: 'padded',
    options: {
      storySort: {
        order: [
          'Development',
          [
            'FormStateAudit',
            [
              'PC',
              ['Validation', 'Expired', 'Inheritance'],
              'MO',
              ['Validation', 'Expired', 'Inheritance'],
            ],
          ],
          'PAGES',
          [
            '*',
            '고객센터',
            [
              '0. 고객센터 메인',
              ['WEB', 'Mobile'],
              '1. FAQs',
              ['WEB', 'Mobile'],
              '2. 공지사항',
              ['WEB', 'Mobile'],
              '3. 1:1문의',
              ['WEB', 'Mobile'],
              '4. 매장 찾기',
              ['WEB', 'Mobile'],
              '5. 온라인 회원 등급 안내',
              ['WEB', 'Mobile'],
              '6. 사이즈 가이드',
              ['WEB', 'Mobile'],
              '7. 배송 및 반품안내',
              ['WEB', 'Mobile'],
              '8. 세탁 및 손질 방법 안내',
              ['WEB', 'Mobile'],
              '9. 약관',
              ['WEB', 'Mobile'],
            ],
          ],
        ],
      },
    },
    viewport: {
      options: {
        hoka3840: {
          name: 'HOKA · 3840px',
          styles: { width: '3840px', height: '2160px' },
          type: 'desktop',
        },
        hoka2560: {
          name: 'HOKA · 2560px',
          styles: { width: '2560px', height: '1440px' },
          type: 'desktop',
        },
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
