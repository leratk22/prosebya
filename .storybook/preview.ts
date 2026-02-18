import type { Preview } from '@storybook/nextjs'
import '../app/globals.css' // Импортируем globals.css, который содержит @font-face для шрифтов

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    viewport: {
      // Дефолтный viewport - мобильная версия (до 440px)
      defaultViewport: 'mobile1',
      disable: false,
      viewports: {
        mobile1: {
          name: 'Mobile (375px)',
          styles: {
            width: '375px',
            height: '667px',
          },
          type: 'mobile',
        },
        mobile2: {
          name: 'Mobile (360px)',
          styles: {
            width: '360px',
            height: '640px',
          },
          type: 'mobile',
        },
        desktop: {
          name: 'Desktop (768px)',
          styles: {
            width: '768px',
            height: '1024px',
          },
          type: 'desktop',
        },
        desktopLarge: {
          name: 'Desktop Large (1024px)',
          styles: {
            width: '1024px',
            height: '768px',
          },
          type: 'desktop',
        },
      },
    },
  },
};

export default preview;