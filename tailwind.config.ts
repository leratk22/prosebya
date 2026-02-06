import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Примитивные цвета (базовые значения)
      colors: {
        // Брендовые цвета
        brand: {
          orange: '#ffb800',
          'orange-hover': '#f6a300',
          'orange-muted': '#f9f5ec',
          'orange-overlay-70': 'rgba(255, 184, 0, 0.6)',
          'orange-overlay-30': 'rgba(255, 184, 0, 0.3)',
          blue: '#344079',
          'blue-alpha-70': 'rgba(52, 64, 121, 0.7)',
          'blue-alpha-20': 'rgba(52, 64, 121, 0.2)',
          'blue-alpha-10': 'rgba(52, 64, 121, 0.1)',
        },
        // Основные цвета
        core: {
          DEFAULT: '#22263b',
          'alpha-80': 'rgba(34, 38, 59, 0.8)',
          'alpha-60': 'rgba(34, 38, 59, 0.6)',
          'alpha-40': 'rgba(34, 38, 59, 0.4)',
          'alpha-20': 'rgba(34, 38, 59, 0.2)',
          'alpha-10': 'rgba(34, 38, 59, 0.1)',
          'alpha-5': 'rgba(34, 38, 59, 0.05)',
        },
        // Инвертированные основные цвета
        'core-inverted': {
          DEFAULT: '#ffffff',
          'alpha-80': 'rgba(255, 255, 255, 0.8)',
          'alpha-60': 'rgba(255, 255, 255, 0.6)',
          'alpha-40': 'rgba(255, 255, 255, 0.4)',
          'alpha-20': 'rgba(255, 255, 255, 0.2)',
          'alpha-10': 'rgba(255, 255, 255, 0.1)',
          'alpha-5': 'rgba(255, 255, 255, 0.05)',
        },
        // Серые цвета
        gray: {
          core: '#eaeff8',
          light: '#f4f6fa',
          muted: '#e7e9ed',
          dark: '#9199ba',
        },
        // Системные цвета
        system: {
          black: '#000000',
          white: '#ffffff',
        },
        // Цвета обратной связи
        feedback: {
          negative: '#f15d56',
          'negative-neon': '#f1567b',
          'negative-overlay': 'rgba(241, 93, 86, 0.05)',
          positive: '#759f45',
          'positive-neon': '#3ccba9',
          'positive-overlay': 'rgba(117, 159, 69, 0.05)',
          warning: '#ffd452',
          'warning-neon': '#ffdc52',
          'warning-overlay': 'rgba(255, 212, 82, 0.05)',
        },
        // Семантические цвета для Light режима
        light: {
          // Системные цвета
          system: {
            black: '#000000',
            white: '#ffffff',
          },
          // Границы
          border: {
            positive: '#759f45',
            warning: '#ffd452',
            negative: '#f15d56',
            'button-secondary': 'rgba(52, 64, 121, 0.2)',
            'button-secondary-inverted': 'rgba(255, 255, 255, 0.2)',
            disabled: 'rgba(34, 38, 59, 0.1)',
            primary: 'rgba(34, 38, 59, 0.2)',
            secondary: 'rgba(34, 38, 59, 0.1)',
            'inverted-primary': 'rgba(255, 255, 255, 0.1)',
            accent: '#344079',
            'button-tertiary': 'rgba(52, 64, 121, 0.1)',
          },
          // Фон
          bg: {
            primary: '#ffffff',
            secondary: '#eaeff8',
            tertiary: '#f4f6fa',
            disabled: '#e7e9ed',
            dark: '#9199ba',
            'accent-overlay': 'rgba(52, 64, 121, 0.1)',
            accent: '#344079',
            pressed: 'rgba(34, 38, 59, 0.05)',
            'overlay-dark': 'rgba(34, 38, 59, 0.05)',
            'overlay-full': 'rgba(34, 38, 59, 0.8)',
            'overlay-video': 'rgba(34, 38, 59, 0.6)',
            'overlay-light': 'rgba(255, 255, 255, 0.1)',
            feedback: {
              positive: '#759f45',
              'positive-overlay': 'rgba(117, 159, 69, 0.05)',
              negative: '#f15d56',
              'negative-overlay': 'rgba(241, 93, 86, 0.05)',
              warning: '#ffd452',
              'warning-overlay': 'rgba(255, 212, 82, 0.05)',
              'positive-neon': '#3ccba9',
              'negative-neon': '#f1567b',
              'warning-neon': '#ffdc52',
            },
            'accent-brand-overlay': 'rgba(255, 184, 0, 0.6)',
            'accent-brand-overlay-light': 'rgba(255, 184, 0, 0.3)',
            action: '#ffb800',
            'button-pressed': '#f6a300',
            'accent-brand': '#ffb800',
            'accent-content': '#f9f5ec',
          },
          // Передний план (текст, иконки)
          fg: {
            primary: '#22263b',
            secondary: 'rgba(34, 38, 59, 0.8)',
            tertiary: 'rgba(34, 38, 59, 0.6)',
            muted: 'rgba(34, 38, 59, 0.4)',
            accent: '#344079',
            'accent-muted': 'rgba(52, 64, 121, 0.7)',
            inverted: {
              primary: '#ffffff',
              secondary: 'rgba(255, 255, 255, 0.8)',
              tertiary: 'rgba(255, 255, 255, 0.6)',
              muted: 'rgba(255, 255, 255, 0.4)',
            },
            feedback: {
              positive: '#759f45',
              warning: '#ffd452',
              negative: '#f15d56',
            },
          },
        },
        // Семантические цвета для Dark режима
        dark: {
          // Системные цвета
          system: {
            black: '#ffffff',
            white: '#000000',
          },
          // Границы
          border: {
            positive: '#759f45',
            warning: '#ffd452',
            negative: '#f15d56',
            'button-secondary': 'rgba(255, 255, 255, 0.2)',
            'button-secondary-inverted': 'rgba(34, 38, 59, 0.2)',
            disabled: 'rgba(255, 255, 255, 0.1)',
            primary: 'rgba(34, 38, 59, 0.2)',
            secondary: 'rgba(34, 38, 59, 0.1)',
            'inverted-primary': 'rgba(34, 38, 59, 0.1)',
            accent: '#344079',
            'button-tertiary': 'rgba(255, 255, 255, 0.1)',
          },
          // Фон
          bg: {
            primary: '#22263b',
            secondary: '#eaeff8',
            tertiary: '#f4f6fa',
            disabled: '#e7e9ed',
            dark: '#9199ba',
            'accent-overlay': 'rgba(52, 64, 121, 0.1)',
            accent: '#344079',
            pressed: 'rgba(255, 255, 255, 0.05)',
            'overlay-dark': 'rgba(34, 38, 59, 0.05)',
            'overlay-full': 'rgba(34, 38, 59, 0.8)',
            'overlay-video': 'rgba(34, 38, 59, 0.6)',
            'overlay-light': 'rgba(255, 255, 255, 0.1)',
            feedback: {
              positive: '#759f45',
              'positive-overlay': 'rgba(117, 159, 69, 0.05)',
              negative: '#f15d56',
              'negative-overlay': 'rgba(241, 93, 86, 0.05)',
              warning: '#ffd452',
              'warning-overlay': 'rgba(255, 212, 82, 0.05)',
              'positive-neon': '#3ccba9',
              'negative-neon': '#f1567b',
              'warning-neon': '#ffdc52',
            },
            'accent-brand-overlay': 'rgba(255, 184, 0, 0.6)',
            'accent-brand-overlay-light': 'rgba(255, 184, 0, 0.3)',
            action: '#ffb800',
            'button-pressed': '#f6a300',
            'accent-brand': '#ffb800',
            'accent-content': '#f9f5ec',
          },
          // Передний план (текст, иконки)
          fg: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.8)',
            tertiary: 'rgba(255, 255, 255, 0.6)',
            muted: 'rgba(255, 255, 255, 0.4)',
            accent: '#344079',
            'accent-muted': 'rgba(52, 64, 121, 0.7)',
            inverted: {
              primary: '#22263b',
              secondary: 'rgba(34, 38, 59, 0.8)',
              tertiary: 'rgba(34, 38, 59, 0.6)',
              muted: 'rgba(34, 38, 59, 0.4)',
            },
            feedback: {
              positive: '#759f45',
              warning: '#ffd452',
              negative: '#f15d56',
            },
          },
        },
      },
      // Шрифты
      fontFamily: {
        sans: ['Euclid Circular A', 'sans-serif'],
        'euclid': ['Euclid Circular A', 'sans-serif'],
      },
      // Размеры шрифтов (базовые значения из Numbers)
      fontSize: {
        // Используем значения из Numbers для размеров шрифтов
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
        '7': '7px',
        '8': '8px',
        '9': '9px',
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '20': '20px',
        '24': '24px',
        '28': '28px',
        '32': '32px',
        '36': '36px',
        '40': '40px',
        '44': '44px',
        '48': '48px',
        '52': '52px',
        '56': '56px',
        '64': '64px',
        '72': '72px',
        '80': '80px',
        '96': '96px',
        '112': '112px',
        '120': '120px',
        '128': '128px',
        '144': '144px',
        '160': '160px',
        '192': '192px',
        '224': '224px',
        '256': '256px',
        '288': '288px',
        '320': '320px',
        '360': '360px',
        '375': '375px',
        '390': '390px',
        '400': '400px',
        '430': '430px',
        '480': '480px',
        '588': '588px',
        '600': '600px',
        '768': '768px',
        '800': '800px',
        '812': '812px',
        '844': '844px',
        '932': '932px',
        '999': '999px',
        '1024': '1024px',
        '1440': '1440px',
        // Типографические стили (адаптивные для брейкпоинта 320px)
        'title-xl': ['24px', { lineHeight: '28px', letterSpacing: '-0.02em' }], // -2% для больших заголовков
        'title-l': ['20px', { lineHeight: '24px', letterSpacing: '-0.015em' }], // -1.5% для заголовков L
        'title-m': ['16px', { lineHeight: '20px', letterSpacing: '-0.01em' }], // -1% для заголовков M
        'title-s': ['14px', { lineHeight: '16px', letterSpacing: '0' }],
        'body-xl': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'body-l': ['14px', { lineHeight: '20px', letterSpacing: '0' }],
        'body-m': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        'body-s': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        'content-l': ['14px', { lineHeight: '20px', letterSpacing: '0' }],
        'label-l': ['16px', { lineHeight: '20px', letterSpacing: '0' }],   // Label/L
        'label-m': ['14px', { lineHeight: '20px', letterSpacing: '0' }],   // Label/M
        'label-s': ['12px', { lineHeight: '16px', letterSpacing: '0' }],   // Label/S
        'label-xs': ['10px', { lineHeight: '12px', letterSpacing: '0' }],
        'number-l': ['14px', { lineHeight: '20px', letterSpacing: '0' }],
        'number-s': ['10px', { lineHeight: '12px', letterSpacing: '0' }],
        'caption-s': ['10px', { lineHeight: '12px', letterSpacing: '0.1em' }],
      },
      // Высота строки
      lineHeight: {
        // Будет использоваться из Layout токенов
        'none': '1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      // Межбуквенное расстояние
      letterSpacing: {
        'title-xl': '-0.02em', // -2% для больших заголовков
        'title-l': '-0.015em', // -1.5% для заголовков L
        'title-m': '-0.01em', // -1% для заголовков M
        'title-s': '0',
        'body-xl': '0',
        'body-l': '0',
        'body-m': '0',
        'body-s': '0',
        'content-l': '0',
        'label-l': '0',
        'label-m': '0',
        'label-s': '0',
        'label-xs': '0',
        'number-l': '0',
        'number-s': '0',
        'caption-s': '0.1em',
      },
      // Отступы между параграфами
      spacing: {
        // Используем значения из Numbers
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
        '7': '7px',
        '8': '8px',
        '9': '9px',
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '20': '20px',
        '24': '24px',
        '28': '28px',
        '32': '32px',
        '36': '36px',
        '40': '40px',
        '44': '44px',
        '48': '48px',
        '52': '52px',
        '56': '56px',
        '64': '64px',
        '72': '72px',
        '80': '80px',
        '96': '96px',
        '112': '112px',
        '120': '120px',
        '128': '128px',
        '144': '144px',
        '160': '160px',
        '192': '192px',
        '224': '224px',
        '256': '256px',
        '288': '288px',
        '320': '320px',
        '360': '360px',
        '375': '375px',
        '390': '390px',
        '400': '400px',
        '430': '430px',
        '480': '480px',
        '588': '588px',
        '600': '600px',
        '768': '768px',
        '800': '800px',
        '812': '812px',
        '844': '844px',
        '932': '932px',
        '999': '999px',
        '1024': '1024px',
        '1440': '1440px',
      },
      // Радиусы скругления
      borderRadius: {
        'null': '0px',
        'checkbox': '6px',
        'xs': '8px',
        's': '12px',
        'm': '16px',
        'l': '24px',
        'xl': '32px',
        'full': '999px',
      },
      // Максимальная ширина
      maxWidth: {
        '320': '320px',
        '360': '360px',
        '375': '375px',
        '400': '400px',
        '430': '430px',
        '480': '480px',
        '600': '600px',
        '768': '768px',
        '1024': '1024px',
        '1440': '1440px',
      },
      // Брейкпоинты (из Device Width)
      screens: {
        'xs': '320px',
        'sm': '360px',
        'md': '441px', // Переход на desktop версию с 441px (для всех компонентов)
        'lg': '768px',
        'xl': '1024px',
        '2xl': '1440px',
      },
      // Насыщенность шрифта
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }: any) {
      const colors = theme('colors') || {};
      
      // Функция для рекурсивного обхода вложенных цветов и создания плоских классов
      const flattenColors = (obj: any, prefix = ''): Record<string, string> => {
        const result: Record<string, string> = {};
        for (const [key, value] of Object.entries(obj)) {
          const newKey = prefix ? `${prefix}-${key}` : key;
          if (typeof value === 'string') {
            result[newKey] = value;
          } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(result, flattenColors(value, newKey));
          }
        }
        return result;
      };
      
      const flatColors = flattenColors(colors);
      
      // Добавляем утилиты для плоских цветов
      const utilities: Record<string, Record<string, string>> = {};
      for (const [key, value] of Object.entries(flatColors)) {
        if (typeof value === 'string') {
          utilities[`.bg-${key}`] = { 'background-color': value };
          utilities[`.text-${key}`] = { color: value };
          utilities[`.border-${key}`] = { 'border-color': value };
        }
      }
      
      addUtilities(utilities);
    },
  ],
}

export default config
